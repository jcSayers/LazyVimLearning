# Intermediate: Level Up Your Skills

You've mastered the fundamentals. Now it's time to unlock Vim's real power through advanced concepts like text objects, macros, and registers.

## What's in This Section

1. **[Text Objects](/intermediate/text-objects)** - Describe chunks of code semantically
2. **[Advanced Motions](/intermediate/motions-advanced)** - Move like a pro
3. **[Marks & Jumps](/intermediate/marks-and-jumps)** - Remember and navigate positions
4. **[Macros](/intermediate/macros)** - Record and replay sequences
5. **[Registers](/intermediate/registers)** - Master the clipboard system
6. **[Windows & Tabs](/intermediate/windows-and-tabs)** - Manage multiple views
7. **[Interactive Challenges](/intermediate/interactive-challenges)** - Practice intermediate skills

## Prerequisites

- Complete the [Fundamentals](/fundamentals/) section
- Be comfortable with modes, navigation, and basic editing
- Understand the grammar: `[Operator] [Motion]`

## The Power of Text Objects

Text objects are the game-changer that separates Vim novices from experts.

Instead of thinking "select from here to here", think "change inside quotes" (`ci"`).

```vim
ciw     Change inner word
dap     Delete a paragraph
yi}     Copy inside braces
```

This semantic understanding makes editing intuitive and fast.

## Quick Links

- [Master Text Objects](/intermediate/text-objects) ← Start here
- [Advanced Motions](/intermediate/motions-advanced)
- [Macros](/intermediate/macros) ← The hidden power
- [Registers](/intermediate/registers) ← Full clipboard control

## Learning Path

Work through these sections in order for maximum understanding:

1. Start with **Text Objects** (15 min read + 10 min practice)
2. Move to **Advanced Motions** (10 min)
3. Practice with **Interactive Challenges** (20-30 min)
4. Learn **Macros** (15 min) - This is powerful!
5. Master **Registers** (15 min)
6. Explore **Windows & Tabs** (optional, based on workflow)

**Total time**: 90-120 minutes for complete section

## What You'll Be Able to Do

By the end of this section:

✅ Select and operate on semantic text units (text objects)
✅ Record and replay command sequences (macros)
✅ Use multiple clipboard registers
✅ Navigate and mark important positions
✅ Manage multiple windows and tabs
✅ Combine advanced motions with operators

## Pro Tips

**Tip 1**: Text objects change everything. Invest time here.

**Tip 2**: Macros look complex but are simple. Try recording a small sequence.

**Tip 3**: Registers give you multiple clipboards. `"ay` copies to register a, `"ap` pastes from it.

**Tip 4**: Marks let you jump back to positions. `ma` sets mark, `'a` jumps to it.

**Tip 5**: Practice macros daily. They automate repetitive work.

## Troubleshooting

**Q: Text objects seem complex**
A: They're not. They're just semantic descriptions. `iw` = "inside word". Learn 3-4 and you'll understand the pattern.

**Q: Macros don't record what I expect**
A: Remember, macros record in Normal mode. Make sure you press `q` to stop recording.

**Q: How do I know which register to use?**
A: Start with the default (no register prefix). Use specific registers when needed.

## Next Steps

Ready to level up? Start with [Text Objects](/intermediate/text-objects)!

Or jump straight to [Intermediate Challenges](/practice/intermediate-challenges) to practice what you know.

---

**Remember**: Intermediate Vim is where the magic happens. These concepts multiply your editing speed by 10x once internalized.
