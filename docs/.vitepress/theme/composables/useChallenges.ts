import { ref, computed } from 'vue'

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'navigation' | 'editing' | 'combination'
  initialContent: string
  targetContent: string
  targetDescription: string
  hints: string[]
  instructions: string
  keyStrokes?: string // Optimal solution
}

export const challenges: Challenge[] = [
  {
    id: 'nav-1',
    title: 'Navigate to the End',
    description: 'Move cursor to the end of the line',
    difficulty: 'beginner',
    type: 'navigation',
    initialContent: 'The quick brown fox',
    targetDescription: 'Cursor at end of line (after x)',
    instructions: 'Press $ to move to the end of the line',
    hints: [
      'You need to move to the end of the line',
      'In Normal mode, $ moves to end of line',
      'Press $ now'
    ],
    keyStrokes: '$'
  },
  {
    id: 'nav-2',
    title: 'Find a Character',
    description: 'Jump to the character f in the line',
    difficulty: 'beginner',
    type: 'navigation',
    initialContent: 'The quick brown fox jumps',
    targetDescription: 'Cursor on the letter f',
    instructions: 'Use f<char> command to find character f',
    hints: [
      'Use the find character command',
      'Press f then type the character you want to find',
      'Try: ff'
    ],
    keyStrokes: 'ff'
  },
  {
    id: 'edit-1',
    title: 'Delete a Word',
    description: 'Delete the word quick from the text',
    difficulty: 'beginner',
    type: 'editing',
    initialContent: 'The quick brown fox',
    targetContent: 'The brown fox',
    targetDescription: 'The word quick has been deleted',
    instructions: 'Position cursor on quick, then press dw to delete the word',
    hints: [
      'Use dw to delete a word',
      'Make sure you\'re in Normal mode',
      'Try: dw'
    ],
    keyStrokes: 'dw'
  },
  {
    id: 'edit-2',
    title: 'Change Text',
    description: 'Change the word fox to cat',
    difficulty: 'beginner',
    type: 'editing',
    initialContent: 'The quick brown fox',
    targetContent: 'The quick brown cat',
    targetDescription: 'fox has been changed to cat',
    instructions: 'Move to f in fox, use cw to change the word, type cat, press Esc',
    hints: [
      'Use cw (change word) to replace',
      'Press Esc when done typing',
      'Try: cwcat<Esc>'
    ],
    keyStrokes: 'cwcat'
  },
  {
    id: 'comb-1',
    title: 'Delete to End of Line',
    description: 'Delete everything from cursor to end of line',
    difficulty: 'intermediate',
    type: 'combination',
    initialContent: 'The quick brown fox jumps over the lazy dog',
    targetContent: 'The quick ',
    targetDescription: 'Everything after quick has been deleted',
    instructions: 'Position cursor after quick, use d$ to delete to end of line',
    hints: [
      'Combine d (delete) with $ (end of line)',
      'This is d$ (delete to end)',
      'Try: d$'
    ],
    keyStrokes: 'd$'
  },
  {
    id: 'comb-2',
    title: 'Copy a Word',
    description: 'Copy the word brown',
    difficulty: 'beginner',
    type: 'editing',
    initialContent: 'The quick brown fox',
    targetDescription: 'The word brown is copied (ready to paste)',
    instructions: 'Move to brown, use yw to copy the word',
    hints: [
      'Use yw (yank word) to copy',
      'Yank means copy in Vim terminology',
      'Try: yw'
    ],
    keyStrokes: 'yw'
  },
  {
    id: 'nav-3',
    title: 'Go to Start of Word',
    description: 'Move forward two words using w',
    difficulty: 'beginner',
    type: 'navigation',
    initialContent: 'The quick brown fox',
    targetDescription: 'Cursor at the start of brown',
    instructions: 'Press w twice to move to the next word start',
    hints: [
      'Use w to move to next word',
      'Press w twice',
      'Try: ww'
    ],
    keyStrokes: 'ww'
  },
  {
    id: 'edit-3',
    title: 'Delete Line',
    description: 'Delete the entire current line',
    difficulty: 'beginner',
    type: 'editing',
    initialContent: 'The quick brown fox\njumps over lazy dog',
    targetContent: 'jumps over lazy dog',
    targetDescription: 'First line deleted',
    instructions: 'Use dd to delete the entire line',
    hints: [
      'dd deletes an entire line',
      'Try pressing dd'
    ],
    keyStrokes: 'dd'
  },
]

export const useChallenges = () => {
  const currentChallenge = ref<Challenge | null>(null)
  const currentHintIndex = ref(0)

  // Get challenges by difficulty
  const getChallengesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return challenges.filter(c => c.difficulty === difficulty)
  }

  // Get all beginner challenges
  const beginnerChallenges = computed(() => getChallengesByDifficulty('beginner'))

  // Get all intermediate challenges
  const intermediateChallenges = computed(() => getChallengesByDifficulty('intermediate'))

  // Get all advanced challenges
  const advancedChallenges = computed(() => getChallengesByDifficulty('advanced'))

  // Start a challenge
  const startChallenge = (challengeId: string) => {
    const found = challenges.find(c => c.id === challengeId)
    if (found) {
      currentChallenge.value = found
      currentHintIndex.value = 0
      return true
    }
    return false
  }

  // Get next hint
  const getHint = () => {
    if (!currentChallenge.value) return null
    const hints = currentChallenge.value.hints
    if (currentHintIndex.value < hints.length) {
      const hint = hints[currentHintIndex.value]
      currentHintIndex.value++
      return hint
    }
    return 'You\'ve seen all the hints!'
  }

  // Get current hint level
  const currentHintLevel = computed(() => {
    if (!currentChallenge.value) return 0
    return Math.min(currentHintIndex.value, currentChallenge.value.hints.length)
  })

  // Check if answer is correct (simplified - just checking content)
  const checkAnswer = (userContent: string): boolean => {
    if (!currentChallenge.value) return false
    return userContent.trim() === currentChallenge.value.targetContent.trim()
  }

  // Get challenge by id
  const getChallengeById = (id: string) => {
    return challenges.find(c => c.id === id)
  }

  return {
    challenges,
    currentChallenge,
    currentHintIndex,
    beginnerChallenges,
    intermediateChallenges,
    advancedChallenges,
    getChallengesByDifficulty,
    startChallenge,
    getHint,
    currentHintLevel,
    checkAnswer,
    getChallengeById,
  }
}
