# Getting Started: Why Vim?

Welcome! This section will introduce you to Vim and Neovim, help you understand why they're worth learning, and get you set up and ready to start.

## What is Vim?

**Vim** (Vi IMproved) is a free, open-source text editor that runs in the terminal. It's been around since 1991 and has become one of the most powerful and widely-used editors in the world.

**Neovim** is a modern fork of Vim that maintains backward compatibility while adding improvements like:
- Lua as a first-class scripting language
- Better plugin ecosystem
- Improved defaults
- Asynchronous job control

## Why Should You Learn Vim?

### 1. **Speed & Efficiency**

Once you master Vim's keybindings, you'll edit text faster than ever before. Instead of:
- Reaching for the mouse
- Clicking menus
- Using keyboard shortcuts like Ctrl+A, Ctrl+C, Ctrl+V

You'll use a **language of commands** designed for efficiency:

```
daw     Delete a word
ci"     Change inside quotes
gJ      Join lines without space
```

Each command is composable and mnemonic. Instead of memorizing isolated shortcuts, you learn a system.

### 2. **Ubiquity**

Vim is available on virtually every system:
- Linux servers
- macOS terminals
- Windows (with WSL or native)
- Coding challenge platforms
- Cloud development environments

If you learn Vim, you can use it anywhere.

### 3. **No Lock-in**

Your skills transfer:
- VS Code has Vim keybinding extensions
- IntelliJ IDEs support Vim bindings
- Neovim plugins integrate with other tools
- Your muscle memory applies everywhere

Learn Vim once, use it forever.

### 4. **Highly Customizable**

You can configure Vim exactly how you want:
- Custom keybindings
- Color schemes
- Plugins for any language
- Scripts to automate workflows

### 5. **Low System Requirements**

Vim is lightweight and runs on minimal resources, making it perfect for:
- Remote servers
- Slow connections
- Resource-constrained environments

## Vim's Philosophy: Modal Editing

Vim's defining characteristic is **modal editing**. Unlike most editors where you're always inserting text, Vim has multiple modes:

### **Normal Mode** (Default)
- **Purpose**: Navigate and modify text
- **Mindset**: "How do I want to change the document?"
- **Commands**: `j`, `k`, `d`, `c`, `y`, `dd`, `yy`, etc.
- **Example**: `daw` deletes a word

### **Insert Mode**
- **Purpose**: Insert text like a normal editor
- **How to enter**: Press `i`, `a`, `o`, `I`, `A`, `O`, etc.
- **How to exit**: Press `Esc`
- **Mindset**: Just type normally

### **Visual Mode**
- **Purpose**: Select text before operating on it
- **How to enter**: Press `v` (character), `V` (line), or `Ctrl+v` (block)
- **How to exit**: Press `Esc`
- **Example**: Select text then `d` to delete, `y` to copy, `>` to indent

### **Command Mode**
- **Purpose**: Run commands (search, replace, save, quit)
- **How to enter**: Press `:` in Normal mode
- **How to exit**: Press `Esc`
- **Examples**: `:w` (save), `:q` (quit), `:%s/old/new/g` (replace all)

## The Learning Curve

Vim has a reputation for being hard to learn. This is partly true, but mostly misunderstood:

**The First Day**: You'll feel confused. Vim won't let you just "type", and you can't easily find features in menus. This is normal.

**The First Week**: Things start clicking. You understand modes. You can navigate and edit. It feels more natural.

**The First Month**: You're productive. You use Vim daily. You're faster than your old editor.

**After 3 Months**: You wonder how you ever lived without it. You're thinking in terms of text transformations, not individual keystrokes.

## This Tutorial is Different

Most Vim tutorials assume you know `hjkl` navigation or gloss over fundamentals. **This tutorial is comprehensive**:

- ✅ Starts from absolute zero (what is a mode?)
- ✅ Explains the philosophy before the commands
- ✅ Shows patterns so you can figure out commands you haven't seen
- ✅ Includes practical exercises and interactive games
- ✅ Links to official documentation for deeper learning
- ✅ Is complete enough that you never need external help to understand concepts

## What You'll Get

By completing this tutorial, you'll be able to:

1. ✅ Navigate through files efficiently
2. ✅ Edit text in multiple ways (insert, delete, change, replace)
3. ✅ Use powerful text selection (visual mode, text objects)
4. ✅ Search and replace efficiently
5. ✅ Work with multiple files and buffers
6. ✅ Record and replay command sequences (macros)
7. ✅ Customize Vim to your workflow
8. ✅ Understand how to extend Vim with plugins
9. ✅ (For Neovim) Configure with modern Lua

## Next Steps

Ready to get started?

1. **[Install Vim or Neovim](/getting-started/installation)** - Get it set up on your system
2. **[Understand Vim Philosophy](/getting-started/vim-philosophy)** - Deep dive into modal editing
3. **[Take Your First Steps](/getting-started/first-steps)** - Run vimtutor and practice basics

Or jump straight to [Fundamentals](/fundamentals/) to start learning about modes, navigation, and editing.

## Quick References

- [Official Vim Documentation](https://www.vim.org/docs.php)
- [Neovim Official Site](https://neovim.io/)
- [Vim Tips Wiki](https://vim.fandom.com/wiki/Vim_Tips_Wiki)

---

**Fun Fact**: Vim is so popular that knowing it can actually improve your resume. Many developers see "Vim proficiency" as a sign of serious engineering skill.
