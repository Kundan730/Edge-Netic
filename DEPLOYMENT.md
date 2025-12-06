# Deployment Guide

## Quick Deploy

Edge-Netic is a static Next.js app that can be deployed to any static hosting service.

## Recommended Platforms

### 1. Vercel (Easiest)
```bash
npm install -g vercel
vercel deploy
```

### 2. Netlify
```bash
npm run build
# Upload 'out' directory to Netlify
```

### 3. GitHub Pages
```bash
npm run build
# Push 'out' directory to gh-pages branch
```

### 4. Cloudflare Pages
```bash
npm run build
# Connect repo to Cloudflare Pages
# Build command: npm run build
# Output directory: out
```

## Important Notes

1. **WebGPU Requirement**: Users MUST have WebGPU-compatible browsers
2. **HTTPS Required**: PWA features require HTTPS (localhost is OK for dev)
3. **Headers**: Ensure proper CORS headers for service worker
4. **Storage**: Users need ~800MB free space for model caching
5. **Memory**: Recommend 2GB+ RAM for smooth operation

## Environment Configuration

No environment variables needed! Everything runs client-side.

## Post-Deployment Checklist

- [ ] Verify WebGPU detection works
- [ ] Test model download on fresh browser
- [ ] Verify PWA installability
- [ ] Test offline functionality (disconnect network)
- [ ] Check mobile responsiveness
- [ ] Verify chat functionality
- [ ] Test localStorage persistence

## Performance Optimization

The web-llm bundle is large (~5.5MB). Consider:

1. **CDN Configuration**: Use fast CDN for static assets
2. **Caching**: Leverage browser caching for chunks
3. **Compression**: Enable gzip/brotli compression
4. **Lazy Loading**: Already implemented via dynamic imports

## Security Headers (Recommended)

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; worker-src 'self' blob:; connect-src 'self' https://huggingface.co;
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Monitoring

Since everything runs client-side:
- Use browser dev tools for debugging
- Monitor download success rates
- Track WebGPU compatibility stats
- Log client-side errors (optional)

## Updates

To update the AI model:
1. Change model name in `app/chat/page.tsx`
2. Rebuild and redeploy
3. Users will download new model on next visit

## Cost Considerations

- **Hosting**: Free tier available on most platforms
- **Bandwidth**: Initial ~800MB per new user for model
- **Compute**: Zero - all happens client-side!
- **Storage**: Minimal - static files only

## Scaling

The app scales infinitely since computation happens client-side:
- No server resources needed
- No API rate limits
- No concurrent user limits
- Just bandwidth for initial model download
