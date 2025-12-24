# Vim vs Neovim: Choose Your Editor

Use the **Vim/Neovim toggle** in the navbar (top left) to switch between editor-specific content on this site.

## Quick Comparison

| Aspect | Vim | Neovim |
|--------|-----|--------|
| **Age** | 30+ years | 10+ years |
| **Development** | Slower, careful | Active, community-driven |
| **Configuration** | VimScript | VimScript + Lua (preferred) |
| **Plugin System** | Older, less stable API | Modern, stable API |
| **Defaults** | Traditional, minimal | Modern, sensible |
| **Learning Curve** | Steep | Slightly easier defaults |
| **Plugin Availability** | Huge ecosystem | Growing, modern plugins |
| **Customization** | Very customizable | Even more customizable |
| **Compatibility** | Original standard | 100% backward compatible |
| **Community** | Established | Growing, active |
| **Use Case** | General-purpose | General-purpose + modern workflow |

## Which Should You Choose?

### Choose Vim if:

- You use remote servers where Vim is pre-installed
- You prefer traditional, battle-tested tools
- Your `.vimrc` is heavily VimScript-based
- You want maximum compatibility across systems
- You like the established ecosystem
- You're learning and want the "original" experience

### Choose Neovim if:

- You want modern configuration with Lua
- You want an active development community
- You prefer sensible defaults
- You use LSP (Language Server Protocol)
- You want better async plugin support
- You're starting fresh with modern tooling
- You want faster plugin development

## Migration Between Them

**Vim to Neovim**:
Simply copy your `.vimrc` to `~/.config/nvim/init.vim`. Everything works!

**Neovim to Vim**:
Copy `~/.config/nvim/init.vim` to `~/.vimrc`. Lua configs need rewriting in VimScript.

## This Tutorial Covers Both

This site provides content for **both Vim and Neovim**. Use the toggle to:
- Switch between Vim and Neovim installation instructions
- See editor-specific configuration examples
- Learn about plugins for your editor
- Get tips tailored to your workflow

The fundamentals (modes, navigation, editing) are **identical** in both editors. Only the configuration and plugin ecosystem differ.

## Feature Comparison Table

| Feature | Vim | Neovim | Notes |
|---------|-----|--------|-------|
| Modal editing | ✅ | ✅ | Same in both |
| Text objects | ✅ | ✅ | Same in both |
| Macros | ✅ | ✅ | Same in both |
| Registers | ✅ | ✅ | Same in both |
| Search/Replace | ✅ | ✅ | Same in both |
| VimScript | ✅ | ✅ | Both supported |
| Lua config | ❌ | ✅ | Neovim only |
| Built-in LSP | ❌ | 🔄 | Planned for Vim 9.1+ |
| Treesitter | ❌ | ✅ | Neovim-specific plugin |
| Native async | ✅ | ✅ | Both support it |
| Plugin API stability | ⚠️ | ✅ | Neovim more stable |

## Getting Started

Both editors start the same way:

1. Install your chosen editor
2. Learn [Vim Philosophy](/getting-started/vim-philosophy)
3. Work through [Fundamentals](/fundamentals/)
4. Practice with interactive [games](/practice/)

Use the toggle to see installation steps for your editor!

## Resources

### Vim
- [Official Vim](https://www.vim.org/)
- [Vim Documentation](https://www.vim.org/docs.php)
- [Vim Tips Wiki](https://vim.fandom.com/wiki/Vim_Tips_Wiki)

### Neovim
- [Official Neovim](https://neovim.io/)
- [Neovim Docs](https://neovim.io/doc/)
- [Kickstart Config](https://github.com/nvim-lua/kickstart.nvim)
- [Neovim Setup Guide](https://github.com/nanotee/nvim-lua-guide)

---

**The Best Editor**: The one you'll use daily. Both Vim and Neovim are excellent choices. Choose based on your workflow and preferences!
