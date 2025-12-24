<template>
  <ClientOnly>
    <div class="vim-practice-container">
      <!-- Challenge Selection -->
      <div v-if="!selectedChallenge" class="challenge-selection">
        <h3>Choose a Challenge</h3>
        <div class="challenge-grid">
          <button
            v-for="challenge in challenges"
            :key="challenge.id"
            :class="['challenge-card', { completed: completedChallenges.includes(challenge.id) }]"
            @click="selectChallenge(challenge)"
          >
            <div class="challenge-name">{{ challenge.title }}</div>
            <div class="challenge-difficulty">{{ challenge.difficulty }}</div>
            <div v-if="completedChallenges.includes(challenge.id)" class="completed-badge">✓ Complete</div>
          </button>
        </div>

        <!-- Progress Summary -->
        <div class="progress-summary">
          <h4>Your Progress</h4>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <p>{{ completedChallenges.length }} / {{ challenges.length }} challenges completed</p>
          <button v-if="completedChallenges.length > 0" @click="resetProgress" class="btn-reset">
            Reset Progress
          </button>
        </div>
      </div>

      <!-- Challenge View -->
      <div v-else class="challenge-view">
        <div class="challenge-header">
          <button @click="selectedChallenge = null" class="btn-back">← Back</button>
          <h2>{{ selectedChallenge.title }}</h2>
          <div class="difficulty-badge">{{ selectedChallenge.difficulty }}</div>
        </div>

        <div class="challenge-content">
          <!-- Instructions -->
          <div class="instructions-panel">
            <h3>Task</h3>
            <p>{{ selectedChallenge.instructions }}</p>
            <div class="target-box">
              <strong>Goal:</strong> {{ selectedChallenge.targetDescription }}
            </div>
          </div>

          <!-- Practice Area -->
          <div class="practice-area">
            <div class="editor-label">Practice Text (Click and try Vim commands):</div>
            <textarea
              v-model="currentContent"
              class="practice-editor"
              placeholder="Click here and practice..."
            ></textarea>

            <div class="command-info">
              <strong>Current Mode:</strong> <span class="mode-indicator">Normal</span>
            </div>

            <!-- Buttons -->
            <div class="button-group">
              <button @click="checkSolution" class="btn-check">✓ Check Solution</button>
              <button @click="showHint" class="btn-hint">💡 Hint</button>
              <button @click="resetChallenge" class="btn-reset">↺ Reset</button>
            </div>
          </div>

          <!-- Feedback -->
          <div v-if="feedback" :class="['feedback', feedbackType]">
            {{ feedback }}
          </div>

          <!-- Hint Display -->
          <div v-if="currentHint" class="hint-display">
            <strong>Hint:</strong> {{ currentHint }}
            <p v-if="hintLevel < selectedChallenge.hints.length" class="hint-more">
              ({{ hintLevel }}/{{ selectedChallenge.hints.length }} hints used)
            </p>
          </div>

          <!-- Success Message -->
          <div v-if="isSolved" class="success-message">
            <h4>🎉 Challenge Complete!</h4>
            <p>You've mastered this challenge!</p>
            <button @click="nextChallenge" class="btn-next">Next Challenge →</button>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Challenge {
  id: string
  title: string
  instructions: string
  initialContent: string
  targetContent: string
  targetDescription: string
  hints: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

const challenges: Challenge[] = [
  {
    id: 'nav-1',
    title: 'Move to End of Line',
    instructions: 'Position the cursor at the end of the line using a Vim command.',
    initialContent: 'The quick brown fox jumps',
    targetContent: 'The quick brown fox jumps',
    targetDescription: 'Cursor at end of line (after "jumps")',
    difficulty: 'beginner',
    hints: [
      'You need to move to the end of the line',
      'In Vim Normal mode, use the $ key',
      'Press $ to move to end of line'
    ]
  },
  {
    id: 'edit-1',
    title: 'Delete a Word',
    instructions: 'Remove the word "quick" from the text.',
    initialContent: 'The quick brown fox',
    targetContent: 'The brown fox',
    targetDescription: 'The word "quick" has been removed',
    difficulty: 'beginner',
    hints: [
      'Position cursor on "quick" then delete it',
      'Use dw command (delete word)',
      'Place cursor on "quick" and press dw'
    ]
  },
  {
    id: 'edit-2',
    title: 'Change a Word',
    instructions: 'Replace "fox" with "cat".',
    initialContent: 'The quick brown fox',
    targetContent: 'The quick brown cat',
    targetDescription: 'fox has been changed to cat',
    difficulty: 'beginner',
    hints: [
      'Position on "fox" and change the word',
      'Use cw to change word then type replacement',
      'Position on "fox", press cw, type "cat", press Esc'
    ]
  },
  {
    id: 'edit-3',
    title: 'Delete Entire Line',
    instructions: 'Remove the entire first line.',
    initialContent: 'First line to delete\nSecond line stays',
    targetContent: 'Second line stays',
    targetDescription: 'First line has been deleted',
    difficulty: 'beginner',
    hints: [
      'Delete the entire line using a Vim command',
      'Use dd to delete entire line',
      'Press dd to delete the current line'
    ]
  },
  {
    id: 'copy-1',
    title: 'Copy a Word',
    instructions: 'Copy the word "hello" without deleting it.',
    initialContent: 'hello world',
    targetContent: 'hello world',
    targetDescription: 'hello is copied (ready to paste)',
    difficulty: 'beginner',
    hints: [
      'Copy the word using Vim yank command',
      'Use yw to copy (yank) a word',
      'Position on "hello" and press yw'
    ]
  },
  {
    id: 'nav-2',
    title: 'Move Forward Two Words',
    instructions: 'Move cursor forward two words.',
    initialContent: 'The quick brown fox',
    targetContent: 'The quick brown fox',
    targetDescription: 'Cursor on "brown"',
    difficulty: 'beginner',
    hints: [
      'Move forward by words',
      'Use w key to move to next word start',
      'Press w twice to move forward two words'
    ]
  }
]

const selectedChallenge = ref<Challenge | null>(null)
const currentContent = ref('')
const feedback = ref('')
const feedbackType = ref<'success' | 'error' | 'info'>('info')
const currentHint = ref<string | null>(null)
const hintLevel = ref(0)
const isSolved = ref(false)
const completedChallenges = ref<string[]>(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('vimPracticeProgress')
    return saved ? JSON.parse(saved) : []
  }
  return []
})

const progressPercentage = computed(() => {
  return Math.round((completedChallenges.value.length / challenges.length) * 100)
})

const selectChallenge = (challenge: Challenge) => {
  selectedChallenge.value = challenge
  currentContent.value = challenge.initialContent
  feedback.value = ''
  currentHint.value = null
  hintLevel.value = 0
  isSolved.value = false
}

const checkSolution = () => {
  if (!selectedChallenge.value) return

  if (currentContent.value.trim() === selectedChallenge.value.targetContent.trim()) {
    isSolved.value = true
    feedback.value = '✓ Perfect! You solved it!'
    feedbackType.value = 'success'

    // Save progress
    if (!completedChallenges.value.includes(selectedChallenge.value.id)) {
      completedChallenges.value.push(selectedChallenge.value.id)
      localStorage.setItem('vimPracticeProgress', JSON.stringify(completedChallenges.value))
    }
  } else {
    feedback.value = `Not quite. Expected: "${selectedChallenge.value.targetContent}" but got: "${currentContent.value}"`
    feedbackType.value = 'error'
  }
}

const showHint = () => {
  if (!selectedChallenge.value) return

  if (hintLevel.value < selectedChallenge.value.hints.length) {
    currentHint.value = selectedChallenge.value.hints[hintLevel.value]
    hintLevel.value++
  }
}

const resetChallenge = () => {
  if (!selectedChallenge.value) return
  currentContent.value = selectedChallenge.value.initialContent
  feedback.value = ''
  currentHint.value = null
  hintLevel.value = 0
  isSolved.value = false
}

const resetProgress = () => {
  completedChallenges.value = []
  localStorage.removeItem('vimPracticeProgress')
}

const nextChallenge = () => {
  if (!selectedChallenge.value) return

  const currentIndex = challenges.findIndex(c => c.id === selectedChallenge.value!.id)
  if (currentIndex < challenges.length - 1) {
    selectChallenge(challenges[currentIndex + 1])
  } else {
    selectedChallenge.value = null
  }
}
</script>

<style scoped>
.vim-practice-container {
  padding: 1.5rem;
}

/* Challenge Selection */
.challenge-selection {
  max-width: 100%;
}

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.challenge-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-align: left;
}

.challenge-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.challenge-card.completed {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.challenge-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.challenge-difficulty {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-transform: capitalize;
}

.challenge-card.completed .challenge-difficulty {
  color: rgba(255, 255, 255, 0.8);
}

.completed-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #4caf50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* Progress */
.progress-summary {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.progress-summary h4 {
  margin-top: 0;
}

.progress-bar {
  background: var(--vp-c-divider);
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress-fill {
  background: var(--vp-c-brand);
  height: 100%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Challenge View */
.challenge-view {
  max-width: 900px;
}

.challenge-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--vp-c-brand);
  padding-bottom: 1rem;
}

.btn-back {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-back:hover {
  background: var(--vp-c-brand);
  color: white;
}

.challenge-header h2 {
  flex: 1;
  margin: 0;
}

.difficulty-badge {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  text-transform: capitalize;
  font-weight: 500;
}

.challenge-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.instructions-panel {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.instructions-panel h3 {
  margin-top: 0;
}

.target-box {
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.practice-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.editor-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.practice-editor {
  flex: 1;
  min-height: 200px;
  padding: 1rem;
  background: var(--vp-code-bg);
  border: 1px solid var(--vp-code-block-bg);
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  color: var(--vp-c-text-1);
  resize: none;
}

.practice-editor:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.1);
}

.command-info {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.9rem;
}

.mode-indicator {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-check,
.btn-hint,
.btn-reset,
.btn-next {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-check {
  background: var(--vp-c-brand);
  color: white;
  flex: 1;
  min-width: 150px;
}

.btn-check:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-hint {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-hint:hover {
  background: #ffc107;
  color: #333;
}

.btn-reset {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-reset:hover {
  background: #f44336;
  color: white;
}

.btn-next {
  background: var(--vp-c-brand);
  color: white;
}

.btn-next:hover {
  opacity: 0.9;
}

/* Feedback */
.feedback {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border-left: 4px solid;
}

.feedback.success {
  background-color: #e8f5e9;
  border-left-color: #4caf50;
  color: #2e7d32;
}

.feedback.error {
  background-color: #ffebee;
  border-left-color: #f44336;
  color: #c62828;
}

.feedback.info {
  background-color: #e3f2fd;
  border-left-color: #2196f3;
  color: #1565c0;
}

.hint-display {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  color: #664d03;
}

.hint-more {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

.success-message {
  background: #d4edda;
  border-left: 4px solid #28a745;
  padding: 1.5rem;
  border-radius: 4px;
  text-align: center;
  color: #155724;
}

.success-message h4 {
  margin-top: 0;
  font-size: 1.3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .challenge-content {
    grid-template-columns: 1fr;
  }

  .challenge-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .button-group {
    flex-direction: column;
  }

  .btn-check {
    width: 100%;
  }

  .challenge-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
