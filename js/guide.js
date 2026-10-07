// Contenu de l'onglet Guide : synthèse des consignes du parcours Boostcamp « Méthodologie de recherche Online »
// (guide du mémoire 2026-2027 et fiches pédagogiques des modules 1 à 6). Les quiz ne sont pas repris.
// Les textes sont des résumés reformulés : les documents originaux restent sur Boostcamp (liens « Source »).

(function () {
  const BC = id => `https://boostcamp.omneseducation.com/mod/resource/view.php?id=${id}`;
  window.BOOSTCAMP_COURSE = "https://boostcamp.omneseducation.com/course/view.php?id=480415";

  window.GUIDE_CATEGORIES = [
    { id: "calendrier", label: "Calendrier & notes" },
    { id: "forme", label: "Forme & plan" },
    { id: "redaction", label: "Rédaction" },
    { id: "rl", label: "Revue de littérature" },
    { id: "quanti", label: "Étude quantitative" },
    { id: "quali", label: "Étude qualitative" },
    { id: "fin", label: "Résultats & fin du mémoire" },
    { id: "rendu", label: "Dépôt & soutenance" },
  ];

  // Points où les documents du cours ne disent pas la même chose, ou où notre situation sort du cadre.
  window.GUIDE_ATTENTION = [
    "Groupe de 3 : les minimums du guide (240 réponses, 16 entretiens) sont prévus pour un binôme. À faire préciser par la scolarité ou le tuteur.",
    "Format de la bibliographie : le guide (§ 7.1) et la fiche « Bibliographie et norme APA » (module 2) proposent deux formats un peu différents. À confirmer avec le tuteur.",
    "Nombre de pages : le guide donne un minimum de 35 à 45 pages, la « Structure type » un maximum de 40 à 50 pages, hors annexes. Viser environ 40-45 pages.",
    "Les fiches « Consignes méthodologiques » des modules 4 et 5 parlent d'un dépôt le 18 mai 2026 (ancienne année) : la date qui compte est celle du guide 2026-2027, le lundi 24 mai 2027.",
  ];

  window.GUIDE_SECTIONS = [
    // ---------- Calendrier & notes ----------
    { id: "guide-jalons", cat: "calendrier", titre: "Jalons officiels de l'année", source: [["Guide § 1.5", BC(4182537)], ["Timeline", BOOSTCAMP_COURSE]], points: [
      "Septembre : cours de méthodologie (18 h en présentiel, au moins 22 h en ligne). Le parcours en ligne est noté sur 20, individuellement.",
      "Octobre : déclarer la composition du groupe sur Boostcamp.",
      "Fin octobre : déposer le pitch (annexe 3).",
      "Début novembre : un tuteur est attribué. Lui envoyer le sujet et le pitch au plus tard la semaine suivante ; toujours mettre les 3 membres en copie des mails.",
      "Lundi 18 janvier 2027 : revue de littérature intermédiaire, un seul rendu par équipe, notée sur 20 (coef. 2).",
      "Février : instrument de collecte et rédaction de la méthodologie. Mars : questionnaire ou entretiens. Avril : analyse, résultats, discussion, contributions et limites.",
      "Lundi 24 mai 2027 : dépôt du mémoire complet sur Boostcamp (−2 points par jour de retard).",
      "28 juin – 2 juillet 2027 : soutenances (date précise communiquée plus tard). Report possible seulement pour un semestre à l'étranger, sur justificatif.",
    ] },
    { id: "guide-notes", cat: "calendrier", titre: "Notes, coefficients et grilles", source: [["Guide partie 8", BC(4182537)], ["Simulateur", BC(4182544)]], points: [
      "Revue de littérature intermédiaire : coef. 2. Mémoire écrit : coef. 4. Soutenance : coef. 6 (la moitié de la note finale).",
      "Grille de l'écrit : sujet et problématique /3, revue de littérature /4, étude empirique /7, préconisations /4, forme et traçabilité des sources /2.",
      "Grille de l'oral : fluidité et conviction /2, questionnement (RL, problématique, H/P) /3, étude terrain /4, préconisations /3, réponses aux questions /6, supports /2.",
      "Grille de la RL intermédiaire : sujet, problématique et objectifs /3, définitions et contenu des concepts /6, argumentaire menant aux H/P /6, qualité des références /3, forme /2, points retirés pour la qualité d'écriture.",
    ] },

    // ---------- Forme & plan ----------
    { id: "guide-forme", cat: "forme", titre: "Mise en forme", source: [["Guide § 1.4", BC(4182537)], ["Structure type", BC(4182539)]], points: [
      "Times New Roman 12, titres et sous-titres en gras taille 12, interligne 1,5, marges de 2,5 cm partout.",
      "Numérotation des titres jusqu'à 3 niveaux maximum (ex. 1.1.1).",
      "Volume : 35 à 45 pages minimum hors annexes selon la démarche (voir le point d'attention sur le maximum de 40-50 pages).",
      "Version papier reliée avec une protection transparente, imprimée en recto verso.",
    ] },
    { id: "guide-ordre", cat: "forme", titre: "Ordre obligatoire du document", source: [["Guide § 1.3", BC(4182537)]], points: [
      "1. Page de couverture · 2. Remerciements · 3. Sommaire paginé · 4. Introduction · 5. Corps du texte en 2 ou 3 parties · 6. Conclusion · 7. Bibliographie (ordre alphabétique d'auteurs) · 8. Annexes éventuelles · 9. Résumé en français et en anglais.",
      "Table des annexes obligatoire au-delà de 10 annexes ; un fichier séparé est autorisé pour les annexes si besoin.",
    ] },
    { id: "guide-plan", cat: "forme", titre: "Plan type : 3 parties ou 4 chapitres", source: [["Structure type du mémoire", BC(4182539)]], points: [
      "Choisir selon l'équilibre entre les parties. Avant le corps : page de garde, remerciements (optionnels), sommaire, introduction (~2 p.).",
      "Option 1 (3 parties) : 1. Revue de littérature (~10 p. : introduction théorique, développement des H/P, modèle ou pré-modèle) · 2. Étude empirique (~10-15 p. : méthodologie, échantillonnage et instrument, données et statistiques descriptives, résultats, discussion) · 3. Contributions, limites et voies de recherche (~6-8 p.).",
      "Option 2 (4 chapitres) : 1. Revue de littérature (~10 p.) · 2. Méthodologie (~8-10 p.) · 3. Résultats et discussion (~8-10 p.) · 4. Contributions, limites et voies de recherche (~6-8 p.).",
      "Après le corps : conclusion générale (~1 p.), bibliographie APA (~1-2 p.), abstract/résumé (1 p.), annexes.",
    ] },
    { id: "guide-couverture", cat: "forme", titre: "Page de couverture", source: [["Template page de garde", BC(4182538)], ["Guide annexe 1", BC(4182537)]], points: [
      "« Mémoire de Recherche Appliquée de Master 2 », puis le titre (la problématique).",
      "Noms des autrices par ordre alphabétique, nom du tuteur ou de la tutrice, année académique 2026-2027.",
      "Un modèle Word est disponible sur Boostcamp.",
    ] },

    // ---------- Rédaction ----------
    { id: "guide-problematique", cat: "redaction", titre: "Une bonne problématique", source: [["Fiche « Rôle et élaboration d'une problématique »", BC(4182558)], ["Grands types de problématiques", BC(4182557)], ["Guide § 2.1", BC(4182537)]], points: [
      "Une question principale de recherche de 2 à 3 lignes maximum, fil rouge de tout le mémoire. Elle sert aussi de titre.",
      "Elle doit être : intéressante, formulée précisément, faisable (accès aux répondants ou aux données), généralisable (utile à plusieurs entreprises, pas à une seule), actuelle, et poser un vrai problème de gestion.",
      "Ne pas confondre avec un sujet (« les labels ») ni avec une demande opérationnelle d'entreprise.",
      "Formulations types : « Quelle est l'influence de… sur… ? », « Dans quelle mesure… ? », « Comment… ? », « Pourquoi… ? ».",
      "Les grands types de problématiques en gestion : étudier des pratiques d'entreprise, des comportements d'individus, ou la performance.",
    ] },
    { id: "guide-introduction", cat: "redaction", titre: "Introduction (≥ 2 pages, 4 paragraphes)", source: [["Fiche « L'Introduction du mémoire »", BC(4182564)], ["Guide § 2.1", BC(4182537)]], points: [
      "1. Accroche (actualité, statistiques récentes, historique d'une pratique), contexte général puis spécifique, lacunes de la littérature, intérêt et originalité du sujet.",
      "2. Problématique et objectifs de l'étude, énoncés clairement.",
      "3. Méthodologie choisie et justifiée (et, si on veut, les principaux résultats), apports théoriques et pratiques attendus.",
      "4. Annonce du plan.",
    ] },
    { id: "guide-citations", cat: "redaction", titre: "Style, citations et plagiat", source: [["Guide § 3.2", BC(4182537)], ["Fiche « Bibliographie et norme APA »", BC(4182565)], ["Fiche « Revue de littérature »", BC(4182569)]], points: [
      "Style scientifique : sobre, précis, objectif, sans opinion personnelle non argumentée ; utiliser des connecteurs logiques.",
      "Citation dans le texte : (Auteur, année) ; deux auteurs : (Laroche & Bergeron, 2020) ; trois et plus : (Baker et al., 2022). En début de phrase : Baker et al. (2022) montrent que…",
      "Citation mot pour mot : entre guillemets, avec la page, et rarement (2 ou 3 au maximum).",
      "Paraphraser avec ses propres mots, mais toujours attribuer l'idée à son auteur. Ne pas juxtaposer des citations pour remplir.",
      "Le plagiat est détecté par un logiciel ; sanctions possibles jusqu'à l'invalidation du mémoire. Déclaration anti-plagiat à signer.",
    ] },
    { id: "guide-bibliographie", cat: "redaction", titre: "Bibliographie", source: [["Guide § 7.1", BC(4182537)], ["Fiche APA", BC(4182565)]], points: [
      "Ordre alphabétique des auteurs ; pour un même auteur, la référence la plus récente d'abord.",
      "Au moins 15 articles de recherche pour la RL intermédiaire et 18 pour le mémoire final, en majorité académiques et récents (N-1 à N-3).",
      "Bases conseillées : EBSCO, ScienceDirect, Emerald, Cairn, ResearchGate, Google Scholar, HAL. Revues classées CNRS / FNEGE / ABS.",
      "Pas de webographie : un site web se cite en note de bas de page (auteur, date, titre, URL, date de consultation).",
      "Article (APA) : Auteur, A., & Auteur, B. (Année). Titre de l'article. Titre de la revue, Volume(Numéro), pages. L'onglet Bibliographie génère cette mise en forme.",
      "Zotero (gratuit) aide à gérer les références : voir les tutoriels dans Ressources.",
    ] },
    { id: "guide-ia", cat: "redaction", titre: "Utilisation de l'IA", source: [["Guide § 1.7", BC(4182537)]], points: [
      "Autorisée sous contrôle humain : vérifier chaque résultat et chaque source (académique, en majorité récente).",
      "Être transparentes sur son usage dans le mémoire.",
      "Les choix théoriques, méthodologiques et l'interprétation restent sous notre entière responsabilité.",
    ] },

    // ---------- Revue de littérature ----------
    { id: "guide-rl-methode", cat: "rl", titre: "Construire la revue de littérature", source: [["Fiche « La Revue de Littérature en Sciences de Gestion »", BC(4182569)]], points: [
      "Périmètre : mots-clés et synonymes, anglais en priorité puis français, environ 15 dernières années, revues classées.",
      "Grille de lecture de chaque article : cadre théorique, questions et hypothèses, méthode, résultats, contributions et limites. Les fiches de l'onglet Bibliographie servent à ça.",
      "Synthèse thématique (par concepts et théories) de préférence ; faire un tableau Auteurs / Théorie / Méthode / Résultats / Limites.",
      "Identifier les « gaps » : relations non testées, contextes ou populations non étudiés, méthodes à développer. Ils justifient notre recherche.",
      "Définir les concepts avec des définitions académiques de la discipline (marketing), jamais celles du dictionnaire ou de Wikipédia ; confronter plusieurs définitions et choisir.",
    ] },
    { id: "guide-rl-intermediaire", cat: "rl", titre: "Rendu du 18 janvier : revue de littérature intermédiaire", source: [["Guide § 3.3 et annexe 4", BC(4182537)]], points: [
      "Au moins 8 pages hors présentation du sujet ; Times New Roman 12, interligne 1,5 ; au moins 15 articles de recherche aux normes du guide.",
      "Pas d'introduction, mais une présentation du sujet et une justification de la problématique : enjeu principal, problématique (sous-questions possibles), objectifs de recherche.",
      "Puis, comme dans un article de recherche : définir les concepts, préciser leur contenu théorique (dimensions), et mener les argumentaires qui aboutissent à H1, H2… (modèle) ou P1, P2… (pré-modèle).",
      "Pour chaque concept, citer les auteurs et justifier. La version finale (mai) fera au moins 10 pages et intégrera les retours du tuteur.",
    ] },
    { id: "guide-hypotheses", cat: "rl", titre: "Formuler des hypothèses (quanti)", source: [["Fiche RL § 4.2 et 4.4", BC(4182569)]], points: [
      "Démarche déductive : pour chaque variable explicative, fondement théorique → études empiriques (convergentes et divergentes) → synthèse → hypothèse.",
      "Une hypothèse est testable, réfutable et indique le sens de la relation (influence positive ou négative).",
      "Chaque hypothèse s'appuie sur au moins 2-3 références ; présenter les effets principaux, puis les médiations et modérations.",
      "À éviter : « X influence Y » sans sens, hypothèses sans justification, trop d'hypothèses dispersées.",
    ] },
    { id: "guide-propositions", cat: "rl", titre: "Formuler des propositions (quali)", source: [["Fiche RL § 4.3 et 4.4", BC(4182569)]], points: [
      "Démarche inductive ou abductive : la littérature « sensibilise » sans fermer la porte à ce qui émergera du terrain.",
      "Propositions descriptives, exploratoires ou contextuelles, idéalement complétées par « car… ».",
      "Les regrouper dans un pré-modèle ; ne pas les multiplier ni les rendre trop fermées.",
    ] },
    { id: "guide-modele", cat: "rl", titre: "Modèle conceptuel", source: [["Fiche RL § 5", BC(4182569)]], points: [
      "Schéma de gauche à droite : variables indépendantes à gauche, variable dépendante à droite, médiatrices au centre, modératrices avec une flèche vers la relation, variables de contrôle à part.",
      "Une flèche = une hypothèse, numérotée (H1, H2…), avec le signe (+ ou −).",
      "Étapes : choisir la variable à expliquer, lister les explicatives issues de la RL, ajouter médiations, modérations, contrôles, puis dessiner sans croiser les flèches.",
      "Parcimonie et cohérence : le schéma doit reprendre exactement les hypothèses et les termes de la RL.",
    ] },

    // ---------- Quanti ----------
    { id: "guide-operationnalisation", cat: "quanti", titre: "Opérationnaliser les variables", source: [["Guide annexe 5 § 1.1", BC(4182537)], ["Fiche « Collecte de données quantitatives »", BC(4182593)], ["Jolibert & Jourdan (2006), lecture obligatoire", BC(4182594)]], points: [
      "Lister les variables à partir des hypothèses ; une relation entre deux variables n'est pas une variable. On mesure chaque variable séparément, puis on teste la relation.",
      "Définir chaque variable avec une définition académique, puis la qualifier : nominale, quantitative manifeste (âge…) ou latente (confiance, attitude…).",
      "Pour chaque variable latente : une échelle de mesure publiée et validée, d'au moins 3 items, avec un alpha de Cronbach supérieur à 0,70. Citer l'article source ; préciser si l'échelle est traduite ou adaptée.",
      "Ne jamais inventer les items (sauf questions descriptives).",
      "Réponses en Likert de 1 « Pas du tout d'accord » à 5 « Tout à fait d'accord » (ou 7 points), toujours dans cet ordre.",
    ] },
    { id: "guide-questionnaire", cat: "quanti", titre: "Construire le questionnaire", source: [["Guide annexe 5 § 1.2-1.3 et annexe 7", BC(4182537)]], points: [
      "Introduction : présenter l'objectif de façon générale sans révéler la problématique, garantir l'anonymat.",
      "Questions filtres au début si besoin (sélection du profil), puis des blocs « Thème 1, Thème 2… » sans nommer les variables, et les questions socio-démographiques à la fin.",
      "Ajouter le texte RGPD et la case de consentement : finalité académique, anonymat, conservation 12 mois maximum, droits d'accès, de rectification et de retrait, e-mail de contact.",
      "Outils : Google Forms ou SurveyMonkey ; Qualtrics pour une expérimentation avec stimuli (au moins 60 participants par condition).",
    ] },
    { id: "guide-echantillon", cat: "quanti", titre: "Taille d'échantillon et données", source: [["Consignes méthodologiques quanti", BC(4182589)], ["Guide annexe 5", BC(4182537)]], points: [
      "Échantillon de convenance, avec des profils variés, décrit en détail dans le mémoire.",
      "Minimum : 10 × le nombre de questions (hors socio-démographiques), ou 240 réponses complètes pour un binôme (120 seul). Groupe de 3 : à faire préciser.",
      "Données secondaires possibles (Statista, INSEE, Orbis…) : définir l'unité d'analyse (1 ligne = 1 produit, 1 entreprise…) et vérifier l'accès aux données en amont, avec le tuteur.",
      "Déposer la base brute (.xlsx ou .sav, avec l'intitulé des items) avec le mémoire.",
    ] },
    { id: "guide-stats", cat: "quanti", titre: "Analyses statistiques", source: [["Mini dictionnaire de statistiques", BC(4182596)], ["Guide § 4.4", BC(4182537)]], points: [
      "Commencer par les statistiques descriptives (profil des répondants, moyennes, écarts-types, valeurs aberrantes).",
      "Dans le mémoire : normalité, fiabilité (alpha de Cronbach), analyse factorielle ou ACP (test de Bartlett p < 0,05), validités convergente et discriminante, puis tests des hypothèses.",
      "Tests possibles : régression linéaire simple ou multiple, régression logistique, ANOVA (≥ 3 groupes), test t de Student (2 groupes).",
      "Régression : vérifier d'abord le F global du modèle, puis le t de chaque coefficient ; présenter au minimum Beta, significativité (p < 0,05) et R². Ne pas interpréter un coefficient non significatif.",
      "Une p-value ne « prouve » rien : elle indique que le résultat serait peu probable sans effet réel.",
      "Matrice de corrélation en annexe. Logiciels : SPSS, Jamovi (gratuit, tutoriels dans Ressources), JASP, Gretl, R.",
    ] },

    // ---------- Quali ----------
    { id: "guide-guide-entretien", cat: "quali", titre: "Rédiger le guide d'entretien", source: [["Guide annexe 5 § 2.1-2.2", BC(4182537)], ["Exemple de guide d'entretien", BC(4182580)], ["Présentation « Collecte qualitative »", BC(4182577)]], points: [
      "Partir des propositions : identifier les concepts, les traduire en indicateurs observables, puis en questions ouvertes. Un guide n'est pas une liste de questions détachée des propositions.",
      "Structure : introduction (sujet, anonymat, accord pour l'enregistrement), thèmes et sous-thèmes hiérarchisés avec relances, questions descriptives sur le profil.",
      "Non-directivité : questions neutres. Plutôt « Comment choisissez-vous un produit présenté comme bon pour la santé ? » que « Faites-vous confiance aux labels ? ».",
      "Un guide unique pour tous les entretiens, afin de pouvoir comparer.",
    ] },
    { id: "guide-entretiens", cat: "quali", titre: "Mener les entretiens", source: [["Consignes méthodologiques quali", BC(4182574)], ["Guide annexes 5 et 6", BC(4182537)], ["Attestation de confidentialité", BC(4182606)]], points: [
      "Phases : ouverture (question générale), centrage sur les thèmes, approfondissement (exemples concrets, relances), conclusion (« Souhaitez-vous ajouter quelque chose ? »).",
      "45 minutes à 1 heure, enregistrées en entier et retranscrites mot à mot. Déposer les audios (.mp3) et les retranscriptions avec le mémoire.",
      "Protocole RGPD lu avant l'enregistrement (annexe 6), puis consentement confirmé oralement une fois l'enregistrement lancé. Attestation de confidentialité si on interroge une entreprise.",
      "Continuer jusqu'à saturation (plus rien de nouveau, échantillon varié) ; au moins 16 entretiens par binôme pour des cibles courantes, 8-10 pour des cibles rares. Groupe de 3 : à faire préciser.",
      "Focus group possible : 6 à 12 participants, 1 à 2 heures, animateur neutre. L'observation ne peut être qu'un complément.",
    ] },
    { id: "guide-codage", cat: "quali", titre: "Coder et analyser les entretiens", source: [["Fiche « Traitement des données qualitatives »", BC(4182582)], ["Exemple de dictionnaire thématique", BC(4182585)], ["Exemple de codage thématique", BC(4182586)]], points: [
      "Analyse de contenu thématique en 5 étapes : thèmes issus de la RL → lecture de tous les entretiens → grille croisant théorie et terrain → codage → extraction des résultats.",
      "Grille : Extrait (verbatim) / Code (quelques mots) / Thème / Commentaires. Un extrait peut recevoir plusieurs codes ; la grille évolue au fil du codage.",
      "Dictionnaire thématique : arborescence des thèmes et sous-thèmes, chacun défini et illustré par un verbatim.",
      "Préciser l'unité d'analyse (mot, phrase, paragraphe). Ne pas chiffrer en pourcentages sur un petit échantillon : mettre en avant les idées et les verbatims, reliés au pré-modèle.",
      "Logiciels : NVivo, ATLAS.ti, MAXQDA, QDA Miner, Dedoose, IRaMuTeQ (gratuit). Ils organisent, mais l'interprétation reste humaine.",
      "Annexes : grille de codage complète avec les verbatims, et profils anonymisés des répondants.",
    ] },

    // ---------- Résultats & fin ----------
    { id: "guide-discussion", cat: "fin", titre: "Discussion des résultats", source: [["Guide § 4.5", BC(4182537)]], points: [
      "Confirmer ou infirmer chaque hypothèse (quanti), ou confronter chaque proposition au terrain (quali).",
      "Mettre chaque résultat en perspective avec la littérature mobilisée : convergences, divergences, explications possibles.",
    ] },
    { id: "guide-preconisations", cat: "fin", titre: "Préconisations managériales (≥ 5 pages)", source: [["Guide partie 5", BC(4182537)]], points: [
      "Se placer en professionnelles qui livrent des résultats exploitables par les entreprises.",
      "Chaque recommandation doit découler d'un résultat précis de l'étude.",
    ] },
    { id: "guide-contributions", cat: "fin", titre: "Contributions, limites et voies de recherche", source: [["Fiche « Contributions, limites et voies de recherche »", BC(4182602)]], points: [
      "Contributions théoriques d'abord : clarifier un concept, proposer un modèle, montrer une relation inédite, répliquer dans un nouveau contexte, confirmer ou nuancer des travaux antérieurs.",
      "Puis contributions managériales : outils d'aide à la décision, bonnes pratiques, leviers d'action concrets. Séparer clairement les deux.",
      "Une contribution n'est pas un résultat : elle dit en quoi le résultat est utile.",
      "Limites méthodologiques, théoriques, contextuelles, temporelles : expliquer leur effet sur les résultats, sur un ton constructif. Ne jamais écrire qu'il n'y a pas de limites.",
      "Voies de recherche qui découlent des limites (autres terrains, autres méthodes, autres variables), puis une phrase d'ouverture.",
    ] },
    { id: "guide-conclusion", cat: "fin", titre: "Conclusion (≥ 2 pages selon le guide)", source: [["Guide partie 6", BC(4182537)]], points: [
      "Rappeler la problématique et les principaux résultats.",
      "Apports théoriques et managériaux, limites et voies de recherche futures.",
    ] },
    { id: "guide-resume", cat: "fin", titre: "Résumé / Abstract", source: [["Modèle Abstract / Résumé", BC(4182604)], ["Guide § 7.3", BC(4182537)]], points: [
      "Obligatoire en français et en anglais, identiques sur le fond, en quatrième de couverture.",
      "100 à 150 mots chacun : sujet, objectifs, méthode, résultat principal, contribution principale. Ton clair et affirmé.",
      "Ajouter 5 à 6 mots-clés séparés par des points-virgules. Interligne simple, le tout sur une page.",
      "Le compteur de mots ci-dessous aide à respecter la longueur.",
    ] },
    { id: "guide-remerciements", cat: "fin", titre: "Remerciements (optionnels)", source: [["Indications rédactionnelles", BC(4182605)]], points: [
      "Une page maximum, interligne 1,5, juste après la page de garde.",
      "Si on en écrit, remercier obligatoirement l'INSEEC Grande École et le tuteur ou la tutrice ; le reste est libre : participants à l'étude, enseignants, entreprises, proches, et un mot sur ce que le mémoire nous a appris.",
    ] },

    // ---------- Dépôt & soutenance ----------
    { id: "guide-depot", cat: "rendu", titre: "Dépôt du 24 mai 2027", source: [["Guide § 7.4", BC(4182537)], ["Déclaration anti-plagiat", BC(4182607)]], points: [
      "Le mémoire au format Word, nommé « Mémoire.Nom.Prénom.doc ».",
      "La déclaration sur l'honneur anti-plagiat, signée : elle engage chacune individuellement et le groupe collectivement.",
      "Quanti : la base de données (Excel ou SPSS, avec l'intitulé des items). Quali : les retranscriptions et les enregistrements .mp3, obligatoires.",
      "−2 points par jour de retard.",
    ] },
    { id: "guide-soutenance", cat: "rendu", titre: "Préparer la soutenance", source: [["Guide § 8.2 et annexe 8b", BC(4182537)]], points: [
      "Coefficient 6 : c'est l'épreuve qui pèse le plus.",
      "Les réponses aux questions du jury valent 6 points sur 20 : préparer les questions probables (choix de la problématique, des échelles, de l'échantillon, limites).",
      "Le reste : fluidité et conviction /2, questionnement /3, étude terrain /4, préconisations /3, qualité des supports /2.",
    ] },
  ];

  // Pistes issues des fichiers THEORIES et CONCEPTS / VARIABLES (module 3), filtrées pour notre sujet.
  // À vérifier dans les articles d'origine avant de les utiliser.
  window.GUIDE_THEORIES = [
    { nom: "Théorie du signal", auteurs: "Spence (1973)", idee: "Quand l'acheteur ne peut pas vérifier la qualité, un signal crédible (label, certification, marque) la lui communique. Cœur de notre problématique." },
    { nom: "Asymétrie d'information / sélection adverse", auteurs: "Akerlof (1970)", idee: "Le vendeur en sait plus que l'acheteur ; sans signal fiable, la méfiance s'installe." },
    { nom: "Elaboration Likelihood Model (ELM)", auteurs: "Petty & Cacioppo (1986)", idee: "Traitement central ou périphérique d'un message : un label peut servir de raccourci (indice périphérique)." },
    { nom: "Théorie du risque perçu", auteurs: "Bauer (1960)", idee: "Les choix d'achat dépendent du risque perçu ; un label peut le réduire." },
    { nom: "Commitment-Trust Theory", auteurs: "Morgan & Hunt (1994)", idee: "La confiance et l'engagement fondent les relations durables avec la marque." },
    { nom: "Capital-marque (Brand Equity)", auteurs: "Keller (1993)", idee: "Valeur de la marque dans l'esprit du consommateur : utile pour l'interaction label × marque." },
    { nom: "Théorie institutionnelle (légitimité)", auteurs: "DiMaggio & Powell (1983)", idee: "Les organisations adoptent des normes pour gagner en légitimité : utile pour expliquer la prolifération des labels." },
    { nom: "Principes de persuasion (autorité, preuve sociale…)", auteurs: "Cialdini (1984)", idee: "Un organisme certificateur agit comme une figure d'autorité." },
    { nom: "Dissonance cognitive", auteurs: "Festinger (1957)", idee: "Inconfort entre croyances contradictoires : piste pour le scepticisme face à des promesses santé." },
  ];

  window.GUIDE_VARIABLES = [
    "Confiance envers la marque", "Attitude envers la marque", "Intention d'achat", "Qualité perçue", "Valeur perçue",
    "Perception de l'authenticité de la marque", "Responsabilité sociale perçue de la marque", "Perception de l'éthique des entreprises",
    "Implication (involvement)", "Réaction face à la publicité (reactance)", "Fidélité à la marque",
  ];

  window.GUIDE_RESOURCES = [
    { groupe: "Documents du cours (Boostcamp)", liens: [
      ["Guide du mémoire 2026-2027 (PDF, 43 p.)", BC(4182537)],
      ["Structure type du mémoire", BC(4182539)],
      ["Template page de garde (Word)", BC(4182538)],
      ["Modèle Abstract / Résumé (Word)", BC(4182604)],
      ["Déclaration anti-plagiat (Word)", BC(4182607)],
      ["Attestation de confidentialité, entretiens (Word)", BC(4182606)],
      ["Fiche : la revue de littérature en sciences de gestion", BC(4182569)],
      ["Fichier Excel : principales théories en sciences de gestion", BC(4182571)],
      ["Fichier Excel : principaux concepts / variables", BC(4182572)],
      ["Fiche : collecte de données quantitatives", BC(4182593)],
      ["Jolibert & Jourdan (2006), Marketing research (chapitre, lecture obligatoire)", BC(4182594)],
      ["Mini dictionnaire de statistiques", BC(4182596)],
      ["Exemple de guide d'entretien", BC(4182580)],
      ["Fiche : traitement des données qualitatives", BC(4182582)],
      ["Fiche : contributions, limites et voies de recherche", BC(4182602)],
      ["Page du cours sur Boostcamp", BOOSTCAMP_COURSE],
    ] },
    { groupe: "Bibliothèque et références", liens: [
      ["Bibliothèque digitale Omnes Education", "https://library.omneseducation.com/default.aspx?_lg=fr-FR"],
      ["Ouvrages conseillés sur ScholarVox", "https://scholarvox.library.omneseducation.com/bookshelf/folder/13124"],
      ["Zotero : installer (Université de Montréal)", "https://bib.umontreal.ca/citer/logiciels-bibliographiques/zotero/installer"],
      ["Zotero : tutoriels (Université Lyon 1)", "https://portaildoc.univ-lyon1.fr/bibliotheques/des-tutos-pour-maitriser-zotero"],
    ] },
    { groupe: "Logiciels d'analyse", liens: [
      ["Jamovi (gratuit) : télécharger la version Desktop", "https://www.jamovi.org/"],
      ["Learning Statistics with Jamovi (livre en ligne)", "https://davidfoxcroft.github.io/lsj-book/"],
      ["Tutoriels vidéo Jamovi (anglais)", "https://www.youtube.com/playlist?list=PLkk92zzyru5OAtc_ItUubaSSq6S_TGfRn"],
      ["Jamovi : statistiques descriptives (vidéo)", "https://www.youtube.com/watch?v=8ABX8O9Plm0&list=PLq8Q2wI5euWe_bLwDbakIp0CSlqG3bIrx&index=2"],
      ["Jamovi : ACP (vidéo)", "https://www.youtube.com/watch?v=wU4yijeW2pg"],
      ["Jamovi : test t (vidéo)", "https://www.youtube.com/watch?v=T4NlM49EmrY&list=PLq8Q2wI5euWe_bLwDbakIp0CSlqG3bIrx&index=5"],
      ["Jamovi : ANOVA (vidéo)", "https://www.youtube.com/watch?v=51AnFwG4udk&list=PLq8Q2wI5euWe_bLwDbakIp0CSlqG3bIrx&index=6"],
      ["IRaMuTeQ (analyse qualitative, gratuit)", "http://www.iramuteq.org/"],
    ] },
  ];
})();

// ---------- Parcours pas à pas ----------
// Chaque étape regroupe les tâches de la feuille de route (par phase et, si besoin, par date),
// ce qu'on peut rédiger à ce moment-là, les fiches utiles et le livrable.
(function () {
  window.GUIDE_METHODE = [
    "Un seul document partagé « Mémoire » (Word en ligne ou Google Docs), avec dès maintenant tous les titres du plan type : chaque partie a sa place, même vide.",
    "On écrit au fil de l'eau : article lu → fiche dans Bibliographie (apport + citation avec page) → paragraphe dans le document. Rien n'attend décembre.",
    "Une rédactrice principale par partie (onglet Rédaction) et une relectrice différente. On met à jour les pages rédigées chaque semaine.",
    "On cite au moment où l'on écrit (Zotero), jamais « à la fin » : c'est là que naissent les oublis et le plagiat involontaire.",
    "Un point d'équipe par semaine dans Messages → Groupe : ce qui est fait, ce qui bloque, la répartition de la semaine suivante.",
  ];

  window.GUIDE_STEPS = [
    { id: "step-1", titre: "Démarrer et cadrer le sujet", debut: "2026-09-01", fin: "2026-10-30", phases: ["p1"],
      objectif: "S'organiser, lire les premiers articles et formuler une problématique défendable dans le pitch.",
      rediger: [
        "Créer le document partagé avec le plan type (3 parties ou 4 chapitres) et la page de garde.",
        "Chaque article lu : remplir sa fiche dans Bibliographie. Ce sont les briques de la revue de littérature.",
        "Le pitch est le premier brouillon de l'introduction : contexte et enjeux (§ 1), problématique et objectifs (§ 2).",
      ],
      parties: ["Introduction", "Revue de littérature"],
      fiches: ["guide-jalons", "docs-syllabus", "guide-problematique", "docs-problematisation", "guide-plan", "guide-bibliographie", "guide-rl-methode"],
      livrable: "Pitch déposé sur Boostcamp (30 oct.)" },
    { id: "step-2", titre: "Tuteur et problématique validée", debut: "2026-10-31", fin: "2026-12-04", phases: ["p2"],
      objectif: "Présenter le pitch au tuteur, faire valider la problématique et bâtir le plan de la revue de littérature.",
      rediger: [
        "Après chaque échange, noter retours et décisions dans l'onglet Tuteur.",
        "Mettre la problématique validée en tête du document : elle devient le titre du mémoire.",
        "Plan détaillé de la revue de littérature : un sous-titre par concept (scepticisme, allégations santé, labels et certification, théorie du signal, crédibilité, confiance).",
        "Commencer les définitions dans l'onglet Concepts : 2 ou 3 définitions académiques confrontées par concept.",
      ],
      parties: ["Revue de littérature"],
      fiches: ["guide-problematique", "docs-concepts", "guide-rl-methode", "guide-citations", "docs-plagiat"],
      livrable: "Problématique validée par le tuteur" },
    { id: "step-3", titre: "Revue de littérature intermédiaire", debut: "2026-12-05", fin: "2027-01-18", phases: ["p3"],
      objectif: "Rédiger au moins 8 pages qui définissent les concepts et aboutissent aux hypothèses ou propositions.",
      rediger: [
        "Concept par concept : définition retenue → contenu théorique (dimensions) → argumentaire → H ou P. Une rédactrice par axe, relecture croisée.",
        "Rédiger la présentation du sujet et la justification de la problématique : elle resservira dans l'introduction finale.",
        "Dessiner le modèle conceptuel ou le pré-modèle à partir des H/P.",
        "Ce rendu devient la partie 1 du mémoire : il sera enrichi ensuite (10 pages minimum) avec les retours du tuteur.",
      ],
      parties: ["Revue de littérature"],
      fiches: ["guide-rl-intermediaire", "docs-rl-seance2", "docs-concepts", "guide-hypotheses", "guide-propositions", "guide-modele", "docs-ecriture"],
      livrable: "Revue de littérature intermédiaire (18 janv. 2027, coef. 2)" },
    { id: "step-4", titre: "Préparer l'étude terrain", debut: "2027-01-19", fin: "2027-02-28", phases: ["p4"], avant: "2027-02-28",
      objectif: "Choisir le plan, construire l'instrument de collecte (questionnaire ou guide d'entretien) et le faire valider.",
      rediger: [
        "Rédiger la méthodologie avant de collecter : démarche et justification, population, échantillon, instrument.",
        "Quanti : tableau des variables avec leurs échelles, leurs sources et leur alpha. Quali : lien entre chaque proposition et les questions du guide.",
        "Intégrer les retours du tuteur dans la revue de littérature.",
        "Mettre le questionnaire ou le guide d'entretien en annexe.",
      ],
      parties: ["Étude empirique", "Annexes"],
      fiches: ["guide-operationnalisation", "guide-questionnaire", "guide-echantillon", "guide-guide-entretien", "guide-plan"],
      livrable: "Questionnaire ou guide d'entretien validé par le tuteur" },
    { id: "step-5", titre: "Collecter et analyser", debut: "2027-03-01", fin: "2027-04-23", phases: ["p4"], apres: "2027-02-28",
      objectif: "Recueillir les données, les analyser et rédiger les résultats et la discussion.",
      rediger: [
        "Suivre la collecte dans l'onglet Terrain (réponses ou entretiens).",
        "Rédiger les résultats au fil des analyses : profil de l'échantillon d'abord, puis chaque H ou P, avec tableaux ou verbatims.",
        "Rédiger la discussion hypothèse par hypothèse, en la reliant aux articles de la revue de littérature.",
      ],
      parties: ["Étude empirique", "Annexes"],
      fiches: ["guide-entretiens", "guide-codage", "guide-stats", "guide-discussion"],
      livrable: "Base de données ou retranscriptions et audios prêts à déposer" },
    { id: "step-6", titre: "Rédiger la fin et assembler", debut: "2027-04-24", fin: "2027-05-24", phases: ["p5"],
      objectif: "Écrire préconisations, contributions et conclusion, puis finaliser et déposer.",
      rediger: [
        "Préconisations : une recommandation par résultat clé.",
        "Contributions, limites et voies de recherche, puis la conclusion.",
        "Réécrire l'introduction en dernier (4 paragraphes), puis résumé FR/EN, remerciements et sommaire paginé.",
        "Relecture globale : mêmes termes partout, chaque citation dans la bibliographie, mise en forme du guide.",
      ],
      parties: ["Préconisations managériales", "Conclusion", "Introduction", "Résumé FR / EN", "Bibliographie"],
      fiches: ["guide-preconisations", "guide-contributions", "guide-conclusion", "guide-introduction", "guide-resume", "docs-ecriture", "guide-depot"],
      livrable: "Mémoire déposé sur Boostcamp (24 mai 2027, coef. 4)" },
    { id: "step-7", titre: "Préparer la soutenance", debut: "2027-05-25", fin: "2027-07-02", phases: ["p6"],
      objectif: "Construire le support et s'entraîner aux questions du jury.",
      rediger: [
        "Support : une diapositive par grande partie, avec le modèle, les résultats clés et les préconisations.",
        "Lister les questions probables du jury et préparer une réponse courte pour chacune.",
      ],
      parties: [],
      fiches: ["guide-soutenance", "guide-notes"],
      livrable: "Soutenance (28 juin – 2 juillet 2027, coef. 6)" },
  ];
})();
