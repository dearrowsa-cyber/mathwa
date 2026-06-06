# Shared Hosting Deployment Guide

## 📋 Pre-Deployment Checklist

- [x] Production build created (`npm run build`)
- [x] `.htaccess` file included for routing
- [x] All environment variables configured
- [ ] Domain/SSL certificate ready
- [ ] FTP/SFTP access ready

## 🚀 Deployment Steps

### Step 1: Upload Files to Shared Hosting

1. **Connect via FTP/SFTP** using your hosting provider's credentials
   - Host: `ftp.localhost` or provided by hosting
   - Username: Your hosting panel username
   - Password: Your hosting panel password

2. **Upload the `dist` folder contents** to your public_html directory:
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   └── assets/
       ├── index-*.css
       └── index-*.js
   ```

3. **Upload `.htaccess` to root** (if updating existing site)

### Step 2: Configure Domain

1. Point your domain to your hosting provider
2. Wait for DNS propagation (24-48 hours)
3. Access your site via `http://localhost`

### Step 3: API Configuration

Update API endpoints in your application:

Edit the API base URL in components:
```javascript
// src/utils/api.js or similar
const API_BASE = 'http://localhost/api'
```

### Step 4: Enable HTTPS (SSL)

1. Get free SSL certificate from Let's Encrypt (most hosting provides this)
2. Enable SSL in hosting control panel
3. Update `.htaccess` to force http:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ http://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## 📁 File Structure for Shared Hosting

```
public_html/
├── index.html (Main app file)
├── .htaccess (Routing & compression rules)
└── assets/
    ├── index-[hash].css (Tailwind styles)
    └── index-[hash].js (React app bundle)
```

## ⚙️ Shared Hosting Features

✅ **Automatic Routing**
- All routes redirect to index.html
- React Router handles client-side navigation
- No need for server configuration

✅ **Performance Optimization**
- CSS/JS files cached for 1 year
- HTML not cached (always fresh)
- Gzip compression enabled
- Minified CSS & JS in build

✅ **Security Headers**
- Content-Type validation
- XSS protection
- Frame options set
- Directory listing disabled

## 🔍 Troubleshooting

### Issue: Page not found (404) on refresh
**Solution:** `.htaccess` file ensures all routes redirect to index.html

### Issue: Styles not loading
**Solution:** Check CSS file names match in index.html (hashes may differ)

### Issue: API calls failing
**Solution:** Update API base URL in your code to match backend domain

### Issue: Images not showing
**Solution:** Rebuild with `npm run build` and re-upload assets folder

## 📊 Build Output Stats

```
dist/index.html                  0.96 kB │ gzip:  0.51 kB
dist/assets/index-*.css         22.12 kB │ gzip:  4.52 kB
dist/assets/index-*.js         232.11 kB │ gzip: 70.61 kB
                               ─────────────────────
Total bundled size:            255.19 kB │ gzip: 75.64 kB
```

## 🔄 Updating the Site

To update your site after changes:

1. Make changes to source files in `src/` folder
2. Run `npm run build`
3. Upload new files from `dist/` folder to hosting
4. Clear browser cache (Ctrl+Shift+Delete)
5. Force refresh page (Ctrl+F5)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🛡️ Security Notes

- All user inputs are sanitized
- No sensitive data stored in localStorage for production
- HTTPS enforced in .htaccess
- Security headers configured

## 💡 Performance Tips

1. **Images:** Replace gradient placeholders with actual images
2. **Lazy Loading:** Images load on demand
3. **Code Splitting:** React Router automatically splits code
4. **CDN:** Consider using CDN for assets in future
5. **Monitoring:** Setup uptime monitoring for your domain

## 🆘 Support

For issues with:
- **Hosting:** Contact your hosting provider
- **Domain:** Check domain registrar settings
- **App Code:** Review React and Tailwind documentation

## 📞 Contact Your Hosting Provider For:

- FTP/SFTP credentials
- PHP version check (not needed for this app)
- SSL certificate setup
- Cron jobs (if needed)
- Email forwarding
- Backup/restore options

---

**Ready to deploy!** Follow the steps above and your MATHWA charity website will be live! 🎉
