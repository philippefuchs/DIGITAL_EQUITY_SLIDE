# Guide de Déploiement - McKinsey Strategy Visualizer

## 🚀 Déploiement sur Vercel (Recommandé)

### Prérequis
- Compte GitHub
- Compte Vercel (gratuit)
- Clé API Google Generative AI

### Étapes

#### 1. Préparer le Repository GitHub
```bash
# Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "Initial commit"

# Créer un repository sur GitHub et pousser le code
git remote add origin https://github.com/votre-username/strategy-visualizer.git
git push -u origin main
```

#### 2. Déployer sur Vercel

**Option A: Via l'interface web**
1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer votre repository GitHub
4. Vercel détectera automatiquement Vite
5. Ajouter la variable d'environnement:
   - Name: `GEMINI_API_KEY`
   - Value: Votre clé API Gemini
6. Cliquer sur "Deploy"

**Option B: Via CLI**
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Configurer la variable d'environnement
vercel env add GEMINI_API_KEY
```

#### 3. Configuration Post-Déploiement
- Votre app sera accessible sur: `https://votre-projet.vercel.app`
- Les déploiements futurs se feront automatiquement à chaque push sur GitHub

---

## 🌐 Déploiement sur Netlify

### Via Interface Web
1. Aller sur [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connecter votre repository GitHub
4. Configuration:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Variables d'environnement:
   - `GEMINI_API_KEY`: Votre clé API
6. Deploy

### Via CLI
```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

---

## 📦 Déploiement Manuel (Build Static)

### Build de Production
```bash
npm run build
```

Le dossier `dist/` contiendra tous les fichiers statiques prêts à être déployés sur n'importe quel hébergeur web (Apache, Nginx, etc.).

---

## 🔑 Obtenir une Clé API Google Generative AI

1. Aller sur [Google AI Studio](https://aistudio.google.com/apikey)
2. Se connecter avec un compte Google
3. Cliquer sur "Create API Key"
4. Copier la clé générée

### Sécuriser votre API Key
⚠️ **Important**: L'API key est exposée côté client dans cette application.

**Recommandations de sécurité:**
- Utiliser les restrictions d'API key dans Google Cloud Console:
  - Restreindre par HTTP referrer (votre domaine)
  - Limiter les quotas d'utilisation
- Pour une sécurité maximale, créer un backend proxy

---

## 🧪 Test Local

```bash
# Installer les dépendances
npm install

# Configurer l'API key
# Copier .env.example vers .env.local
cp .env.example .env.local
# Éditer .env.local et ajouter votre GEMINI_API_KEY

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur http://localhost:3000

---

## 📋 Checklist de Déploiement

- [ ] Code poussé sur GitHub
- [ ] Clé API Gemini obtenue
- [ ] Plateforme de déploiement choisie (Vercel/Netlify)
- [ ] Variable d'environnement `GEMINI_API_KEY` configurée
- [ ] Application déployée et accessible
- [ ] Test de génération de slides fonctionnel
- [ ] Test d'export PDF fonctionnel
- [ ] Restrictions API configurées (optionnel mais recommandé)

---

## 🐛 Dépannage

### Erreur "API key not found"
- Vérifier que `GEMINI_API_KEY` est bien configurée dans les variables d'environnement
- Sur Vercel/Netlify, redéployer après avoir ajouté la variable

### Images ne se génèrent pas
- Vérifier que votre clé API a accès à `gemini-2.5-flash-image`
- Vérifier les quotas de votre API key

### Build échoue
- Vérifier que toutes les dépendances sont dans `package.json`
- Vérifier la version de Node.js (recommandé: 18+)
