# Notedown

Par Mokhtar MIAL et Rana SHERIF

## Contexte

Au cours de l'année du M2 Génie Informatique à l'Université Grenoble Alpes, nous avons été amenés à développer une application native à l'aide d'Ionic et de Firebase.

Nous avons choisi de diverger *légerement* des todo lists et de développer une application de prise de note avec la meilleure expérience utilisateur qu'on puisse proposer dans les délais imposés.

## Stack technique

L'application est faite en React avec le wrapper Ionic pour React en version beta (v0.0.5 au moment de la rédaction).

L'authentification se fait via Firebase Authentication et le données sont stockées dans une base de données Firebase Cloud Firestore.

## Fonctionnalités implémentées

 * Authentification basique (email/password)
 * SSO Facebook
 * SSO Google
 * Stockage des données dans Firebase Cloud Firestore
 * Rappel d'une note via une notification

## Fonctionnaltiés dont l'implémentation a échoué

 * L'ouverture de la note

## Getting started

Vous aurez besoin de:
 * git
 * nodejs (testé la version 11.13.0)
 * npm (testé la version 6.9.0)
 * Android Studio (testé avec la version )
 * Android SDK (testé avec la version )
 
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

