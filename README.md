# [P7] Groupomania par Younes LAHOUITI

## 1. Comment installer le projet sur votre ordinateur

Le projet utilise des paquets de Node et un serveur en HTTPS, il faudra installer 2 logiciels sur votre ordinateur pour pouvoir utiliser les commandes `npm...` et `openssl`

1. [Node.js](https://nodejs.org/en/)
   L'installation est simple, il suffit de cliquer sur "Download for Windows (x64)"

2. [OpenSSL (Windows)]()

**Ce projet est séparé en 2 dossiers extrêmement importants :**

\-Front-end

\-Back-end

Pour pouvoir utiliser la Base de données, il faudra installer un SGBD SQL, préfèrablement [PostgreSQL](https://www.postgresql.org/download/).

### a) Installation des paquets NPM de Node.js:

**Pour chacun de ces 2 dossiers il faudra installer des paquets npm:**

\-Front-end: Angular → `npm -g @angular/cli`

\-Back-end:

| Paquet             | Fonctionnement/Utilité                                                                            | installation               |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------------------- |
| Express            | Framework Back-end pour les routes de notre API                                                   | `npm i express`            |
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

### b) Configuration des fichiers "ignorés"

Ce projet contient 3 fichiers ou dossiers indispensables qui n'ont pas été envoyés sur GitHub pour des motifs de sécurité :

1.  **Certificate (dossier)**
    Créez ce dossier dans le dossier backend
    créez 2 fichiers :`key.pem` et ⁣`cert.pem`
    Et renseignez respectivement leurs valeurs dedans :

```pem
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxJxTqszzJ7SjX
bOhr15DQFLcfWnODQLRzVNTS2NhpHYSjyCnQ7Kpr1gWzoXkv10ULNfmnhr49vuab
KH6eAJo491wy3WD7H70ir0Rs/RuBquSFWyH2XznrujZSTYk27kjBAK2dCxlEz+TI
Z9DfXmI7P8qdXVK6/T10p1PmaAlw2HONJK3VH1oG01H2ytw5KDpAkbLsq9jRSEdI
ngi1VmPHoq5a+sZMsy6Hb8fxQWZX6lJkDr8eXACoLjg0AjkgN9QQK8bi1Xijj92z
47fAQATL+wCKkvjH8SiVEf0pg1MKS+7xTF6SI4bFOzd++babJUlO66fgbcxpaNlK
bf5DBa1lAgMBAAECggEAWCoDFustDbGh6dSht0oJIAWvPUNeyauiIuPNJ0IUMfwm
zvwHE5s1FYXmQIfUMCMKkZHDNcSxWTlwuzdkDG5wUnmIwSe75D7feiuP+k3dKqNK
J7Q7KsopoU+DSWKdL2FXg/Y6cTXc1YpBahuAsCng6WvOApM3YSg3NZ8w+jI8wJOk
roeoqlvJiZRu+TQ4ZjWjsrQcbbWGp2QJfmNm6WP6LXuoXK/1FBlT2gDE4W04xjen
XdY1zYw3RWCkKMYmqlM5rgHyGTRUs3ynL0P2q/PJu8dnX0NwepNu8u4wuR+VCj2Z
NLq03nA3IHdPK6c9QeXnnldWVzY99MFZQxX2w69/4QKBgQDYg+ShIGslfCdy/EYi
FudZY6CZfsXqzS92qHJXZjqTxJl4hdGlyex5fmUgq5+Y87d78ulBr4zzYyBojwym
4xlzZxdclmUJKHs+ivUz8VaX7KONwm7hG0ql5/tAkts80EHuezS4H38cvzV+7kVj
1CoMo8qPSdChss1iH5L/N0ZhIwKBgQDRdYfzsvk+vAqOT3MyG902si60UjEek+48
Syz4Obyn4HR5hNkd96SsuIHG9uAS7+fiRDT4iXqvcnPlzG/Uiub22PYF/wenPaj5
/PP+cLSi0ENEg91kO4hb0jiNcAmdt0l067uF2aSPEKV2/Of+UGga6o6BJa3kPOxb
MMOPhAGT1wKBgD0rDeVjdkHR0IdQtDOfSt7bIZ0bzqhmLXmVXzBH5lam3UDKdY8j
+9XbGpDfS6h3eiffWXzALs73+0ju2QEw+Zi70ELNDmBG+oKR2XJCRVeIeDBtdMvN
3Qn//uCgXKXSpD3OuvclltC1SFTC1gG9B+AoSeqvTOzRyeplxy6pHA4HAoGAaQMs
0vBi56HtBOYuUewIXzi8E6m1eKgf49ioxhZkUCJHIvmIxO54gCPM5My3EKd4sUcS
65w5hyaxln+FfaDaJN4nkmAHHUDbq+G3DlTBK3OQlhQqdesm9SoTMk3+dDUFPfpF
vNieGR/2ZQ5s3WLAnuYD5hnW8bvdn+Z11UkQZWcCgYAVbyY0h9XDQxLmjTQu9oDM
CX2m664w/sWMZJ3QxyJ1FmKjtM5kQZzKeMboKNO5pCAlNP1i69M/M0S6QnKnnal7
jxGrp/++elQemKC6+0KoZO+upda3enw4/EQDX23FhyAlKi6eBHzv2eFnBYorMaJe
BYwuIDvd1zbPNIDx7otkbQ==
-----END PRIVATE KEY-----

-----BEGIN CERTIFICATE-----
MIIDETCCAfkCFFVgeQhHkqKf6qM/FV5Bpcc5S1LMMA0GCSqGSIb3DQEBCwUAMEUx
CzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRl
cm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMjIwNTEzMDcwMDE3WhcNMjMwNTEzMDcw
MDE3WjBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UE
CgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOC
AQ8AMIIBCgKCAQEAsScU6rM8ye0o12zoa9eQ0BS3H1pzg0C0c1TU0tjYaR2Eo8gp
0Oyqa9YFs6F5L9dFCzX5p4a+Pb7mmyh+ngCaOPdcMt1g+x+9Iq9EbP0bgarkhVsh
9l8567o2Uk2JNu5IwQCtnQsZRM/kyGfQ315iOz/KnV1Suv09dKdT5mgJcNhzjSSt
1R9aBtNR9srcOSg6QJGy7KvY0UhHSJ4ItVZjx6KuWvrGTLMuh2/H8UFmV+pSZA6/
HlwAqC44NAI5IDfUECvG4tV4o4/ds+O3wEAEy/sAipL4x/EolRH9KYNTCkvu8Uxe
kiOGxTs3fvm2myVJTuun4G3MaWjZSm3+QwWtZQIDAQABMA0GCSqGSIb3DQEBCwUA
A4IBAQBHefbto3/lRUe2kmWvlX9DR2rLLQb842U68LfVmvPLXWa6kekLzf8x/NM6
hbr6su2ziKoAvyxKaTJVkfOngjNCl1lkhgq7tjhajCpsLZO+0mjNH64A9F4JNGT8
bsWgGaMMf3vm9XQAlK9CCf8TC7Fy7bGR9wqN2ugEpgp071mS4zJXDWI/G2e3nTcQ
zbMo+qG3qw1X8GXWJTUmo+d0e8QP73T6qxQkPy02NSHO6rzfLo/Uyeko0U9AvMoj
qGDTT1GEMEBG4dXNZzAfsCVvAMDOrAmDFUXSCT6wYg8hU4cN0FoeZCmcJ6x1W9gL
PFDojrxj63rjrXrKBZC4lnrJBk6U
-----END CERTIFICATE-----

```

2. **images (dossier)**
   Créez ce dossier dans le dossier backend
   À l'intérieur du dossier créez 2 sous-dossiers nommés: "post-images" et "profile-pictures"
3. **.env (fichier)**
