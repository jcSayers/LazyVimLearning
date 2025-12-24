# Basic Navigation: Moving Through Files

In Vim, you navigate without the mouse using efficient key combinations. This page teaches you how to move around like a Vim expert.

## The Four Direction Keys: hjkl

The most fundamental Vim skill is using `hjkl` instead of arrow keys:

| Key | Direction |
|-----|-----------|
| `h` | Left |
| `j` | Down |
| `k` | Up |
| `l` | Right |

### Why hjkl?

Originally, the arrows on the keyboard weren't standard. Vim used `hjkl` so your hands never left the typing position. Today, it's still faster because:
- Your fingers stay in typing position
- You can combine with count: `10j` (down 10 lines)
- They're mnemonic: `hjkl` keyboard positions

### Getting Comfortable

The first day, `hjkl` feels weird. By day 2, it feels normal. By day 3, you'll type them automatically.

**Tip**: Disable arrow keys in your `~/.vimrc` to force the habit:

```vim
inoremap <Up> <Nop>
inoremap <Down> <Nop>
inoremap <Left> <Nop>
inoremap <Right> <Nop>
```

This isn't mean—it's training wheels. Remove it once you're comfortable.

## Word-Based Movement

Moving line-by-line is slow. Move by **words**:

| Key | Motion |
|-----|--------|
| `w` | Forward to start of next word |
| `b` | Backward to start of previous word |
| `e` | Forward to end of current word |
| `ge` | Backward to end of previous word |

### Example

```
Text:    The quick brown fox jumps
         ^
w        The quick → cursor at 'q'
w        quick brown → cursor at 'b'
e        brown fox → cursor at 'n' (end of brown)
b        brown → cursor at 'b' (start of brown)
```

### Count Works Here Too

```vim
3w       Move forward 3 words
5b       Move back 5 words
```

## Line-Based Movement

Navigate within a line:

| Key | Motion |
|-----|--------|
| `0` | To beginning of line |
| `^` | To first non-blank character of line |
| `$` | To end of line |
| `g_` | To last non-blank character of line |

### Example

```
Text:    The quick brown fox jumps
         ^
$        → To end of line (after 's' in jumps)
0        → To beginning of line (before 'T')
^        → To first non-blank (before 'T')
```

## File-Based Movement

Navigate through the entire file:

| Key | Motion |
|-----|--------|
| `gg` | Go to beginning of file |
| `G` | Go to end of file |
| `nG` | Go to line number n |
| `Ctrl+Home` | Beginning of file (alternative) |
| `Ctrl+End` | End of file (alternative) |

### Example

```vim
gg       Go to line 1
G        Go to last line
50G      Go to line 50
1G       Go to line 1 (same as gg)
```

## Finding Characters on Current Line

Jump directly to a character on the current line:

| Key | Motion |
|-----|--------|
| `f{char}` | Find character forward on this line |
| `F{char}` | Find character backward on this line |
| `t{char}` | To just before character forward |
| `T{char}` | To just after character backward |
| `;` | Repeat last f/F/t/T |
| `,` | Repeat last f/F/t/T in reverse direction |

### Example

```
Text:    The quick brown fox jumps
         ^
fx       Find 'x' → cursor moves to 'x' in fox
f;       Find ';' → no match (; not on line)
fq       Find 'q' → cursor moves to 'q' in quick
;        Repeat last find (fq) → stays at 'q'
```

These commands are incredibly efficient for precise navigation!

## Searching Through the File

Find text anywhere in the file:

| Key | Command |
|-----|---------|
| `/pattern` | Search forward for pattern |
| `?pattern` | Search backward for pattern |
| `n` | Go to next match |
| `N` | Go to previous match |

### Example

```vim
/quick          Search forward for "quick"
                Cursor jumps to first "quick" found
n               Go to next "quick"
?fox            Search backward for "fox"
n               Go to next "fox" (backward direction)
```

## Sentence and Paragraph Movement

Move by larger units:

| Key | Motion |
|-----|--------|
| `(` | To start of previous sentence |
| `)` | To start of next sentence |
| `{` | To start of previous paragraph |
| `}` | To start of next paragraph |

### What's a Sentence?

In Vim, a sentence ends with `.`, `!`, or `?` followed by space/tab/newline.

### What's a Paragraph?

A paragraph is a block of non-empty lines separated by empty lines.

## Combining Movement with Operators

This is where Vim's power emerges! Remember: **`[Operator] [Count] [Motion]`**

```vim
d$       Delete from cursor to end of line
dw       Delete word
d5j      Delete down 5 lines
y3w      Copy 3 words
c$       Change to end of line
>G       Indent from here to end of file
```

## Marks: Remember Positions

Mark important positions to jump back to:

| Key | Action |
|-----|--------|
| `m<letter>` | Set mark with letter (a-z) |
| `'<letter>` | Jump to mark |
| `''` | Jump to previous position |

### Example

```vim
ma            Set mark 'a' at current position
200G          Jump to line 200
'a            Jump back to mark 'a'
''            Jump to previous position (before 'a')
```

## The Jumplist

Vim remembers where you've jumped. Navigate through history:

| Key | Action |
|-----|--------|
| `Ctrl+o` | Jump to previous position (older) |
| `Ctrl+i` | Jump to next position (newer) |

## Summary: Navigation Commands

| Type | Command | Result |
|------|---------|--------|
| **Character** | `h`, `j`, `k`, `l` | Move left/down/up/right |
| **Word** | `w`, `b`, `e`, `ge` | Move by word |
| **Line** | `0`, `^`, `$`, `g_` | Move within line |
| **File** | `gg`, `G`, `nG` | Move through file |
| **Find** | `f<char>`, `t<char>` | Jump to character |
| **Search** | `/pattern`, `?pattern` | Find text |
| **Unit** | `(`, `)`, `{`, `}` | Sentence/paragraph |
| **Marks** | `m<letter>`, `'<letter>` | Remember positions |

## Practice: Combine Navigation with Operators

**Exercise 1**: Delete three words
```vim
dw dw dw    (delete three times, one word each)
      or
d3w         (delete 3 words at once)
```

**Exercise 2**: Copy from cursor to end of line
```vim
y$
```

**Exercise 3**: Delete from cursor to next 'x'
```vim
dfx         Delete forward to 'x'
```

**Exercise 4**: Change everything in this paragraph
```vim
cap         Change a paragraph
```

## Practice Exercise

Open a file with text:

```
The quick brown fox jumps over the lazy dog.
Vim is a powerful editor.
Modal editing is efficient.
```

Try these navigation commands:

1. `gg` - Go to beginning
2. `w` - Move forward one word
3. `5w` - Move forward 5 words
4. `$` - Go to end of line
5. `0` - Go to beginning of line
6. `fj` - Find 'j'
7. `/Vim` - Search for "Vim"
8. `n` - Find next occurrence
9. `G` - Go to end of file
10. `gg` - Go back to beginning

## Next: Basic Editing

Now that you can navigate, learn to [Edit Text](/fundamentals/basic-editing)!

---

## Resources

- [Vim Navigation Tutorial](https://vim.fandom.com/wiki/Best_Vim_Tips)
- [Official Movement Documentation](https://www.vim.org/docs.php)
