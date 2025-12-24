# Vim Cheatsheet

Quick reference for essential Vim commands. Print this for quick lookup!

## Mode Switching

| Command | Action |
|---------|--------|
| `Esc` | Return to Normal mode (always safe) |
| `i` | Insert before cursor |
| `a` | Append after cursor |
| `o` | Open line below, insert |
| `O` | Open line above, insert |
| `v` | Visual mode (character select) |
| `V` | Visual mode (line select) |
| `Ctrl+v` | Visual mode (block select) |

## Navigation

| Command | Action |
|---------|--------|
| `h`, `j`, `k`, `l` | Left, Down, Up, Right |
| `w` | Next word start |
| `b` | Previous word start |
| `e` | End of word |
| `0` | Start of line |
| `$` | End of line |
| `gg` | Start of file |
| `G` | End of file |
| `nG` | Go to line n |
| `/pattern` | Search forward |
| `?pattern` | Search backward |
| `n` | Next match |
| `N` | Previous match |
| `f<char>` | Find char on line |
| `t<char>` | To before char |
| `;` | Repeat find |
| `,` | Reverse find |

## Editing

| Command | Action |
|---------|--------|
| `x` | Delete character |
| `d` | Delete (operator) |
| `c` | Change (delete and insert) |
| `y` | Yank (copy) |
| `p` | Paste after cursor |
| `P` | Paste before cursor |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `.` | Repeat last command |

## Delete Commands

| Command | Action |
|---------|--------|
| `dw` | Delete word |
| `dd` | Delete line |
| `d$` | Delete to end of line |
| `d0` | Delete to start of line |
| `d5w` | Delete 5 words |
| `dap` | Delete a paragraph |

## Change Commands

| Command | Action |
|---------|--------|
| `cw` | Change word |
| `cc` | Change line |
| `c$` | Change to end of line |
| `ciw` | Change inner word |
| `ci"` | Change inside quotes |

## Copy/Paste

| Command | Action |
|---------|--------|
| `yy` | Copy line |
| `yw` | Copy word |
| `y$` | Copy to end of line |
| `p` | Paste after |
| `P` | Paste before |

## Text Objects

| Command | Meaning |
|---------|---------|
| `iw` | Inner word |
| `aw` | A word |
| `is` | Inner sentence |
| `as` | A sentence |
| `ip` | Inner paragraph |
| `ap` | A paragraph |
| `i"` | Inside quotes |
| `a"` | A quoted string |
| `i(` | Inside parens |
| `a(` | A parenthetical expression |
| `i[` | Inside brackets |
| `i{` | Inside braces |

## File Operations

| Command | Action |
|---------|--------|
| `:w` | Write (save) |
| `:q` | Quit |
| `:wq` | Write and quit |
| `:q!` | Force quit without saving |
| `:e filename` | Open file |
| `:new` | New file |
| `:split` | Split horizontally |
| `:vsplit` | Split vertically |

## Search and Replace

| Command | Action |
|---------|--------|
| `:s/old/new/` | Replace in line |
| `:%s/old/new/g` | Replace all in file |
| `:s/old/new/g` | Replace all in line |
| `:%s/old/new/gc` | Replace all with confirm |

## Windows/Tabs

| Command | Action |
|---------|--------|
| `Ctrl+w w` | Switch window |
| `Ctrl+w n` | New window |
| `Ctrl+w c` | Close window |
| `:tabnew` | New tab |
| `gt` | Next tab |
| `gT` | Previous tab |

## Marks and Jumps

| Command | Action |
|---------|--------|
| `m<letter>` | Set mark |
| `'<letter>` | Jump to mark |
| `''` | Jump to previous |
| `Ctrl+o` | Jump older |
| `Ctrl+i` | Jump newer |

## Indentation

| Command | Action |
|---------|--------|
| `>` | Indent (operator) |
| `<` | Outdent (operator) |
| `>>` | Indent line |
| `<<` | Outdent line |
| `5>>` | Indent 5 lines |

## Macros

| Command | Action |
|---------|--------|
| `q<letter>` | Record macro |
| `q` | Stop recording |
| `@<letter>` | Play macro |
| `10@a` | Play macro a 10 times |

## Registers

| Command | Action |
|---------|--------|
| `"a` | Use register a |
| `"ay` | Copy to register a |
| `"ap` | Paste from register a |
| `"+y` | Copy to system clipboard |
| `"+p` | Paste from system clipboard |

## Counting

Any motion can be prefixed with a number:

| Example | Action |
|---------|--------|
| `5j` | Move down 5 lines |
| `10w` | Move forward 10 words |
| `3dd` | Delete 3 lines |
| `2y5w` | Copy 2×5 = 10 words |

## Case Changes

| Command | Action |
|---------|--------|
| `~` | Toggle case of char |
| `gU` | Uppercase (operator) |
| `gu` | Lowercase (operator) |
| `gUU` | Uppercase line |
| `guu` | Lowercase line |

## Advanced Motion

| Command | Action |
|---------|--------|
| `(` | Previous sentence |
| `)` | Next sentence |
| `{` | Previous paragraph |
| `}` | Next paragraph |
| `%` | Matching bracket |
| `#` | Search word backward |
| `*` | Search word forward |

## Selection Commands

| Command | Action |
|---------|--------|
| `gv` | Reselect last selection |
| `o` | Toggle selection end |
| `v` | Enter visual (from normal) |
| `V` | Enter line visual |
| `Ctrl+v` | Enter block visual |

## General Tips

- **Undo is your friend** - Press `u` to undo any mistake
- **Motions combine** - `d` + motion = delete that motion
- **Counting helps** - `5dd` = delete 5 lines
- **Marks remember positions** - `ma` then `'a` to return
- **Macros repeat sequences** - `qa...q` then `@a`
- **Repeat with `.`** - Most changes can repeat with `.`

## Common Patterns

```vim
daw              Delete a word (whole word)
ciw              Change inside word
yip              Copy inside paragraph
d}               Delete to next paragraph
>ap              Indent a paragraph
gUiw             Uppercase word
:%s/foo/bar/g    Replace all foo with bar
/pattern         Search for pattern
:%s//new/g       Replace last search
```

## Learning Path

1. **Day 1**: hjkl, i, Esc, :w, :q
2. **Day 2**: w, b, e, dw, dd, u
3. **Day 3**: y, p, /, v, d + motion
4. **Day 4**: Text objects (iw, aw, i", etc)
5. **Week 2**: Macros, registers, marks
6. **Week 3**: Search/replace, advanced motions
7. **Month 1**: Scripting, plugins, optimization

---

**Print this page** for quick reference while learning!

## Resources

- [Official Vim Cheatsheet](https://vim.fandom.com/wiki/Vim_Tips_Wiki)
- [Interactive Vim Tutor](https://www.openvim.com/)
- [Vim Reference Manual](https://www.vim.org/docs.php)
