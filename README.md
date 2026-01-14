# Jugantor Farewell Website 🕊️

A premium 3D interactive farewell experience for **Sajib Mollick**, created with love by the Jugantor Youth Association.

## Features

✨ **3D Animated Landing** - Beautiful particle effects powered by Three.js  
📅 **Interactive Timeline** - Journey from August 25, 2024 to January 19, 2026  
💌 **Real-time Message Board** - Leave messages powered by Firebase  
🎨 **Premium Design** - Glassmorphism, gradients, and smooth animations  
📱 **Fully Responsive** - Works perfectly on all devices  
🔗 **QR Code Access** - Easy sharing via QR code

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (free)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase** (Required for message board)
   - Follow the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Update `src/firebase/config.js` with your Firebase credentials

4. **Run development server**

   ```bash
   npm run dev
   ```

   - Open <http://localhost:5173/> in your browser

## Deployment to GitHub Pages

### First-Time Setup

1. **Install gh-pages package**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update repository name in `vite.config.js`**
   - Replace `'/jugantor-farewell/'` with your actual repository name
   - Example: If your repo is `https://github.com/username/sajib-farewell`
   - Change to: `base: '/sajib-farewell/'`

3. **Initialize Git (if not already done)**

   ```bash
   git init
   git add .
   git commit -m "Initial commit - Jugantor farewell website"
   ```

4. **Create GitHub repository**
   - Go to <https://github.com/new>
   - Create a new repository (e.g., `jugantor-farewell`)
   - Don't initialize with README

5. **Push to GitHub**

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

6. **Deploy to GitHub Pages**

   ```bash
   npm run deploy
   ```

7. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Select `gh-pages` branch
   - Save

8. **Access your site**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - Wait 2-3 minutes for first deployment

### Updating the Site

After making changes:

```bash
git add .
git commit -m "Update content"
git push origin main
npm run deploy
```

## Generating QR Code

Once deployed, generate a QR code for easy access:

1. **Get your live URL**
   - Example: `https://yourusername.github.io/jugantor-farewell/`

2. **Generate QR Code**
   - Use <https://www.qr-code-generator.com/>
   - Paste your URL
   - Download as PNG
   - Print and attach to the Panjabi!

## Customization

### Update Content

- **Farewell Message**: Edit `src/components/Farewell.jsx`
- **Timeline Milestones**: Edit `src/components/Timeline.jsx`
- **Hero Text**: Edit `src/components/Hero3D.jsx`

### Add Photos

1. Place photos in `public/images/` folder
2. Create a Gallery component (optional feature)
3. Import and display in the app

### Change Colors

Edit `src/styles/index.css`:

- Look for `:root` section
- Modify CSS variables (colors, spacing, etc.)

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animations
- **Firebase** - Real-time database
- **GitHub Pages** - Hosting

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ✅ Mobile browsers

## Support

For issues or questions:

1. Check `FIREBASE_SETUP.md` for Firebase issues
2. Check browser console for errors (F12)
3. Ensure all dependencies are installed
4. Verify Firebase configuration is correct

## Timeline

- **Created**: January 14, 2026
- **Presentation**: January 16, 2026
- **Sajib's Departure**: January 19, 2026

## License

Created with ❤️ by Jugantor Youth Association for Sajib Mollick's farewell.

---

**May God bless Sajib's journey ahead!** 🕊️
