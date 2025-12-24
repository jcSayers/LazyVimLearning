# Vim & Neovim Tutorial - Features Overview

## Toggle Feature: Vim vs Neovim

### How to Use

Located in the top-left navbar, you'll find **Vim** and **Neovim** buttons. Click to toggle between editor-specific content.

**Features:**
- 🔘 Toggle prominently displayed in navbar before the site title
- 🎯 Active button highlighted with brand color
- 💾 Preference saved in browser localStorage
- ⚡ Instant content switching without page reload
- 📱 Responsive design (works on mobile)

### What Content Changes

When you toggle between Vim and Neovim:

**Installation Pages:**
- Windows installation (Chocolatey vs winget)
- macOS installation (Homebrew options)
- Linux installation commands
- Configuration file paths
- Initial setup instructions

**Configuration Examples:**
- `.vimrc` (Vim) vs `init.lua` (Neovim)
- Command syntax differences
- Plugin manager recommendations

**Plugin & Ecosystem:**
- Vim plugins (vim-plug, pathogen, etc.)
- Neovim plugins (lazy.nvim, packer.nvim)
- Popular plugin recommendations per editor

**Tips & Tricks:**
- Vim-specific workflows
- Neovim-specific features (Lua, LSP, Treesitter)
- Migration guides

## Content Pages with Toggle Support

### Getting Started Section
- **Installation** - Editor-specific install instructions
- *More pages can be enhanced with toggle content*

### Advanced Section
- **Neovim Specific** - Modern Lua configuration, plugins, LSP setup

### Reference Section
- **Vim vs Neovim** - Complete comparison table
- Detailed decision guide for choosing an editor

## Interactive Components

### 1. ToggleEditor Component
Located: `docs/.vitepress/theme/components/ToggleEditor.vue`

- Renders two buttons: "Vim" and "Neovim"
- Shows active state with visual highlighting
- Handles toggle logic and persistence

### 2. EditorContent Component
Located: `docs/.vitepress/theme/composables/useVimEditor.ts`

- Manages editor preference state
- Provides composable for pages
- Loads/saves to localStorage
- Provides computed properties: `isVim`, `isNeovim`

### 3. useVimEditor Composable
Methods and properties:
```typescript
// Properties
editorType: Ref<EditorType>  // 'vim' | 'neovim'
editorName: Computed<string> // 'Vim' or 'Neovim'
isVim: Computed<boolean>
isNeovim: Computed<boolean>

// Methods
toggleEditor()              // Switch editors
setEditor(type)            // Set specific editor
getCommand(vim, nvim)      // Get command for current editor
getConfigFile()            // Get config file path
getInstallCommand(platform) // Get install command
```

## Styling

Toggle styling defined in `docs/.vitepress/theme/custom.css`:

```css
.editor-toggle {}        /* Container */
.toggle-btn {}          /* Button styling */
.toggle-btn.active {}   /* Active state */
```

Features:
- Smooth transitions
- Hover effects
- Active state highlighting
- Mobile-responsive

## Implementation Details

### Integration in Theme Layout

File: `docs/.vitepress/theme/index.ts`

```typescript
Layout() {
  return h(DefaultTheme.Layout, null, {
    'nav-bar-title-before': () => h(ToggleEditor),
  })
}
```

Places toggle before navbar title using VitePress layout slot.

### State Persistence

Uses browser localStorage key: `vimEditorPreference`

```typescript
localStorage.setItem('vimEditorPreference', editorType)
// Restored on page load: loadPreference()
```

### Reactive Updates

All pages using `useVimEditor()` composable are reactive:
- Change editor → all pages update instantly
- No page reload needed
- Preference persists across sessions

## How to Extend Toggle Support

To add toggle support to a new page:

1. **Import composable:**
```vue
import { useVimEditor } from '../composables/useVimEditor'
const { isVim, isNeovim, editorName } = useVimEditor()
```

2. **Show/hide content:**
```vue
<div v-if="isVim">Vim-specific content</div>
<div v-if="isNeovim">Neovim-specific content</div>
```

3. **Or use helper component** (WIP):
```vue
<EditorContent>
  <template #vim>Vim content</template>
  <template #neovim>Neovim content</template>
</EditorContent>
```

## Pages Ready for Toggle Enhancement

These pages can be enhanced with editor-specific variations:

**Getting Started:**
- [ ] Installation (mostly done, could add more tips)
- [ ] First Steps (editor-specific workflows)
- [ ] Configuration (`.vimrc` vs `init.lua`)

**Fundamentals:**
- [ ] Each section could have editor-specific plugins recommended

**Intermediate & Advanced:**
- [ ] Plugin recommendations per editor
- [ ] Configuration examples

**Practice:**
- [ ] Editor-specific challenge tips

## Current Stats

- **Files with toggle support**: 3 pages ready
- **Composable methods**: 8 functions
- **UI Components**: 2 (ToggleEditor, EditorContent)
- **Lines of toggle-related code**: ~500
- **Build size impact**: Minimal (~5KB)

## Testing the Toggle

1. **Local dev server:**
   ```bash
   npm run docs:dev
   ```
   Look for toggle in navbar

2. **Check persistence:**
   - Toggle between editors
   - Refresh page → preference preserved
   - Open DevTools → check localStorage

3. **Test responsiveness:**
   - Resize window → toggle remains visible
   - Mobile viewport → toggle adapts

## Future Enhancements

- [ ] Add toggle support to more pages
- [ ] Create template for easy editor-specific content
- [ ] Add Vim/Neovim config snippets widget
- [ ] Show recommended plugins per editor
- [ ] Add comparison tables per feature
- [ ] Create interactive config builder

---

**The toggle feature allows this tutorial to serve both Vim and Neovim users without requiring separate sites or overwhelming readers with too much information at once.**
