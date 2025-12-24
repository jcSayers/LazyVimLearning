# Advanced: Mastery and Customization

You're now ready to customize Vim to your exact preferences and explore advanced features that separate Vim power users from casual users.

## What's Covered

- **[Vimscript Basics](/advanced/vimscript-basics)** - Automate with Vimscript
- **[Configuration](/advanced/configuration)** - Build your perfect .vimrc
- **[Plugins](/advanced/plugins)** - Extend Vim's capabilities
- **[Neovim Specific](/advanced/neovim-specific)** - Modern Lua configuration
- **[Advanced Patterns](/advanced/advanced-patterns)** - Complex editing
- **[Workflow Optimization](/advanced/workflow-optimization)** - Real-world usage

## Prerequisites

- Complete [Intermediate](/intermediate/) section
- Be comfortable with text objects, macros, registers
- Have used Vim daily for at least 2 weeks

## Choose Your Path

### Configuration Path

If you want to customize Vim:
1. [Configuration](/advanced/configuration) - Understand .vimrc
2. [Vimscript Basics](/advanced/vimscript-basics) - Automate workflows
3. [Plugins](/advanced/plugins) - Add functionality

### Neovim Path

If you want modern configuration:
1. [Neovim Specific](/advanced/neovim-specific) - Lua-based setup
2. [Plugins](/advanced/plugins) - Modern plugin ecosystem
3. [Workflow Optimization](/advanced/workflow-optimization)

### Power User Path

If you want to master everything:
1. Read all sections in order
2. Implement each concept
3. Build your custom workflow

## Key Concepts

### Keymappings

Create custom shortcuts:
```vim
:map <Leader>w :w<CR>     Map leader-w to save
:noremap <C-s> :w<CR>     Ctrl+S to save
```

### Functions

Write reusable code:
```vim
function! MyFunction()
    " Code here
endfunction
```

### Plugins

Install with package managers like vim-plug, packer.nvim, or lazy.nvim.

## What You'll Learn

✅ Understand Vim's configuration options
✅ Write basic Vim scripts
✅ Install and manage plugins
✅ Configure Neovim with Lua (if using Neovim)
✅ Create a personalized workflow
✅ Solve complex text manipulation problems

## Time Investment

- Configuration: 30-60 min
- Vimscript basics: 60-90 min
- Plugins: 30-60 min
- Advanced patterns: 60+ min

## Important Philosophy

Before adding plugins, master Vim's built-in features. Plugins should enhance, not replace, core skills.

## Next Steps

Start with [Configuration](/advanced/configuration) or jump to [Neovim](/advanced/neovim-specific) if using Neovim.

---

**Remember**: Advanced Vim is about building tools that match your mind. There's no "best" configuration—only your best configuration.
