# Guide de Déploiement Vercel - Étape par Étape

## ✅ Préparation Terminée

Votre application est maintenant prête pour le déploiement sur Vercel avec les variables d'environnement.

## 📋 Étapes de Déploiement (15 minutes)

### Étape 1 : Initialiser Git et Créer le Repository

```bash
# Ouvrez PowerShell ou CMD dans le dossier du projet
cd "c:\Users\PF1\Downloads\Digital Equity\mckinsey-style-strategy-visualizer"

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - McKinsey Strategy Visualizer ready for deployment"
```

### Étape 2 : Créer un Repository GitHub

1. **Allez sur [github.com](https://github.com)**
2. **Cliquez sur le "+" en haut à droite** → "New repository"
3. **Configurez le repository** :
   - Repository name: `mckinsey-strategy-visualizer`
   - Description: "AI-powered McKinsey-style strategy deck generator"
   - Visibilité: **Private** (recommandé pour protéger votre code)
   - **NE PAS** cocher "Initialize this repository with a README"
4. **Cliquez sur "Create repository"**

### Étape 3 : Pousser le Code sur GitHub

GitHub vous donnera des commandes. Utilisez celles-ci :

```bash
# Remplacez YOUR_USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/YOUR_USERNAME/mckinsey-strategy-visualizer.git
git branch -M main
git push -u origin main
```

**Note** : Si c'est votre première fois avec Git, il vous demandera de vous connecter à GitHub.

### Étape 4 : Déployer sur Vercel

#### 4.1 Créer un Compte Vercel
1. **Allez sur [vercel.com](https://vercel.com)**
2. **Cliquez sur "Sign Up"**
3. **Choisissez "Continue with GitHub"**
4. **Autorisez Vercel** à accéder à vos repositories

#### 4.2 Importer le Projet
1. **Sur le dashboard Vercel**, cliquez sur **"Add New..."** → **"Project"**
2. **Trouvez votre repository** `mckinsey-strategy-visualizer`
3. **Cliquez sur "Import"**

#### 4.3 Configurer le Projet
Vercel détectera automatiquement que c'est un projet Vite. Vous verrez :
- **Framework Preset**: Vite ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅

#### 4.4 **IMPORTANT : Ajouter la Variable d'Environnement**

**Avant de cliquer sur "Deploy"** :

1. **Dépliez la section "Environment Variables"**
2. **Ajoutez la variable** :
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSyAh291crlxNSqCBWZAZPlZNAFpmsQ44A1w`
   - **Environnements** : Cochez les 3 cases :
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. **Cliquez sur "Add"**

#### 4.5 Déployer
1. **Cliquez sur "Deploy"**
2. **Attendez 2-3 minutes** pendant que Vercel :
   - Clone votre code
   - Installe les dépendances
   - Build l'application
   - Déploie sur leur CDN global

### Étape 5 : Tester l'Application Déployée

Une fois le déploiement terminé :

1. **Vercel vous donnera une URL** comme :
   ```
   https://mckinsey-strategy-visualizer.vercel.app
   ```

2. **Cliquez sur "Visit"** ou ouvrez l'URL dans votre navigateur

3. **Testez l'application** :
   - Entrez un prompt : "Create a digital transformation strategy for retail"
   - Cliquez sur le bouton éclair ⚡
   - Attendez 30-60 secondes
   - **Vous devriez voir 5 slides générées avec images** ✅

### Étape 6 : Sécuriser votre API Key (Recommandé)

Votre clé API est exposée côté client. Pour la sécuriser :

1. **Allez sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)**
2. **Trouvez votre clé API** `AIzaSyAh291crlxNSqCBWZAZPlZNAFpmsQ44A1w`
3. **Cliquez sur "Edit"**
4. **Ajoutez des restrictions** :
   - **Application restrictions** → **HTTP referrers**
   - Ajoutez : `https://mckinsey-strategy-visualizer.vercel.app/*`
   - Ajoutez aussi : `https://*.vercel.app/*` (pour les previews)
5. **API restrictions** → Restreindre aux APIs :
   - Generative Language API
6. **Sauvegardez**

## 🎉 C'est Terminé !

Votre application est maintenant déployée et accessible publiquement sur :
```
https://mckinsey-strategy-visualizer.vercel.app
```

## 🔄 Mises à Jour Futures

Pour mettre à jour l'application :

```bash
# Faites vos modifications
# Puis :
git add .
git commit -m "Description de vos changements"
git push
```

Vercel redéploiera automatiquement ! 🚀

## 📊 Monitoring

Sur le dashboard Vercel, vous pouvez voir :
- Nombre de visiteurs
- Temps de chargement
- Logs d'erreurs
- Analytics

## ❓ Problèmes Courants

### "Build failed"
- Vérifiez que `VITE_GEMINI_API_KEY` est bien configurée
- Regardez les logs de build sur Vercel

### "Application ne génère pas de slides"
- Vérifiez que la variable d'environnement est bien définie
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### "API key not valid"
- Vérifiez que la clé API n'a pas de restrictions qui bloquent Vercel
- Vérifiez qu'elle est bien copiée sans espaces

## 🆘 Besoin d'Aide ?

Si vous rencontrez des problèmes, vérifiez :
1. Les logs de déploiement sur Vercel
2. La console du navigateur (F12 → Console)
3. Que la variable d'environnement est bien définie
