# Text Objects: The Game Changer

Text objects are how Vim lets you describe **what** you want to change, not **how** to select it. This is the most powerful concept in Vim.

## The Big Idea

Instead of manually selecting text, describe the semantic unit:

**Traditional editor**:
```
Click + drag to select word
Delete selection
```

**Vim**:
```
daw     Delete a word
```

Vim understands language structure. Use that!

## Text Object Syntax

```
[Operator] [i or a] [Object]
```

- **i** = inner (just the object)
- **a** = around (object + surrounding whitespace)

### Example: Words

```vim
diw     Delete inner word (just the word)
daw     Delete a word (word + space)
```

## Essential Text Objects

### w - Word

```vim
iw      Inner word
aw      A word (+ space)

Example:
  Text: "The quick brown"
  diw on "quick" → "The  brown" (deletes "quick")
  daw on "quick" → "The brown" (deletes "quick ")
```

### s - Sentence

```vim
is      Inner sentence
as      A sentence

Sentence = ends with . ! or ?
```

### p - Paragraph

```vim
ip      Inner paragraph
ap      A paragraph

Paragraph = block of lines separated by blank line
```

### Quote Pairs

```vim
i"      Inside double quotes
a"      Including double quotes
i'      Inside single quotes
a'      Including single quotes
i`      Inside backticks
a`      Including backticks
```

### Bracket Pairs

```vim
i(      Inside parentheses
a(      Including parentheses
i[      Inside square brackets
a[      Including square brackets
i{      Inside curly braces
a{      Including curly braces
```

### Tag Pairs (HTML/XML)

```vim
it      Inside tag
at      Including tag

Example:
  <span>hello</span>
  dit     Delete inner tag → <>hello</span>
  dat     Delete tag → ''' (removes whole tag)
```

## Practical Examples

### Change Inside Quotes

```vim
Before: name = "John Doe"
        Position cursor on string
ci"     Change inside quotes
Jane Roe
Esc
After:  name = "Jane Roe"
```

### Delete Function Parameters

```vim
Before: function(arg1, arg2, arg3)
        Cursor on arg2
da,     Delete arg2 and comma
After:  function(arg1, arg3)
```

### Comment Out Parenthetical

```vim
Before: result = calculate(x + (y * z))
        Cursor inside inner parens
ci(     Change inner parens
0       Replace with 0
Esc
After:  result = calculate(x + 0)
```

### Modify HTML Content

```vim
Before: <div>Hello world</div>
        Cursor inside
cit     Change inner tag content
Goodbye
Esc
After:  <div>Goodbye</div>
```

## Combining with Operators

Every operator works with text objects:

```vim
diw     Delete inner word
ciw     Change inner word
yaw     Copy a word
>ip     Indent paragraph
gU"     Uppercase inside quotes
dap     Delete paragraph
yi}     Copy inside braces
ci(     Change inside parens
```

## Why This Matters

**Before understanding text objects:**
```vim
f"      Find opening quote
h       Move back
v       Enter visual
f"      Find closing quote
l       Include it
d       Delete
```

**After understanding text objects:**
```vim
di"     Delete inside quotes
```

Same result, 6 keystrokes vs 1 command.

## Common Text Objects Summary

| Object | Description | Example |
|--------|-------------|---------|
| `w` | word | `daw`, `ciw` |
| `s` | sentence | `dis`, `yas` |
| `p` | paragraph | `dip`, `yap` |
| `"` | quotes | `ci"`, `da"` |
| `'` | single quotes | `ci'`, `di'` |
| `(`, `)` | parens | `di(`, `ci)` |
| `[`, `]` | brackets | `di[`, `da]` |
| `{`, `}` | braces | `di{`, `ca}` |
| `<`, `>` | angle brackets | `di<`, `da>` |
| `` ` `` | backticks | `di``, `da`` |
| `t` | tags (HTML) | `dit`, `dat` |

## Practice Tips

1. **Start with `iw` and `aw`** - Most common
2. **Learn quote pairs** - Used constantly
3. **Learn bracket pairs** - Essential for code
4. **Experiment** - Combine with operators

## Exercise: Transform Code

```cpp
int result = calculate(input_value);
```

Challenges:
- `daw` on "result" → Delete variable
- `ciw` on "calculate" → Change function name
- `di(` on function → Delete arguments
- `ca(` → Change including parens

## Next Steps

Master text objects, then explore:
- [Advanced Motions](/intermediate/motions-advanced)
- [Macros](/intermediate/macros)
- [Interactive Challenges](/practice/intermediate-challenges)

---

## Resources

- [Official Text Objects Documentation](https://www.vim.org/docs.php)
- [Understanding Text Objects](https://vim.fandom.com/wiki/Text_objects)
