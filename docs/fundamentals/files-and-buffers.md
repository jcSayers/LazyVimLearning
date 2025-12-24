# Files and Buffers

Work with multiple files efficiently in Vim.

## Opening Files

### Open a File

```vim
:e filename        Open file
:e .               Open file browser
:enew              Create new buffer
```

### Open Recent Files

```vim
:oldfiles          Show recently opened files
:browse oldfiles   Browse recent files
```

## Buffers vs Windows vs Tabs

### Buffer
A file loaded into memory. Vim can have many buffers open at once.

### Window
A viewport showing a buffer. You can split windows to view multiple buffers.

### Tab
A collection of windows. Similar to browser tabs.

### View One Buffer at a Time

```vim
:b filename       Open buffer showing file
:b 2              Open buffer 2
:bn               Next buffer
:bp               Previous buffer
:bl               Last buffer
:bd               Delete buffer
```

### Split Windows

```vim
:split            Split horizontally
:vsplit           Split vertically
Ctrl+w w          Switch between windows
Ctrl+w n          New window
Ctrl+w c          Close window
```

### Tabs

```vim
:tabnew           New tab
:tabnew filename  Open file in new tab
gt                Next tab
gT                Previous tab
:tabc             Close tab
:tabs             List all tabs
```

## Working with Multiple Files

### Open Multiple Files

```bash
vim file1 file2 file3
```

Then navigate between them:

```vim
:next             Next file
:prev             Previous file
:first            First file
:last             Last file
:args             Show file list
```

### Using the Argument List

```vim
:args *.txt                Open all .txt files
:argdo %s/old/new/ge       Replace in all files
:argdo update              Save all files
```

## Save and Quit

### Save

```vim
:w              Write current file
:w!             Force write (overwrite read-only)
:wa             Write all buffers
:wq             Write and quit
:x              Write if changed and quit
```

### Quit

```vim
:q              Quit current buffer
:q!             Force quit without saving
:qa             Quit all buffers
:qa!            Force quit all
```

### Save to Different File

```vim
:w newname.txt       Save as new file
:w >> existing.txt   Append to another file
:x,y w file.txt      Save lines x to y to file
```

## Working with Buffers Efficiently

### List All Buffers

```vim
:buffers    or :ls
```

Shows output like:
```
  1 %a  "file1.txt"                  line 5
  2 #   "file2.txt"                  line 1
  3     "file3.txt"                  line 10
```

- `%` = Current buffer
- `#` = Alternate buffer
- `a` = Active (loaded)
- `h` = Hidden (unloaded)

### Navigate Between Buffers

```vim
:b file2           Open file2 buffer
:buffer 2          Open buffer 2 by number
:bnext             Next buffer
:bprevious         Previous buffer
:blast             Last buffer
:bfirst            First buffer
```

### Delete Buffers

```vim
:bdelete           Delete current buffer
:bdelete 2         Delete buffer 2
:bdelete file.txt  Delete buffer containing file.txt
:0,9bdelete        Delete buffers 0-9
```

## Managing Changes

### Check Unsaved Changes

Files with unsaved changes show `[+]` in the buffer list:

```vim
:buffers    Shows which files have unsaved changes
```

### Save All Changes

```vim
:wa         Write all buffers
```

### Abandon Changes

```vim
:e!         Reload file (discard changes)
:e!         Abandon changes to this file
```

## File Commands

### Create Directory

```vim
:! mkdir new_dir      Create directory
:cd new_dir          Change directory
:pwd                 Show current directory
```

### File Information

```vim
Ctrl+g              Show file info (line, column, position)
:file               Show current file name
:set modifiable     Make file editable
:set readonly       Make file read-only
```

## Useful Mappings

Most Vim users create mappings for common operations:

```vim
:noremap <Leader>e :e<Space>
:noremap <Leader>n :enew<CR>
:noremap <Leader>q :q<CR>
:noremap <Leader>w :w<CR>
:noremap <Leader>b :buffers<CR>
```

## Workflow Example

Common workflow with multiple files:

```vim
:e file1.txt              Open file1
i                         Make changes
:w                        Save file1
:e file2.txt              Open file2
:b file1.txt              Go back to file1
:bn                       Next file
:%s/old/new/g             Replace in current file
:wa                       Save all
```

## Next Steps

Master files and buffers, then learn about [Interactive Practice](/fundamentals/interactive-practice) or jump to [Text Objects](/intermediate/text-objects).

---

## Resources

- [Vim Buffer Documentation](https://www.vim.org/docs.php)
- [Working with Multiple Files](https://vim.fandom.com/wiki/Managing_multiple_files_in_vim)
