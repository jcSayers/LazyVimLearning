# Installation: Get Vim or Neovim

This page covers installing Vim or Neovim on Windows, macOS, and Linux.

## Vim vs Neovim: Which Should I Install?

### **Choose Vim if:**
- You want maximum compatibility
- You're on a remote server (Vim is more likely to be already installed)
- You prefer the original, battle-tested editor
- You're learning the fundamentals first

### **Choose Neovim if:**
- You want a modern, actively developed version
- You're comfortable with configuration
- You want to use Lua for configuration
- You plan to use LSP (Language Server Protocol) for advanced features

**Recommendation for beginners**: Start with **Vim**. Everything you learn applies to Neovim too, but Vim has simpler defaults for learning.

## Installation by OS

### Windows

#### Option 1: Using Chocolatey (Recommended)

If you have [Chocolatey](https://chocolatey.org/) installed:

```bash
choco install vim
```

Or for Neovim:

```bash
choco install neovim
```

#### Option 2: Using scoop

If you have [Scoop](https://scoop.sh/) installed:

```bash
scoop install vim
```

Or for Neovim:

```bash
scoop install neovim
```

#### Option 3: Direct Download

1. Visit [vim.org/download](https://www.vim.org/download.php)
2. Download the Windows installer (gvim95.exe or vim XX.X.exe)
3. Run the installer and follow the prompts
4. Add Vim to your PATH (usually automatic)
5. Open Command Prompt and test: `vim --version`

#### Option 4: WSL (Windows Subsystem for Linux)

For a more native experience, use WSL:

```bash
# Install WSL if you don't have it
wsl --install

# Inside WSL (Ubuntu)
sudo apt update
sudo apt install vim
```

### macOS

#### Option 1: Using Homebrew (Recommended)

If you have [Homebrew](https://brew.sh/) installed:

```bash
brew install vim
```

Or for Neovim:

```bash
brew install neovim
```

#### Option 2: Using MacPorts

```bash
sudo port install vim +huge
```

#### Option 3: Using Conda

```bash
conda install vim
```

### Linux

#### Debian/Ubuntu

```bash
sudo apt update
sudo apt install vim
```

Or for Neovim:

```bash
sudo apt install neovim
```

#### Fedora/RHEL

```bash
sudo dnf install vim
```

Or for Neovim:

```bash
sudo dnf install neovim
```

#### Arch Linux

```bash
sudo pacman -S vim
```

Or for Neovim:

```bash
sudo pacman -S neovim
```

#### Alpine

```bash
apk add vim
```

## Verify Installation

After installation, verify Vim works by opening a terminal and typing:

```bash
vim --version
```

You should see output showing the Vim version, compile options, and features.

### For Neovim:

```bash
nvim --version
```

## Create Your First Config File (Optional)

### For Vim: `.vimrc`

1. Create or edit `~/.vimrc`:

   **Linux/macOS:**
   ```bash
   touch ~/.vimrc
   ```

   **Windows:**
   - Path is usually `C:\Users\YourUsername\.vimrc`
   - Use Notepad or any editor to create it

2. Add basic settings (optional for learning):

   ```vim
   set number           " Show line numbers
   set expandtab        " Use spaces instead of tabs
   set tabstop=4        " Tabs are 4 spaces
   set shiftwidth=4     " Auto-indent 4 spaces
   set ignorecase       " Case-insensitive search
   set incsearch        " Search while typing
   ```

3. Save and reload Vim:
   - In Vim, type `:source ~/.vimrc` and press Enter

### For Neovim: `init.vim` or `init.lua`

1. Create the config directory:

   **Linux/macOS:**
   ```bash
   mkdir -p ~/.config/nvim
   ```

   **Windows:**
   ```powershell
   mkdir $env:APPDATA\..\Local\nvim
   ```

2. Create `init.lua` or `init.vim` in that directory

3. For `init.lua` (recommended):
   ```lua
   vim.opt.number = true
   vim.opt.expandtab = true
   vim.opt.tabstop = 4
   vim.opt.shiftwidth = 4
   vim.opt.ignorecase = true
   vim.opt.incsearch = true
   ```

4. Save and restart Neovim

## Next Steps

You're installed! Now:

1. **[Understand Vim Philosophy](/getting-started/vim-philosophy)** - Learn the concepts behind the keybindings
2. **[Take Your First Steps](/getting-started/first-steps)** - Try vimtutor
3. **Jump to [Fundamentals](/fundamentals/)** - Start learning!

## Troubleshooting

### "vim: command not found"

This means Vim isn't in your PATH. Try:

**Windows:**
- Reinstall and check "Add to PATH" option
- Or use full path: `C:\Program Files\Vim\vim.exe`

**macOS/Linux:**
- Verify installation: `which vim`
- If nothing shows, reinstall using your package manager
- Check if it's installed elsewhere: `find / -name vim 2>/dev/null`

### "Cannot create backup file"

This usually means Vim can't write to your home directory. Try:

```vim
:set backupdir=/tmp
:set directory=/tmp
```

### Opening vim opens the wrong editor

If you have a conflicting version:

```bash
which vim    # Shows the path being used
ls -la /usr/bin/vim    # Check what's there
```

## Getting Help

Vim has built-in help:

```vim
:help
```

Press `q` to quit the help.

Common help commands:
```vim
:help getting-started    " Start here
:help navigation         " Learn hjkl
:help editing            " Insert/delete/change
:help index              " Full command reference
```

## Links

- [Official Vim Documentation](https://www.vim.org/docs.php)
- [Neovim Installation Guide](https://github.com/neovim/neovim/wiki/Installing-Neovim)
- [Homebrew Vim Package](https://formulae.brew.sh/formula/vim)
- [Neovim Homebrew Package](https://formulae.brew.sh/formula/neovim)

---

Ready? Move on to [Understanding Vim Philosophy](/getting-started/vim-philosophy) or jump straight to [Fundamentals](/fundamentals/).
