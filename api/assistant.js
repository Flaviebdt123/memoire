// Assistant de bibliographie (fonction serveur Vercel).
// Reçoit une question et les articles de la biblio, demande à Claude lesquels répondent le mieux.
// La clé reste côté serveur : variable d'environnement ANTHROPIC_API_KEY à créer dans Vercel.

import Anthropic from "@anthropic-ai/sdk";

const MAX_QUESTION = 600;
const MAX_ARTICLES = 250;
const FIELDS = ["id", "titre", "auteurs", "annee", "type", "revue", "concepts", "apport", "citation", "lecture", "validation"];

const SYSTEM = `Tu es l'assistant de trois étudiantes qui écrivent un mémoire de recherche (INSEEC) sur cette problématique : « Dans un contexte de scepticisme croissant des consommateurs envers les allégations santé, dans quelle mesure les labels et certifications parviennent-ils encore à agir comme des signaux crédibles capables de restaurer la confiance envers la marque ? »

On te donne leur bibliographie (liste JSON d'articles déjà enregistrés), les fiches de leur guide du mémoire (consignes officielles du cours, ids commençant par "guide-") et une question. Trouve les articles et/ou les fiches qui aident vraiment à répondre, du plus utile au moins utile (8 au maximum). Pour une question de méthode ou de consigne, appuie-toi sur les fiches du guide et résume la réponse dans "answer". Ne cite jamais un élément absent des listes et n'invente rien sur leur contenu : appuie-toi uniquement sur les champs fournis.

Réponds uniquement avec un objet JSON, sans texte autour :
{"answer": "1 à 3 phrases en français, tutoiement", "results": [{"id": "id exact de l'article", "reason": "une phrase sur ce que l'article apporte à la question"}]}

Si rien ne convient, laisse "results" vide et propose dans "answer" des mots-clés (français et anglais) à chercher sur Google Scholar ou Cairn.`;

const client = new Anthropic(); // lit ANTHROPIC_API_KEY

function clean(a) {
  const out = {};
  for (const k of FIELDS) {
    if (a[k] === undefined || a[k] === null || a[k] === "") continue;
    out[k] = String(a[k]).slice(0, k === "apport" || k === "citation" ? 1500 : 300);
  }
  return out;
}

function parseJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("Réponse illisible");
  return JSON.parse(text.slice(start, end + 1));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST uniquement" });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: "not_configured" });

  const question = String(req.body?.question || "").trim().slice(0, MAX_QUESTION);
  const articles = Array.isArray(req.body?.articles) ? req.body.articles.slice(0, MAX_ARTICLES).map(clean) : [];
  const guide = Array.isArray(req.body?.guide)
    ? req.body.guide.slice(0, 80).map(g => ({ id: String(g.id || ""), titre: String(g.titre || "").slice(0, 200), texte: String(g.texte || "").slice(0, 2500) }))
    : [];
  if (!question) return res.status(400).json({ error: "Question vide" });
  if (!articles.length && !guide.length) return res.status(200).json({ answer: "La bibliographie est vide pour l'instant : ajoutez des articles et je pourrai les retrouver.", results: [] });

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 4000,
      output_config: { effort: "low" },
      // Si la demande est refusée par un filtre de sécurité, l'API la relance sur un autre modèle.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: [{
        role: "user",
        content: `Bibliographie :\n${JSON.stringify(articles)}\n\nFiches du guide du mémoire :\n${JSON.stringify(guide)}\n\nQuestion : ${question}`,
      }],
    });

    if (response.stop_reason === "refusal") {
      return res.status(200).json({ answer: "Je ne peux pas répondre à cette question.", results: [] });
    }
    const text = response.content.filter(b => b.type === "text").map(b => b.text).join("");
    const data = parseJson(text);
    const known = new Set([...articles.map(a => a.id), ...guide.map(g => g.id)]);
    const results = (Array.isArray(data.results) ? data.results : [])
      .filter(r => r && known.has(r.id))
      .map(r => ({ id: r.id, reason: String(r.reason || "") }));
    return res.status(200).json({ answer: String(data.answer || ""), results });
  } catch (err) {
    console.error(err);
    const status = err instanceof Anthropic.APIError && err.status ? 502 : 500;
    return res.status(status).json({ error: err.message || "Erreur" });
  }
}
