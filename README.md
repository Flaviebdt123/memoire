# Plateforme mémoire — Labels, allégations santé & confiance

Suivi du mémoire de recherche appliquée (INSEEC Grande École, 2026-2027) d'Anaelle Scintract, Anna Scerri et Flavie Boudot.

> **Problématique** — Dans un contexte de scepticisme croissant des consommateurs envers les allégations santé, dans quelle mesure les labels et certifications parviennent-ils encore à agir comme des signaux crédibles capables de restaurer la confiance envers la marque ?

## Ce que contient la plateforme

| Onglet | Contenu |
|---|---|
| Tableau de bord | Avancement, échéances, jalons officiels, charge par personne |
| Feuille de route | Toutes les étapes du guide avec dates, statut (Pas fait / En cours / Terminé) et responsable |
| Pitch | Trame de l'annexe 3, éditable à trois |
| Bibliographie | Articles (auteurs, revue, apport, citation…), validation par la prof, export aux normes du guide |
| Concepts & hypothèses | Définitions académiques, hypothèses H / propositions P, validation tuteur |
| Terrain | Échelles de mesure (quanti) et suivi des entretiens (quali) |
| Rédaction | Les parties obligatoires du mémoire, pages rédigées / minimum |
| Tuteur | Coordonnées et comptes rendus d'échanges |
| Messages | Discussion de groupe à trois et messages privés (pop-up chez la destinataire à l'ouverture du site) |

Partout sur le site :
- **Assistant** (bouton en bas à droite) : on pose une question, il ressort les articles de la bibliographie qui y répondent.
- **Les trois filles en pixel** en bas de page : cliquer sur l'une permet de lui écrire directement.

Site statique (HTML/CSS/JS, aucune installation). Les données sont dans **Supabase** (gratuit), le site est hébergé sur **Vercel** (gratuit) à partir de ce dépôt **GitHub**.

Sans Supabase configuré, le site marche en **mode démo** : les données restent dans le navigateur.

## Mise en ligne (une seule fois, ~15 min)

### 1. GitHub
1. Créer un compte sur github.com.
2. **New repository** → nom `plateforme-memoire` → *Private* → **Create**.
3. Envoyer ce dossier dans le dépôt (GitHub Desktop : *Add existing repository* → *Publish*).
4. *Settings → Collaborators* : inviter Anaelle et Anna.

### 2. Supabase (la base de données partagée)
1. supabase.com → *Sign in with GitHub* → **New project** (région *Paris* ou *Frankfurt*, noter le mot de passe).
2. **SQL Editor** → *New query* → coller le contenu de `supabase/schema.sql` → **Run**.
3. **Project Settings → API** : copier *Project URL* et la clé *anon public*.
4. Les coller dans `js/config.js`, puis commit + push.

### 3. Vercel (le site en ligne)
1. vercel.com → *Continue with GitHub*.
2. **Add New → Project** → importer `plateforme-memoire` → *Framework : Other* → **Deploy**.
3. Partager l'adresse `https://….vercel.app` avec l'équipe.

Chaque push sur GitHub remet le site à jour automatiquement.

### 4. Assistant IA (facultatif)
Sans cette étape, l'assistant fait une simple recherche par mots-clés (avec synonymes français/anglais).
1. platform.claude.com → créer une clé API (payant à l'usage : quelques centimes par question).
2. Vercel → projet → *Settings → Environment Variables* → `ANTHROPIC_API_KEY` = la clé → *Save*.
3. *Deployments* → *Redeploy*.

La clé reste sur le serveur Vercel (`api/assistant.js`), elle n'est jamais envoyée au navigateur.

## Sécurité
Toute personne qui a le lien du site peut lire et modifier, **messages privés compris** (ils ne sont pas chiffrés : rien de confidentiel). Ne pas diffuser le lien hors de l'équipe (et de la prof si besoin), et ne stocker **aucune donnée personnelle** de répondants : codes (R01…) et profils anonymisés uniquement.

## Modifier la plateforme
- Étapes, dates, catégories, champs : `js/schema.js`
- Affichage : `js/app.js` et `css/style.css`
- Tester en local : ouvrir `index.html` dans le navigateur.
