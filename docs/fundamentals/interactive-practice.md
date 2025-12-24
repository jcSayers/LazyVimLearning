# Interactive Practice: Test Your Skills

Ready to practice? Here are beginner challenges to reinforce what you've learned in the Fundamentals section.

## How It Works

Each challenge shows you:
1. **What to do** - The task description
2. **Starting text** - The content to work with
3. **Your goal** - What the final text should look like

Try to complete challenges using real Vim commands. Click "Check Solution" when ready!

## Before You Start

- Make sure you're in **Normal mode**
- Use **real Vim commands** - they work the same way
- Use hints if you get stuck
- Remember: **`u` undoes** any mistake

## Challenge 1: Navigate to the End

Move the cursor to the end of the line using a single command.

<ClientOnly>
  <VimGameEditor :challengeId="'nav-1'" />
</ClientOnly>

---

## Challenge 2: Find a Character

Use the find command to jump to a specific character on the line.

<ClientOnly>
  <VimGameEditor :challengeId="'nav-2'" />
</ClientOnly>

---

## Challenge 3: Delete a Word

Delete a specific word from the text.

<ClientOnly>
  <VimGameEditor :challengeId="'edit-1'" />
</ClientOnly>

---

## Challenge 4: Change Text

Change one word to another using the change command.

<ClientOnly>
  <VimGameEditor :challengeId="'edit-2'" />
</ClientOnly>

---

## Challenge 5: Copy a Word

Practice copying text so you can paste it elsewhere.

<ClientOnly>
  <VimGameEditor :challengeId="'comb-2'" />
</ClientOnly>

---

## Challenge 6: Move to Next Word

Use word motion to navigate forward.

<ClientOnly>
  <VimGameEditor :challengeId="'nav-3'" />
</ClientOnly>

---

## Challenge 7: Delete an Entire Line

Remove an entire line using a single command.

<ClientOnly>
  <VimGameEditor :challengeId="'edit-3'" />
</ClientOnly>

---

## Tips for Success

### Tip 1: Start Simple
If a challenge seems hard, try the hints. Understanding the approach is more important than struggling.

### Tip 2: Use the Grammar
Remember: **`[Operator] [Motion]`**
- `d` (delete) + `w` (word) = `dw` (delete word)
- `d` + `$` (end of line) = `d$` (delete to end)

### Tip 3: Undo Liberally
Made a mistake? Press `u` to undo. No harm done.

### Tip 4: Practice Offline Too
These games are great for learning, but also practice in real Vim:
```bash
vim practice.txt
```

### Tip 5: Muscle Memory
Type the commands out, even if you know them. Your fingers need to learn!

## Next Steps

After finishing these challenges:

1. **Open real Vim** - Practice these commands on actual files
2. **Read Intermediate** - Learn about [Text Objects](/intermediate/text-objects)
3. **Do more challenges** - Try [Intermediate Challenges](/practice/intermediate-challenges)

## Track Your Progress

Your completed challenges are saved automatically. Check back to review or try them again to improve your speed!

---

**Remember**: Every keystroke is practice. You're building muscle memory for commands you'll use thousands of times.

Ready for more? Check out [Intermediate Challenges](/practice/intermediate-challenges)!
