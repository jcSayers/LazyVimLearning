# Practice Hub: Learn by Doing

Welcome to the interactive practice section! Here you'll test your Vim skills with real challenges. Learn by doing!

## How the Game Works

1. **Read the Challenge** - Understand what you need to do
2. **Type Commands** - Use real Vim commands in the editor
3. **Get Feedback** - See if your solution is correct
4. **Learn** - Each challenge teaches a specific concept

## Challenge Levels

### Beginner Level
Perfect for learning the basics:
- Navigation (hjkl, w, b, e)
- Editing (insert, delete, change)
- Copy and paste

**Time commitment**: 30-45 minutes
**Prerequisites**: Understand modes (from Fundamentals)

### Intermediate Level
Build on your fundamentals:
- Text objects (iw, aw, i", etc)
- Combining operators with motions
- Advanced searching

**Time commitment**: 45-60 minutes
**Prerequisites**: Comfortable with basic editing

### Advanced Level
Master complex operations:
- Macros and registers
- Complex text transformations
- Multiple file operations

**Time commitment**: 60+ minutes
**Prerequisites**: Intermediate level complete

## Getting Started

Choose your level:

- **[Beginner Challenges](/practice/beginner-challenges)** - New to Vim? Start here!
- **[Intermediate Challenges](/practice/intermediate-challenges)** - Ready to level up?
- **[Advanced Challenges](/practice/advanced-challenges)** - Master Vim concepts
- **[Sandbox](/practice/custom-sandbox)** - Free practice area

## Tips for Success

### 1. **Read the Instructions Carefully**
Each challenge describes exactly what to do. Read the target description.

### 2. **Use Hints Progressively**
- First hint: Gentle nudge about the approach
- Second hint: Names the specific command
- Third hint: Shows the exact solution

Try to solve without hints first—you'll learn better!

### 3. **Remember: Undo is Your Friend**
You can't break anything. Press `u` to undo any mistake.

### 4. **Think About the Grammar**
Remember: **`[Operator] [Count] [Motion/TextObject]`**

If a challenge seems confusing, break it down into these components.

### 5. **Practice Regularly**
- 15 minutes daily is better than 2 hours once
- Build muscle memory through repetition
- After completing a challenge, move on (don't obsess)

## Tracking Your Progress

Your progress is saved automatically in your browser:
- ✅ Completed challenges are marked
- 📊 Your score increases
- 🔄 You can reset anytime

**Note**: Progress is stored locally in your browser. Clear browser data and you'll lose it.

## Challenge Structure

Each challenge includes:

- **Title & Description** - What you'll learn
- **Initial Content** - Starting text
- **Target** - Desired final state
- **Instructions** - What to do
- **Hints** - Get help if stuck
- **Feedback** - Immediate results

## Common Challenges

### Navigation Challenges
Learn to move efficiently:
- Jump to specific characters
- Move by words and paragraphs
- Navigate entire files

### Editing Challenges
Master text manipulation:
- Delete and change text
- Copy and paste
- Replace words and lines

### Combination Challenges
Compose operators and motions:
- Use text objects effectively
- Chain multiple operations
- Think in terms of semantic units

## Pro Tips

**Tip 1: Think in Vim Grammar**
Don't think "select and delete"—think "delete word" (`dw`)

**Tip 2: Use Counts**
Instead of `ddd`, use `3d` or `3dd`

**Tip 3: Compose Commands**
Practice combining operators: `d` + `$` = `d$` (delete to line end)

**Tip 4: Learn Patterns**
Once you know the pattern, you can predict commands you've never seen:
- `d` = delete
- `dw` = delete word
- `di"` = delete inside quotes
- `dip` = delete inside paragraph

**Tip 5: Muscle Memory**
Type even if you know the answer. Your fingers need to learn the movements!

## Troubleshooting

### "The editor is confusing"
The editor simulates Vim but simplified for learning. Focus on learning the real Vim commands—they'll work the same way.

### "I keep forgetting commands"
Write them down! Or refer to the [Cheatsheet](/reference/cheatsheet). Spaced repetition helps memory.

### "This challenge is too hard"
Use the hints! There's no penalty for using hints. Understanding is the goal, not struggling.

### "My solution looks right but it's marked wrong"
Make sure your text exactly matches. Extra spaces or different text will be marked wrong.

## Beyond the Game

After practicing here:

1. **Open Real Vim** - Practice on actual files
2. **Use in Daily Editing** - Write in Vim, don't just practice
3. **Read Advanced Sections** - Dive into [Advanced](/advanced/) topics
4. **Contribute** - Share tips with other learners

## Ready to Start?

Pick your level and begin:

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <a href="/practice/beginner-challenges" class="nav-link">▶ Beginner Challenges</a>
  <a href="/practice/intermediate-challenges" class="nav-link">▶ Intermediate Challenges</a>
  <a href="/practice/advanced-challenges" class="nav-link">▶ Advanced Challenges</a>
  <a href="/practice/custom-sandbox" class="nav-link">▶ Sandbox</a>
</div>

---

**Remember**: Every Vim expert started as a beginner. Practice daily, and you'll be amazed at your progress!
