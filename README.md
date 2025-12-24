# Vim & Neovim Tutorial

A comprehensive, interactive tutorial for learning Vim and Neovim. Includes a **Vim/Neovim toggle** to switch between editor-specific content, interactive practice games, and extensive reference materials.

## Features

✨ **Toggle Between Vim & Neovim**
- Switch in navbar (top-left) to see editor-specific content
- Installation instructions
- Configuration examples
- Plugin recommendations
- Preference saved in browser

🎮 **Interactive Practice Games**
- Navigation challenges
- Editing exercises
- Combination challenges
- Hint system with progressive help
- Progress tracking

📚 **Comprehensive Content**
- Getting Started (philosophy, installation, first steps)
- Fundamentals (modes, navigation, editing, search, files)
- Intermediate (text objects, advanced motions)
- Advanced (configuration, plugins, Neovim-specific)
- Reference (cheatsheet, command index, external resources)

🔍 **Quick References**
- Printable cheatsheet
- Alphabetical command index
- Links to official documentation
- Vim vs Neovim comparison

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run docs:dev
```

Visit `http://localhost:5173` (or shown URL)

### Building for Production

```bash
# Build the site
npm run docs:build

# Preview production build
npm run docs:preview
```

Output is in `docs/.vitepress/dist/`

## Deploying to Netlify

### Option 1: GitHub + Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/vimLazy.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select GitHub repository
   - Netlify auto-detects settings from `netlify.toml`
   - Click "Deploy Site"

3. **Your site is live!**
   - Netlify provides a free URL
   - Automatic redeploys on git push
   - Custom domain support available

### Option 2: Direct CLI Deploy

```bash
npm install -g netlify-cli
netlify deploy --prod --dir docs/.vitepress/dist
```

## Project Structure

```
vimLazy/
├── docs/
│   ├── index.md                    # Home page
│   ├── getting-started/            # Why Vim, installation, philosophy
│   ├── fundamentals/               # Core concepts
│   ├── intermediate/               # Text objects, advanced motions
│   ├── advanced/                   # Configuration, plugins, Neovim
│   ├── practice/                   # Interactive games
│   ├── reference/                  # Cheatsheet, command index
│   └── .vitepress/
│       ├── config.ts               # Site configuration
│       ├── theme/
│       │   ├── index.ts            # Theme setup with toggle
│       │   ├── custom.css          # Custom styles
│       │   ├── components/         # Vue components
│       │   │   ├── ToggleEditor.vue
│       │   │   ├── VimGameEditor.vue
│       │   │   └── EditorContent.vue
│       │   └── composables/        # Vue composables
│       │       ├── useVimEditor.ts     # Editor toggle logic
│       │       ├── useVimGame.ts
│       │       └── useChallenges.ts
│       └── dist/                   # Build output
├── package.json
├── netlify.toml                    # Netlify deployment config
└── README.md
```

## Using the Toggle Feature

### For Readers

1. **Look for toggle** in navbar (top-left, before site title)
2. **Click "Vim"** or **"Neovim"** to switch content
3. **Your preference is saved** - persists across sessions
4. **Content updates instantly** - no page reload needed

### For Developers

See [FEATURES.md](./FEATURES.md) for detailed implementation and how to extend the toggle feature.

## Content Overview

### Getting Started
- **Why Vim?** - Philosophy and benefits
- **Installation** - Setup instructions (toggle-aware)
- **Vim Philosophy** - Understanding modal editing
- **First Steps** - Your first Vim session

### Fundamentals
- **Modes** - Normal, Insert, Visual, Command
- **Navigation** - hjkl, word motions, searching
- **Basic Editing** - Delete, change, copy, paste
- **Search & Replace** - Finding and replacing
- **Files & Buffers** - Managing multiple files
- **Interactive Practice** - Beginner challenges

### Intermediate
- **Text Objects** - The game-changer feature
- (More sections coming)

### Advanced
- **Neovim Specific** - Lua configuration, plugins
- (More sections coming)

### Practice
- **Beginner Challenges** - Navigation and basic editing
- **Intermediate Challenges** - Advanced operations
- **Sandbox** - Free-form practice area

### Reference
- **Cheatsheet** - Quick lookup (printable)
- **Command Index** - Alphabetical reference
- **Vim vs Neovim** - Comparison and decision guide
- **Resources** - External links and communities

## Technology Stack

- **VitePress** - Static site generator
- **Vue 3** - Interactive components
- **TypeScript** - Type-safe code
- **CodeMirror 6** - Code editor (game)
- **Netlify** - Deployment platform

## Technologies Used

### Frontend
- VitePress 1.6+
- Vue 3
- TypeScript
- CSS3

### Build
- Vite
- Node.js 16+
- npm

### Deployment
- Netlify (recommended)
- Vercel (alternative)
- GitHub Pages (alternative)

## npm Scripts

```bash
npm run docs:dev      # Development server with hot reload
npm run docs:build    # Production build
npm run docs:preview  # Preview production build
```

## Contributing

To improve the tutorial:

1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Test locally with `npm run docs:dev`
5. Commit with clear messages
6. Push and create a pull request

### Adding Content

1. Create markdown file in appropriate section
2. Add to sidebar in `docs/.vitepress/config.ts`
3. For toggle support, use `useVimEditor` composable
4. Test with `npm run docs:dev`

## Resources

### Official Docs
- [Vim Official](https://www.vim.org/docs.php)
- [Neovim Official](https://neovim.io/doc/)

### This Tutorial
- [Home Page](/docs/index.md)
- [Features Documentation](./FEATURES.md)
- [Getting Started](./docs/getting-started/index.md)

### Community
- r/vim - Vim subreddit
- r/neovim - Neovim subreddit
- Vim Stack Exchange
- Neovim Discord

## License

This tutorial content is provided for educational purposes. Vim is Charityware.

## Support

Found an issue or want to suggest improvements?

1. Check existing GitHub issues
2. Create a new issue with details
3. Include your environment (Vim/Neovim version, OS)

## Deployment Status

- **Build**: ✅ Passing
- **Tests**: ✅ All pages render correctly
- **Deploy Ready**: ✅ Ready for Netlify

## Quick Deploy Checklist

- [x] Content complete (Getting Started + Fundamentals)
- [x] Interactive games functional
- [x] Toggle feature implemented
- [x] Vim and Neovim content
- [x] Build tested locally
- [x] netlify.toml configured
- [x] Git repository initialized

**Next step:** Push to GitHub and connect to Netlify!

## Questions?

See the tutorial itself for comprehensive learning materials. For development questions, check FEATURES.md.

---

**Made with ❤️ for Vim and Neovim learners**
