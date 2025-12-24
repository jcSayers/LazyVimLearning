# Neovim: Modern Configuration

## What is Neovim?

Neovim is a modern fork of Vim focused on extensibility, maintainability, and modern defaults. If you're using Neovim, this section covers its unique features.

### Key Differences from Vim

| Feature | Vim | Neovim |
|---------|-----|--------|
| **Configuration Language** | VimScript only | VimScript + Lua (recommended) |
| **Plugin API** | Basic | Rich, stable API |
| **Defaults** | Conservative | Modern, sensible |
| **Async Jobs** | Yes | Built-in, better |
| **LSP** | Needs plugin | Built-in support planned |
| **Treesitter** | Not available | Full support |
| **Development** | Mature, slow | Active, fast |

## Configuration: init.lua vs init.vim

Neovim prefers `init.lua` (Lua configuration) over VimScript, though both work.

### Basic init.lua

Create `~/.config/nvim/init.lua`:

```lua
-- Basic settings
vim.opt.number = true
vim.opt.expandtab = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.ignorecase = true
vim.opt.incsearch = true

-- Keymappings
vim.keymap.set('n', '<leader>w', ':w<CR>', { noremap = true })
vim.keymap.set('n', '<leader>q', ':q<CR>', { noremap = true })
```

### Why Lua?

- **Faster** - Lua is compiled, VimScript is interpreted
- **Cleaner** - Better syntax for complex configurations
- **Modern** - Neovim development focuses on Lua
- **Ecosystem** - Newer plugins use Lua

### Staying with VimScript?

If you prefer, rename `init.lua` to `init.vim` and use VimScript:

```vim
" ~/.config/nvim/init.vim
set number
set expandtab
set tabstop=4
```

## Plugin Installation: lazy.nvim

Modern Neovim uses **lazy.nvim** for fast, lazy-loading plugins.

### Setup lazy.nvim

In `~/.config/nvim/init.lua`:

```lua
-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- Load plugins
require("lazy").setup({
  { "tpope/vim-surround" },
  { "numToStr/Comment.nvim" },
})
```

### Install Popular Plugins

```lua
require("lazy").setup({
  -- Git integration
  { "tpope/vim-fugitive" },

  -- Fuzzy finder
  { "nvim-telescope/telescope.nvim", dependencies = { "nvim-lua/plenary.nvim" } },

  -- Treesitter (syntax highlighting)
  { "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },

  -- Comment toggling
  { "numToStr/Comment.nvim", opts = {} },

  -- Color scheme
  { "folke/tokyonight.nvim" },
})

-- Apply color scheme
vim.cmd("colorscheme tokyonight")
```

## Treesitter: Better Syntax Highlighting

Neovim's Treesitter provides more accurate syntax highlighting than traditional regex-based highlighting.

### Setup

```lua
require('nvim-treesitter.configs').setup {
  ensure_installed = { "lua", "python", "javascript", "vim" },
  highlight = {
    enable = true,
  },
}
```

Languages are automatically downloaded and compiled.

## LSP: Language Server Protocol

Neovim can integrate LSP servers for:
- Autocompletion
- Go to definition
- Find references
- Rename refactoring
- Diagnostics

### Simple LSP Setup

```lua
-- Install neovim/nvim-lspconfig
require('lspconfig').pyright.setup{}
require('lspconfig').ts_ls.setup{}
```

Then:
- `gd` - Go to definition
- `gr` - Find references
- `<C-k>` - Show hover documentation

## Tips for Neovim Users

### Tip 1: Use lazy.nvim
It's faster and more flexible than older plugin managers.

### Tip 2: Start Simple
Don't install 20 plugins at once. Start with essentials:
- telescope (fuzzy finder)
- nvim-treesitter (syntax)
- Comment.nvim (comments)

### Tip 3: Learn Lua Gradually
You don't need to master Lua immediately. VimScript still works perfectly.

### Tip 4: Check Kickstart
[nvim-lua/kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) is a great starter config.

### Tip 5: Use Terminal
Neovim's `:terminal` is excellent. Split a terminal inside Neovim:

```vim
:split | terminal
```

Then compile, run tests, or use git without leaving Neovim.

## Common Plugins for Neovim

| Plugin | Purpose |
|--------|---------|
| telescope.nvim | Fuzzy finder (files, grep, etc) |
| nvim-treesitter | Better syntax highlighting |
| nvim-lspconfig | Language server integration |
| coc.nvim | VSCode-like completion |
| Comment.nvim | Toggle comments easily |
| nvim-surround | Enhanced surround operations |
| vim-fugitive | Git integration |
| nvim-tree | File tree explorer |
| catppuccin | Beautiful color scheme |

## Migration from Vim to Neovim

Most Vim configurations work in Neovim! Simply:

1. Copy `.vimrc` to `~/.config/nvim/init.vim`
2. Rename plugins folder to `~/.config/nvim/`
3. Run Neovim

Gradually convert to Lua as needed.

## Resources

- [Neovim Official Docs](https://neovim.io/doc/)
- [Kickstart Config](https://github.com/nvim-lua/kickstart.nvim)
- [lazy.nvim](https://github.com/folke/lazy.nvim)
- [Lua Guide for Neovim](https://github.com/nanotee/nvim-lua-guide)

---

**Pro Tip**: Neovim is 100% backward compatible with Vim. You can use your existing `.vimrc` without changes!
