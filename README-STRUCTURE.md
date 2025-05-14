# Structure du Projet

Ce projet est structuré comme une application web moderne avec une séparation claire entre le backend et le frontend:

## Structure de Base

```
- app/                  # Logique métier et modèles Laravel
- bootstrap/            # Fichiers d'amorçage Laravel
- config/               # Configurations Laravel
- database/             # Migrations et seeders de base de données
- frontend/             # Application React standalone avec Create React App
  |- src/               # Code source React
    |- components/      # Composants React réutilisables
    |- Layouts/         # Layouts et templates de l'interface
    |- services/        # Services pour les appels API
    |- hooks/           # Custom React hooks
  |- public/            # Fichiers statiques frontend
  |- package.json       # Dépendances JavaScript pour le frontend
- public/               # Fichiers publics pour Laravel
- resources/            # Ressources Laravel (vues, langues)
  |- views/             # Templates de vues Laravel
  |- css/               # Feuilles de style CSS
- routes/               # Définition des routes (API et Web)
  |- api.php            # Routes API
  |- web.php            # Routes Web
- storage/              # Stockage de fichiers Laravel
- tests/                # Tests automatisés
- vendor/               # Dépendances PHP (gérées par Composer)
- .editorconfig         # Configuration d'éditeur
- .env                  # Variables d'environnement
- .gitattributes        # Configuration Git
- .gitignore            # Fichiers ignorés par Git
- artisan               # CLI Laravel
- composer.json         # Dépendances PHP
- phpunit.xml           # Configuration des tests
```

## Architecture

Ce projet suit une architecture avec:

1. **Backend Laravel** (racine du projet)
   - API RESTful pour le frontend
   - Logique métier dans `app/`
   - Routes API dans `routes/api.php`

2. **Frontend React** (dossier `frontend/`)
   - Application React autonome basée sur Create React App
   - Utilise Tailwind CSS pour le styling
   - Communique avec le backend via API

## Comment exécuter le projet

### Backend (API Laravel)

```bash
# À la racine du projet
php artisan serve
```

Le backend sera disponible à l'adresse http://localhost:8000

### Frontend (React)

```bash
# Dans le dossier frontend
cd frontend
npm install  # Première fois seulement
npm start
```

Le frontend sera disponible à l'adresse http://localhost:3000

## Note sur la structure

Cette structure sépare clairement le backend et le frontend, ce qui facilite:
- Le développement parallèle des équipes frontend et backend
- Le déploiement indépendant des deux parties
- L'utilisation de technologies spécialisées pour chaque partie 