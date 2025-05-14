# Projet Restructuré - Frontend/Backend

Ce projet a été restructuré pour séparer le frontend (React) du backend (Laravel).

## Structure

- `frontend/` : Application React utilisant Vite, React et Tailwind CSS
- `backend/` : API Laravel

## Configuration du projet

### Étape 1: Configuration du Backend

1. Copiez tous les fichiers du projet Laravel existant dans le dossier `backend/`, à l'exception des éléments frontend.

2. Mettez à jour le fichier `.env` du backend pour configurer CORS:

```
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

3. Configurez vos routes pour qu'elles utilisent le préfixe `/api`.

4. Installez les dépendances du backend:

```bash
cd backend
composer install
```

### Étape 2: Configuration du Frontend

1. Installez les dépendances du frontend:

```bash
cd frontend
npm install
```

2. Le frontend est déjà configuré pour communiquer avec le backend à travers le proxy défini dans `vite.config.js`.

## Exécution du projet

### Backend (API Laravel)

```bash
cd backend
php artisan serve
```

Le backend sera disponible à l'adresse http://localhost:8000

### Frontend (React)

```bash
cd frontend
npm run dev
```

Le frontend sera disponible à l'adresse http://localhost:3000

## Développement

### Structure du Frontend

- `src/components/` : Composants React réutilisables
- `src/pages/` : Pages principales de l'application
- `src/services/` : Services pour communiquer avec l'API
- `src/context/` : Context API pour gérer l'état global

### Structure du Backend

- `app/Http/Controllers/Api/` : Contrôleurs d'API
- `routes/api.php` : Routes d'API
- `app/Models/` : Modèles de données

## Communication Frontend/Backend

Le frontend communique avec le backend via des requêtes HTTP. Toutes les requêtes à `/api/*` depuis le frontend sont automatiquement proxifiées vers le backend grâce à la configuration dans `vite.config.js`. 