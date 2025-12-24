# Basic Editing: Insert, Delete, Change

This page covers the fundamental editing operations in Vim.

## The Three Main Operations

Vim's editing is built on three core operators:

| Operator | Action | Example |
|----------|--------|---------|
| `d` | Delete | `dw` delete word |
| `c` | Change | `cw` change word |
| `y` | Yank (copy) | `yw` copy word |

## Delete: The `d` Operator

Delete removes text without saving it (unlike copy).

### Delete Commands

```vim
dw       Delete word
dd       Delete line
d$       Delete to end of line
d0       Delete to start of line
d3w      Delete 3 words
daw      Delete a word (including space)
```

### Practice Delete

Create a test file:
```
The quick brown fox jumps
```

- `dw` on "The" → "quick brown fox jumps"
- `dd` → Deletes entire line
- `u` → Undo

## Change: The `c` Operator

Change deletes text and enters Insert mode to type replacement.

### Change Commands

```vim
cw       Change word (delete and insert)
cc       Change line
c$       Change to end of line
c3w      Change 3 words
ciw      Change inner word
ci"      Change inside quotes
```

### Change vs Delete

- **Delete** (`d`): Remove and stay in Normal mode
- **Change** (`c`): Remove and enter Insert mode

```vim
dw       Delete word, stay in Normal mode
cw       Delete word, enter Insert mode
```

## Yank: The `y` Operator

Yank copies text to a register (clipboard).

### Yank Commands

```vim
yw       Copy word
yy       Copy line
y$       Copy to end of line
yaw      Copy a word
y3w      Copy 3 words
```

### Copy and Paste

```vim
yw       Copy word
p        Paste after cursor
P        Paste before cursor
```

## Insert, Append, Open

Ways to enter Insert mode:

| Command | Action |
|---------|--------|
| `i` | Insert before cursor |
| `a` | Append after cursor |
| `o` | Open line below, insert |
| `O` | Open line above, insert |
| `I` | Insert at start of line |
| `A` | Append at end of line |

### Example

```
Before: Hello world
        ^
i       Insert mode (before H)
a       Insert mode (after cursor)
o       Insert mode (new line below)
O       Insert mode (new line above)
I       Insert mode (start of line)
A       Insert mode (end of line)
```

## Replace: `r` and `s`

Replace characters:

```vim
r<char>    Replace char under cursor
s<text>    Delete char and insert (like c + single char)
R          Replace mode (type over characters)
```

## The Undo/Redo System

**Undo and redo are essential** - use them liberally!

| Command | Action |
|---------|--------|
| `u` | Undo last change |
| `Ctrl+r` | Redo last undo |
| `U` | Undo all changes on line |

## Repeat with `.`

The `.` command repeats the last change:

```vim
dw       Delete word
.        Repeat (delete next word)
.        Repeat again
```

This is incredibly powerful for repetitive edits!

## Combining with Text Objects

Once you understand operators, text objects make editing powerful:

```vim
diw      Delete inner word
ci"      Change inside quotes
yi}      Copy inside braces
di(      Delete inside parentheses
ci]      Change inside brackets
```

## Practice Exercises

### Exercise 1: Basic Delete

File:
```
The quick brown fox
```

1. `dw` - Delete "The"
2. `dw` - Delete "quick"
3. `u` twice - Undo twice (back to original)

### Exercise 2: Change Word

File:
```
I like cats and dogs
```

1. Position on "cats"
2. `cw` - Change word
3. Type "birds"
4. `Esc` - Done

Result: `I like birds and dogs`

### Exercise 3: Copy and Paste

File:
```
Hello world
```

1. `yaw` - Copy word "Hello"
2. `A` - Go to end, insert mode
3. ` ` (space) + `Esc` - Add space
4. `p` - Paste

Result: `Hello world Hello`

## Key Takeaways

1. **Operators are reusable** - Learn `d`, `c`, `y` once, combine with any motion
2. **Text objects are semantic** - `iw` means "inside word" (Vim understands language)
3. **Undo is safe** - Press `u` liberally while learning
4. **Compose don't memorize** - `d` + `aw` = `daw`, you know both parts
5. **Repeat with `.`** - Most changes can repeat

## Common Mistakes

**Mistake**: "I deleted text I needed!"
**Solution**: Press `u` to undo. No harm done!

**Mistake**: "I got stuck in Insert mode typing `:w`"
**Solution**: Press `Esc` first to return to Normal mode, then `:w`

**Mistake**: "My change didn't work as expected"
**Solution**: Press `u` and try again. Understanding comes with practice.

## Next Steps

- Practice these operations daily
- Try the [Interactive Practice](/practice/beginner-challenges)
- Learn about [Text Objects](/intermediate/text-objects) for more power

---

## Resources

- [Vim Editing Reference](https://www.vim.org/docs.php)
- [Official Change Command Docs](https://vim.fandom.com/wiki/Vim_Tips_Wiki)
