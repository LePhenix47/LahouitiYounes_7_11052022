# [P7] Groupomania par Younes LAHOUITI

## 1. Comment installer le projet sur votre ordinateur

Le projet utilise des paquets de Node et un serveur en HTTPS, il faudra installer 2 logiciels sur votre ordinateur pour pouvoir utiliser les commandes `npm` et`openssl`

> [Node.js](https://nodejs.org/en/)

L'installation est simple, il suffit de cliquer sur "Download for Windows (x64)" pour la version des utilisateurs

> [OpenSSL (Windows)](https://slproweb.com/products/Win32OpenSSL.html)

L'installation est un peu plus complexe sur Windows :

- Installer "Win 64 OpenSSL v.3.0.3" (datant du Mercredi 8 juin 2022 à 12:46)

- Copier le chemin d'OpenSSL où vous l'avez installé (ex : C:\Program
  Files\OpenSSL)
- Ouvrir les Paramètres → Système → À propos de → Paramètres avancés du
  système
- Cliquer sur "variables d'environnement" et allez dans la partie
  "Variables système"
- Dans "Path" → Cliquer sur Modifier → Nouveau → Coller le chemin d'OpenSSL avec un "\bin" à la fin
  (ex : C:\ProgramFiles\OpenSSL\bin)
- Pour vérifier que cela marche, ouvrez un terminal de commandes et
  vérifiez la version d'OpenSSL avec cette commande : `openssl version -a`

**Une fois l'installation faite, il faut exécuter la commande `npm install` dans les 2 dossiers suivants :**

\-Front-end

\-Back-end

Pour pouvoir utiliser la Base de données, il faudra installer un SGBDR, préférablement [PostgreSQL](https://www.postgresql.org/download/)

La configuration entre le serveur et le base de données est déjà faite dans l'app

## a) Installation des paquets NPM de Node.js :

**Pour chacun de ces 2 dossiers il faudra installer des paquets npm:**

\-Front-end: Le CLI d'Angular → `npm -g @angular/cli`

\-Back-end:

| Paquet             | Fonctionnement/Utilité                                                                            | installation               |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------------------- |
| Express            | Framework Back-end pour les routes de notre API et constuire notre app web                        | `npm i express`            |
| express-rate-limit | Permet le contrôle du nombre de requêtes d'une adresse IP particulière                            | `npm i express-rate-limit` |
| Sequelize          | ORM SQL qui cache les requêtes faites à la base de données                                        | `npm i sequelize`          |
| Bcrypt             | Paquet qui hache les mots de passe                                                                | `npm i bcrypt`             |
| CORS               | Paquet qui évite les blocages de connexion entre front-end et back-end                            | `npm i cors`               |
| dotEnv             | Pour les fichiers d'extension `.env` pour cacher les données sensibles sur GitHub                 | `npm i dotenv`             |
| helmet             | Protège les en-têtes de requêtes du Front contre les attaques XSS                                 | `npm i helmet`             |
| JWT                | Permet la génération des tokens à envoyer au Front                                                | `npm i jsonwebtoken`       |
| password-validator | S'assure que le Mot de passe est robuste                                                          | `npm i password-validator` |
| validator          | S'assure que le Front envoie des emails avec le bon format                                        | `npm i validator`          |
| multer             | Gère les images                                                                                   | `npm i multer`             |
| nodemon            | Permet le redémarrage du serveur à chaque changement du code back-end                             | `npm i nodemon`            |
| pg                 | Permet la connexion entre notre serveur et notre base de données PostgreSQL                       | ` npm i pg`                |
| pg-hstore          | Permet d'envoyer des données au format `.hstore` pour que notre base de données puisse la stocker | `npm i pg-hstore`          |

## b) Configuration des fichiers "ignorés"

Ce projet contient 3 fichiers ou dossiers indispensables qui n'ont pas été envoyés sur GitHub pour des motifs de sécurité :

1.  **Certificate (dossier)**
    Créez ce dossier dans le dossier backend
    Dans le terminal de commandes, allez dans le dossier _backend/certificate_
    Et exécutez ces 3 commandes :

```powershell
openssl genrsa -out key.pem

openssl req -new -key key.pem -out csr.pem

openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

2. **images (dossier)**
   Créez ce dossier dans le dossier backend
   À l'intérieur du dossier, créez 2 sous-dossiers nommés : "post-images" et "profile-pictures"
3. **dotEnv (fichier)**

Créez un fichier sans nom avec uniquement le format ".env" et copiez le texte ci-dessous :

```
ACCESS_TOKEN_SECRET =
"8147cff8ad9a0054af1300de72ae8f12042bbfe99bd73cd1ea442b8c700f6249
7d92bcec3e896d40d719c69297bf244d24d057fb9eb1f3006edc9cb1e1ebf8f9
b7dd180a59c9b9f25b1802d4026b8943d586f36904220a43f45e8bb786564fbf
cd5b1b7839fa143213e859dc7466f47a05bca3fec462d872126e582dc8859f64
6afdd5a208d635d3c6edd24d979b96c87a733a3d260bbe13dbec52427c0cbcee
b90d1a18f53c3c1c1eaf28ab5d263482b495aaf6b2ef98dca74e4ff8f8da37d8
c0ea45e4f20a8df9c0b18fedba03fb268a0d9d62a24d79be9b0c506cc8538397
f24828bc21e4f4c82efea9cabab2b4016416f11c70732cbbb9998a1b623f9704
1f8c66ceee804daf5f506d34d66d7897cada4406487c45a2f423389b2de04e96
cea1c717bb8c043479e1e175df0cdad07d9a9e1360453a9fcd8f9d430d0f67cb
cf7adb94df6ea4685322f6b6fa7383bf751b2b1caca8e1f171645ce129745431
8380edef43f6defabf0c89544a25a6ec74a47ec40294b1dd67fa93d739018643
103b8402e8f2d19f05a00b69aa2edbfcfd89c2bfba1f2e0284417560ed91e6df
c7bcd838cc32c14ab6d5e0b15fc321dedb83092e99333fe97c29ae53c55aff32
6d3fb0949ea19312f12d1fddd63e9cadd2feaf31bc41c02ffe62602cccfd124f"

DB_HOST =  "localhost"

DB_USER =  "[Nom d'utilisateur de votre base de donnée]"

DB_PASSWORD =  "[Mot de passe de votre base de données]"

DB_NAME =  "groupmania-openclassrooms-db"

DB_DIALECT =  "[Votre SGBDR, ex: MySQL, PostgreSQL, MariaDB...]"
```

## c) Fonctionnement de l'API

L'API est séparée en 2 routes :

- -Une route `auth/` pour l'inscription et connexion :

| Verbe HTTP | Point d'accès      | Corps de la requête                                        | Type de réponse attendue                | Fonction                                                                     |
| ---------- | ------------------ | ---------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| POST       | /api/auth/signup   | {<br>user_email: [string],<br>user_password: [string]<br>} | {<br>message: [string]<br>}             | Inscrit l'utilisateur dans le base de données <br>avec un mot de passe haché |
| POST       | /api/auth/login    | { user_email: [string], user_password: [string] }          | { user_id: [integer], token: [string] } | Connecte l'utilisateur                                                       |
| POST       | /api/auth/loginMod | { user_email: [string], user_password: [string] }          | { user_id: [integer], token: [string] } | Connecte l'administrateur avec les droits CRUD                               |

- Une autre `post/` route pour les posts

| Verbe HTTP | Point d'accès                          | Corps de la requête                                              | Type de réponse attendue | Fonction                                              |
| ---------- | -------------------------------------- | ---------------------------------------------------------------- | ------------------------ | ----------------------------------------------------- |
| GET        | /api/posts/                            | -                                                                | Tableau de posts         | Renvoit le tableau d'objets avec tous les posts       |
| GET        | /api/posts/:postId                     | -                                                                | Post unique              | Renvoit le post sous forme d'objet                    |
| POST       | /api/posts/                            | { title: [string], description: [string], image_url?: [fichier]} | {message: [string]}      | Crée le post et la sauvegarde dans la base de données |
| PUT        | /api/posts/:postId                     | { title: [string], description: [string], image_url?: [fichier]} | {message: [string]}      | Met à jour le post et sauvegarde les modifications    |
| DELETE     | /api/posts/:postId                     | -                                                                | {message: [string]}      | Supprime le post de (manière "douce")                 |
| POST       | /api/posts/:postId/like                | { user_id: [integer]}                                            | {message: [string]}      | Ajoute un like à un post                              |
| POST       | /api/posts/:postId/comments            | { user_id: [integer], comment: [string]}                         | {message: [string]}      | Crée un commentaire dans un post                      |
| GET        | /api/posts/:postId/comments            | -                                                                | {message: [string]}      | Récupère tous les commentaires d'un post              |
| PUT        | /api/posts/:postId/comments/:commentId | { user_id: [integer], comment: [string]}                         | {message: [string]}      | Met à jour le commentaire d'un post                   |
| DELETE     | /api/posts/:postId/comments/:commentId | -                                                                | {message: [string]}      | Supprime le commentaire d'un post                     |

## 2. Comment compiler le Front-end et démarrer le serveur Back-end

Pour le Front-end, il faudra compiler l'application Angular avec la commande :
`ng serve`

Pour le Back-end, il faudra démarrer le serveur avec nodemon en exécutant la commande :
`nodemon server`

**Si aucune de ces 2 commandes ne marche,** 2 solutions:

1. Utilisez-le "Command Prompt" ou "Terminal GitBash" au lieu du Powershell

2. Exécutez à la place:

-`npm run ng-serve` → Front-end

-`npm run nodemon` → Back-end
