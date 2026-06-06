# Mathwaa - Setup Guide (سہولت سے چلانے کا طریقہ)

## Quick Start (فوری شروعات)

### Step 1: Start XAMPP
- Open XAMPP Control Panel
- Start **Apache** and **MySQL**

### Step 2: Run the Frontend
**Option A - Double-click:**
- Double-click `START.bat` in FrontendReact folder

**Option B - Command line:**
```bash
cd c:\xampp\htdocs\Mathwaa\FrontendReact
npm install
npm run dev
```

### Step 3: Open the UI
- Open browser: **https://mathwaa.org.sa**
- UI should be visible with Home, About, News, Donate, etc.

---

## Requirements
- Node.js 16+
- XAMPP (Apache + MySQL)
- npm

---

## Troubleshooting

**Blank/White screen?**
- Use `https://mathwaa.org.sa` (NOT file:// or mathwaa.org.sa/...)
- Must run `npm run dev` - don't open index.html directly

**API not loading data?**
- Ensure XAMPP Apache is running
- Backend should be at: https://mathwaa.org.sa/Backend/

**Port 3000 already in use?**
- Vite will auto-try 3001, 3002, etc.
- Or close the app using port 3000
