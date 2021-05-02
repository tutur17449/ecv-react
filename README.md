# Rendu React-Redux

Alex LYS - Raphaël HERBLOT - Arthur HAMEL

- Groupe de 3
- A rendre avant le 15 mai à 00h00/14 mai 23h59
- Envoyer le repo a : jrmbourel@gmail.com
- Dans le readme, les noms/prenoms de tous les participants doivent être inscrit

## Commandes

```bash
# Installation du projet
npm install
cd db
npm install

# Lancement frontend
npm start

# Lancement backend
npm run start:db
```

## Comptes demo

Utilisateur standard

> user@test.fr - test

Utilisateur admin

> admin@test.fr - test

## Outils à utiliser

- [json-server](https://github.com/typicode/json-server)
- [Redux](https://redux.js.org/)
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [React-paginate](https://github.com/AdeleD/react-paginate)

## Pages

- [ ] Profile
- [ ] Edition profile
- [x] Articles
- [x] Article
- [ ] Accueil
- [ ] Register
- [ ] Login
- [x] Edition d'articles
- [x] Creation d'articles

## Contenu des pages

### Accueil

- [x] Afficher les trois derniers articles

### Profile

- [ ] Afficher toutes les informations de l'utilisateur (nom, prénom, âge, photo de profil)
- [ ] Bouton permettant à l'utilisateur de modifier son profil

### Articles

- [x] Pagination
- [x] Seule la personne ayant cree son article peut le supprimer

### Article

- [x] Afficher les informations (titre, image, description, prix)
- [x] Pouvoir choisir la quantité

## Composants requis

- [x] Header (connexion/deconnexion)
- [x] Footer

## Models

### User

- Nom
- Prenom
- Image (url)
- Role
- Email
- Date de creation

### Article

- Nom
- Image
- Description
- Prix
- user_id
- Date de creation

## Bonus

- [x] Rechercher un article
- [ ] Filtrer par catégorie

## Model

### Category

- Nom
- Image
- user_id

## Pages

- [ ] Creation de categories
- [ ] Edition de categories

### Accueil

- [ ] Afficher toutes les catégories (seul la personne ayant creer la categorie peut la supprimer)
