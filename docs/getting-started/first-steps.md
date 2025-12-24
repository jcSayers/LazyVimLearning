# First Steps: Your First Vim Session

You've installed Vim. Now let's open it and do something! This page gets you through your first Vim session without panicking.

## Opening Vim

Open your terminal and type:

```bash
vim
```

You should see a welcome screen with helpful tips. This is Vim's Normal mode.

### Panic? Here's how to quit:

If you feel lost, type this **exactly**:

```vim
:q
```

Then press Enter. Vim closes. You're safe.

(If you made changes and Vim won't let you quit, type `:q!` to force quit without saving.)

## Understanding What You See

When you first open Vim, you see:

1. **The buffer area** - Most of the screen, showing the file contents (or blank if new)
2. **The status bar** - Bottom line showing file name, line number, etc.
3. **The mode indicator** - Bottom left, shows which mode you're in

You start in **Normal mode** (no indicator shown at the bottom when in Normal mode).

## Essential Commands for Your First Day

### 1. Move Around

Use these keys to move:

| Key | Action |
|-----|--------|
| `h` | Left |
| `j` | Down |
| `k` | Up |
| `l` | Right |

Try it now:
- Type `jjjj` to move down 4 lines
- Type `hhhh` to move left 4 characters
- Type `llll` to move right 4 characters
- Type `kk` to move up 2 lines

These keys feel odd compared to arrow keys, but they're faster because your fingers stay in typing position.

### 2. Insert Text

To **insert text**:

1. Type `i` (enters Insert mode)
2. Type your text
3. Press `Esc` (returns to Normal mode)

Try it:
- Type `i` to enter Insert mode
- Type `Hello, Vim!`
- Press `Esc` to return to Normal mode

You just typed text in Vim!

### 3. Delete Text

To **delete**:

1. Move cursor to the text you want to delete
2. Type `x` to delete the character under the cursor (repeatedly)

Try it:
- Move to a character
- Type `x` to delete it
- Type `x` again to delete the next one

### 4. Undo

Made a mistake?

```vim
u     Undo last change
```

You can press `u` multiple times to undo multiple changes. This is **crucial** for learning—you can be fearless because you can always undo!

### 5. Save and Quit

To **save** your work:

```vim
:w     Write (save) the file
```

To **quit**:

```vim
:q     Quit if no unsaved changes
:q!    Force quit without saving
```

To **save and quit** in one command:

```vim
:wq    Write and quit
```

## Your First Exercise

Let's do a real exercise:

1. Open a new file: `vim hello.txt`
2. Type `i` to enter Insert mode
3. Type this text:
   ```
   I am learning Vim
   This is my first file
   It is not so scary!
   ```
4. Press `Esc` to return to Normal mode
5. Type `:wq` and press Enter to save and quit

Congratulations! You've created and saved a file in Vim!

### Opening that file again:

```bash
vim hello.txt
```

The file opens with your content. You've now written persistent data in Vim!

## The Vim Tutor: vimtutor

Vim comes with an interactive tutorial called **vimtutor**. This is the **official, canonical** way to learn Vim basics.

### Running vimtutor

```bash
vimtutor
```

This opens a specially designed file that teaches Vim interactively. It covers:

- Lesson 1: Basic navigation and commands
- Lesson 2: Editing (insert, delete, append)
- Lesson 3: Copy and paste
- Lesson 4: Search and replace
- Lesson 5: External commands
- Lesson 6: Advanced editing
- Lesson 7: Tips and more

### Why you should do vimtutor

- **Official**: Made by the Vim maintainers
- **Interactive**: You learn by doing, not reading
- **Progressive**: Builds from basics to intermediate
- **Safe**: You can't break anything; the file resets
- **Printable**: You can print it for reference

**Recommendation**: Do vimtutor lessons 1-4 before moving to the next section. This takes about 30 minutes and is the best introduction to Vim's fundamentals.

## Three Modes of Operating

Remember from [Vim Philosophy](/getting-started/vim-philosophy):

### Normal Mode
- Default when Vim opens
- **Every key is a command**
- Examples: `j`, `k`, `d`, `y`, `:w`
- **Exit**: Can't exit from here (you're already here)

### Insert Mode
- Entered by pressing `i`, `a`, `o`, `I`, `A`, `O`, `c`, `s`, `cc`, `dd`
- **Every keystroke inserts text** (mostly)
- Arrows, Backspace, Delete work normally
- **Exit**: Press `Esc`

### Command Mode
- Entered by pressing `:` in Normal mode
- **Type a command and press Enter**
- Examples: `:w`, `:q`, `:s/old/new/g`
- **Exit**: Press `Esc` or `Enter` after command

## Quick Reference: Your First Day

| Goal | How |
|------|-----|
| Open Vim | `vim` or `vim filename` |
| Move cursor | `h` (left), `j` (down), `k` (up), `l` (right) |
| Insert text | `i` (then type) then `Esc` |
| Delete character | `x` (under cursor) |
| Delete word | `dw` (at Normal mode) |
| Undo | `u` |
| Redo | `Ctrl+r` |
| Save | `:w` then Enter |
| Quit | `:q` then Enter |
| Save and quit | `:wq` then Enter |
| Force quit | `:q!` then Enter |

## Troubleshooting Your First Session

### "I'm stuck in insert mode and nothing works!"

This is the most common problem. **Solution**: Press `Esc`. This returns you to Normal mode. If that doesn't work, press `Ctrl+[` (works the same as Esc).

### "I typed something and weird stuff happened!"

**Solution**: Press `u` to undo. You can press `u` multiple times to undo multiple things.

### "Why does `x` delete instead of copying?"

That's Visual mode in some editors. In Vim, `x` deletes and `y` copies (yank). Don't worry, this will feel natural by day 3.

### "The arrow keys don't work / are weird!"

This might mean you're in an unexpected mode. Press `Esc` and try again. Or use `hjkl` instead—that's the Vim way anyway!

## Next Steps

1. **Run `vimtutor`** - Do lessons 1-4. This is important!
2. **Play with opening and creating files** - Get comfortable with `:w` and `:q`
3. **Practice moving around** - Use `hjkl` instead of arrow keys
4. **Then come back and read** [Fundamentals](/fundamentals/) to understand modes deeper

## Getting Help

Inside Vim, you can get help:

```vim
:help              Opens the help system
:help basics       Help on the basics
:help hjkl         Help on movement
:help mode         Help on modes
```

Press `q` to close help and return to your file.

---

Ready? Run `vimtutor`, then come back to start the [Fundamentals](/fundamentals/) section!
