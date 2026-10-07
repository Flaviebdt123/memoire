// Compléments à l'onglet Guide, tirés des documents du cours rangés dans le dossier Memoire
// (séance 2 sur la revue de littérature, problématisation, définir ses concepts, plagiat,
// écriture scientifique, syllabus). Seul ce qui n'est pas déjà dans guide.js est ajouté.
// Les documents ne sont pas sur Boostcamp en lien direct : la source indique le nom du fichier.

(function () {
  const doc = name => [[name, ""]];

  const SECTIONS = [
    { id: "docs-syllabus", cat: "calendrier", titre: "Cours de méthodologie (syllabus)", source: doc("Syllabus-2.pdf"), points: [
      "9 séances de 2 h, présence obligatoire. La note du cours de méthodologie vient à 100 % des quiz en ligne sur Boostcamp.",
      "Ouvrages de référence : Gavard-Perret et al. (2018) ; Delacroix et al. (2021) ; Dumez (2025) ; Saunders et al. (2023).",
      "Outil conseillé pour repérer articles clés et échelles validées : Elicit.",
      "IA : jamais à la place de la lecture des textes originaux. Toute référence proposée par une IA est vérifiée sur les bases officielles avant d'être utilisée. Aucune échelle créée de toutes pièces.",
    ] },
    { id: "docs-problematisation", cat: "redaction", titre: "Problématiser : la démarche", source: doc("Slides de cours La problématisation.pptx"), points: [
      "Une problématique réelle, précise (deux éléments en tension) et en question : « Dans quelle mesure A influence-t-il B ? ». Le cours déconseille « Comment… ? », qui pousse à décrire.",
      "Revue documentaire d'abord (presse : Factiva, Delphes ; études : Xerfi), puis une note de synthèse d'1 à 2 pages sur l'ampleur du problème pour les entreprises.",
      "Accroche = un chiffre précis + sa source.",
      "Mots-clés scientifiques en français et en anglais sur Google Scholar ; repérer les auteurs les plus cités.",
      "Fiche de lecture des articles clés : référence, résumé, question, théories, méthode, résultats, ce qu'on en retient.",
      "Hiérarchie des sources : revues classées (FNEGE, CNRS) > autres revues scientifiques > colloques > archives ouvertes (HAL) > presse.",
    ] },
    { id: "docs-ecriture", cat: "redaction", titre: "Écriture scientifique", source: doc("l'écriture scientifique.docx"), points: [
      "« Nous » à la place de « on » (et de « je », sauf remerciements). Phrases courtes. Aucune faute : se relire plusieurs fois et se faire relire.",
      "Pas d'arguments d'autorité ni de « il est évident que » : tout se justifie (ex. compter les articles de presse sur Factiva pour montrer qu'un sujet monte).",
      "Prudence : « à notre connaissance » plutôt que « jamais étudié ».",
      "Notes de bas de page pour les détails, transitions entre parties, sigles développés à la première occurrence, (…) pour une citation tronquée.",
    ] },
    { id: "docs-plagiat", cat: "redaction", titre: "Citer une définition, une idée, une recherche", source: doc("Comment citer ses sources pour éviter le plagiat.pptx"), points: [
      "Définition : reprise à l'identique, en italique et entre guillemets, suivie de (Auteur, année).",
      "Idée : auteurs entre parenthèses en fin de phrase. Recherche reformulée : « Selon Chesbrough (2010), … ».",
      "Reste du plagiat : une définition sans guillemets, un copier-coller, ou un paragraphe entier repris même s'il est cité.",
    ] },
    { id: "docs-rl-seance2", cat: "rl", titre: "Plan type de la RL et gap (séance 2)", source: doc("Diaporama sur la Revue de littérature.pptx"), points: [
      "Pour « En quoi A influence-t-il B ? » : ce qu'on sait de A, ce qu'on sait de B, ce qu'on sait des liens entre A et B, puis les hypothèses ou propositions.",
      "Rédaction : définir, « faire un cours » au lecteur, puis montrer avantages et surtout limites avec les auteurs récents.",
      "Au moins 15 références lues en profondeur. Auteurs fondateurs : 5 à 6 maximum par élément de la problématique ; auteurs récents sans limite. Trier sur le résumé.",
      "Gap formulé avec prudence : « En l'état de nos connaissances, peu d'articles portent sur… ».",
      "Synthèse finale en tableau ou en schéma (modèle).",
    ] },
    { id: "docs-concepts", cat: "rl", titre: "Définir ses concepts : le tableau des définitions", source: doc("Revue de littérature _ définir vos concepts.pdf"), points: [
      "1. Chercher les définitions dans la première partie des articles (leur propre revue de littérature).",
      "2. Les rassembler dans un tableau : discipline des chercheurs, définitions, sources.",
      "3. Comparer et choisir, en justifiant : la plus citée (consensus), la plus pertinente pour notre sujet, ou la plus récente.",
      "Le commentaire justifie la définition retenue puis pointe une limite, qui ouvre la suite de la revue.",
      "Décrire aussi dans quelles revues et disciplines le sujet est traité, et qui sont les auteurs clés.",
    ] },
  ];

  // Chaque fiche se range après la dernière fiche de sa catégorie.
  SECTIONS.forEach(sec => {
    const last = GUIDE_SECTIONS.map(s => s.cat).lastIndexOf(sec.cat);
    GUIDE_SECTIONS.splice(last + 1, 0, sec);
  });

  GUIDE_ATTENTION.push(
    "Formulation de la problématique : la fiche Boostcamp accepte « Comment… ? », les slides de problématisation la déconseillent. Notre « Dans quelle mesure… ? » convient aux deux.",
    "Page de garde : deux modèles circulent ; utiliser celui de 2026-2027 (l'autre date de 2024-2025).",
  );

  // Tâches issues de ces documents (absentes de la feuille de route et des tâches du Guide).
  const t = (n, phase, titre, echeance, opts = {}) =>
    ({ id: "seed-d" + String(n).padStart(2, "0"), kind: "task", phase, titre, echeance, statut: "todo", responsable: "", piste: "commun", ...opts });
  window.SEED_BATCHES.push({ flag: "meta-seed-docs-v1", items: [
    t(1, "p1", "Note de synthèse (1-2 p.) : ampleur du problème pour les entreprises", "2026-10-23", { details: "Revue documentaire : Factiva, Delphes, Xerfi. Chiffres précis et sourcés, réutilisables pour l'accroche." }),
    t(2, "p2", "Faire confirmer au tuteur la norme de la bibliographie", "2026-11-27", { details: "Guide § 7.1 ou APA ? Voir Guide → Points d'attention." }),
    t(3, "p3", "Vérifier chaque référence trouvée avec l'IA sur les bases officielles", "2026-12-11", { responsable: "toutes", details: "Exigence du syllabus : référence retrouvée sur EBSCO, ScienceDirect, Emerald ou Cairn, et lue dans le texte original. Concerne les 23 sources de départ." }),
    t(4, "p3", "Tableau comparatif des définitions pour chaque concept", "2026-12-11", { details: "Colonnes : discipline, définitions, sources. Commentaire : définition retenue et pourquoi, puis sa limite. Voir Guide → Revue de littérature." }),
    t(5, "p3", "Formuler le gap de recherche", "2027-01-06", { details: "Avec prudence : « En l'état de nos connaissances… ». S'appuyer sur les auteurs récents." }),
    t(6, "p5", "Relecture « écriture scientifique »", "2027-05-20", { responsable: "toutes", details: "« Nous » et jamais « on », pas d'arguments d'autorité, « à notre connaissance », sigles développés, définitions entre guillemets et en italique." }),
  ] });
})();
