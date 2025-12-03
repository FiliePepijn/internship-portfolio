# Open Graph Images - Static Generation

This portfolio generates custom Open Graph (OG) images for each project **without any backend** - completely static!

## How It Works

### 1. Build-Time Generation
OG images are generated as static PNG files during the build process:
- Script: [scripts/generate-og-images.js](scripts/generate-og-images.js)
- Uses `satori` to render images from React-like objects
- Uses `sharp` to convert SVG to PNG
- Generated files: `public/og/project-1.png` through `project-6.png`

### 2. Project Pages
Each project has its own page with a unique URL:
- `/project/1` - E-Commerce Platform
- `/project/2` - Task Management App
- `/project/3` - Weather Dashboard
- `/project/4` - Portfolio Website Builder
- `/project/5` - Chat Application
- `/project/6` - Analytics Dashboard

### 3. Meta Tags
Each project page includes proper OG meta tags pointing to the static images:
```html
<meta property="og:image" content="https://platour.net/og/project-1.png" />
```

## Generated Image Features

Each OG image (1200x630px) includes:
- 🎨 **Project icon** - Large emoji icon
- 📝 **Project title** - Bold, prominent title
- 💬 **Description** - Short project description
- 🏷️ **Technology tags** - Key technologies used
- 🌐 **Branding** - platour.net watermark

## Build Process

When you run `npm run build`:
1. `npm run generate-og` runs first
2. Generates 6 PNG images in `public/og/`
3. Vite build copies them to `dist/og/`
4. Ready to deploy!

## File Structure

```
├── scripts/
│   ├── generate-og-images.js     # Image generation script
│   ├── NotoSans-Bold.ttf         # Font for rendering
│   └── NotoSans-Regular.ttf      # Font for rendering
├── public/
│   └── og/
│       ├── project-1.png         # Generated OG images
│       ├── project-2.png
│       └── ... (project-6.png)
├── src/
│   ├── pages/
│   │   └── ProjectPage.jsx       # Individual project pages
│   ├── data/
│   │   └── projects.js           # Shared project data
│   └── AppRouter.jsx              # Routing configuration
└── dist/                          # Build output (after npm run build)
    └── og/                        # OG images copied here
```

## Commands

```bash
# Generate OG images only
npm run generate-og

# Build project (includes OG image generation)
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

## Deployment

### Cloudflare Pages (via GitHub)
1. Push to GitHub
2. Cloudflare automatically builds (`npm run build`)
3. OG images are generated and deployed
4. Share project URLs - OG images work automatically!

### Manual Deployment
```bash
npm run build
npm run deploy
```

## Testing OG Images Locally

1. Build the project: `npm run build`
2. Preview: `npm run preview`
3. Visit: `http://localhost:4173/project/1`
4. Check OG image: `http://localhost:4173/og/project-1.png`

## Social Media Support

When you share a project URL, these platforms will show your custom OG image:
- ✅ Twitter/X
- ✅ Facebook
- ✅ LinkedIn
- ✅ Discord
- ✅ Slack
- ✅ WhatsApp
- ✅ Any platform supporting Open Graph

## Customizing Images

Edit [scripts/generate-og-images.js](scripts/generate-og-images.js) to customize:
- Colors and gradients
- Layout and spacing
- Font sizes
- Background patterns
- Image dimensions

Then rebuild:
```bash
npm run generate-og
```

## No Backend Needed! 🎉

- ✅ Pure static files
- ✅ Generated at build time
- ✅ No serverless functions
- ✅ No API endpoints
- ✅ Perfect for Cloudflare Pages
- ✅ Fast and reliable
