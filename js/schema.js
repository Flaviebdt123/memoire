// Définition des données de la plateforme : équipe, collections, valeurs de départ.
// Tout le contenu "métier" est ici ; app.js ne fait que l'afficher.

window.PROBLEMATIQUE =
  "Dans un contexte de scepticisme croissant des consommateurs envers les allégations santé, " +
  "dans quelle mesure les labels et certifications parviennent-ils encore à agir comme des signaux " +
  "crédibles capables de restaurer la confiance envers la marque ?";

window.TEAM = [
  { id: "anaelle", name: "Anaelle Scintract", short: "Anaelle", role: "Assistante marketing opérations · Spengler Medical", color: "#8b7f9f" },
  { id: "anna", name: "Anna Scerri", short: "Anna", role: "Category manager enseigne · Panzani", color: "#b9825a" },
  { id: "flavie", name: "Flavie Boudot", short: "Flavie", role: "Cheffe de projet go-to-market · Bioderma (NAOS)", color: "#7c9584" },
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

// Axes de la revue de littérature (regroupement de l'onglet Bibliographie)
window.THEMES = [
  { value: "fondateurs", label: "Cadre théorique : articles fondateurs" },
  { value: "scepticisme", label: "Scepticisme envers les allégations santé" },
  { value: "certification", label: "Certification par un tiers comme signal crédible" },
  { value: "limites", label: "Limites des labels : prolifération, confusion, greenwashing" },
  { value: "marque", label: "Label × marque et cas du Nutri-Score" },
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
      { key: "theme", label: "Axe de la revue de littérature", type: "select", options: [{ value: "", label: "Non classé" }, ...THEMES] },
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

// ---------- Construire la problématique (méthode vue en cours, 5 étapes) ----------
window.PROBLEMATIQUE_STEPS = [
  { key: "pb1", label: "1. Décrire précisément le problème posé", hint: "Apporter une première définition succincte ; décrire les conséquences dans les entreprises." },
  { key: "pb2", label: "2. Circonscrire son ampleur", hint: "Chiffres clés récents et sourcés : quelle ampleur au plan national ou international ? En quoi les solutions apportées jusqu'à maintenant sont-elles insatisfaisantes ?" },
  { key: "pb3", label: "3. Clarifier le point de vue adopté", hint: "Du point de vue du client ? Du manager ? Et préciser la discipline des sciences de gestion : stratégie, RH, marketing…" },
  { key: "pb4", label: "4. Identifier les 2 éléments mis en relation", hint: "Ex. : labels et certifications ↔ confiance envers la marque (et le rôle du scepticisme)." },
  { key: "pb5", label: "5. Formuler votre question", hint: "Une question principale de recherche, 2 à 3 lignes maximum." },
];

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

  window.SEED_BATCHES = [{ flag: "meta-seed-v1", items: seed }];
})();

// ---------- Premières sources (ajoutées une seule fois, réparties par axe et par lectrice) ----------
(function buildBiblioSeed() {
  const items = [];
  const a = (responsable, theme, f) =>
    items.push({ id: "seed-a" + String(items.length + 1).padStart(2, "0"), kind: "article", type: "recherche", lecture: "alire", validation: "attente", responsable, theme, ...f });

  // Anaelle : théorie du signal + certification par un tiers
  a("anaelle", "fondateurs", { auteurs: "Erdem, T.; Swait, J.", annee: 1998, titre: "Brand equity as a signaling phenomenon", revue: "Journal of Consumer Psychology", volume: "7", numero: "2", pages: "131-157", base: "ScienceDirect", lien: "https://doi.org/10.1207/s15327663jcp0702_02", concepts: "théorie du signal, crédibilité de marque, capital-marque", apport: "Définit la crédibilité de marque (expertise + fiabilité) comme signal en situation d'asymétrie d'information. Pont entre signal et marque. DOI à vérifier." });
  a("anaelle", "fondateurs", { auteurs: "Kirmani, A.; Rao, A. R.", annee: 2000, titre: "No pain, no gain: A critical review of the literature on signaling unobservable product quality", revue: "Journal of Marketing", volume: "64", numero: "2", pages: "66-79", base: "Google Scholar", lien: "https://doi.org/10.1509/jmkg.64.2.66.18000", concepts: "théorie du signal, qualité inobservable", apport: "Synthèse : un signal n'est crédible que s'il coûte plus cher à émettre pour une entreprise qui tricherait. DOI à vérifier." });
  a("anaelle", "certification", { auteurs: "Gorton, M.; Tocco, B.; Yeh, C.-H.; Hartmann, M.", annee: 2021, titre: "What determines consumers' use of eco-labels? Taking a close look at label trust", revue: "Ecological Economics", volume: "189", pages: "Article 107173", base: "ScienceDirect", lien: "https://doi.org/10.1016/j.ecolecon.2021.107173", concepts: "confiance dans le label, certification tierce partie", apport: "Savoir qu'un label est certifié par un tiers augmente la confiance dans ce label et son usage. Inclut un label français." });
  a("anaelle", "certification", { auteurs: "Marschlich, S.; Hurtado, E.", annee: 2025, titre: "The effect of third-party certifications on corporate social responsibility communication authenticity and credibility", revue: "Corporate Communications: An International Journal", volume: "30", numero: "7", pages: "1-20", base: "Emerald", lien: "https://doi.org/10.1108/CCIJ-01-2024-0015", concepts: "théorie du signal, certification, scepticisme, crédibilité, authenticité", apport: "Expérimentation (n = 184) : la certification B Corp réduit le scepticisme et augmente la crédibilité perçue ; le scepticisme est médiateur partiel." });
  a("anaelle", "certification", { auteurs: "Hartmann, J.", annee: 2026, titre: "Winning consumer trust through supply chain responsibility communication: How certification, disclosure, and beneficiary framing shape credibility", revue: "Corporate Social Responsibility and Environmental Management", pages: "Advance online publication", base: "Autre", lien: "https://doi.org/10.1002/csr.71011", concepts: "certification tierce partie, auto-certification, crédibilité", apport: "Une certification par un tiers est nettement plus crédible qu'une auto-certification. Paru en septembre 2026 : compléter volume et pages plus tard." });
  a("anaelle", "certification", { auteurs: "Sigurdsson, V.; Larsen, N. M.; Folwarczny, M.; Fagerstrøm, A.; Menon, R. G. V.; Sigurdardottir, F. T.", annee: 2023, titre: "The importance of relative customer-based label equity when signaling sustainability and health with certifications and tags", revue: "Journal of Business Research", volume: "154", pages: "Article 113338", base: "ScienceDirect", lien: "https://doi.org/10.1016/j.jbusres.2022.113338", concepts: "capital du label, signal santé, consentement à payer", apport: "L'efficacité d'un label comme signal santé dépend de son capital propre : notoriété, compréhension, confiance." });
  a("anaelle", "certification", { auteurs: "Sigurdsson, V.; Larsen, N. M.; Folwarczny, M.; Sigurdardottir, F. T.; Menon, R. G. V.; Fagerstrøm, A.", annee: 2024, titre: "Big business returns on B Corp? Growing with green & lean as any label is a good label", revue: "Journal of Business Research", volume: "170", pages: "Article 114350", base: "ScienceDirect", lien: "https://doi.org/10.1016/j.jbusres.2023.114350", concepts: "B Corp, certification, performance de la marque", apport: "Effet de la certification B Corp sur les grandes entreprises." });
  a("anaelle", "certification", { auteurs: "Mosier, S. L.", annee: 2023, titre: "An evaluation of the role of US consumer's institutional trust for food eco-label preferences", revue: "World Food Policy", volume: "9", numero: "1", pages: "50-71", base: "Autre", lien: "https://doi.org/10.1002/wfp2.12054", concepts: "confiance institutionnelle, émetteur du label", apport: "La confiance dans un label dépend de la confiance dans l'organisme qui le délivre (ONG, État, entreprise)." });

  // Anna : label × marque, Nutri-Score, limites des labels
  a("anna", "marque", { auteurs: "Larceneux, F.; Benoit-Moreau, F.; Renaudin, V.", annee: 2012, titre: "Why might organic labels fail to influence consumer choices? Marginal labelling and brand equity effects", revue: "Journal of Consumer Policy", volume: "35", numero: "1", pages: "85-104", base: "Google Scholar", lien: "https://doi.org/10.1007/s10603-011-9186-1", concepts: "label bio, capital-marque, qualité perçue", apport: "Article clé : le label est moins efficace pour une marque forte et plus efficace pour une marque faible." });
  a("anna", "marque", { auteurs: "Coderre, F.; Sirieix, L.; Valette-Florence, P.", annee: 2022, titre: "The facets of consumer-based food label equity: Measurement, structure and managerial relevance", revue: "Journal of Retailing and Consumer Services", volume: "65", pages: "Article 102838", base: "ScienceDirect", lien: "https://doi.org/10.1016/j.jretconser.2021.102838", concepts: "capital du label, crédibilité, honnêteté, confiance", apport: "Échelle de mesure du capital d'un label (crédibilité, honnêteté, confiance…), utilisable pour le questionnaire." });
  a("anna", "marque", { auteurs: "Cerf, M.; Serry, A.-J.; Marty, L.; Nicklaus, S.; Ducrot, P.", annee: 2024, titre: "Evidence on consumers' perceptions, understanding and uses of the Nutri-Score to improve communication about its update: A qualitative study with shopping observations in France", revue: "BMC Public Health", volume: "24", numero: "1", pages: "Article 3037", base: "Autre", lien: "https://doi.org/10.1186/s12889-024-20092-w", concepts: "Nutri-Score, méfiance, compréhension du label", apport: "Étude qualitative en France : ne pas savoir qui délivre le Nutri-Score ni comment il est calculé crée de la méfiance." });
  a("anna", "marque", { auteurs: "Ikonen, I.; Sotgiu, F.; Aydinli, A.; Verlegh, P. W. J.", annee: 2020, titre: "Consumer effects of front-of-package nutrition labeling: An interdisciplinary meta-analysis", revue: "Journal of the Academy of Marketing Science", volume: "48", numero: "3", pages: "360-383", base: "Google Scholar", lien: "https://doi.org/10.1007/s11747-019-00663-9", concepts: "étiquetage nutritionnel, effet de halo", apport: "Méta-analyse des effets de l'étiquetage nutritionnel en face avant (dont effet de halo)." });
  a("anna", "limites", { auteurs: "Boe-Lillegraven, S. N.; Demmers, J.", annee: 2025, titre: "Leveling up on labels? Consumer preferences for firm-level eco-labels as substitutes for or complements to product-level eco-labels", revue: "Corporate Social Responsibility and Environmental Management", volume: "32", numero: "2", pages: "1920-1944", base: "Autre", lien: "https://doi.org/10.1002/csr.3051", concepts: "label entreprise, label produit, cumul des labels", apport: "Compare un label sur l'entreprise entière et un label sur un seul produit." });
  a("anna", "limites", { auteurs: "Tiboni-Oschilewski, O.; Abarca, M.; Santa Rosa Pierre, F.; Rosi, A.; Biasini, B.; Menozzi, D.; Scazzina, F.", annee: 2024, titre: "Strengths and weaknesses of food eco-labeling: A review", revue: "Frontiers in Nutrition", volume: "11", pages: "Article 1381135", base: "Google Scholar", lien: "https://doi.org/10.3389/fnut.2024.1381135", concepts: "écolabels alimentaires, efficacité des labels", apport: "Revue : forces et faiblesses des labels alimentaires ; résultats hétérogènes sur leur efficacité." });
  a("anna", "limites", { auteurs: "Dufeu, I.; Ferrandi, J.-M.; Gabriel, P.; Le Gall-Ely, M.", annee: 2014, titre: "Multi-labellisation socio-environnementale et consentement à payer du consommateur", revue: "Recherche et Applications en Marketing", volume: "29", numero: "3", base: "Cairn", lien: "https://doi.org/10.1177/0767370114527667", concepts: "multi-labellisation, consentement à payer", apport: "Référence française : effet du cumul de plusieurs labels sur un même produit. Pages à compléter." });

  // Flavie : scepticisme, allégations santé, greenwashing
  a("flavie", "fondateurs", { auteurs: "Obermiller, C.; Spangenberg, E. R.", annee: 1998, titre: "Development of a scale to measure consumer skepticism toward advertising", revue: "Journal of Consumer Psychology", volume: "7", numero: "2", pages: "159-186", base: "ScienceDirect", lien: "https://doi.org/10.1207/s15327663jcp0702_03", concepts: "scepticisme, échelle de mesure", apport: "Échelle de référence du scepticisme (SKEP), utilisable pour l'étude quantitative. DOI à vérifier." });
  a("flavie", "fondateurs", { auteurs: "Delgado-Ballester, E.; Munuera-Alemán, J. L.; Yagüe-Guillén, M. J.", annee: 2003, titre: "Development and validation of a brand trust scale", revue: "International Journal of Market Research", volume: "45", numero: "1", pages: "35-54", base: "Google Scholar", lien: "https://doi.org/10.1177/147078530304500103", concepts: "confiance envers la marque, échelle de mesure", apport: "Échelle de confiance envers la marque (fiabilité + intentions). DOI à vérifier." });
  a("flavie", "scepticisme", { auteurs: "Chaudhary, V.; Sharma, D.; Nagpal, A.; Kalro, A. D.", annee: 2024, titre: "The role of health-related claims and situational skepticism on consumers' food choices", revue: "European Journal of Marketing", volume: "58", numero: "6", pages: "1600-?", base: "Emerald", lien: "https://doi.org/10.1108/EJM-08-2022-0621", concepts: "allégations santé, scepticisme situationnel, intention d'achat", apport: "Article central : scepticisme maximal pour les allégations santé, puis nutritionnelles, puis ingrédients ; il réduit l'intention d'achat. Page de fin à compléter." });
  a("flavie", "scepticisme", { auteurs: "Mitra, A.; Hastak, M.; Ringold, D. J.; Levy, A. S.", annee: 2019, titre: "Consumer skepticism of claims in food ads vs. on food labels: An exploration of differences and antecedents", revue: "Journal of Consumer Affairs", volume: "53", numero: "4", pages: "1443-1455", base: "Google Scholar", lien: "https://doi.org/10.1111/joca.12237", concepts: "scepticisme, allégations santé, étiquette vs publicité", apport: "On croit plus l'étiquette que la publicité, mais on reste sceptique face aux allégations santé." });
  a("flavie", "scepticisme", { auteurs: "Fuller, K.; Reedy Sharib, J.; Fan, B.; Pomeranz, J. L.; Mozaffarian, D.; Cash, S. B.", annee: 2026, titre: "U.S. consumer preferences for FDA healthy vs. generic healthy food labels: The influence of trust", revue: "Food Quality and Preference", volume: "144", pages: "Article 105898", base: "ScienceDirect", lien: "https://doi.org/10.1016/j.foodqual.2026.105898", concepts: "label officiel, confiance, consentement à payer", apport: "Un label « healthy » officiel (FDA) inspire plus confiance qu'une mention générique et justifie un prix plus élevé." });
  a("flavie", "scepticisme", { auteurs: "Do, T. T. T.; Le, M. T. H.", annee: 2025, titre: "Unveiling the halo effect: Exploring the influence of organic labels on consumer behavior in the organic cosmetics market", revue: "Current Psychology", volume: "44", pages: "9803-9824", base: "Google Scholar", lien: "https://doi.org/10.1007/s12144-025-07747-6", concepts: "effet de halo, label bio, cosmétique", apport: "Le label bio crée un effet de halo sur tout le produit. Utile pour élargir à la cosmétique." });
  a("flavie", "limites", { auteurs: "Matthes, J.; Neureiter, A.; Seiffert-Brockmann, J.", annee: 2026, titre: "Coping with greenwashed ads: Greenwashing perceptions, eco-label confusion, and the willingness to pay more", revue: "Journal of International Consumer Marketing", volume: "38", numero: "2", base: "Autre", lien: "https://doi.org/10.1080/08961530.2025.2530395", concepts: "greenwashing, confusion des labels", apport: "Le greenwashing perçu augmente la confusion entre labels. Vérifier l'ordre des auteurs et les pages." });
  a("flavie", "limites", { auteurs: "Persakis, A.; Nikolopoulos, T.; Negkakis, I. C.; Pavlopoulos, A.", annee: 2025, titre: "Greenwashing in marketing: A systematic literature review and bibliometric analysis", revue: "International Review on Public and Nonprofit Marketing", volume: "22", numero: "4", pages: "957-992", base: "Google Scholar", lien: "https://doi.org/10.1007/s12208-025-00452-x", concepts: "greenwashing, confiance, revue systématique", apport: "Synthèse de 419 articles sur les effets du greenwashing sur la confiance et l'image de marque." });

  window.SEED_BATCHES.push({ flag: "meta-seed-biblio-v1", items });
})();

// ---------- Tâches ajoutées depuis les fiches du cours Boostcamp (ajoutées une seule fois) ----------
(function buildGuideSeed() {
  const items = [];
  const t = (phase, titre, echeance, opts = {}) =>
    items.push({ id: "seed-g" + String(items.length + 1).padStart(2, "0"), kind: "task", phase, titre, echeance, statut: "todo", responsable: "", piste: "commun", ...opts });

  t("p1", "Installer Zotero et créer une bibliothèque de groupe partagée", "2026-10-16", { responsable: "toutes", details: "Tutoriels dans l'onglet Guide → Ressources." });
  t("p3", "Tableau de synthèse de la revue de littérature", "2026-12-18", { details: "Colonnes : auteurs (APA), théorie, méthode, principaux résultats, limites. Sert à repérer les « gaps » qui justifient notre recherche." });
  t("p3", "Dessiner le modèle conceptuel (ou le pré-modèle)", "2027-01-08", { details: "Une flèche = une hypothèse numérotée avec son signe ; VI à gauche, VD à droite. Voir Guide → Revue de littérature." });
  t("p4", "Choisir le plan : 3 parties ou 4 chapitres", "2027-02-05", { details: "Selon l'équilibre des parties (Guide → Forme & plan). Titres numérotés sur 3 niveaux maximum." });
  t("p4", "Choisir le logiciel d'analyse", "2027-02-12", { details: "Quanti : Jamovi (gratuit) ou SPSS. Quali : IRaMuTeQ (gratuit), NVivo, MAXQDA…" });
  t("p4", "Lire le chapitre Jolibert & Jourdan (2006), lecture obligatoire", "2027-02-05", { piste: "quanti", responsable: "toutes" });
  t("p4", "Préparer l'attestation de confidentialité pour les entretiens en entreprise", "2027-02-12", { piste: "quali" });
  t("p4", "Rédiger le dictionnaire thématique (thèmes, sous-thèmes, définitions, verbatims)", "2027-04-02", { piste: "quali" });
  t("p5", "Rédiger contributions théoriques et managériales, limites et voies de recherche", "2027-04-30", { details: "Environ 6 à 8 pages selon la structure type. Contributions théoriques d'abord, limites expliquées avec leur effet sur les résultats." });

  window.SEED_BATCHES.push({ flag: "meta-seed-guide-v1", items });
})();
