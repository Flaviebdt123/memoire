// Assistant accessible depuis toutes les pages : on pose une question,
// il ressort les articles de la bibliographie qui y répondent.
// Avec la fonction serveur /api/assistant (Claude) si elle est configurée, sinon recherche par mots-clés.

(function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const history = []; // { q, loading, answer, results: [{ id, reason }], mode }
  const SUGGESTIONS = [
    "Un article sur le scepticisme envers les allégations santé",
    "La théorie du signal appliquée aux labels",
    "Combien de réponses faut-il au questionnaire ?",
    "Comment rédiger l'introduction ?",
  ];

  // Fiches de l'onglet Guide, présentées comme des « documents » pour la recherche
  const guideDocs = () => (window.GUIDE_SECTIONS || []).map(g => ({ id: g.id, titre: g.titre, concepts: g.cat, apport: g.points.join(" ") }));

  // ---------- Recherche locale (sans IA) ----------
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const STOP = new Set("a au aux avec ce ces cet cette dans de des du elle en et est il ils je la le les leur lui ma mais me mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous y article articles parle parlent trouve trouver trouves cherche chercher sujet propos quel quelle quels quelles donne moi etude etudes envers entre comme plus moins tres sont font fait the of and in on to for with about".split(" "));
  const stem = w => w.length > 5 ? w.replace(/(ements|ement|ations|ation|ites|ite|ismes|isme|euses|euse|eurs|eur|iques|ique|elles|elle|s|x)$/, "") : w.replace(/s$/, "");
  const SYNONYMS = [
    ["label", "labels", "labellisation", "certification", "certifie", "logo", "ecolabel", "nutriscore", "seal", "seals"],
    ["confiance", "trust", "credibilite", "credible", "fiabilite"],
    ["scepticisme", "sceptique", "skepticism", "skeptical", "scepticism", "mefiance", "defiance", "doute", "distrust"],
    ["allegation", "claim", "claims", "promesse"],
    ["sante", "health", "healthy", "nutrition", "nutritionnel", "bienfait"],
    ["signal", "signaux", "signaling", "signalling"],
    ["marque", "brand", "brands"],
    ["consommateur", "consumer", "consumers", "acheteur"],
    ["greenwashing", "healthwashing", "tromperie", "deception"],
    ["echantillon", "reponse", "repondant", "sample", "minimum"],
    ["entretien", "interview", "entrevue"],
    ["questionnaire", "enquete", "survey"],
    ["hypothese", "proposition"],
    ["citation", "citer", "apa", "bibliographie", "reference"],
  ].map(g => g.map(w => stem(w)));

  const tokens = s => norm(s).split(/[^a-z0-9]+/).filter(w => w.length > 2 && !STOP.has(w));
  const words = s => tokens(s).map(stem);
  const WEIGHTS = { titre: 3, concepts: 3, apport: 2, citation: 1, auteurs: 2, revue: 1 };

  function localSearch(question, articles) {
    // Un concept = un mot de la question et ses synonymes ; on affiche le mot tel qu'il a été tapé.
    const seen = new Set();
    const concepts = tokens(question).filter(t => !seen.has(stem(t)) && seen.add(stem(t)))
      .map(t => ({ label: t, stems: SYNONYMS.find(g => g.includes(stem(t))) || [stem(t)] }));
    const scored = articles.concat(guideDocs()).map(a => {
      let score = 0;
      const hits = new Set();
      for (const [field, weight] of Object.entries(WEIGHTS)) {
        const set = new Set(words(a[field]));
        concepts.forEach(c => { if (c.stems.some(w => set.has(w))) { score += weight; hits.add(c.label); } });
      }
      return { a, score: score + hits.size * 2, hits };
    }).filter(x => x.score > 0).sort((x, y) => y.score - x.score).slice(0, 6);
    return scored.map(x => ({ id: x.a.id, reason: "Mots trouvés : " + [...x.hits].join(", ") }));
  }

  // ---------- Appel à l'assistant ----------
  async function ask(question) {
    const entry = { q: question, loading: true };
    history.push(entry);
    renderPanel();
    const articles = Store.all("article");
    const guide = guideDocs().map(g => ({ id: g.id, titre: g.titre, texte: g.apport }));
    try {
      const r = await fetch("api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, articles, guide }),
      });
      const data = r.headers.get("content-type")?.includes("json") ? await r.json() : null;
      if (!r.ok || !data || data.error) throw new Error(data?.error || "indisponible");
      Object.assign(entry, { loading: false, answer: data.answer, results: data.results, mode: "ia" });
    } catch (err) {
      const results = localSearch(question, articles);
      Object.assign(entry, {
        loading: false, mode: "local", results,
        answer: results.length ? "Voici les articles et les fiches du guide qui contiennent ces mots." : "Rien dans la biblio ni dans le guide ne contient ces mots. Essaie d'autres termes, ou en anglais.",
      });
    }
    renderPanel();
  }

  // ---------- Interface ----------
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "assistant-btn";
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = `<span aria-hidden="true">✦</span> Assistant`;
  // Dans le menu de gauche (sous la navigation) : accessible partout sans recouvrir le contenu.
  const nav = document.querySelector("#nav");
  if (nav) nav.after(btn); else document.body.appendChild(btn);

  const panel = document.createElement("aside");
  panel.className = "assistant";
  panel.hidden = true;
  panel.setAttribute("aria-label", "Assistant bibliographie");
  document.body.appendChild(panel);

  function open(on) {
    panel.hidden = !on;
    btn.setAttribute("aria-expanded", String(on));
    btn.classList.toggle("on", on);
    if (on) { renderPanel(); panel.querySelector("textarea").focus(); }
  }
  btn.addEventListener("click", () => open(panel.hidden));

  function articleCard(r) {
    const g = (window.GUIDE_SECTIONS || []).find(x => x.id === r.id);
    if (g) return `<button type="button" class="as-card" data-guide-open="${esc(g.id)}">
      <span class="as-meta">Fiche du guide</span>
      <strong>${esc(g.titre)}</strong>
      ${r.reason ? `<span class="as-reason">${esc(r.reason)}</span>` : ""}
    </button>`;
    const a = Store.get(r.id);
    if (!a) return "";
    const meta = [a.auteurs, a.annee, a.revue].filter(Boolean).map(esc).join(" · ");
    const valid = { valide: "Validé", attente: "En attente", refuse: "Refusé" }[a.validation] || "";
    return `<button type="button" class="as-card" data-edit="${esc(a.id)}">
      <strong>${esc(a.titre)}</strong>
      ${meta ? `<span class="as-meta">${meta}</span>` : ""}
      ${r.reason ? `<span class="as-reason">${esc(r.reason)}</span>` : ""}
      ${valid ? `<span class="as-tag">${valid}</span>` : ""}
    </button>`;
  }

  function renderPanel() {
    if (panel.hidden) return;
    const count = Store.all("article").length;
    const body = history.length ? history.map(h => `
      <div class="as-q">${esc(h.q)}</div>
      ${h.loading ? `<p class="as-answer muted">Je cherche dans la biblio…</p>` : `
        <p class="as-answer">${esc(h.answer)}</p>
        ${(h.results || []).map(articleCard).join("")}
        ${h.mode === "local" ? `<p class="as-note">Recherche par mots-clés : l'assistant IA n'est pas encore branché (voir README).</p>` : ""}`}
    `).join("") : `
      <p class="muted">Pose une question : je ressors les articles de votre bibliographie (${count} article${count > 1 ? "s" : ""}) et les fiches du guide du mémoire qui y répondent.</p>
      <div class="as-suggest">${SUGGESTIONS.map(s => `<button type="button" data-ask="${esc(s)}">${esc(s)}</button>`).join("")}</div>`;
    const draft = panel.querySelector("textarea")?.value || "";
    panel.innerHTML = `
      <div class="as-head"><h2>assistant</h2><button type="button" class="icon-btn" data-as-close aria-label="Fermer">✕</button></div>
      <div class="as-body">${body}</div>
      <form class="as-form"><textarea rows="2" placeholder="Ex. trouve un article qui parle de…" aria-label="Question">${esc(draft)}</textarea><button type="submit" class="btn primary">Demander</button></form>`;
    const b = panel.querySelector(".as-body");
    b.scrollTop = b.scrollHeight;
  }

  panel.addEventListener("click", e => {
    if (e.target.closest("[data-as-close]")) return open(false);
    if (e.target.closest("[data-guide-open]")) setTimeout(() => open(false), 0); // app.js ouvre la fiche
    const s = e.target.closest("[data-ask]");
    if (s) ask(s.dataset.ask);
  });
  panel.addEventListener("submit", e => {
    e.preventDefault();
    const ta = panel.querySelector("textarea");
    const q = ta.value.trim();
    if (!q) return;
    ta.value = "";
    ask(q);
    panel.querySelector("textarea").focus();
  });
  panel.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing && e.target.matches("textarea")) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
    if (e.key === "Escape") open(false);
  });
  Store.onChange(() => { if (!panel.hidden && !history.some(h => h.loading)) { const f = document.activeElement === panel.querySelector("textarea"); renderPanel(); if (f) panel.querySelector("textarea").focus(); } });
})();
