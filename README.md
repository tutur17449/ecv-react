# Rendu React-Redux

- Groupe de 3
- A rendre avant le 15 mai à 00h00/14 mai 23h59
- Envoyer le repo a : jrmbourel@gmail.com
- Dans le readme, les noms/prenoms de tous les participants doivent être inscrit

## Outils à utiliser

- [json-server](https://github.com/typicode/json-server)
- [Redux](https://redux.js.org/)
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [React-paginate](https://github.com/AdeleD/react-paginate)

## Pages

- Profile
- Edition profile
- Articles
- Article
- Accueil
- Register
- Login
- Edition d'articles
- Creation d'articles

## Contenu des pages

### Accueil

- Afficher les trois derniers articles

### Profile

- Afficher toutes les informations de l'utilisateur (nom, prénom, âge, photo de profil)
- Bouton permettant à l'utilisateur de modifier son profil

### Articles

- Pagination
- Seule la personne ayant cree son article peut le supprimer

### Article

- Afficher les informations (titre, image, description, prix)
- Pouvoir choisir la quantité

## Composants requis

- Header (connexion/deconnexion)
- Footer

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

- Rechercher un article
- Filtrer par catégorie

## Model

### Category

- Nom
- Image
- user_id

## Pages

- Creation de categories
- Edition de categories

### Accueil

- Afficher toutes les catégories (seul la personne ayant creer la categorie peut la supprimer)
