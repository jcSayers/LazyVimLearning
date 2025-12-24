# Installation: Get Neovim

This page covers installing Neovim on Windows, macOS, and Linux.

## Why Neovim?

Neovim is a modern fork of Vim with:
- **Better defaults** - More sensible out of the box
- **Lua support** - Configure with Lua instead of just VimScript
- **Active development** - Regular updates and improvements
- **Modern plugins** - Thriving ecosystem
- **100% compatible** - Use your existing `.vimrc` files

## Installation by OS

### Windows

#### Option 1: Using Chocolatey (Recommended)

```bash
choco install neovim
```

#### Option 2: Using scoop

```bash
scoop install neovim
```

#### Option 3: Using Windows Package Manager

```powershell
winget install Neovim.Neovim
```

#### Option 4: Direct Download

1. Download from [Neovim Releases](https://github.com/neovim/neovim/releases)
2. Extract to a location
3. Add to PATH or use full path

### macOS

#### Using Homebrew (Recommended)

```bash
brew install neovim
```

#### Using MacPorts

```bash
sudo port install neovim
```

### Linux

#### Debian/Ubuntu

```bash
sudo apt update
sudo apt install neovim
```

#### Fedora/RHEL

```bash
sudo dnf install neovim
```

#### Arch Linux

```bash
sudo pacman -S neovim
```

#### Alpine

```bash
apk add neovim
```

## Verify Installation

```bash
nvim --version
```

Should show Neovim version and included features.

## Create Configuration Directory

Neovim looks for config in `~/.config/nvim/`

### Linux/macOS

```bash
mkdir -p ~/.config/nvim
touch ~/.config/nvim/init.lua
```

### Windows

```powershell
mkdir $env:APPDATA\..\Local\nvim
New-Item -Path $env:APPDATA\..\Local\nvim\init.lua
```

## Create Your First Config: init.lua

Neovim prefers Lua over VimScript.

### Basic Configuration

Create or edit `~/.config/nvim/init.lua`:

```lua
-- Basic settings
vim.opt.number = true           -- Show line numbers
vim.opt.expandtab = true        -- Use spaces instead of tabs
vim.opt.tabstop = 4             -- Tab width
vim.opt.shiftwidth = 4          -- Auto-indent width
vim.opt.ignorecase = true       -- Case-insensitive search
vim.opt.incsearch = true        -- Search while typing

-- Keymappings (leader key defaults to backslash)
vim.keymap.set('n', '<leader>w', ':w<CR>', { noremap = true })
vim.keymap.set('n', '<leader>q', ':q<CR>', { noremap = true })
```

### Using VimScript Instead?

If you prefer VimScript, create `~/.config/nvim/init.vim`:

```vim
set number
set expandtab
set tabstop=4
set shiftwidth=4
set ignorecase
set incsearch

nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>
```

Neovim supports both!

## Install a Plugin Manager

Modern Neovim uses **lazy.nvim** (fastest and most popular).

### Installing lazy.nvim

Add this to the top of `~/.config/nvim/init.lua`:

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
})
```

Then run `:Lazy` in Neovim to manage plugins.

## First Plugin: Install a Color Scheme

Add to your plugin spec in `init.lua`:

```lua
require("lazy").setup({
  { "folke/tokyonight.nvim" },
  { "tpope/vim-surround" },
  { "numToStr/Comment.nvim" },
})

-- Apply color scheme
vim.cmd("colorscheme tokyonight")
```

## Next Steps

1. **[Understand Vim Philosophy](/getting-started/vim-philosophy)** - Applies to Neovim too
2. **[Learn Neovim Specifics](/advanced/neovim-specific)** - Modern config and plugins
3. **[Start Fundamentals](/fundamentals/)** - Core editing skills

## Popular Neovim Starters

Instead of starting from scratch, you can use:

- **[Kickstart](https://github.com/nvim-lua/kickstart.nvim)** - Minimal, well-commented starter
- **[LunarVim](https://www.lunarvim.org/)** - Pre-configured Neovim
- **[NvChad](https://nvchad.com/)** - Feature-rich with dashboard
- **[AstroNvim](https://astronvim.com/)** - Extensible config framework

## Troubleshooting

### "nvim: command not found"

Make sure Neovim is in your PATH:

```bash
which nvim          # Check if it's installed
echo $PATH          # Check if nvim folder is in PATH
```

### "Can't find plugins"

Make sure `~/.config/nvim/` directory exists:

```bash
mkdir -p ~/.config/nvim
```

### "init.lua not loading"

Neovim checks for both `init.lua` and `init.vim`. If you have both, only `init.lua` runs.

## Migration from Vim

Neovim is fully backward compatible:

1. Copy your `.vimrc` to `~/.config/nvim/init.vim`
2. Run Neovim
3. Everything works!

Then gradually convert to Lua as you learn.

## Resources

- [Official Neovim Site](https://neovim.io/)
- [Neovim Documentation](https://neovim.io/doc/)
- [GitHub Repository](https://github.com/neovim/neovim)
- [Lua Scripting Guide](https://github.com/nanotee/nvim-lua-guide)

---

**Remember**: Neovim is 100% compatible with Vim. All your Vim knowledge applies directly!
