<template>
  <ClientOnly>
    <div class="vim-game-editor">
      <!-- Header -->
      <div class="game-header">
        <h3>{{ challenge?.title }}</h3>
        <div class="mode-indicator" :class="modeDisplay.toLowerCase()">
          {{ modeDisplay || 'NORMAL' }}
        </div>
      </div>

      <!-- Instructions -->
      <div v-if="challenge" class="instructions">
        <p><strong>Task:</strong> {{ challenge.instructions }}</p>
        <p><strong>Goal:</strong> {{ challenge.targetDescription }}</p>
      </div>

      <!-- Editor Container -->
      <div class="editor-container">
        <div ref="editorElement" class="cm-editor-wrapper"></div>
      </div>

      <!-- Command Display -->
      <div class="command-display">
        <span class="label">Command:</span>
        <span class="command-text">{{ commandDisplay }}</span>
      </div>

      <!-- Feedback -->
      <div v-if="feedback" class="feedback" :class="feedbackType">
        {{ feedback }}
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button @click="showHint" class="btn btn-secondary">
          💡 Hint ({{ currentHintLevel }}/{{ challenge?.hints.length || 0 }})
        </button>
        <button @click="checkSolution" class="btn btn-primary">
          ✓ Check Solution
        </button>
        <button @click="reset" class="btn btn-secondary">
          ↺ Reset
        </button>
      </div>

      <!-- Hint Display -->
      <div v-if="currentHint" class="hint-box">
        <strong>Hint:</strong> {{ currentHint }}
      </div>

      <!-- Success Message -->
      <div v-if="isSolved" class="success-message">
        <h4>🎉 Excellent!</h4>
        <p>You completed this challenge!</p>
        <button @click="nextChallenge" class="btn btn-primary">
          → Next Challenge
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useVimGame } from '../composables/useVimGame'
import { useChallenges } from '../composables/useChallenges'

const props = defineProps<{
  challengeId: string
}>()

const emit = defineEmits<{
  completed: [challengeId: string]
  nextChallenge: []
}>()

// Composables
const { gameState, modeDisplay, setFeedback, completeChallenge } = useVimGame()
const { currentChallenge, getHint, currentHintLevel, checkAnswer, getChallengeById, startChallenge } = useChallenges()

// Refs
const editorElement = ref<HTMLElement | null>(null)
const editorContent = ref('')
const currentHint = ref<string | null>(null)
const isSolved = ref(false)
const feedback = ref('')
const feedbackType = ref<'success' | 'error' | 'info'>('info')

// Computed
const commandDisplay = computed(() => gameState.value.commandBuffer || '(ready)')
const challenge = computed(() => currentChallenge.value)

// Methods
const showHint = () => {
  const hint = getHint()
  if (hint) {
    currentHint.value = hint
  }
}

const checkSolution = () => {
  if (!challenge.value) return

  const isCorrect = checkAnswer(editorContent.value)

  if (isCorrect) {
    isSolved.value = true
    setFeedback(`✓ Perfect! You solved "${challenge.value.title}"`, 'success')
    completeChallenge(challenge.value.id)
    emit('completed', challenge.value.id)
  } else {
    setFeedback(
      `Not quite. Target: "${challenge.value.targetContent}" but got "${editorContent.value}". Try again!`,
      'error'
    )
  }
}

const reset = () => {
  if (challenge.value) {
    editorContent.value = challenge.value.initialContent
    isSolved.value = false
    currentHint.value = null
    feedback.value = ''
    // Reset editor with initial content
    updateEditorContent(challenge.value.initialContent)
  }
}

const nextChallenge = () => {
  emit('nextChallenge')
  isSolved.value = false
  feedback.value = ''
  currentHint.value = null
}

const updateEditorContent = (content: string) => {
  // This would update the CodeMirror editor
  // Actual implementation depends on CodeMirror integration
  editorContent.value = content
}

// Initialize
onMounted(() => {
  startChallenge(props.challengeId)
  if (challenge.value) {
    editorContent.value = challenge.value.initialContent
    // Initialize CodeMirror editor here
    // This is a simplified version - full integration would include:
    // - CodeMirror 6 setup
    // - Vim keybindings via @replit/codemirror-vim
    // - Event handlers for mode changes and commands
  }
})

// Watch for changes
watch(() => editorContent.value, (newContent) => {
  gameState.value.editorContent = newContent
})
</script>

<style scoped>
.vim-game-editor {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--vp-c-brand);
  padding-bottom: 1rem;
}

.game-header h3 {
  margin: 0;
  color: var(--vp-c-brand);
}

.mode-indicator {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.mode-indicator.insert {
  background-color: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.mode-indicator.visual {
  background-color: #e3f2fd;
  border-color: #2196f3;
  color: #1565c0;
}

.instructions {
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--vp-c-brand);
}

.instructions p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.editor-container {
  background: var(--vp-code-bg);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  min-height: 300px;
  border: 1px solid var(--vp-code-block-bg);
}

.cm-editor-wrapper {
  height: 100%;
}

.command-display {
  background: var(--vp-code-bg);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border: 1px solid var(--vp-code-block-bg);
}

.command-display .label {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.command-display .command-text {
  margin-left: 0.5rem;
  color: var(--vp-c-brand);
}

.feedback {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
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

.button-group {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-primary {
  background-color: var(--vp-c-brand);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-secondary:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.hint-box {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  color: #664d03;
}

.hint-box strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #856404;
}

.success-message {
  background-color: #d4edda;
  border-left: 4px solid #28a745;
  padding: 1.5rem;
  border-radius: 4px;
  color: #155724;
  text-align: center;
}

.success-message h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.success-message p {
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .vim-game-editor {
    padding: 1rem;
  }

  .game-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .editor-container {
    min-height: 250px;
  }
}
</style>
