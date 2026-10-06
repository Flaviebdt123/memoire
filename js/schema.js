// Définition des données de la plateforme : équipe, collections, valeurs de départ.
// Tout le contenu "métier" est ici ; app.js ne fait que l'afficher.

window.PROBLEMATIQUE =
  "Dans un contexte de scepticisme croissant des consommateurs envers les allégations santé, " +
  "dans quelle mesure les labels et certifications parviennent-ils encore à agir comme des signaux " +
  "crédibles capables de restaurer la confiance envers la marque ?";

window.TEAM = [
  { id: "anaelle", name: "Anaelle Scintract", short: "Anaelle", role: "Assistante marketing opérations · Spengler Medical", color: "#7c5cff" },
  { id: "anna", name: "Anna Scerri", short: "Anna", role: "Category manager enseigne · Panzani", color: "#e0662f" },
  { id: "flavie", name: "Flavie Boudot", short: "Flavie", role: "Cheffe de projet go-to-market · Bioderma (NAOS)", color: "#1f9d8b" },
];

window.PERSON_OPTIONS = [
  { value: "", label: "À attribuer" },
  ...TEAM.map(p => ({ value: p.id, label: p.short })),
  { value: "toutes", label: "Les 3" },
];

window.STATUS = [
  { value: "todo", label: "Pas fait", tone: "neutral" },
  { value: "doing", label: "En cours", tone: "warn" },
  { value: "done", label: "Terminé", tone: "ok" },
];

window.VALIDATION = [
  { value: "attente", label: "En attente", tone: "neutral" },
  { value: "valide", label: "Validé", tone: "ok" },
  { value: "revoir", label: "À revoir", tone: "warn" },
  { value: "refuse", label: "Refusé", tone: "bad" },
];

window.PHASES = [
  { id: "p1", label: "1. Cadrage & pitch", period: "sept. – oct. 2026" },
  { id: "p2", label: "2. Tuteur & problématique", period: "nov. 2026" },
  { id: "p3", label: "3. Revue de littérature intermédiaire", period: "→ 18 janv. 2027" },
  { id: "p4", label: "4. Étude empirique", period: "janv. – avr. 2027" },
  { id: "p5", label: "5. Rédaction & dépôt", period: "→ 24 mai 2027" },
  { id: "p6", label: "6. Soutenance", period: "28 juin – 2 juil. 2027" },
];

window.TRACKS = [
  { value: "commun", label: "Commun" },
  { value: "quanti", label: "Quantitatif" },
  { value: "quali", label: "Qualitatif" },
];

window.DEMARCHES = [
  { value: "", label: "À choisir" },
  { value: "quanti", label: "Quantitative (questionnaire, hypothèses)" },
  { value: "quali", label: "Qualitative (entretiens, propositions)" },
  { value: "mixte", label: "Mixte" },
];

window.MILESTONES = [
  { date: "2026-10-30", label: "Remise du pitch en ligne" },
  { date: "2027-01-18", label: "Revue de littérature intermédiaire (coef. 2)" },
  { date: "2027-05-24", label: "Dépôt du mémoire complet (−2 pts/jour de retard)" },
  { date: "2027-06-28", label: "Début des soutenances (coef. 6)" },
];

// ---------- Collections (listes éditables) ----------
// Types de champ : text, textarea, select, date, number, url, person, bool
window.COLLECTIONS = {
  task: {
    label: "Tâche",
    fields: [
      { key: "titre", label: "Tâche", type: "text", required: true },
      { key: "phase", label: "Étape", type: "select", options: PHASES.map(p => ({ value: p.id, label: p.label })) },
      { key: "statut", label: "Statut", type: "select", options: STATUS, default: "todo" },
      { key: "responsable", label: "Responsable", type: "person" },
      { key: "echeance", label: "Échéance", type: "date" },
      { key: "piste", label: "Concerne", type: "select", options: TRACKS, default: "commun" },
      { key: "details", label: "Détails / consignes", type: "textarea" },
      { key: "lien", label: "Lien (doc, drive…)", type: "url" },
    ],
  },

  article: {
    label: "Article / source",
    fields: [
      { key: "titre", label: "Titre", type: "text", required: true },
      { key: "auteurs", label: "Auteurs", type: "text", hint: "Format du guide : Nom, I.; Nom, I. (séparés par ;)" },
      { key: "annee", label: "Année", type: "number" },
      { key: "type", label: "Type", type: "select", default: "recherche", options: [
        { value: "recherche", label: "Article de recherche" },
        { value: "ouvrage", label: "Ouvrage" },
        { value: "collectif", label: "Chapitre d'ouvrage collectif" },
        { value: "presse", label: "Article de presse / pro" },
        { value: "web", label: "Site web (note de bas de page)" },
      ] },
      { key: "revue", label: "Revue / éditeur", type: "text", hint: "Titre de la revue, ou éditeur pour un ouvrage" },
      { key: "volume", label: "Vol.", type: "text" },
      { key: "numero", label: "N°", type: "text" },
      { key: "pages", label: "Pages", type: "text" },
      { key: "base", label: "Trouvé sur", type: "select", options: ["", "Google Scholar", "EBSCO", "ScienceDirect", "Cairn", "Emerald", "ResearchGate", "Autre"].map(v => ({ value: v, label: v || "—" })) },
      { key: "lien", label: "Lien / DOI", type: "url" },
      { key: "concepts", label: "Concepts traités", type: "text", hint: "ex. scepticisme, labels, théorie du signal, confiance" },
      { key: "apport", label: "Apport pour notre mémoire", type: "textarea", hint: "Résumé, résultats clés, définition utile…" },
      { key: "citation", label: "Citation clé (avec page)", type: "textarea" },
      { key: "lecture", label: "Lecture", type: "select", default: "alire", options: [
        { value: "alire", label: "À lire", tone: "neutral" },
        { value: "encours", label: "En cours", tone: "warn" },
        { value: "lu", label: "Lu", tone: "ok" },
        { value: "fiche", label: "Fiche faite", tone: "ok" },
      ] },
      { key: "responsable", label: "Lu par", type: "person" },
      { key: "validation", label: "Validation prof", type: "select", options: VALIDATION, default: "attente" },
      { key: "commentaireProf", label: "Commentaire de la prof", type: "textarea" },
      { key: "utilise", label: "Cité dans le mémoire", type: "bool" },
    ],
  },

  concept: {
    label: "Concept",
    fields: [
      { key: "nom", label: "Concept", type: "text", required: true },
      { key: "definition", label: "Définition retenue (académique)", type: "textarea" },
      { key: "references", label: "Auteurs / références", type: "textarea", hint: "(Auteur, année) — définitions de la discipline, pas du dictionnaire" },
      { key: "dimensions", label: "Dimensions / contenu théorique", type: "textarea" },
      { key: "statut", label: "Statut", type: "select", options: STATUS, default: "todo" },
      { key: "responsable", label: "Responsable", type: "person" },
      { key: "validation", label: "Validation tuteur", type: "select", options: VALIDATION, default: "attente" },
    ],
  },

  hypothese: {
    label: "Hypothèse / proposition",
    fields: [
      { key: "code", label: "Code", type: "text", required: true, hint: "H1, H2… (modèle) ou P1, P2… (pré-modèle)" },
      { key: "enonce", label: "Énoncé", type: "textarea", required: true },
      { key: "argumentaire", label: "Argumentaire (références)", type: "textarea" },
      { key: "variables", label: "Variables / concepts liés", type: "text" },
      { key: "responsable", label: "Responsable", type: "person" },
      { key: "validation", label: "Validation tuteur", type: "select", options: VALIDATION, default: "attente" },
      { key: "resultat", label: "Résultat", type: "select", default: "", options: [
        { value: "", label: "Pas encore testée", tone: "neutral" },
        { value: "confirmee", label: "Confirmée", tone: "ok" },
        { value: "partielle", label: "Partiellement", tone: "warn" },
        { value: "infirmee", label: "Infirmée", tone: "bad" },
      ] },
    ],
  },

  echelle: {
    label: "Échelle de mesure",
    fields: [
      { key: "variable", label: "Variable", type: "text", required: true },
      { key: "typeVar", label: "Type de variable", type: "select", options: [
        { value: "abstraite", label: "Quantitative abstraite (Likert)" },
        { value: "manifeste", label: "Quantitative manifeste" },
        { value: "nominale", label: "Nominale" },
      ] },
      { key: "definition", label: "Définition", type: "textarea" },
      { key: "items", label: "Items (≥ 3, traduits/adaptés)", type: "textarea", hint: "Jamais inventés : repris d'une échelle publiée" },
      { key: "source", label: "Source de l'échelle", type: "text" },
      { key: "alpha", label: "Alpha de Cronbach (article source)", type: "number", hint: "Doit être > 0,70" },
      { key: "responsable", label: "Responsable", type: "person" },
      { key: "validation", label: "Validation tuteur", type: "select", options: VALIDATION, default: "attente" },
    ],
  },

  entretien: {
    label: "Entretien",
    fields: [
      { key: "code", label: "Code répondant", type: "text", required: true, hint: "R01, R02… — jamais de nom réel (RGPD)" },
      { key: "profil", label: "Profil anonymisé", type: "textarea", hint: "Âge, situation, rapport aux produits santé…" },
      { key: "cible", label: "Cible", type: "select", options: [
        { value: "commune", label: "Commune (consommateur…)" },
        { value: "rare", label: "Rare (expert, pharmacien…)" },
      ] },
      { key: "date", label: "Date", type: "date" },
      { key: "responsable", label: "Mené par", type: "person" },
      { key: "statut", label: "Statut", type: "select", options: [
        { value: "aplanifier", label: "À planifier", tone: "neutral" },
        { value: "planifie", label: "Planifié", tone: "warn" },
        { value: "realise", label: "Réalisé", tone: "ok" },
      ], default: "aplanifier" },
      { key: "consentement", label: "Consentement RGPD enregistré", type: "bool" },
      { key: "mp3", label: "Audio .mp3 sauvegardé", type: "bool" },
      { key: "retranscrit", label: "Retranscrit mot à mot", type: "bool" },
      { key: "code_fait", label: "Codé (grille de codage)", type: "bool" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },

  chapitre: {
    label: "Partie du mémoire",
    fields: [
      { key: "titre", label: "Partie", type: "text", required: true },
      { key: "ordre", label: "Ordre", type: "number" },
      { key: "statut", label: "Statut", type: "select", options: STATUS, default: "todo" },
      { key: "responsable", label: "Rédactrice", type: "person" },
      { key: "pagesMin", label: "Pages minimum", type: "number" },
      { key: "pages", label: "Pages rédigées", type: "number" },
      { key: "echeance", label: "Échéance", type: "date" },
      { key: "consignes", label: "Consignes du guide", type: "textarea" },
      { key: "lien", label: "Lien vers le document", type: "url" },
    ],
  },

  echange: {
    label: "Échange avec le tuteur",
    fields: [
      { key: "date", label: "Date", type: "date", required: true },
      { key: "type", label: "Type", type: "select", options: [
        { value: "rdv", label: "Rendez-vous" },
        { value: "mail", label: "Mail" },
        { value: "rendu", label: "Retour sur un rendu" },
      ] },
      { key: "sujet", label: "Sujet", type: "text", required: true },
      { key: "retours", label: "Retours / remarques du tuteur", type: "textarea" },
      { key: "actions", label: "Actions décidées", type: "textarea" },
      { key: "responsable", label: "Compte rendu par", type: "person" },
    ],
  },
};

// ---------- Pitch (annexe 3) ----------
window.PITCH_FIELDS = [
  { key: "discipline", label: "Dans quelle discipline et sur quel sujet ?", hint: "Marketing, finance, RH… et le sujet visé." },
  { key: "question", label: "Quelle est la question de départ ?", hint: "Éviter une question trop générale, hors champ de compétence ou irréaliste (qui ne pourra pas donner lieu à une étude)." },
  { key: "pourquoi", label: "Pourquoi ? Quels sont les enjeux ?", hint: "Pour quelles raisons cette question a un intérêt, en particulier d'un point de vue pratique ?" },
  { key: "objectifs", label: "Quels sont nos objectifs ?", hint: "Qu'est-ce que nous souhaiterions montrer / expliquer / comprendre ?" },
  { key: "concepts", label: "Quels concepts précis ? Quels mots-clés ?", hint: "" },
  { key: "references", label: "Quelles références avons-nous lues ?", hint: "Sources académiques et professionnelles." },
  { key: "etude", label: "Quel type d'étude et pourquoi ?", hint: "Quantitative par questionnaires et/ou qualitative par entretiens." },
  { key: "cible", label: "Auprès de qui ?", hint: "Consommateurs, salariés, dirigeants, experts, bases de données…" },
  { key: "problematique", label: "Problématique finale (à faire valider par le tuteur)", hint: "Une question principale de recherche, 2 à 3 lignes maximum." },
];

// ---------- Données de départ (créées une seule fois) ----------
(function buildSeed() {
  const seed = [];
  let n = 0;
  const t = (phase, titre, echeance, opts = {}) =>
    seed.push({ id: "seed-t" + String(++n).padStart(2, "0"), kind: "task", phase, titre, echeance, statut: "todo", responsable: "", piste: "commun", ...opts });

  // 1. Cadrage
  t("p1", "Séance 1 + modules online 1.1 et 1.2 (quiz)", "2026-09-30", { responsable: "toutes", details: "Évaluation individuelle notée sur 20 : chacune fait son parcours on-line." });
  t("p1", "Vérifier avec la scolarité que le groupe de 3 est accepté", "2026-10-09", { details: "Le guide prévoit un mémoire en binôme. Faire confirmer le trinôme par écrit (et les attentes ajustées : taille d'échantillon, etc.)." });
  t("p1", "Déclarer la composition du groupe sur Boostcamp", "2026-10-09");
  t("p1", "Séance 2 : formulation de la problématique", "2026-10-09", { responsable: "toutes" });
  t("p1", "Module online 1.3 : recherche documentaire et revue de littérature", "2026-10-23", { responsable: "toutes" });
  t("p1", "Premières lectures : 5 articles de recherche chacune", "2026-10-23", { responsable: "toutes", details: "Les ajouter dans l'onglet Bibliographie avec leur fiche." });
  t("p1", "Rédiger le pitch (annexe 3)", "2026-10-28", { details: "Onglet Pitch : discipline, question de départ, enjeux, objectifs, concepts, références, type d'étude, cible, problématique." });
  t("p1", "Déposer le pitch en ligne", "2026-10-30");

  // 2. Tuteur
  t("p2", "Noter le nom et le contact du tuteur attribué", "2026-11-06", { details: "À renseigner dans l'onglet Tuteur." });
  t("p2", "Envoyer sujet + pitch finalisé au tuteur", "2026-11-13", { details: "Au plus tard la semaine suivant l'attribution. Toujours mettre les 3 membres en copie des mails." });
  t("p2", "Séances 3 & 4 : bases de données, cadre conceptuel, (pré-)modèle", "2026-11-06", { responsable: "toutes" });
  t("p2", "Module online 2 : méthodes qualitatives + quiz", "2026-11-20", { responsable: "toutes" });
  t("p2", "Faire valider la problématique par le tuteur", "2026-11-27");
  t("p2", "Séances 5 & 6 : collecte qualitative, guide d'entretien, codage", "2026-12-04", { responsable: "toutes" });

  // 3. Revue de littérature intermédiaire
  t("p3", "Atteindre 15 articles de recherche validés", "2026-12-11", { details: "Bases EBSCO, ScienceDirect, Emerald, Cairn, ResearchGate, Google Scholar. Majorité récents (N-1 à N-3)." });
  t("p3", "Définir les concepts (définitions académiques confrontées)", "2026-12-11", { details: "Onglet Concepts. Pas de dictionnaire ni Wikipédia : définitions issues de la recherche en marketing." });
  t("p3", "Préciser le contenu théorique de chaque concept (dimensions)", "2026-12-18");
  t("p3", "Construire les argumentaires → hypothèses (H) ou propositions (P)", "2026-12-23");
  t("p3", "Choisir la démarche : quantitative (modèle) ou qualitative (pré-modèle)", "2026-12-23", { details: "À renseigner dans l'onglet Terrain. Le choix découle de la fin de la revue de littérature." });
  t("p3", "Rédiger la présentation du sujet et la justification de la problématique", "2027-01-06", { details: "Enjeu principal, problématique (+ sous-questions éventuelles), objectifs de recherche. Pas d'introduction pour ce rendu." });
  t("p3", "Rédiger la revue de littérature (≥ 8 pages)", "2027-01-11", { details: "Times New Roman 12, interligne 1,5. Citations (Auteur, année) ; au-delà de 2 auteurs : « et al. »." });
  t("p3", "Relecture croisée + bibliographie aux normes du guide", "2027-01-15", { responsable: "toutes" });
  t("p3", "Déposer la revue de littérature intermédiaire sur Boostcamp", "2027-01-18", { details: "Un seul rendu par équipe. Noté sur 20, coefficient 2." });

  // 4. Étude empirique
  t("p4", "Séances 7 & 8 + module online 3 (SPSS / Jamovi) + quiz", "2027-02-12", { responsable: "toutes" });
  t("p4", "Intégrer les retours du tuteur sur la revue de littérature", "2027-02-05");
  // Quantitatif
  t("p4", "Lister et définir les variables issues des hypothèses", "2027-02-05", { piste: "quanti" });
  t("p4", "Trouver des échelles de mesure validées (α > 0,70, ≥ 3 items)", "2027-02-12", { piste: "quanti", details: "Ne JAMAIS inventer les items. Onglet Terrain → Échelles." });
  t("p4", "Construire le questionnaire (intro neutre, thèmes, socio-démo en fin)", "2027-02-19", { piste: "quanti", details: "Ne pas révéler la problématique ni le nom des variables. Likert 1 = pas du tout d'accord → 5 = tout à fait d'accord." });
  t("p4", "Ajouter le texte RGPD + case de consentement (annexe 7)", "2027-02-19", { piste: "quanti" });
  t("p4", "Fixer la taille d'échantillon minimum", "2027-02-19", { piste: "quanti", details: "Règle 1 : 10 × nb de questions (hors socio-démo). Règle 2 : 240 pour un binôme — faire préciser pour un groupe de 3." });
  t("p4", "Diffuser le questionnaire et collecter les réponses", "2027-03-19", { piste: "quanti", responsable: "toutes" });
  t("p4", "Analyses : normalité, alpha de Cronbach, AF, validité, régressions", "2027-04-02", { piste: "quanti", details: "Présenter Beta, sig, R². Matrice de corrélation en annexe." });
  t("p4", "Exporter la base de données (.xlsx ou .sav, intitulé des items)", "2027-04-09", { piste: "quanti" });
  // Qualitatif
  t("p4", "Traduire chaque proposition en questions ouvertes", "2027-02-05", { piste: "quali" });
  t("p4", "Rédiger le guide d'entretien semi-directif", "2027-02-12", { piste: "quali", details: "Ouverture, centrage, approfondissement (relances), conclusion. Questions neutres, non directives." });
  t("p4", "Préparer le protocole RGPD oral (annexe 6)", "2027-02-12", { piste: "quali" });
  t("p4", "Recruter les répondants (≥ 16 cibles communes, à valider pour 3)", "2027-02-19", { piste: "quali", responsable: "toutes" });
  t("p4", "Mener les entretiens (~45 min, enregistrés)", "2027-03-19", { piste: "quali", responsable: "toutes", details: "Suivi dans l'onglet Terrain → Entretiens. Jusqu'à saturation sémantique et théorique." });
  t("p4", "Retranscrire mot à mot", "2027-03-26", { piste: "quali", responsable: "toutes" });
  t("p4", "Grille de codage + analyse de contenu + verbatims", "2027-04-09", { piste: "quali" });
  t("p4", "Discussion des résultats (chaque H/P confrontée à la littérature)", "2027-04-16");

  // 5. Rédaction
  t("p5", "Séance 9 : recommandations managériales", "2027-02-26", { responsable: "toutes" });
  t("p5", "Rédiger les préconisations (chacune liée à un résultat)", "2027-04-30");
  t("p5", "Finaliser toutes les parties (onglet Rédaction)", "2027-05-10");
  t("p5", "Résumé FR + EN (100 à 150 mots chacun)", "2027-05-14");
  t("p5", "Couverture, remerciements, sommaire paginé, annexes numérotées", "2027-05-17");
  t("p5", "Mentionner de façon transparente l'usage de l'IA", "2027-05-17", { details: "Exigence du guide : sources vérifiées, académiques et récentes." });
  t("p5", "Relecture finale : forme, orthographe, traçabilité des sources", "2027-05-20", { responsable: "toutes" });
  t("p5", "Signer chacune la déclaration anti-plagiat (annexe 2)", "2027-05-20", { responsable: "toutes" });
  t("p5", "Déposer sur Boostcamp : mémoire .doc + déclarations + données / mp3", "2027-05-24", { details: "Fichier Word « Mémoire.Nom.Prénom.doc ». 2 points retirés par jour de retard." });
  t("p5", "Imprimer le mémoire (recto verso, relié, protection transparente)", "2027-05-28");

  // 6. Soutenance
  t("p6", "Préparer le support de présentation", "2027-06-14");
  t("p6", "Préparer les questions du jury (6 pts sur 20)", "2027-06-21", { responsable: "toutes" });
  t("p6", "Répétitions chronométrées", "2027-06-25", { responsable: "toutes" });
  t("p6", "Soutenance orale", "2027-06-28", { responsable: "toutes" });

  // Parties du mémoire (structure obligatoire, 1.3 du guide)
  const c = (ordre, titre, pagesMin, consignes, echeance) =>
    seed.push({ id: "seed-c" + String(ordre).padStart(2, "0"), kind: "chapitre", ordre, titre, pagesMin, consignes, echeance, statut: "todo", responsable: "" });
  c(1, "Page de couverture", null, "Modèle annexe 1 : titre, noms par ordre alphabétique, tuteur, année 2026-2027.", "2027-05-17");
  c(2, "Remerciements", null, "", "2027-05-17");
  c(3, "Sommaire", null, "Toutes les rubriques, pagination exacte et détaillée.", "2027-05-20");
  c(4, "Introduction", 2, "Accroche (actualité, chiffres récents), problématique (2-3 lignes), méthodologie annoncée et justifiée, annonce du plan.", "2027-05-03");
  c(5, "Revue de littérature", 10, "Titre explicite et sous-titres. Définitions académiques confrontées, débouche sur hypothèses (modèle) ou propositions (pré-modèle).", "2027-03-31");
  c(6, "Étude empirique", 12, "Type d'étude et justification, instruments de collecte, échantillon, analyses, discussion des résultats.", "2027-04-23");
  c(7, "Préconisations managériales", 5, "Apport pour les entreprises ; chaque recommandation liée à un résultat précis.", "2027-04-30");
  c(8, "Conclusion", 2, "Rappel problématique et résultats, apports théoriques et managériaux, limites, voies de recherche.", "2027-05-07");
  c(9, "Bibliographie", null, "Ordre alphabétique, ≥ 18 articles de recherche. Pas de webographie (sites web en note de bas de page).", "2027-05-14");
  c(10, "Annexes", null, "Numérotées et titrées : grille de codage, profils anonymisés, matrice de corrélation…", "2027-05-14");
  c(11, "Résumé FR / EN", null, "100 à 150 mots chacun, en quatrième de couverture.", "2027-05-14");

  // Concepts de la problématique (à définir à partir de la littérature)
  const k = (i, nom, dimensions) =>
    seed.push({ id: "seed-k" + i, kind: "concept", nom, dimensions, definition: "", references: "", statut: "todo", responsable: "", validation: "attente" });
  k(1, "Scepticisme du consommateur", "Piste classique à vérifier : Obermiller & Spangenberg (1998), échelle du scepticisme envers la publicité.");
  k(2, "Allégations santé", "Cadre réglementaire (règlement CE 1924/2006) et perception par le consommateur.");
  k(3, "Labels et certifications", "Types : publics / privés, tierce partie / auto-déclarés…");
  k(4, "Théorie du signal", "Piste classique à vérifier : Spence (1973) ; Kirmani & Rao (2000) ; Erdem & Swait (1998).");
  k(5, "Crédibilité perçue du signal", "Expertise, fiabilité, indépendance de l'émetteur…");
  k(6, "Confiance envers la marque", "Piste à vérifier : échelle de Delgado-Ballester et al. (2003).");

  seed.push({ id: "pitch-problematique", kind: "pitch", value: PROBLEMATIQUE });
  seed.push({ id: "pitch-discipline", kind: "pitch", value: "Marketing — comportement du consommateur." });

  window.SEED = seed;
})();
