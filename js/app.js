// Interface de la plateforme. Rendu en HTML "à la main", sans framework.

(function () {
  const $ = sel => document.querySelector(sel);
  const ME_KEY = "memoire-me";
  const VIEW_KEY = "memoire-view";

  const state = {
    view: readPref(VIEW_KEY) || "dashboard",
    me: readPref(ME_KEY) || "",
    filters: { person: "", statut: "", search: "" },
    conv: "groupe",
    drafts: {},
  };

  // ---------- Utilitaires ----------
  function readPref(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function writePref(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignoré */ } }

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const todayISO = () => new Date().toISOString().slice(0, 10);
  const daysUntil = iso => Math.round((new Date(iso + "T00:00:00") - new Date(todayISO() + "T00:00:00")) / 86400000);

  function fmtDate(iso) {
    if (!iso) return "";
    return new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  }

  function relDays(iso) {
    const d = daysUntil(iso);
    if (d === 0) return "aujourd'hui";
    if (d === 1) return "demain";
    if (d > 0) return `dans ${d} j`;
    return `${-d} j de retard`;
  }

  const person = id => TEAM.find(p => p.id === id);

  function personChip(id) {
    if (id === "toutes") return `<span class="chip chip-all">Les 3</span>`;
    const p = person(id);
    if (!p) return `<span class="chip chip-none">À attribuer</span>`;
    return `<span class="chip" style="--c:${p.color}"><span class="dot"></span>${esc(p.short)}</span>`;
  }

  function optionOf(field, value) {
    return (field.options || []).find(o => o.value === value);
  }

  function badge(field, value) {
    const o = optionOf(field, value);
    if (!o) return "";
    return `<span class="badge tone-${o.tone || "neutral"}">${esc(o.label)}</span>`;
  }

  const fieldOf = (kind, key) => COLLECTIONS[kind].fields.find(f => f.key === key);

  const isMine = it => !state.filters.person || it.responsable === state.filters.person || (it.responsable === "toutes");

  function demarche() { return (Store.get("setting-demarche") || {}).value || ""; }

  function trackVisible(piste) {
    const d = demarche();
    if (!piste || piste === "commun" || !d || d === "mixte") return true;
    return piste === d;
  }

  // Sélecteur inline (statut, responsable…) qui enregistre directement
  function inlineSelect(item, key) {
    const f = fieldOf(item.kind, key);
    const opts = f.type === "person" ? PERSON_OPTIONS : f.options;
    const cur = item[key] ?? "";
    const o = (f.options || []).find(x => x.value === cur);
    const tone = o && o.tone ? `tone-${o.tone}` : "";
    return `<select class="inline ${tone}" data-inline="${esc(item.id)}" data-key="${key}" aria-label="${esc(f.label)}">
      ${opts.map(x => `<option value="${esc(x.value)}" ${x.value === cur ? "selected" : ""}>${esc(x.label)}</option>`).join("")}
    </select>`;
  }

  // ---------- Navigation ----------
  const VIEWS = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "roadmap", label: "Feuille de route" },
    { id: "pitch", label: "Pitch" },
    { id: "biblio", label: "Bibliographie" },
    { id: "concepts", label: "Concepts & hypothèses" },
    { id: "terrain", label: "Terrain" },
    { id: "redaction", label: "Rédaction" },
    { id: "tuteur", label: "Tuteur" },
    { id: "messages", label: "Messages" },
  ];

  function renderNav() {
    $("#nav").innerHTML = VIEWS.map((v, i) =>
      `<button class="nav-item ${state.view === v.id ? "active" : ""}" data-view="${v.id}"><span class="nav-icon" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${v.label}${v.id === "messages" && unreadCount() ? `<span class="nav-count">${unreadCount()}</span>` : ""}</button>`
    ).join("");
    const me = person(state.me);
    $("#me").innerHTML = me
      ? `<button class="me-btn" data-action="pick-me" title="Changer d'utilisatrice">${personChip(me.id)}<span class="muted small">changer</span></button>`
      : `<button class="me-btn" data-action="pick-me">Qui es-tu ?</button>`;
    $("#mode").innerHTML = Store.shared
      ? `<span class="mode ok">● Synchronisé avec l'équipe</span>`
      : `<span class="mode warn" title="Voir README : configurer Supabase">● Mode démo (local)</span>`;
  }

  // ---------- Vues ----------
  function render() {
    renderNav();
    const fn = { dashboard, roadmap, pitch, biblio, concepts, terrain, redaction, tuteur, messages }[state.view] || dashboard;
    const chatFocused = document.activeElement && document.activeElement.dataset.chat !== undefined;
    $("#main").innerHTML = fn();
    if (state.view === "messages") afterMessages(chatFocused);
  }

  function pageHead(title, sub, actions = "") {
    return `<header class="page-head"><div><h1>${title}</h1>${sub ? `<p class="muted">${sub}</p>` : ""}</div><div class="head-actions">${actions}</div></header>`;
  }

  function personFilter() {
    return `<div class="seg" role="group" aria-label="Filtrer par personne">
      ${[{ value: "", label: "Toutes" }, ...TEAM.map(p => ({ value: p.id, label: p.short }))].map(o =>
        `<button class="${state.filters.person === o.value ? "on" : ""}" data-filter-person="${o.value}">${o.label}</button>`).join("")}
    </div>`;
  }

  // Tableau de bord
  function dashboard() {
    const tasks = Store.all("task").filter(t => trackVisible(t.piste));
    const done = tasks.filter(t => t.statut === "done").length;
    const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

    const upcoming = tasks.filter(t => t.statut !== "done" && t.echeance).sort((a, b) => a.echeance.localeCompare(b.echeance)).slice(0, 7);

    const arts = Store.all("article");
    const research = arts.filter(a => a.type === "recherche");
    const validated = research.filter(a => a.validation === "valide").length;
    const recent = research.filter(a => Number(a.annee) >= 2023).length;

    const hyps = Store.all("hypothese");

    const people = TEAM.map(p => {
      const mine = tasks.filter(t => t.responsable === p.id || t.responsable === "toutes");
      const late = mine.filter(t => t.statut !== "done" && t.echeance && daysUntil(t.echeance) < 0).length;
      return `<div class="card person-card" style="--c:${p.color}">
        <div class="person-top"><span class="avatar">${p.short[0]}</span><div><strong>${esc(p.name)}</strong><div class="muted small">${esc(p.role)}</div></div></div>
        <div class="mini-stats">
          <div><b>${mine.filter(t => t.statut === "todo").length}</b><span>pas fait</span></div>
          <div><b>${mine.filter(t => t.statut === "doing").length}</b><span>en cours</span></div>
          <div><b>${mine.filter(t => t.statut === "done").length}</b><span>terminé</span></div>
          <div class="${late ? "late" : ""}"><b>${late}</b><span>en retard</span></div>
        </div>
      </div>`;
    }).join("");

    const unassigned = tasks.filter(t => !t.responsable && t.statut !== "done").length;

    const phaseBars = PHASES.map(ph => {
      const pt = tasks.filter(t => t.phase === ph.id);
      const pd = pt.filter(t => t.statut === "done").length;
      const pp = pt.length ? Math.round((pd / pt.length) * 100) : 0;
      return `<div class="phase-row"><span>${esc(ph.label)}</span><div class="bar"><i style="width:${pp}%"></i></div><span class="num">${pd}/${pt.length}</span></div>`;
    }).join("");

    const milestones = MILESTONES.map(m => {
      const d = daysUntil(m.date);
      return `<li class="${d < 0 ? "past" : ""}"><span class="ms-date">${fmtDate(m.date)}</span><span>${esc(m.label)}</span><span class="ms-rel">${d < 0 ? "passé" : "J-" + d}</span></li>`;
    }).join("");

    return pageHead("Tableau de bord", "Mémoire de recherche appliquée · INSEEC Grande École · 2026-2027") + `
      <section class="card problem">
        <div class="eyebrow">Problématique</div>
        <p>${esc((Store.get("pitch-problematique") || {}).value || PROBLEMATIQUE)}</p>
      </section>

      <section class="stats">
        <div class="card stat"><span class="stat-label">Avancement global</span><span class="stat-value">${pct} %</span><div class="bar"><i style="width:${pct}%"></i></div><span class="muted small">${done} tâches terminées sur ${tasks.length}</span></div>
        <div class="card stat"><span class="stat-label">Articles de recherche validés</span><span class="stat-value">${validated}<small> / 15</small></span><div class="bar"><i style="width:${Math.min(100, (validated / 15) * 100)}%"></i></div><span class="muted small">15 pour janvier · 18 pour le mémoire final</span></div>
        <div class="card stat"><span class="stat-label">Sources récentes (2023 et après)</span><span class="stat-value">${research.length ? Math.round((recent / research.length) * 100) : 0} %</span><span class="muted small">${recent} sur ${research.length} articles de recherche · le guide demande une majorité</span></div>
        <div class="card stat"><span class="stat-label">Hypothèses / propositions</span><span class="stat-value">${hyps.length}</span><span class="muted small">${hyps.filter(h => h.validation === "valide").length} validées par le tuteur</span></div>
      </section>

      <section class="grid-2">
        <div class="card">
          <h2>Prochaines échéances</h2>
          ${upcoming.length ? `<ul class="list">${upcoming.map(t => {
            const d = daysUntil(t.echeance);
            return `<li class="row-click" data-edit="${esc(t.id)}"><span class="due ${d < 0 ? "late" : d <= 7 ? "soon" : ""}">${relDays(t.echeance)}</span><span class="grow">${esc(t.titre)}</span>${personChip(t.responsable)}</li>`;
          }).join("")}</ul>` : `<p class="muted">Rien à venir.</p>`}
          ${unassigned ? `<p class="hint-line">${unassigned} tâches sans responsable — à répartir dans la <a href="#" data-view="roadmap">feuille de route</a>.</p>` : ""}
        </div>
        <div class="card">
          <h2>Jalons officiels</h2>
          <ul class="milestones">${milestones}</ul>
          <h2 class="mt">Avancement par étape</h2>
          ${phaseBars}
        </div>
      </section>

      <h2 class="section-title">L'équipe</h2>
      <section class="people">${people}</section>`;
  }

  // Feuille de route
  function roadmap() {
    const f = state.filters;
    const all = Store.all("task").filter(t => trackVisible(t.piste));
    const visible = all.filter(t =>
      isMine(t) &&
      (!f.statut || t.statut === f.statut) &&
      (!f.search || t.titre.toLowerCase().includes(f.search.toLowerCase())));

    const statusSeg = `<div class="seg" role="group" aria-label="Filtrer par statut">
      ${[{ value: "", label: "Tous" }, ...STATUS].map(o => `<button class="${f.statut === o.value ? "on" : ""}" data-filter-statut="${o.value}">${o.label}</button>`).join("")}
    </div>`;

    const d = demarche();
    const note = !d ? `<p class="hint-line">Démarche pas encore choisie : les tâches quantitatives <em>et</em> qualitatives sont affichées. Le choix se fait dans l'onglet <a href="#" data-view="terrain">Terrain</a>.</p>` : "";

    const groups = PHASES.map(ph => {
      const rows = visible.filter(t => t.phase === ph.id).sort((a, b) => (a.echeance || "9").localeCompare(b.echeance || "9"));
      if (!rows.length) return "";
      const total = all.filter(t => t.phase === ph.id);
      const dn = total.filter(t => t.statut === "done").length;
      return `<section class="phase">
        <div class="phase-head"><h2>${esc(ph.label)}</h2><span class="muted small">${esc(ph.period)} · ${dn}/${total.length} terminées</span></div>
        <div class="table">
          ${rows.map(t => {
            const dd = t.echeance ? daysUntil(t.echeance) : null;
            const late = t.statut !== "done" && dd !== null && dd < 0;
            return `<div class="trow ${t.statut === "done" ? "is-done" : ""}">
              <div class="tcell grow row-click" data-edit="${esc(t.id)}">
                <span class="ttitle">${esc(t.titre)}</span>
                ${t.piste && t.piste !== "commun" ? `<span class="tag">${t.piste === "quanti" ? "Quanti" : "Quali"}</span>` : ""}
                ${t.details ? `<span class="tdetail">${esc(t.details)}</span>` : ""}
              </div>
              <div class="tcell date ${late ? "late" : ""}">${t.echeance ? fmtDate(t.echeance) : "—"}</div>
              <div class="tcell">${inlineSelect(t, "responsable")}</div>
              <div class="tcell">${inlineSelect(t, "statut")}</div>
            </div>`;
          }).join("")}
        </div>
      </section>`;
    }).join("");

    return pageHead("Feuille de route", "Toutes les étapes du guide, avec leurs dates. Change le statut ou la responsable directement dans la liste.",
      `<button class="btn primary" data-new="task">+ Tâche</button>`) +
      `<div class="toolbar">${personFilter()}${statusSeg}<input type="search" class="search" placeholder="Rechercher une tâche…" value="${esc(f.search)}" data-search></div>` +
      note + (groups || `<p class="empty">Aucune tâche ne correspond aux filtres.</p>`);
  }

  // Pitch
  function pitch() {
    return pageHead("Pitch", "Trame de l'annexe 3, à remettre en ligne fin octobre puis à envoyer au tuteur. Les modifications sont enregistrées quand tu quittes un champ.") +
      `<div class="pitch">${PITCH_FIELDS.map(f => {
        const it = Store.get("pitch-" + f.key) || {};
        const by = person(it.by);
        return `<div class="card pitch-field">
          <label for="pf-${f.key}"><strong>${esc(f.label)}</strong>${f.hint ? `<span class="muted small">${esc(f.hint)}</span>` : ""}</label>
          <textarea id="pf-${f.key}" data-pitch="${f.key}" rows="${f.key === "problematique" ? 3 : 4}">${esc(it.value || "")}</textarea>
          ${it.updated_at ? `<span class="muted small">Modifié ${by ? "par " + esc(by.short) + " " : ""}le ${new Date(it.updated_at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}</span>` : ""}
        </div>`;
      }).join("")}</div>`;
  }

  // Bibliographie
  function biblio() {
    const f = state.filters;
    const vf = fieldOf("article", "validation");
    const lf = fieldOf("article", "lecture");
    const tf = fieldOf("article", "type");
    let arts = Store.all("article").filter(a =>
      (!f.person || a.responsable === f.person) &&
      (!f.validation || a.validation === f.validation) &&
      (!f.search || [a.titre, a.auteurs, a.concepts, a.revue].join(" ").toLowerCase().includes(f.search.toLowerCase())));
    // Dans chaque axe : regroupé par lectrice, puis par auteur.
    const personRank = a => { const i = TEAM.findIndex(p => p.id === a.responsable); return i < 0 ? TEAM.length : i; };
    arts.sort((a, b) => personRank(a) - personRank(b) || (a.auteurs || "").localeCompare(b.auteurs || "", "fr"));

    const themeGroups = [...THEMES, { value: "", label: "Non classés" }];
    const card = a => `
        <article class="card art">
          <div class="art-top row-click" data-edit="${esc(a.id)}">
            <div class="art-meta">${badge(tf, a.type)} ${a.annee ? `<span class="muted small">${esc(a.annee)}</span>` : ""} ${a.annee && Number(a.annee) >= 2023 ? `<span class="tag">récent</span>` : ""}</div>
            <h3>${esc(a.titre)}</h3>
            <p class="muted small">${esc(a.auteurs || "Auteurs ?")}${a.revue ? " · <em>" + esc(a.revue) + "</em>" : ""}</p>
            ${a.concepts ? `<p class="concepts">${a.concepts.split(",").map(c => c.trim()).filter(Boolean).map(c => `<span class="tag">${esc(c)}</span>`).join("")}</p>` : ""}
            ${a.apport ? `<p class="apport">${esc(a.apport)}</p>` : ""}
            ${a.commentaireProf ? `<p class="prof-comment"><b>Prof :</b> ${esc(a.commentaireProf)}</p>` : ""}
          </div>
          <div class="art-foot">
            <label class="small">Validation prof ${inlineSelect(a, "validation")}</label>
            <label class="small">Lecture ${inlineSelect(a, "lecture")}</label>
            ${personChip(a.responsable)}
            ${a.lien ? `<a class="small" href="${esc(a.lien)}" target="_blank" rel="noopener">Ouvrir ↗</a>` : ""}
          </div>
        </article>`;

    const research = Store.all("article").filter(a => a.type === "recherche");
    const counts = VALIDATION.map(v => `<button class="${f.validation === v.value ? "on" : ""}" data-filter-validation="${v.value}">${v.label} <b>${Store.all("article").filter(a => a.validation === v.value).length}</b></button>`).join("");

    return pageHead("Bibliographie", `${research.length} articles de recherche · ${research.filter(a => a.validation === "valide").length} validés par la prof · objectif 15 (janvier) puis 18 (mai)`,
      `<button class="btn" data-action="biblio-export">Bibliographie formatée</button><button class="btn primary" data-new="article">+ Article</button>`) +
      `<div class="toolbar">${personFilter()}<div class="seg" role="group" aria-label="Filtrer par validation"><button class="${!f.validation ? "on" : ""}" data-filter-validation="">Toutes</button>${counts}</div><input type="search" class="search" placeholder="Titre, auteur, concept…" value="${esc(f.search)}" data-search></div>` +
      (arts.length ? themeGroups.map(g => {
        const rows = arts.filter(a => (a.theme || "") === g.value);
        if (!rows.length) return "";
        return `<section class="phase">
          <div class="phase-head"><h2>${esc(g.label)}</h2><span class="muted small">${rows.length} article${rows.length > 1 ? "s" : ""} · ${TEAM.map(p => `${esc(p.short)} ${rows.filter(a => a.responsable === p.id).length}`).join(" · ")}</span></div>
          <div class="cards">${rows.map(card).join("")}</div>
        </section>`;
      }).join("")
        : `<div class="empty card"><p><strong>Aucun article pour l'instant.</strong></p><p class="muted">Ajoute chaque source lue : auteurs, année, revue, apport pour le mémoire. La prof pourra ensuite la valider ou demander une correction.</p><button class="btn primary" data-new="article">+ Ajouter un premier article</button></div>`);
  }

  // Concepts & hypothèses
  function concepts() {
    const cs = Store.all("concept").sort((a, b) => a.id.localeCompare(b.id));
    const hs = Store.all("hypothese").sort((a, b) => (a.code || "").localeCompare(b.code || "", "fr", { numeric: true }));
    const vf = fieldOf("concept", "validation");
    const rf = fieldOf("hypothese", "resultat");
    return pageHead("Concepts & hypothèses", "Ce qui structure la revue de littérature : chaque concept défini à partir de la recherche, puis les hypothèses (H) ou propositions (P) qui en découlent.") +
      `<div class="section-head"><h2>Concepts</h2><button class="btn primary" data-new="concept">+ Concept</button></div>
      <div class="cards">${cs.map(c => `
        <article class="card">
          <div class="row-click" data-edit="${esc(c.id)}">
            <h3>${esc(c.nom)}</h3>
            ${c.definition ? `<p>${esc(c.definition)}</p>` : `<p class="muted">Définition à rédiger.</p>`}
            ${c.references ? `<p class="muted small">${esc(c.references)}</p>` : ""}
            ${c.dimensions ? `<p class="small dim">${esc(c.dimensions)}</p>` : ""}
          </div>
          <div class="art-foot">${inlineSelect(c, "statut")}${badge(vf, c.validation)}${personChip(c.responsable)}</div>
        </article>`).join("")}</div>
      <div class="section-head"><h2>Hypothèses / propositions</h2><button class="btn primary" data-new="hypothese">+ Hypothèse</button></div>
      ${hs.length ? `<div class="table">${hs.map(h => `
        <div class="trow">
          <div class="tcell code">${esc(h.code)}</div>
          <div class="tcell grow row-click" data-edit="${esc(h.id)}"><span class="ttitle">${esc(h.enonce)}</span>${h.variables ? `<span class="tdetail">${esc(h.variables)}</span>` : ""}</div>
          <div class="tcell">${inlineSelect(h, "validation")}</div>
          <div class="tcell">${badge(rf, h.resultat || "")}</div>
        </div>`).join("")}</div>`
        : `<p class="empty">Les hypothèses arrivent en fin de revue de littérature (décembre). Ex. : « H1 : la présence d'un label tiers augmente la crédibilité perçue de l'allégation santé ».</p>`}`;
  }

  // Terrain
  function terrain() {
    const d = demarche();
    const showQuanti = d !== "quali";
    const showQuali = d !== "quanti";
    const ent = Store.all("entretien").sort((a, b) => (a.code || "").localeCompare(b.code || "", "fr", { numeric: true }));
    const ech = Store.all("echelle");
    const realised = ent.filter(e => e.statut === "realise").length;
    const sf = fieldOf("entretien", "statut");
    const responses = (Store.get("setting-reponses") || {}).value || "";
    const target = (Store.get("setting-objectif") || {}).value || "";

    const check = v => v ? `<span class="ok-mark" title="Fait">✓</span>` : `<span class="ko-mark" title="À faire">·</span>`;

    return pageHead("Terrain", "Collecte et suivi des données. Le choix de la démarche découle de la revue de littérature.") +
      `<div class="card setting">
        <label for="dem"><strong>Démarche retenue</strong><span class="muted small">Masque les tâches et outils de l'autre méthode.</span></label>
        <select id="dem" data-setting="demarche">${DEMARCHES.map(o => `<option value="${o.value}" ${o.value === d ? "selected" : ""}>${esc(o.label)}</option>`).join("")}</select>
      </div>` +
      (showQuanti ? `
      <div class="section-head"><h2>Quantitatif · échelles de mesure</h2><button class="btn primary" data-new="echelle">+ Échelle</button></div>
      <div class="card counters">
        <label>Réponses collectées <input type="number" min="0" data-setting="reponses" value="${esc(responses)}"></label>
        <label>Objectif minimum <input type="number" min="0" data-setting="objectif" value="${esc(target)}" placeholder="ex. 240"></label>
        ${target ? `<div class="grow"><div class="bar"><i style="width:${Math.min(100, (Number(responses || 0) / Number(target)) * 100)}%"></i></div></div>` : `<span class="muted small">Règle : 10 × nb de questions (hors socio-démo), ou 240 pour un binôme.</span>`}
      </div>
      ${ech.length ? `<div class="table">${ech.map(e => `
        <div class="trow">
          <div class="tcell grow row-click" data-edit="${esc(e.id)}"><span class="ttitle">${esc(e.variable)}</span><span class="tdetail">${esc(e.source || "Source à trouver")}${e.alpha ? " · α = " + esc(e.alpha) : ""}</span></div>
          <div class="tcell">${e.alpha && Number(e.alpha) < 0.7 ? `<span class="badge tone-bad">α &lt; 0,70</span>` : ""}</div>
          <div class="tcell">${inlineSelect(e, "validation")}</div>
          <div class="tcell">${personChip(e.responsable)}</div>
        </div>`).join("")}</div>` : `<p class="empty">Une ligne par variable : items repris d'une échelle publiée, source, alpha de Cronbach.</p>`}` : "") +
      (showQuali ? `
      <div class="section-head"><h2>Qualitatif · entretiens <span class="muted small">${realised} réalisés sur ${ent.length}</span></h2><button class="btn primary" data-new="entretien">+ Entretien</button></div>
      <p class="hint-line">RGPD : n'enregistre ici que des codes (R01, R02…) et des profils anonymisés, jamais de nom, de téléphone ou d'e-mail.</p>
      ${ent.length ? `<div class="table">
        <div class="trow thead"><div class="tcell code">Code</div><div class="tcell grow">Profil</div><div class="tcell">Statut</div><div class="tcell mini">RGPD</div><div class="tcell mini">mp3</div><div class="tcell mini">Retr.</div><div class="tcell mini">Codé</div><div class="tcell">Par</div></div>
        ${ent.map(e => `
        <div class="trow">
          <div class="tcell code">${esc(e.code)}</div>
          <div class="tcell grow row-click" data-edit="${esc(e.id)}"><span class="ttitle">${esc(e.profil || "Profil à compléter")}</span>${e.date ? `<span class="tdetail">${fmtDate(e.date)}</span>` : ""}</div>
          <div class="tcell">${inlineSelect(e, "statut")}</div>
          <div class="tcell mini">${check(e.consentement)}</div>
          <div class="tcell mini">${check(e.mp3)}</div>
          <div class="tcell mini">${check(e.retranscrit)}</div>
          <div class="tcell mini">${check(e.code_fait)}</div>
          <div class="tcell">${personChip(e.responsable)}</div>
        </div>`).join("")}</div>` : `<p class="empty">Minimum indicatif : 16 entretiens pour des cibles communes (binôme), 8 à 10 pour des cibles rares. À valider avec le tuteur pour un groupe de 3.</p>`}` : "");
  }

  // Rédaction
  function redaction() {
    const cs = Store.all("chapitre").sort((a, b) => (a.ordre || 99) - (b.ordre || 99));
    const pages = cs.reduce((s, c) => s + Number(c.pages || 0), 0);
    return pageHead("Rédaction", `Structure obligatoire du document final (35 à 45 pages minimum hors annexes) · ${pages} pages rédigées`,
      `<button class="btn primary" data-new="chapitre">+ Partie</button>`) +
      `<p class="hint-line">Forme : Times New Roman 12, titres en gras taille 12, interligne 1,5, marges 2,5 cm.</p>
      <div class="table">
        <div class="trow thead"><div class="tcell code">#</div><div class="tcell grow">Partie</div><div class="tcell">Pages</div><div class="tcell">Échéance</div><div class="tcell">Rédactrice</div><div class="tcell">Statut</div></div>
        ${cs.map(c => {
          const pct = c.pagesMin ? Math.min(100, (Number(c.pages || 0) / c.pagesMin) * 100) : null;
          return `<div class="trow ${c.statut === "done" ? "is-done" : ""}">
            <div class="tcell code">${esc(c.ordre ?? "")}</div>
            <div class="tcell grow row-click" data-edit="${esc(c.id)}"><span class="ttitle">${esc(c.titre)}</span>${c.consignes ? `<span class="tdetail">${esc(c.consignes)}</span>` : ""}</div>
            <div class="tcell pages">${c.pagesMin ? `${Number(c.pages || 0)} / ${c.pagesMin} p.<div class="bar thin"><i style="width:${pct}%"></i></div>` : (c.pages ? c.pages + " p." : "—")}</div>
            <div class="tcell date">${c.echeance ? fmtDate(c.echeance) : "—"}</div>
            <div class="tcell">${inlineSelect(c, "responsable")}</div>
            <div class="tcell">${inlineSelect(c, "statut")}</div>
          </div>`;
        }).join("")}
      </div>`;
  }

  // Tuteur
  function tuteur() {
    const name = (Store.get("setting-tuteurNom") || {}).value || "";
    const mail = (Store.get("setting-tuteurMail") || {}).value || "";
    const ex = Store.all("echange").sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return pageHead("Tuteur", "Attribué début novembre. Toujours mettre les 3 membres en copie des mails.",
      `<button class="btn primary" data-new="echange">+ Échange</button>`) +
      `<div class="card counters">
        <label>Nom du tuteur <input type="text" data-setting="tuteurNom" value="${esc(name)}" placeholder="Pas encore attribué"></label>
        <label>E-mail <input type="email" data-setting="tuteurMail" value="${esc(mail)}"></label>
      </div>
      ${ex.length ? `<div class="cards one">${ex.map(e => `
        <article class="card row-click" data-edit="${esc(e.id)}">
          <div class="art-meta"><span class="muted small">${fmtDate(e.date)}</span> ${badge(fieldOf("echange", "type"), e.type)} ${personChip(e.responsable)}</div>
          <h3>${esc(e.sujet)}</h3>
          ${e.retours ? `<p><b>Retours :</b> ${esc(e.retours)}</p>` : ""}
          ${e.actions ? `<p><b>Actions :</b> ${esc(e.actions)}</p>` : ""}
        </article>`).join("")}</div>`
        : `<p class="empty">Note ici chaque rendez-vous ou mail : retours du tuteur et actions décidées.</p>`}`;
  }

  // ---------- Messagerie ----------
  // Un message : { kind: "message", from, to: "groupe" | id, text, at }.
  // Lu / non lu : chacune a sa fiche "read-<id>" avec, par conversation, la date du dernier message lu.
  const readState = () => (Store.get("read-" + state.me) || {}).convs || {};
  const convOf = m => m.to === "groupe" ? "groupe" : m.from === state.me ? m.to : m.from;
  const isUnreadForMe = m => !!state.me && m.from !== state.me && (m.to === "groupe" || m.to === state.me) && (m.at || "") > (readState()[convOf(m)] || "");
  const unreadCount = () => Store.all("message").filter(isUnreadForMe).length;

  function inConv(m, conv) {
    if (conv === "groupe") return m.to === "groupe";
    return (m.from === state.me && m.to === conv) || (m.from === conv && m.to === state.me);
  }

  function fmtTime(iso) {
    const d = new Date(iso);
    const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    return d.toISOString().slice(0, 10) === todayISO() ? time : d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " · " + time;
  }

  const msgText = t => esc(t).replace(/\n/g, "<br>");
  const convLabel = conv => conv === "groupe" ? "Les 3" : person(conv).short;

  function messages() {
    if (!state.me) return pageHead("Messages") + `<div class="card empty"><p>Dis-nous d'abord qui tu es.</p><button class="btn primary" data-action="pick-me">Choisir</button></div>`;
    const all = Store.all("message").sort((a, b) => (a.at || "").localeCompare(b.at || ""));
    const convs = ["groupe", ...TEAM.filter(p => p.id !== state.me).map(p => p.id)];
    if (!convs.includes(state.conv)) state.conv = "groupe";

    const list = convs.map(c => {
      const ms = all.filter(m => inConv(m, c));
      const last = ms[ms.length - 1];
      const unread = ms.filter(isUnreadForMe).length;
      const p = person(c);
      return `<button class="conv ${state.conv === c ? "on" : ""}" data-conv="${c}">
        <span class="avatar ${p ? "" : "avatar-group"}" style="--c:${p ? p.color : "var(--text)"}">${p ? p.short[0] : "3"}</span>
        <span class="conv-main"><strong>${c === "groupe" ? "Groupe" : esc(p.short)}</strong>
          <span class="conv-last">${last ? (last.from === state.me ? "Toi : " : c === "groupe" ? esc(person(last.from).short) + " : " : "") + esc(last.text) : "Aucun message"}</span></span>
        ${unread ? `<span class="nav-count">${unread}</span>` : ""}
      </button>`;
    }).join("");

    const thread = all.filter(m => inConv(m, state.conv));
    let prevFrom = "";
    const bubbles = thread.map(m => {
      const mine = m.from === state.me;
      const p = person(m.from);
      const showName = !mine && state.conv === "groupe" && prevFrom !== m.from;
      prevFrom = m.from;
      return `<div class="msg ${mine ? "mine" : ""}" style="--c:${p ? p.color : "var(--muted)"}">
        ${showName ? `<span class="msg-name">${esc(p.short)}</span>` : ""}
        <div class="msg-bubble">${msgText(m.text)}</div>
        <span class="msg-time">${fmtTime(m.at)}</span>
      </div>`;
    }).join("");

    const to = state.conv === "groupe" ? "au groupe" : "à " + convLabel(state.conv);
    return pageHead("Messages", state.conv === "groupe" ? "Discussion à trois." : `Conversation avec ${esc(convLabel(state.conv))}. Elle aura une notification en ouvrant le site.`) +
      (Store.shared ? "" : `<p class="hint-line">Mode démo : les messages restent sur cet appareil. Ils arriveront chez les autres une fois Supabase configuré (voir README).</p>`) +
      `<section class="chat">
        <nav class="conv-list" aria-label="Conversations">${list}</nav>
        <div class="thread-wrap">
          <div class="thread" id="thread">${bubbles || `<p class="empty">Pas encore de message. Lance la conversation !</p>`}</div>
          <form class="composer" data-chat-form="${state.conv}">
            <textarea data-chat rows="1" placeholder="Écrire ${esc(to)}…" aria-label="Message">${esc(state.drafts[state.conv] || "")}</textarea>
            <button type="submit" class="btn primary">Envoyer</button>
          </form>
        </div>
      </section>`;
  }

  function afterMessages(refocus) {
    const th = $("#thread");
    if (th) th.scrollTop = th.scrollHeight;
    const ta = $("[data-chat]");
    if (ta && refocus) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    // Marquer comme lus les messages affichés
    const unread = Store.all("message").filter(m => isUnreadForMe(m) && inConv(m, state.conv));
    if (unread.length) {
      const latest = unread.map(m => m.at).sort().pop();
      setTimeout(() => Store.save({ id: "read-" + state.me, kind: "read", convs: { ...readState(), [state.conv]: latest } }), 0);
    }
  }

  async function sendMessage(to, text) {
    text = text.trim();
    if (!text || !state.me) return false;
    await Store.save({ kind: "message", from: state.me, to, text, at: new Date().toISOString() });
    return true;
  }

  function openConv(conv) {
    state.conv = conv;
    closeModal();
    setView("messages");
  }

  // Pop-up « X t'a envoyé un message » : à l'ouverture de la session et à chaque nouveau message privé.
  const notified = new Set();
  function checkInbox() {
    if (!state.me || $("#modal").classList.contains("open")) return;
    if (state.view === "messages") return;
    const fresh = Store.all("message")
      .filter(m => m.to === state.me && isUnreadForMe(m) && !notified.has(m.id))
      .sort((a, b) => (a.at || "").localeCompare(b.at || ""));
    if (!fresh.length) return;
    fresh.forEach(m => notified.add(m.id));
    const senders = [...new Set(fresh.map(m => m.from))];
    const names = senders.map(id => person(id).short);
    const who = names.length > 1 ? names.slice(0, -1).join(", ") + " et " + names[names.length - 1] : names[0];
    const last = fresh[fresh.length - 1];
    $("#modal").innerHTML = `<div class="modal-back" data-action="close"></div>
      <div class="modal narrow inbox">
        <div class="modal-head"><h2>${esc(who)} ${senders.length > 1 ? "t'ont" : "t'a"} envoyé ${fresh.length > 1 ? "des messages" : "un message"}</h2><button type="button" class="icon-btn" data-action="close" aria-label="Fermer">✕</button></div>
        <div class="inbox-list">${fresh.map(m => `<div class="msg" style="--c:${person(m.from).color}">
          <span class="msg-name">${esc(person(m.from).short)} · ${fmtTime(m.at)}</span>
          <div class="msg-bubble">${msgText(m.text)}</div></div>`).join("")}</div>
        <div class="modal-foot"><span class="grow"></span>
          <button type="button" class="btn" data-action="close">Plus tard</button>
          <button type="button" class="btn primary" data-conv="${last.from}">Répondre à ${esc(person(last.from).short)}</button>
        </div>
      </div>`;
    $("#modal").classList.add("open");
  }

  // Clic sur une fille en pixel : lui écrire directement (ou la lancer sur une autre).
  document.addEventListener("pixel-girl", e => {
    const { id, provoke, say, move } = e.detail;
    if (!state.me) { openPickMe(); return; }
    const p = person(id);
    const self = id === state.me;
    const to = self ? "groupe" : id;
    $("#modal").innerHTML = `<div class="modal-back" data-action="close"></div>
      <form class="modal narrow inbox" data-quick-msg="${to}">
        <div class="modal-head"><h2>${self ? "écrire au groupe" : "écrire à " + esc(p.short)}</h2><button type="button" class="icon-btn" data-action="close" aria-label="Fermer">✕</button></div>
        <textarea name="text" rows="4" placeholder="${self ? "Un message pour Anna et Flavie…" : "Ton message pour " + esc(p.short) + "…"}" required></textarea>
        <p class="muted small">${self ? "" : esc(p.short) + " aura un pop-up en ouvrant le site."}</p>
        <div class="modal-foot">
          <button type="button" class="btn" data-action="provoke">${esc(p.short)} ${esc(move)}</button>
          <span class="grow"></span>
          <button type="submit" class="btn primary">Envoyer</button>
        </div>
      </form>`;
    $("#modal").classList.add("open");
    const form = $("[data-quick-msg]");
    form._provoke = provoke;
    form._say = say;
    form.elements.text.focus();
  });

  // ---------- Formulaire (modale) ----------
  function openForm(kind, id) {
    const def = COLLECTIONS[kind];
    const item = id ? Store.get(id) : {};
    const fields = def.fields.map(f => {
      let v = item[f.key];
      if (v === undefined && !id) {
        v = f.default ?? "";
        if (f.type === "person" && state.me) v = state.me;
        if (kind === "task" && f.key === "phase") v = PHASES[0].id;
      }
      const name = `name="${f.key}" id="f-${f.key}"`;
      let input;
      if (f.type === "textarea") input = `<textarea ${name} rows="3">${esc(v)}</textarea>`;
      else if (f.type === "select" || f.type === "person") {
        const opts = f.type === "person" ? PERSON_OPTIONS : f.options;
        input = `<select ${name}>${opts.map(o => `<option value="${esc(o.value)}" ${o.value === (v ?? "") ? "selected" : ""}>${esc(o.label)}</option>`).join("")}</select>`;
      } else if (f.type === "bool") input = `<input type="checkbox" ${name} ${v ? "checked" : ""}>`;
      else {
        const t = { date: "date", number: "number", url: "url" }[f.type] || "text";
        input = `<input type="${t}" ${name} value="${esc(v)}" ${f.type === "number" ? 'step="any"' : ""} ${f.required ? "required" : ""}>`;
      }
      const wide = f.type === "textarea" || f.key === "titre" || f.key === "enonce";
      return `<div class="field ${wide ? "wide" : ""} ${f.type === "bool" ? "bool" : ""}">
        <label for="f-${f.key}">${esc(f.label)}${f.required ? " *" : ""}</label>${input}
        ${f.hint ? `<span class="muted small">${esc(f.hint)}</span>` : ""}
      </div>`;
    }).join("");

    $("#modal").innerHTML = `<div class="modal-back" data-action="close"></div>
      <form class="modal" data-form="${kind}" data-id="${esc(id || "")}">
        <div class="modal-head"><h2>${id ? "Modifier" : "Ajouter"} · ${esc(def.label)}</h2><button type="button" class="icon-btn" data-action="close" aria-label="Fermer">✕</button></div>
        <div class="form-grid">${fields}</div>
        <div class="modal-foot">
          ${id ? `<button type="button" class="btn danger" data-action="delete">Supprimer</button>` : ""}
          <span class="grow"></span>
          <button type="button" class="btn" data-action="close">Annuler</button>
          <button type="submit" class="btn primary">Enregistrer</button>
        </div>
      </form>`;
    $("#modal").classList.add("open");
    const first = $("#modal .form-grid input, #modal .form-grid textarea");
    if (first) first.focus();
  }

  function closeModal() {
    $("#modal").classList.remove("open");
    $("#modal").innerHTML = "";
    // Des données ont changé pendant que la fenêtre était ouverte
    if (state.stale) { state.stale = false; render(); }
  }

  async function submitForm(form) {
    const kind = form.dataset.form;
    const id = form.dataset.id;
    const base = id ? { ...Store.get(id) } : { kind };
    COLLECTIONS[kind].fields.forEach(f => {
      const el = form.elements[f.key];
      if (!el) return;
      if (f.type === "bool") base[f.key] = el.checked;
      else if (f.type === "number") base[f.key] = el.value === "" ? null : Number(el.value);
      else base[f.key] = el.value.trim();
    });
    base.by = state.me || base.by || "";
    if (!id) base.created_by = state.me || "";
    closeModal();
    await Store.save(base);
  }

  // ---------- Bibliographie formatée (normes du guide, 7.1) ----------
  function formatRef(a) {
    const names = (a.auteurs || "").split(";").map(s => s.trim()).filter(Boolean);
    const au = names.length > 1 ? names.slice(0, -1).join(", ") + " et " + names[names.length - 1] : names.join("");
    const y = a.annee ? ` (${a.annee})` : "";
    const vol = a.volume ? `${a.volume}${a.numero ? "(" + a.numero + ")" : ""}` : (a.numero ? `(${a.numero})` : "");
    switch (a.type) {
      case "recherche":
        return `${esc(au)}${y}, ${esc(a.titre)}, <i>${esc(a.revue || "")}</i>${vol ? ", " + esc(vol) : ""}${a.pages ? ", " + esc(a.pages) : ""}.`;
      case "ouvrage":
        return `${esc(au)}${y}, <i>${esc(a.titre)}</i>${a.revue ? ", " + esc(a.revue) : ""}.`;
      case "collectif":
        return `${esc(au)}${y}, ${esc(a.titre)}, In <i>${esc(a.revue || "")}</i>${a.pages ? " (" + esc(a.pages) + ")" : ""}.`;
      case "presse":
        return `${esc(au)}${y}, ${esc(a.titre)}, ${esc(a.revue || "")}${a.pages ? ", " + esc(a.pages) : ""}.`;
      default:
        return "";
    }
  }

  // Variante APA 7 (même fiche, autre mise en forme)
  function formatRefApa(a) {
    const names = (a.auteurs || "").split(";").map(s => s.trim()).filter(Boolean);
    const au = names.length > 1 ? names.slice(0, -1).join(", ") + ", & " + names[names.length - 1] : names.join("");
    const y = ` (${a.annee || "s.d."}). `;
    const doi = a.lien ? " " + esc(a.lien) : "";
    const end = t => /[.?!]$/.test(t) ? t : t + ".";
    switch (a.type) {
      case "recherche": {
        const online = /advance online/i.test(a.pages || "");
        const vol = a.volume ? `, <i>${esc(a.volume)}</i>${a.numero ? "(" + esc(a.numero) + ")" : ""}` : "";
        const pages = a.pages && !online ? ", " + esc(a.pages) : "";
        return `${esc(au)}${y}${esc(end(a.titre))} <i>${esc(a.revue || "")}</i>${vol}${pages}.${online ? " Advance online publication." : ""}${doi}`;
      }
      case "ouvrage":
        return `${esc(au)}${y}<i>${esc(end(a.titre))}</i> ${esc(a.revue || "")}.${doi}`;
      case "collectif":
        return `${esc(au)}${y}${esc(end(a.titre))} In <i>${esc(a.revue || "")}</i>${a.pages ? " (pp. " + esc(a.pages) + ")" : ""}.${doi}`;
      case "presse":
        return `${esc(au)}${y}${esc(end(a.titre))} <i>${esc(a.revue || "")}</i>${a.pages ? ", " + esc(a.pages) : ""}.${doi}`;
      default:
        return "";
    }
  }

  function inTextCitation(a) {
    const names = (a.auteurs || "").split(";").map(s => s.split(",")[0].trim()).filter(Boolean);
    if (!names.length) return "";
    const who = names.length === 1 ? names[0] : names.length === 2 ? `${names[0]} et ${names[1]}` : `${names[0]} et al.`;
    return `(${who}, ${a.annee || "s.d."})`;
  }

  function openBiblioExport() {
    const apa = state.biblioFormat === "apa";
    const arts = Store.all("article").filter(a => a.type !== "web" && a.validation !== "refuse")
      .sort((a, b) => {
        const c = (a.auteurs || "").localeCompare(b.auteurs || "", "fr");
        return c !== 0 ? c : Number(b.annee || 0) - Number(a.annee || 0);
      });
    $("#modal").innerHTML = `<div class="modal-back" data-action="close"></div>
      <div class="modal">
        <div class="modal-head"><h2>Bibliographie formatée</h2><button type="button" class="icon-btn" data-action="close" aria-label="Fermer">✕</button></div>
        <div class="seg" role="group" aria-label="Norme de la bibliographie"><button class="${apa ? "" : "on"}" data-action="fmt-guide">Normes du guide</button><button class="${apa ? "on" : ""}" data-action="fmt-apa">APA 7</button></div>
        <p class="muted small">Ordre alphabétique d'auteur, le plus récent d'abord pour un même auteur (guide, 7.1). Les sites web ne figurent pas ici : ils vont en note de bas de page. Les articles refusés par la prof sont exclus.</p>
        <div class="biblio-out" id="biblio-out">${arts.map(a => `<p>${apa ? formatRefApa(a) : formatRef(a)} <span class="cite">${esc(inTextCitation(a))}</span></p>`).join("") || "<p class='muted'>Aucun article.</p>"}</div>
        <div class="modal-foot"><span class="grow"></span><button class="btn primary" data-action="copy-biblio">Copier</button></div>
      </div>`;
    $("#modal").classList.add("open");
  }

  // ---------- Choix de l'utilisatrice ----------
  function openPickMe() {
    $("#modal").innerHTML = `<div class="modal-back"></div>
      <div class="modal narrow">
        <div class="modal-head"><h2>Qui es-tu ?</h2></div>
        <p class="muted">Pour pré-remplir « responsable » et signer tes modifications. Mémorisé sur cet appareil.</p>
        <div class="pick">${TEAM.map(p => `<button class="pick-btn" data-me="${p.id}" style="--c:${p.color}"><span class="avatar">${p.short[0]}</span><span><strong>${esc(p.name)}</strong><span class="muted small">${esc(p.role)}</span></span></button>`).join("")}</div>
      </div>`;
    $("#modal").classList.add("open");
  }

  // ---------- Événements ----------
  function setView(v) {
    state.view = v;
    state.filters.search = "";
    state.filters.validation = "";
    writePref(VIEW_KEY, v);
    render();
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", async e => {
    const t = e.target.closest("[data-view],[data-new],[data-edit],[data-action],[data-me],[data-conv],[data-filter-person],[data-filter-statut],[data-filter-validation]");
    if (!t) return;
    if (t.dataset.view) { e.preventDefault(); setView(t.dataset.view); return; }
    if (t.dataset.new) { openForm(t.dataset.new); return; }
    if (t.dataset.edit) { const it = Store.get(t.dataset.edit); if (it) openForm(it.kind, it.id); return; }
    if (t.dataset.me) { state.me = t.dataset.me; writePref(ME_KEY, state.me); closeModal(); render(); checkInbox(); return; }
    if (t.dataset.conv) { openConv(t.dataset.conv); return; }
    if (t.dataset.filterPerson !== undefined) { state.filters.person = t.dataset.filterPerson; render(); return; }
    if (t.dataset.filterStatut !== undefined) { state.filters.statut = t.dataset.filterStatut; render(); return; }
    if (t.dataset.filterValidation !== undefined) { state.filters.validation = t.dataset.filterValidation; render(); return; }
    const a = t.dataset.action;
    if (a === "close") closeModal();
    if (a === "provoke") { const f = t.closest("form"); closeModal(); f._provoke(); }
    if (a === "pick-me") openPickMe();
    if (a === "biblio-export") openBiblioExport();
    if (a === "fmt-guide" || a === "fmt-apa") { state.biblioFormat = a === "fmt-apa" ? "apa" : "guide"; openBiblioExport(); }
    if (a === "copy-biblio") {
      const el = $("#biblio-out");
      try {
        await navigator.clipboard.write([new ClipboardItem({
          "text/html": new Blob([el.innerHTML], { type: "text/html" }),
          "text/plain": new Blob([el.innerText], { type: "text/plain" }),
        })]);
      } catch (err) {
        await navigator.clipboard.writeText(el.innerText);
      }
      t.textContent = "Copié ✓";
    }
    if (a === "delete") {
      const form = t.closest("form");
      if (confirm("Supprimer définitivement cet élément pour toute l'équipe ?")) {
        const id = form.dataset.id;
        closeModal();
        await Store.remove(id);
      }
    }
  });

  document.addEventListener("submit", async e => {
    const f = e.target;
    if (f.dataset.form) { e.preventDefault(); submitForm(f); }
    if (f.dataset.chatForm) {
      e.preventDefault();
      const conv = f.dataset.chatForm;
      const text = f.querySelector("[data-chat]").value;
      state.drafts[conv] = "";
      f.querySelector("[data-chat]").value = "";
      await sendMessage(conv, text);
    }
    if (f.dataset.quickMsg) {
      e.preventDefault();
      const say = f._say;
      if (await sendMessage(f.dataset.quickMsg, f.elements.text.value)) { closeModal(); say("message envoyé ✉"); }
    }
  });

  document.addEventListener("change", async e => {
    const el = e.target;
    if (el.dataset.inline) {
      const it = Store.get(el.dataset.inline);
      if (it) await Store.save({ ...it, [el.dataset.key]: el.value, by: state.me || it.by || "" });
    } else if (el.dataset.setting) {
      await Store.save({ id: "setting-" + el.dataset.setting, kind: "setting", value: el.value, by: state.me });
    } else if (el.dataset.pitch) {
      await Store.save({ id: "pitch-" + el.dataset.pitch, kind: "pitch", value: el.value, by: state.me });
    }
  });

  let searchTimer;
  document.addEventListener("input", e => {
    if (e.target.dataset.chat !== undefined) { state.drafts[state.conv] = e.target.value; return; }
    if (e.target.dataset.search === undefined) return;
    clearTimeout(searchTimer);
    const value = e.target.value;
    searchTimer = setTimeout(() => {
      state.filters.search = value;
      render();
      const s = $("[data-search]");
      if (s) { s.focus(); s.setSelectionRange(value.length, value.length); }
    }, 200);
  });

  document.addEventListener("keydown", e => {
    // Entrée envoie, Maj+Entrée va à la ligne
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.target.dataset.chat !== undefined || e.target.closest?.("[data-quick-msg]"))) {
      e.preventDefault();
      e.target.form.requestSubmit();
      return;
    }
    if (e.key === "Escape" && $("#modal").classList.contains("open") && state.me) closeModal();
  });

  // Ne pas écraser ce que l'utilisatrice est en train de taper quand une mise à jour arrive
  Store.onChange(() => {
    const active = document.activeElement;
    const typing = active && (active.dataset.pitch || active.dataset.setting || active.dataset.search !== undefined) && $("#main").contains(active);
    if ($("#modal").classList.contains("open") || typing) { state.stale = true; renderNav(); return; }
    render();
    checkInbox();
  });

  // ---------- Démarrage ----------
  Store.init()
    .then(() => { render(); if (!state.me) openPickMe(); else checkInbox(); })
    .catch(err => {
      console.error(err);
      $("#main").innerHTML = `<div class="card empty"><h2>Connexion à la base impossible</h2><p class="muted">${esc(err.message || err)}</p><p>Vérifie les valeurs de <code>js/config.js</code> et que le script <code>supabase/schema.sql</code> a bien été exécuté.</p></div>`;
    });
})();
