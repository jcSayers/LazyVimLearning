# Installation

This page covers installing your chosen editor on Windows, macOS, and Linux.

> **Toggle the editor** in the top-left navbar to switch between Vim and Neovim installation instructions!

## Comparison

### **Choose Vim if:**
- You want maximum compatibility
- You're on a remote server (Vim is more likely to be already installed)
- You prefer the original, battle-tested editor
- You're learning the fundamentals first

### **Choose Neovim if:**
- You want a modern, actively developed version
- You're comfortable with configuration
- You plan to use Lua for configuration
- You want to use LSP (Language Server Protocol) for advanced features

---

<ShowFor editor="vim">

## Vim Installation

### Windows

#### Option 1: Using Chocolatey (Recommended)

```bash
choco install vim
```

#### Option 2: Using Scoop

```bash
scoop install vim
```

#### Option 3: Direct Download

1. Visit [vim.org/download](https://www.vim.org/download.php)
2. Download the Windows installer
3. Run and follow prompts
4. Test: `vim --version`

### macOS

#### Using Homebrew (Recommended)

```bash
brew install vim
```

#### Using MacPorts

```bash
sudo port install vim +huge
```

### Linux

#### Debian/Ubuntu

```bash
sudo apt update
sudo apt install vim
```

#### Fedora/RHEL

```bash
sudo dnf install vim
```

#### Arch Linux

```bash
sudo pacman -S vim
```

### Verify Installation

```bash
vim --version
```

### Create .vimrc

Create `~/.vimrc`:

```vim
set number
set expandtab
set tabstop=4
set shiftwidth=4
set ignorecase
set incsearch
```

</ShowFor>

<ShowFor editor="neovim">

## Neovim Installation

### Windows

#### Option 1: Using Chocolatey (Recommended)

```bash
choco install neovim
```

#### Option 2: Using Scoop

```bash
scoop install neovim
```

#### Option 3: Using Windows Package Manager

```powershell
winget install Neovim.Neovim
```

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

### Verify Installation

```bash
nvim --version
```

### Create Configuration Directory

```bash
mkdir -p ~/.config/nvim
touch ~/.config/nvim/init.lua
```

### Create init.lua

Edit `~/.config/nvim/init.lua`:

```lua
-- Basic settings
vim.opt.number = true
vim.opt.expandtab = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.ignorecase = true
vim.opt.incsearch = true
```

### Install lazy.nvim (Plugin Manager)

Add to top of `init.lua`:

```lua
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

require("lazy").setup({
  { "tpope/vim-surround" },
})
```

</ShowFor>

---

## Troubleshooting

<ShowFor editor="vim">

### "vim: command not found"

Make sure Vim is in your PATH:
```bash
which vim
```

If not found, reinstall or add to PATH.

### "Cannot create backup file"

Try:
```vim
:set backupdir=/tmp
```

</ShowFor>

<ShowFor editor="neovim">

### "nvim: command not found"

Ensure Neovim is installed:
```bash
which nvim
```

Reinstall if needed.

### "init.lua not loading"

Make sure directory exists:
```bash
mkdir -p ~/.config/nvim
```

</ShowFor>

## Next Steps

1. **[Learn Vim Philosophy](/getting-started/vim-philosophy)** - Understand modal editing
2. **[First Steps](/getting-started/first-steps)** - Run vimtutor
3. **[Fundamentals](/fundamentals/)** - Core concepts

## Resources

<ShowFor editor="vim">

- [Official Vim](https://www.vim.org/)
- [Vim Documentation](https://www.vim.org/docs.php)
- [Vim Tips Wiki](https://vim.fandom.com/wiki/Vim_Tips_Wiki)

</ShowFor>

<ShowFor editor="neovim">

- [Official Neovim](https://neovim.io/)
- [Neovim Documentation](https://neovim.io/doc/)
- [Neovim GitHub](https://github.com/neovim/neovim)
- [Neovim Lua Guide](https://github.com/nanotee/nvim-lua-guide)

</ShowFor>

---

**Happy installing!** The content above shows instructions for your selected editor.
