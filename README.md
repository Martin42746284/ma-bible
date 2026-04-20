# Ma Bible — Application Expo (React Native)

Application mobile **100% offline** de lecture biblique (Louis Segond 1910, domaine public).

## Stack

- React Native + Expo (SDK 51)
- Expo Router (navigation par fichiers)
- TypeScript strict
- AsyncStorage pour la persistance locale
- Bible LSG embarquée comme asset JSON

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Générer assets/bible.json (~4 Mo, téléchargé depuis un dépôt public)
npm run bible:build

# 3. Lancer Expo
npx expo start
```

Scanne le QR code avec **Expo Go** (iOS/Android), ou lance un simulateur :

```bash
npm run ios       # macOS uniquement
npm run android
```

## Fonctionnalités

- **Accueil** : verset du jour, reprise de lecture, accès AT/NT, statistiques
- **Lecture** : navigation Testament → Catégorie → Livre → Chapitre → Versets, boutons précédent/suivant, sauvegarde auto de la dernière position
- **Recherche** : plein-texte avec debounce, filtres AT/NT, surlignage
- **Favoris** : liste, tri par date, export JSON via partage natif
- **Paramètres** : thème clair/sombre/système, taille de police, reset des données

Appui court sur un verset = ajouter/retirer des favoris.
Appui long = partager.

## Architecture

```
app/                    # routes Expo Router
  (tabs)/               # barre d'onglets
  reader/[book]/[chapter].tsx
  settings.tsx
src/
  components/           # UI réutilisable
  hooks/                # useBookmarks, useSettings, useLastPosition…
  services/             # storage, bibleService, searchService
  theme/                # ThemeProvider + palette
  constants/            # catégories des livres
  types/                # interfaces TypeScript
  utils/                # helpers (debounce…)
assets/
  bible.json            # généré par scripts/build-bible.ts
scripts/
  build-bible.ts        # télécharge et convertit la LSG
```

## Stockage local (AsyncStorage)

| Clé | Contenu |
|-----|---------|
| `@bible:bookmarks` | `Bookmark[]` |
| `@bible:last_position` | `LastPosition` |
| `@bible:reading_history` | `string[]` (jours uniques YYYY-MM-DD) |
| `@bible:settings` | `Settings` |

## Publication (App Store / Play Store)

```bash
npm i -g eas-cli
eas login
eas build --platform ios
eas build --platform android
```

Voir https://docs.expo.dev/build/introduction/

## Extensions prévues

- Plans de lecture
- Notes personnelles
- Multilingue
- Partage en image (`react-native-view-shot`)
- Synchronisation cloud optionnelle

## Licence

Code MIT. Texte biblique : **Louis Segond 1910** (domaine public).
