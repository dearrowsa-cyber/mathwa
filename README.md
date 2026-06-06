# MATHWA - Charity Organization Website

A beautiful, modern charity organization website built with React.js, Tailwind CSS, and Vite.

## 🚀 Ready for Shared Hosting!

✅ Production build complete and optimized
✅ All files ready to upload
✅ No backend or Node.js required
✅ Size: ~75 KB (gzipped)

**Start deploying now:** See [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md)

## Features

✨ **Modern Design**
- Beautiful, responsive UI with Tailwind CSS
- Smooth animations and transitions
- Dark mode ready infrastructure
- Professional color scheme

📱 **Responsive**
- Mobile-first design approach
- Works perfectly on all devices
- Tablet and desktop optimized

🌍 **Multilingual**
- English and Arabic support
- RTL language support
- Easy language switching

🔧 **Technology Stack**
- React 18.2.0
- Tailwind CSS 3.4.1
- Vite 5.0.8
- React Router 6.20.0
- Lucide React Icons
- Axios for API calls

## Pages

1. **Home** - Beautiful landing page with stats and services
2. **About** - Organization story, vision, mission
3. **News** - News listing with search and filtering
4. **News Detail** - Individual news article view
5. **Volunteering** - Volunteer opportunities and registration
6. **Volunteer Registration** - Registration form
7. **Volunteer Opportunities** - Browse opportunities
8. **Volunteer Application** - Apply for opportunities
9. **Donation** - Donation platform with various amounts
10. **Contact** - Contact form and information
11. **Beneficiary Services** - Available services list
12. **Beneficiary Registration** - Beneficiary signup
13. **Membership** - Membership tiers and benefits
14. **Board Members** - Leadership team
15. **Photo Albums** - Photo gallery
16. **Video Albums** - Video gallery
17. **Partnership** - Partnership information
18. **Annual Reports** - Downloadable reports

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm (for development only)

### Development Setup

1. **Navigate to the FrontendReact folder:**
```bash
cd FrontendReact
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
https://mathwaa.org.sa (or next available port)
```

## Shared Hosting Deployment

### ✅ Production Build (Ready to Upload!)

The `dist/` folder contains everything needed for shared hosting:

```bash
# Build for production
npm run build

# All files are in dist/ folder
# Ready to upload to any shared hosting!
```

### Quick Upload Steps

1. **Get FTP credentials** from your hosting provider
2. **Connect via FTP** (FileZilla, WinSCP, or File Explorer)
3. **Upload files** from `dist/` to `public_html/`
4. **Include .htaccess** file for routing
5. **Visit your domain** - Done!

👉 **Detailed instructions:** Read [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md) or [HOSTING_SETUP.md](HOSTING_SETUP.md)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Project Structure

```
FrontendReact/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── styles/           # Global CSS and Tailwind setup
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # React entry point
├── index.html            # HTML entry point
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary color: `#2d5016` (Green)
- Secondary color: `#8fbc8f` (Light green)
- Accent color: `#d4a373` (Beige)

### Content
Update text translations in the `translations` object within each page component.

### Styling
Global styles are in `src/styles/index.css` with custom Tailwind components.

## API Integration

Update API endpoints in your service files to connect with the backend:

```javascript
// Example API call
const response = await axios.get('https://mathwaa.org.sa:8000/api/...')
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size with Vite
- Code splitting with React Router
- Lazy loading ready
- Image optimization recommended

## Deployment

### 🏠 Shared Hosting (Easy!)

Perfect for production deployment on shared hosting providers (cPanel, GoDaddy, etc):

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder to hosting:**
   - Connect via FTP/SFTP
   - Upload all files from `dist/` to `public_html/`
   - Include `.htaccess` file

3. **Visit your domain**
   - Your site is live!
   - All routing handled by `.htaccess`

📖 **Complete guide:** See [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md) or [HOSTING_SETUP.md](HOSTING_SETUP.md)

### ☁️ Cloud Platforms

**Vercel (Recommended)**
```bash
npm i -g vercel
vercel
```

**Netlify**
- Connect your GitHub repository
- Automatic deployments on push

**Other Platforms**
```bash
npm run build
# Deploy the 'dist' folder to your server
```

## Contributing

Guidelines for contributing to the project coming soon.

## License

© 2024 MATHWA All rights reserved.

## Support

For issues or questions, please contact: info@mathwa.org

---

Made with ❤️ by MATHWA Team

Built with React.js + Tailwind CSS ⚡
