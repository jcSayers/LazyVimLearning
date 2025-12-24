# Command Index

Alphabetical reference of Vim commands. Use Ctrl+F to search!

## Search by First Letter

### a

- `a` - Append after cursor (insert mode)
- `A` - Append at end of line (insert mode)
- `ab` - Abbreviate
- `append` - Append lines

### b

- `b` - Back to start of word
- `bang` - Execute shell command
- `bd` - Buffer delete
- `bn` - Buffer next
- `bp` - Buffer previous

### c

- `c` - Change (operator)
- `cc` - Change line
- `cd` - Change directory
- `cmap` - Command mode map
- `cnext` - Next error in list

### d

- `d` - Delete (operator)
- `dd` - Delete line
- `delete` - Delete lines
- `diffget` - Get difference
- `diffput` - Put difference

### e

- `e` - End of word
- `edit` - Edit file
- `enew` - Edit new file
- `ex` - Enter ex mode
- `execute` - Execute ex command

### f

- `f` - Find character forward
- `file` - Show file info
- `find` - Find file
- `flist` - File list
- `fold` - Fold text

### g

- `g` - Go prefix
- `gd` - Go to definition
- `ge` - Go end previous word
- `goto` - Go to line
- `g_` - Go last char of line

### h

- `h` - Move left
- `help` - Show help
- `highlight` - Highlight group
- `history` - Command history

### i

- `i` - Insert before cursor (insert mode)
- `I` - Insert at line start (insert mode)
- `iabbrev` - Insert abbreviation
- `if` - If condition (script)
- `ignore` - Ignore case setting

### j

- `j` - Move down
- `join` - Join lines
- `jumps` - Show jump list

### k

- `k` - Move up
- `keepmarks` - Preserve marks

### l

- `l` - Move right
- `last` - Go to last file
- `let` - Assign variable
- `list` - List files
- `load` - Load file

### m

- `m` - Set mark (operator)
- `make` - Run make command
- `map` - Create mapping
- `marks` - Show marks
- `move` - Move lines

### n

- `n` - Next search result
- `N` - Previous search result
- `new` - New window
- `next` - Next file
- `number` - Show line numbers

### o

- `o` - Open line below (insert mode)
- `O` - Open line above (insert mode)
- `only` - Only this window
- `ounmap` - Undo operator map

### p

- `p` - Paste after
- `P` - Paste before
- `pwd` - Print working directory
- `python` - Execute Python

### q

- `q` - Quit (with variations)
- `qa` - Quit all
- `qall` - Quit all
- `quit` - Quit

### r

- `r` - Replace character
- `R` - Replace mode
- `read` - Read file
- `redo` - Redo
- `register` - Register list

### s

- `s` - Substitute (like c with single char)
- `set` - Set option
- `shell` - Shell command
- `source` - Source script
- `split` - Split window

### t

- `t` - To before character
- `tag` - Go to tag
- `tabnew` - New tab
- `tags` - Show tag stack
- `terminal` - Open terminal

### u

- `u` - Undo
- `undo` - Undo line
- `unmap` - Remove mapping
- `update` - Save if changed

### v

- `v` - Visual mode (character)
- `V` - Visual mode (line)
- `version` - Show version
- `vertical` - Split vertically

### w

- `w` - Next word start
- `w` - Save (command mode)
- `wall` - Write all
- `wincmd` - Window command
- `winpos` - Window position
- `winsize` - Window size
- `write` - Write file
- `wq` - Write and quit

### x

- `x` - Delete character
- `xa` - Close all windows

### y

- `y` - Yank (copy)
- `yank` - Yank lines

### z

- `z` - Fold commands
- `za` - Toggle fold
- `zf` - Create fold
- `zM` - Close all folds

## Command Mode Shortcuts

| Command | Action |
|---------|--------|
| `:` | Enter command mode |
| `:w` | Write (save) |
| `:q` | Quit |
| `:wq` | Write and quit |
| `:!` | Shell command |
| `:e` | Edit file |
| `:tabnew` | New tab |
| `:split` | Split window |
| `:vsplit` | Vertical split |
| `:buffers` | List buffers |
| `:set` | Set option |
| `:help` | Help |

## Useful :set Commands

```vim
:set number              Show line numbers
:set nonumber            Hide line numbers
:set relativenumber      Relative line numbers
:set expandtab           Spaces instead of tabs
:set tabstop=4           Tab width
:set ignorecase          Ignore case in search
:set hlsearch            Highlight search
:set incsearch           Search as you type
:set autoindent          Auto-indent
:set smartindent         Smart indentation
:set ruler               Show cursor position
:set showmode            Show mode in status bar
:set laststatus=2        Always show status bar
:set scrolloff=5         Scroll offset
:set sidescrolloff=5     Side scroll offset
```

## See Also

- [Cheatsheet](/reference/cheatsheet) - Quick reference
- [Resources](/reference/resources) - External links
- [Official Index](https://www.vim.org/docs.php) - Complete reference

---

**Tip**: Use `:help <command>` for detailed help on any command!
