# Understanding Modes

This page explains Vim's modes in detail. If you understand modes, you understand 80% of Vim's design.

## What Are Modes?

A **mode** is a context that determines what happens when you press a key.

- In **Normal mode**, `d` means "delete"
- In **Insert mode**, `d` inserts the character `d` into the file
- In **Visual mode**, `d` deletes the selected text

Same key, different meaning. The mode changes the interpretation.

## The Big Picture

Most editors are always in one mode (typing mode). You reach for the mouse to select, delete, copy. Vim separates these concerns:

```
┌─────────────────────────────────────────────┐
│              NORMAL MODE                    │
│         (Navigate and Manipulate)           │
│                                             │
│  Press: i, a, o → Enter INSERT             │
│  Press: v, V → Enter VISUAL                │
│  Press: : → Enter COMMAND                  │
└─────────────────────────────────────────────┘
         ↓              ↑              ↓ ↑
      INSERT        COMMAND        VISUAL
```

## Normal Mode

### What It Is

Normal mode is Vim's default. Every key is a command.

### When You're In It

- When Vim opens
- After pressing `Esc` from any other mode
- The status bar shows nothing (or just the file info)

### What You Do

- Navigate the document
- Delete, change, copy text
- Search and replace
- Run commands

### Example Commands

```vim
j           Move down
dw          Delete word
y$          Copy to end of line
/search     Search for text
:w          Save file
```

### Entering Other Modes

- `i` → Insert mode (insert before cursor)
- `a` → Insert mode (append after cursor)
- `o` → Insert mode (new line below)
- `O` → Insert mode (new line above)
- `v` → Visual mode (character selection)
- `V` → Visual mode (line selection)
- `Ctrl+v` → Visual mode (block selection)
- `:` → Command mode

## Insert Mode

### What It Is

Insert mode is where you type text. Vim behaves like a normal editor here.

### When You're In It

- After pressing `i`, `a`, `o`, `I`, `A`, `O`, `c`, `s`, `cc`, `dd`, etc.
- The status bar shows `-- INSERT --`
- The cursor usually blinks

### What You Do

- Type text character by character
- Delete with Backspace
- Use arrow keys to move (though this is discouraged)

### Why Use Insert Mode?

Separating insert from normal mode means:
- Your modal thinking never gets confused
- Normal mode stays fast (no time wasted typing mode awareness)
- You're explicit about whether you're typing or editing

### Exiting Insert Mode

Press `Esc`. That's it.

(If `Esc` feels far, many users remap it to `Ctrl+[` or `Caps Lock`.)

### Insert Mode Tricks

```vim
Ctrl+[      Exit insert mode (same as Esc)
Ctrl+r      Insert the contents of a register
Ctrl+u      Delete from cursor to start of line
Ctrl+w      Delete the word before cursor
Ctrl+n      Auto-complete word
```

Most people don't use these until intermediate level. For now: type, then `Esc`.

## Visual Mode

### What It Is

Visual mode lets you select a region of text, then operate on it.

### When You're In It

- After pressing `v` (character selection), `V` (line), or `Ctrl+v` (block)
- The status bar shows `-- VISUAL --` or `-- VISUAL LINE --` or `-- VISUAL BLOCK --`
- Selected text is highlighted

### Three Types

#### Character Visual (`v`)

Selects individual characters:

```vim
BEFORE:     The quick brown fox
            ^
v3l         Select 3 characters right
            The
```

#### Line Visual (`V`)

Selects entire lines:

```vim
BEFORE:     Line 1
            Line 2
            Line 3
V           Select entire line 1
V j         Select lines 1-2
```

#### Block Visual (`Ctrl+v`)

Selects rectangular blocks (great for editing multiple lines):

```vim
BEFORE:     Line 1
            Line 2
            Line 3
Ctrl+v 2j 2l  Select 2x2 block
            └─→ Select down 2 lines, right 2 characters
```

### Exiting Visual Mode

- `Esc` - Deselect and return to Normal mode
- Any operator (`d`, `y`, `c`, `>`), etc. - Operate on selection and return to Normal mode

### Using Visual Mode

1. Enter: `v`, `V`, or `Ctrl+v`
2. Move cursor to expand selection
3. Apply operator: `d` (delete), `y` (copy), `c` (change), `>` (indent), `<` (outdent), etc.
4. Done!

Example:

```vim
BEFORE:     The quick brown fox
                 ^
vw          Enter visual, select to next word start
d           Delete the selection ("The qu" is deleted)
AFTER:      ick brown fox
```

## Command Mode

### What It Is

Command mode lets you run extended commands. These are powerful operations that need more typing than single keys.

### When You're In It

- After pressing `:` in Normal mode
- The status bar shows `:` and waits for your input
- You type a command and press Enter

### Common Commands

```vim
:w              Write (save) the file
:q              Quit
:wq             Write and quit
:e filename     Open a file
:set number     Turn on line numbers
:%s/old/new/g   Replace all "old" with "new"
:help           Open help system
```

### Exiting Command Mode

- `Enter` - Execute the command
- `Esc` - Cancel without executing

### Why Command Mode?

Some operations are too complex for single keys:
- Replacing text across the whole file (`:s` command)
- Opening specific files
- Configuring behavior
- Running external commands

You'll use command mode often, but it's mostly for advanced operations. For now, focus on Normal mode.

## Mode Switching Diagram

```
                    ┌─────────────────┐
                    │  NORMAL MODE    │
                    │ (Default, Safe) │
                    └────────┬────────┘
                    Esc ↓    ↑ (from any mode)
           ┌────────┴─┴──────────┬──────────┐
           ↓                     ↓          ↓
        INSERT               VISUAL      COMMAND
        (Type)              (Select)     (Run :)
           ↓                     ↓          ↓
           └─────────┬──────────┴──────────┘
                Esc (return to Normal)
```

## Common Mistakes

### "I'm stuck in insert mode"

**Solution**: Press `Esc`. You're now back in Normal mode.

### "I pressed `d` and it deleted something unexpected"

**Probably in Normal mode**. You typed `d` which starts a delete command.
- If you didn't mean to: Press `u` to undo
- To understand what happened: Review the delete section in [Basic Editing](/fundamentals/basic-editing)

### "Arrow keys act weird in Insert mode"

They shouldn't. If they do:
- Make sure you pressed `i` or `a` first
- Try pressing `Esc` and then `i` again
- Arrows should work normally in Insert mode

## Mode Summary Table

| Mode | Entry | Exit | What You Do | Mode Indicator |
|------|-------|------|-------------|---|
| **Normal** | Esc | (default) | Navigate, delete, copy, change | None (or file info) |
| **Insert** | `i`, `a`, `o`, `I`, `A`, `O`, `c`, `s`, etc. | Esc | Type text | `-- INSERT --` |
| **Visual** | `v`, `V`, `Ctrl+v` | Esc or operator | Select then operate | `-- VISUAL --` |
| **Command** | `:` in Normal | Esc or Enter | Type command | `:` prompt |

## Practice Exercise

Let's practice mode switching:

1. Open Vim: `vim practice.txt`
2. `i` - Enter insert mode
3. Type: `I can switch between modes`
4. `Esc` - Return to Normal mode
5. `v3w` - Enter visual mode, select 3 words
6. `d` - Delete selection, return to Normal mode
7. `u` - Undo the deletion
8. `:q!` - Quit without saving

You just practiced all four modes!

## Key Takeaway

**Modes are not complicated.** There are only 4, and you'll use 3 of them regularly:

1. **Normal** - The safe home base (press Esc to return anytime)
2. **Insert** - Type text (press Esc to stop)
3. **Visual** - Select (press Esc or an operator to stop)
4. **Command** - Run commands (press Enter or Esc)

Master modes and everything else becomes predictable.

## Next Up

Now that you understand modes, learn how to move around efficiently in [Basic Navigation](/fundamentals/navigation).

---

## Related Resources

- [Vim Help: modes](https://vim.fandom.com/wiki/Understanding_modes) - Official explanation
- [Official Vim Mode Reference](https://www.vim.org/docs.php) - Complete mode documentation
