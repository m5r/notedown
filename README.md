# Notedown

Par Mokhtar MIAL et Rana SHERIF

## Contexte

Au cours de l'année du M2 Génie Informatique à l'Université Grenoble Alpes, on a été amenés à développer une application native à l'aide d'Ionic et de Firebase.

On a choisi de diverger *légerement* des todo lists habituelles et de développer une application de prise de note avec la meilleure expérience utilisateur qu'on puisse proposer dans les délais imposés.

## Stack technique

L'application est faite en React avec le wrapper Ionic pour React en version beta (v0.0.5 au moment de la rédaction).

L'authentification se fait via Firebase Authentication et le données sont stockées dans une base de données Firebase Cloud Firestore.

## Fonctionnalités implémentées

 * Authentification basique (email/password)
 * Stockage des données dans Firebase Cloud Firestore
 * Rappel d'une note via une notification

## Fonctionnaltiés dont l'implémentation a échoué

##### SSO Facebook et Google

L'intégration du plugin officiel Ionic Native de Firebase est immature et manque de compatibilité avec leur système de "Capacitor" permettant soit-disant une intégration facile de la majorité des plugins déjà existants...

On a essayé de gruger en utilisant le Firebase SDK pour le Web en modifiant le `redirect_uri` pour le faire pointer vers l'application avec notre `custom_url_scheme` (io.ionic.starter://) mais Firebase n'autorise pas la modification de cette option.

Le SSO fonctionne donc seulement en mode Web.

##### L'ouverture de la note dont on vient d'etre rappelé par la notification

Pour continuer sur notre lancée de meilleure UX possible, quand on reçoit la notification programmée d'une note, on aurait aimé qu'ouvrir la notification ouvrirait directement la note en question dans l'application.

On a trouvé comment récupérer l'`extra` de la notification et comment en faire usage mais l'intégration de cette feature prenait trop de temps car l'application se retrouvait entre plusieurs conflits d'état (j'ai fini de chargé l'application ? je suis connecté ? j'ai fini de charger mes notes ? est-ce que j'ouvre la note avant d'etre sur d'etre connecté ?)

Étant donné la valeur ajoutée et les priorités des autres features, on a décidé de déprioriser celle-ci.

#### Monétisation avec AdMob

L'utilisation du plugin et des composants AdMob s'est déroulée correctement mais la pub ne s'affiche pas. On a manqué de temps pour approfondir le debug de cette feature.

## Points notables d'UX

 * Affichage sobre
 * Liste de notes style "masonry"
 * Transitions avec un minimum de temps de chargement
 * Feedback quand l'utilisateur sélectionne une note (vibration légère)
 * Focus automatique sur le contenu à la création d'une note ou d'un nouvel élément d'une liste
 * Le splashscreen se masque seulement une fois le contenu chargé (= un seul écran de chargement à l'ouverture de l'application)
 * Si un rechargement des notes doit quand meme etre effectué, on affiche un squelette de la liste de notes
 * Les notes sont triées chronologiquement en fonction de la date de dernière édition
 * Un fondu est affiché en bas de liste pour laisser comprendre à l'utilisateur qu'il peut voir le reste de ses notes en scrollant
 * Une note n'est pas enregistrée si l'utilisateur part en ayant rien écrit
 * Sur la page des listes de notes, l'élément d'une note de type liste est tronqué et trois points de suspensions sont affichés s'il dépasse trois lignes
 * Sur la page des listes de notes, seulement les éléments non cochés sont affichés

## Getting started

Vous aurez besoin de:
 * git
 * nodejs (testé la version 11.13.0)
 * npm (testé la version 6.9.0)
 * Android Studio (testé avec la version 3.2.1)
 * Android SDK (testé avec la version 28, smartphone sous Android 9)
 
Renseignez le chemin vers votre installation d'Android Studio dans le champs `linuxAndroidStudioPath` du fichier `capacitor.config.json` qui se trouve à la racine du projet.

#### Mise en place de l'envrionnement local

```bash
git clone git@github.com:m5r/notedown.git
cd notedown
npm install
```

#### Build

```bash
npm run build
npx ionic capacitor copy
```

#### Compilation de l'APK

On exécute `npx ionic capacitor open android` pour ouvrir Android Studio

Une fois ouvert, on compile l'application comme n'importe quelle autre application Android.
