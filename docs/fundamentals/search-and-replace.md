# Search and Replace

Find and replace text efficiently across your files.

## Basic Search

### Forward Search

```vim
/pattern    Search forward for pattern
n           Go to next match
N           Go to previous match
```

### Backward Search

```vim
?pattern    Search backward
n           Next match (backward direction)
N           Previous match (backward direction)
```

### Repeat Last Search

```vim
/           Repeat last forward search
?           Repeat last backward search
```

## Search Options

### Case Sensitivity

```vim
/Pattern    Case-sensitive search
/pattern    Case-sensitive search
```

By default, search is case-sensitive. Make it case-insensitive:

```vim
:set ignorecase
/pattern    Now case-insensitive
```

### Search Current Word

```vim
*           Search forward for word under cursor
#           Search backward for word under cursor
g*          Search forward (partial matches)
g#          Search backward (partial matches)
```

## Replace: The `:s` Command

### Replace in Current Line

```vim
:s/old/new/     Replace first occurrence
:s/old/new/g    Replace all in line
```

### Replace in Range

```vim
:10,20s/old/new/g    Replace in lines 10-20
:%s/old/new/g        Replace in entire file
```

### Confirm Replacements

```vim
:%s/old/new/gc       Replace all, confirm each
```

When you see the prompt, type:
- `y` - Replace this occurrence
- `n` - Skip
- `a` - Replace all remaining
- `q` - Quit

## Advanced Search

### Search Patterns (Regex)

```vim
/^start/     Lines starting with "start"
/end$/       Lines ending with "end"
/a.b/        Matches "aXb" (. = any char)
/a[0-9]b/    Matches "a1b", "a2b", etc.
```

### Escape Special Characters

```vim
/\./         Search for literal period (not regex .)
/\$/         Search for literal $
/\\n/        Search for newline
```

## Useful Patterns

| Pattern | Matches |
|---------|---------|
| `^` | Start of line |
| `$` | End of line |
| `.` | Any character |
| `*` | Zero or more |
| `\+` | One or more |
| `\?` | Zero or one |
| `[abc]` | a, b, or c |
| `[^abc]` | Not a, b, or c |
| `\(pattern\)` | Capture group |
| `&` | Last match (in replacement) |

## Replace with Captured Groups

Capture parts of the match and use in replacement:

```vim
:%s/\([a-z]*\) \([a-z]*\)/\2 \1/g
```

This swaps two words.

## Practical Examples

### Change Function Names

```
Before: var oldName = function() { }
After:  var newName = function() { }

Command: :%s/oldName/newName/g
```

### Add Prefix

```
Before: function one() { }
After:  function prefix_one() { }

Command: :%s/function \([a-z]*\)/function prefix_\1/g
```

### Replace with Line Numbers

```vim
:%s/^/LINE: /    Add "LINE: " to start of each line
:%s/$/;/         Add semicolon to end of each line
```

## Tips

1. Always preview first with `/pattern` before replacing
2. Use `:set hlsearch` to highlight matches
3. Use `:%s/old/new/gc` with confirm for large replacements
4. Learn regex gradually—start with simple patterns
5. Test patterns on a backup first

## Next Steps

Learn about [Files and Buffers](/fundamentals/files-and-buffers) or [Text Objects](/intermediate/text-objects) for more power.

---

## Resources

- [Vim Search Documentation](https://www.vim.org/docs.php)
- [VimRegex Guide](http://vimregex.com/)
- [Regex 101](https://regex101.com/)
