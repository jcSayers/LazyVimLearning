# Fundamentals: Getting Stuff Done

Welcome to Fundamentals! This section covers the core concepts you need to edit effectively in Vim. You'll learn:

- **Modes** - How Normal, Insert, and Visual modes work
- **Navigation** - Moving through files efficiently
- **Editing** - Inserting, deleting, and changing text
- **Search and Replace** - Finding and changing text
- **Files and Buffers** - Working with multiple files

## Prerequisites

Before this section, you should have:
- Installed Vim or Neovim
- Run through `vimtutor` lessons 1-4
- Understand the basic philosophy from [Vim Philosophy](/getting-started/vim-philosophy)

## The Learning Path

Work through these pages in order:

1. **[Understanding Modes](/fundamentals/modes)** - Normal, Insert, Visual, Command modes explained
2. **[Basic Navigation](/fundamentals/navigation)** - hjkl and word/sentence/paragraph motions
3. **[Basic Editing](/fundamentals/basic-editing)** - Insert, delete, change, replace operations
4. **[Search & Replace](/fundamentals/search-and-replace)** - Finding and replacing text
5. **[Files & Buffers](/fundamentals/files-and-buffers)** - Opening, saving, switching files
6. **[Practice Games](/fundamentals/interactive-practice)** - Test your skills interactively

## What You'll Be Able to Do

By the end of this section, you'll be able to:

✅ Switch between modes fluently
✅ Navigate files quickly without the mouse
✅ Edit text using composition of operators and motions
✅ Search for text and replace it efficiently
✅ Work with multiple files
✅ Understand the fundamentals well enough to learn advanced features

## Core Concepts

### The Grammar of Vim

Remember: **`[Operator] [Count] [Motion]`**

```
dw          Delete word
3dd         Delete 3 lines
y$          Yank to end of line
```

### Modes Are Your Friends

| Mode | When | Purpose |
|------|------|---------|
| Normal | Default | Navigate and change text |
| Insert | After `i`, `a`, etc. | Type text |
| Visual | After `v`, `V`, `Ctrl+v` | Select then operate |
| Command | After `:` | Run commands |

### Repeatable, Composable, Predictable

Vim commands follow patterns. Once you understand the patterns:
- You can predict commands you've never seen
- You can combine known pieces in new ways
- You build muscle memory that applies everywhere

## Structure of This Section

Each page:
1. **Explains the concept** - Why it matters
2. **Shows examples** - Before/after demonstrations
3. **Provides exercises** - Try it yourself
4. **Links to practice** - Test interactively

## Tips for Learning

1. **Type along** - Don't just read. Create a file and try each example.
2. **Make mistakes** - They're impossible to be harmful (press `u` to undo)
3. **Go slow** - Understanding is more important than speed
4. **Practice daily** - 15 minutes a day is better than 2 hours once a week
5. **When confused, undo** - Press `u` and try again

## Time Investment

- Reading each page: 10-15 minutes
- Practicing the examples: 10-15 minutes
- Total section: 2-3 hours
- Result: Foundation for all advanced learning

## A Note on This Tutorial

Every example here uses **pure Vim commands**, not plugins or configurations. This means:

- Everything works in stock Vim/Neovim
- All examples are portable (works anywhere)
- You're learning Vim itself, not a configuration
- Later, you'll add plugins for convenience

## Let's Begin

Ready? Start with [Understanding Modes](/fundamentals/modes) →

Or if you feel confident with modes already, skip to [Navigation](/fundamentals/navigation).

---

**Remember**: Vim gets easier every day. The first week feels odd. By day 7, you'll start seeing why it's powerful. By week 4, you'll wonder how you worked any other way.
