# Vim & Neovim Tutorial Documentation

This is the markdown source for the Vim & Neovim Tutorial website.

## Building Locally

### Prerequisites

- Node.js 16+ (download from https://nodejs.org)
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Development Server

Run the development server:

```bash
npm run docs:dev
```

The site will be available at `http://localhost:5173` (or similar address shown in terminal).

### Building for Production

Create a production build:

```bash
npm run docs:build
```

Output is in `docs/.vitepress/dist/`

### Preview Production Build

```bash
npm run docs:preview
```

## File Structure

```
docs/
├── index.md                    # Home page
├── getting-started/            # Getting Started section
├── fundamentals/               # Fundamentals section
├── intermediate/               # Intermediate section
├── advanced/                   # Advanced section
├── practice/                   # Interactive practice games
├── reference/                  # Reference and cheatsheets
└── .vitepress/
    ├── config.ts              # VitePress configuration
    ├── theme/
    │   ├── index.ts           # Theme setup
    │   ├── custom.css         # Custom styles
    │   ├── components/        # Vue components
    │   └── composables/       # Vue composables
    └── dist/                  # Build output (generated)
```

## Content Guidelines

### Writing Pages

1. Use Markdown with H1 for main title
2. Use H2 for sections
3. Include code blocks with language specification
4. Link to other sections with relative paths: `/getting-started/`
5. Link to external resources where relevant

### Games and Interactive Components

Interactive components are Vue components embedded in markdown:

```markdown
<ClientOnly>
  <VimGameEditor :challengeId="'nav-1'" />
</ClientOnly>
```

All interactive components must be wrapped in `<ClientOnly>` for SSR compatibility.

## Deployment to Netlify

### Prerequisites

- GitHub account with this repo pushed
- Netlify account (free: https://netlify.com)

### Steps

1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Choose GitHub, select this repository
4. Netlify automatically detects the build settings from `netlify.toml`
5. Click "Deploy"

Netlify will:
- Run `npm run docs:build` automatically
- Serve the `docs/.vitepress/dist/` folder
- Redeploy on git push
- Show deployment status in GitHub

### Custom Domain

After deployment, you can add a custom domain in Netlify settings.

## Technologies Used

- **VitePress** - Static site generator
- **Vue 3** - Interactive components
- **CodeMirror 6** - Code editor (for game)
- **@replit/codemirror-vim** - Vim keybindings

## Contributing

To add new content:

1. Create markdown file in appropriate section
2. Add link in `docs/.vitepress/config.ts` sidebar
3. Run `npm run docs:dev` to preview
4. Commit and push to GitHub
5. Netlify automatically redeploys

## License

This tutorial is provided as educational content. Vim is open source (Charityware).

## Issues and Feedback

Found a problem or have suggestions? Check the GitHub issues or create a new one.

---

Happy learning!
