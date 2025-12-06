# Deployment Options for Edge-Netic

Edge-Netic can be deployed in two ways:

## Option 1: Vercel (Recommended) - Current Setup ✅

**Best for**: Production deployment with automatic CI/CD

### Configuration
- `next.config.js`: No `output: 'export'`
- `package.json`: `"start": "next start"`
- `vercel.json`: Includes WebGPU headers

### Deploy
```bash
# Commit changes
git add .
git commit -m "Deploy to Vercel"
git push

# Vercel auto-deploys, or manually:
vercel --prod
```

### Local Testing
```bash
npm run build
npm start
# Visit http://localhost:3000
```

---

## Option 2: Static Export (For Static Hosting)

**Best for**: GitHub Pages, Netlify, or any static file hosting

### Configuration Changes Needed

1. **Update `next.config.js`**:
```javascript
const nextConfig = {
  output: 'export',  // Add this line
  // ... rest of config
};
```

2. **Update `package.json`**:
```json
{
  "scripts": {
    "start": "npx serve@latest out"
  }
}
```

3. **Remove or rename `vercel.json`** (not needed for static hosting)

### Deploy
```bash
npm run build
# Upload the 'out' directory to your static host
```

### Local Testing
```bash
npm run build
npm start
# Visit http://localhost:3000
```

---

## Current Setup (Vercel Mode)

Your app is currently configured for **Vercel deployment**. This means:

✅ Works on Vercel with automatic deployments  
✅ Works locally with `npm start`  
✅ Session persistence prevents redirect loops  
✅ WebGPU headers configured  

---

## Switching Between Modes

### To Switch to Static Export:

```bash
# 1. Edit next.config.js - add output: 'export'
# 2. Edit package.json - change start script to serve
# 3. Rebuild
npm run build
npm start
```

### To Switch Back to Vercel:

```bash
# 1. Edit next.config.js - remove output: 'export'
# 2. Edit package.json - change start script to next start
# 3. Rebuild
npm run build
npm start
```

---

## Recommendation

**Keep the current Vercel setup** because:
- ✅ Automatic deployments on git push
- ✅ Better routing and state management
- ✅ No redirect loop issues
- ✅ Works locally and in production
- ✅ Free tier available

Only switch to static export if you specifically need to deploy to a static file host like GitHub Pages.
