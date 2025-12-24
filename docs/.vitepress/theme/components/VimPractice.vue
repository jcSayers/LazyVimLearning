<template>
  <ClientOnly>
    <div class="vim-practice-container">
      <!-- Challenge Selection -->
      <div v-if="!selectedChallenge" class="challenge-selection">
        <h3>Choose a Challenge</h3>

        <!-- Difficulty Filter & Leaderboard Toggle -->
        <div class="difficulty-filter">
          <button
            v-for="difficulty in ['beginner', 'intermediate', 'advanced', 'all', 'leaderboard']"
            :key="difficulty"
            :class="['filter-btn', { active: selectedDifficulty === difficulty }]"
            @click="selectedDifficulty = difficulty as any"
          >
            <span v-if="difficulty === 'beginner'">🟢 Beginner</span>
            <span v-else-if="difficulty === 'intermediate'">🟡 Intermediate</span>
            <span v-else-if="difficulty === 'advanced'">🔴 Advanced</span>
            <span v-else-if="difficulty === 'all'">📊 All Levels</span>
            <span v-else>🏆 Leaderboard</span>
          </button>
        </div>

        <!-- Progress by Difficulty -->
        <div class="progress-by-difficulty">
          <div class="difficulty-progress">
            <div class="difficulty-label">🟢 Beginner</div>
            <div class="mini-bar">
              <div class="mini-fill" :style="{ width: (progressByDifficulty.beginner.completed / progressByDifficulty.beginner.total * 100) + '%' }"></div>
            </div>
            <div class="progress-text">{{ progressByDifficulty.beginner.completed }}/{{ progressByDifficulty.beginner.total }}</div>
          </div>
          <div class="difficulty-progress">
            <div class="difficulty-label">🟡 Intermediate</div>
            <div class="mini-bar">
              <div class="mini-fill" :style="{ width: (progressByDifficulty.intermediate.completed / progressByDifficulty.intermediate.total * 100) + '%' }"></div>
            </div>
            <div class="progress-text">{{ progressByDifficulty.intermediate.completed }}/{{ progressByDifficulty.intermediate.total }}</div>
          </div>
          <div class="difficulty-progress">
            <div class="difficulty-label">🔴 Advanced</div>
            <div class="mini-bar">
              <div class="mini-fill" :style="{ width: (progressByDifficulty.advanced.completed / progressByDifficulty.advanced.total * 100) + '%' }"></div>
            </div>
            <div class="progress-text">{{ progressByDifficulty.advanced.completed }}/{{ progressByDifficulty.advanced.total }}</div>
          </div>
        </div>

        <!-- Leaderboard View -->
        <div v-if="selectedDifficulty === 'leaderboard'" class="leaderboard-section">
          <h4>🏆 Top 10 Fastest Times</h4>
          <div v-if="leaderboard.length === 0" class="leaderboard-empty">
            <p>Complete some challenges to see your personal records!</p>
          </div>
          <div v-else class="leaderboard-table">
            <div class="leaderboard-header">
              <div class="rank">Rank</div>
              <div class="title">Challenge</div>
              <div class="time">Personal Best</div>
              <div class="solves">Solves</div>
            </div>
            <div v-for="(entry, index) in leaderboard" :key="entry.id" class="leaderboard-row">
              <div class="rank">
                <span v-if="index === 0">🥇</span>
                <span v-else-if="index === 1">🥈</span>
                <span v-else-if="index === 2">🥉</span>
                <span v-else>#{{ index + 1 }}</span>
              </div>
              <div class="title">{{ entry.title }}</div>
              <div class="time">{{ formatTime(entry.time) }}</div>
              <div class="solves">{{ entry.solves }}x</div>
            </div>
          </div>
        </div>

        <!-- Challenge Grid -->
        <div v-else class="challenge-grid">
          <button
            v-for="challenge in filteredChallenges"
            :key="challenge.id"
            :class="['challenge-card', { completed: completedChallenges.includes(challenge.id) }]"
            @click="selectChallenge(challenge)"
          >
            <div class="challenge-name">{{ challenge.title }}</div>
            <div class="challenge-difficulty">{{ challenge.difficulty }}</div>
            <div v-if="completedChallenges.includes(challenge.id)" class="completed-badge">✓</div>
            <div v-if="userProgress.challengeDetails[challenge.id]?.personalRecord > 0" class="personal-record">
              ⚡ {{ formatTime(userProgress.challengeDetails[challenge.id].personalRecord) }}
            </div>
          </button>
        </div>

        <!-- Achievements Section -->
        <div v-if="achievements.length > 0" class="achievements-section">
          <h4>🏆 Your Achievements</h4>
          <div class="achievements-list">
            <div v-for="achievement in achievements" :key="achievement" class="achievement-badge">
              {{ achievement }}
            </div>
          </div>
        </div>

        <!-- Progress Summary -->
        <div class="progress-summary">
          <h4>Overall Progress</h4>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: progressPercentage + '%' }"
            >{{ progressPercentage }}%</div>
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
            <div class="editor-header">
              <div class="editor-label">Practice Text (Click and try Vim commands):</div>
              <div class="timer-display" :class="{ 'new-record': newPersonalRecord }">
                ⏱️ {{ formattedElapsedTime }}
              </div>
            </div>
            <textarea
              v-model="currentContent"
              class="practice-editor"
              placeholder="Click here and practice..."
            ></textarea>

            <div class="command-info">
              <strong>Current Mode:</strong> <span class="mode-indicator">Normal</span>
              <span class="attempt-count">Attempt #{{ attemptCount + 1 }}</span>
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
import { ref, computed, onBeforeUnmount } from 'vue'

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

interface ChallengeDetail {
  completed: boolean
  hintsUsed: number
  attempts: number
  firstCompletedAt: number
  personalRecord: number // milliseconds
  lastAttemptTime: number // milliseconds
  totalSolves: number
}

interface UserProgress {
  completedChallenges: string[]
  challengeDetails: {
    [key: string]: ChallengeDetail
  }
}

const challenges: Challenge[] = [
  // BEGINNER CHALLENGES (6)
  {
    id: 'beg-nav-1',
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
    id: 'beg-edit-1',
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
    id: 'beg-edit-2',
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
    id: 'beg-edit-3',
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
    id: 'beg-copy-1',
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
    id: 'beg-nav-2',
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
  },

  // INTERMEDIATE CHALLENGES (6)
  {
    id: 'int-text-obj-1',
    title: 'Change Inside Word',
    instructions: 'Replace "beautiful" with "amazing" using text object.',
    initialContent: 'This is a beautiful day',
    targetContent: 'This is a amazing day',
    targetDescription: '"beautiful" changed to "amazing"',
    difficulty: 'intermediate',
    hints: [
      'Use the iw text object to select inside word',
      'Use ciw (change inside word) command',
      'Position on "beautiful", press ciw, type "amazing", press Esc'
    ]
  },
  {
    id: 'int-text-obj-2',
    title: 'Delete Word With Surrounding Space',
    instructions: 'Remove "very" with its surrounding spaces.',
    initialContent: 'The sky is very blue',
    targetContent: 'The sky is blue',
    targetDescription: '"very " has been removed',
    difficulty: 'intermediate',
    hints: [
      'Use aw (around word) to delete word and space',
      'Use daw command',
      'Position on "very" and press daw'
    ]
  },
  {
    id: 'int-text-obj-3',
    title: 'Change Inside Quotes',
    instructions: 'Change text inside quotes from "hello" to "goodbye".',
    initialContent: 'Say "hello" to everyone',
    targetContent: 'Say "goodbye" to everyone',
    targetDescription: 'Text inside quotes changed',
    difficulty: 'intermediate',
    hints: [
      'Use i" text object to select inside quotes',
      'Use ci" (change inside quotes) command',
      'Position inside quotes, press ci", type "goodbye", press Esc'
    ]
  },
  {
    id: 'int-motion-1',
    title: 'Find and Change Character',
    instructions: 'Move to first "x" and delete it.',
    initialContent: 'example text x is here',
    targetContent: 'example text  is here',
    targetDescription: '"x" has been deleted',
    difficulty: 'intermediate',
    hints: [
      'Use f command to find characters',
      'Use fx to find "x", then press x to delete it',
      'Press fx, then x'
    ]
  },
  {
    id: 'int-combine-1',
    title: 'Delete Two Words',
    instructions: 'Delete "the big" from the text.',
    initialContent: 'I saw the big cat',
    targetContent: 'I saw cat',
    targetDescription: '"the big " has been deleted',
    difficulty: 'intermediate',
    hints: [
      'Combine delete operator with motion',
      'Use d2w to delete two words',
      'Position before "the" and press d2w'
    ]
  },
  {
    id: 'int-combine-2',
    title: 'Delete Paragraph',
    instructions: 'Remove the entire paragraph.',
    initialContent: 'First paragraph\nwith multiple\nlines here\n\nSecond paragraph',
    targetContent: 'Second paragraph',
    targetDescription: 'First paragraph deleted',
    difficulty: 'intermediate',
    hints: [
      'Use ap (around paragraph) text object',
      'Use dap to delete paragraph',
      'Position in first paragraph and press dap'
    ]
  },

  // ADVANCED CHALLENGES (6)
  {
    id: 'adv-multi-1',
    title: 'Replace Multiple Words',
    instructions: 'Replace all "cat" with "dog" on one line.',
    initialContent: 'The cat saw another cat',
    targetContent: 'The dog saw another dog',
    targetDescription: 'All "cat" replaced with "dog"',
    difficulty: 'advanced',
    hints: [
      'Use substitute command with flags',
      'Use :s/cat/dog/g to replace all on line',
      'Type :s/cat/dog/g and press Enter'
    ]
  },
  {
    id: 'adv-multi-2',
    title: 'Indent Multiple Lines',
    instructions: 'Indent 3 lines at the start.',
    initialContent: 'line one\nline two\nline three\nline four',
    targetContent: '   line one\n   line two\n   line three\nline four',
    targetDescription: 'First 3 lines indented',
    difficulty: 'advanced',
    hints: [
      'Select lines and use > to indent',
      'Position on first line, use >2j to indent down',
      'Press >2j'
    ]
  },
  {
    id: 'adv-text-obj-combo-1',
    title: 'Complex Text Object Edit',
    instructions: 'Change function name inside parentheses.',
    initialContent: 'result = calculate(x, y, z)',
    targetContent: 'result = compute(x, y, z)',
    targetDescription: '"calculate" changed to "compute"',
    difficulty: 'advanced',
    hints: [
      'Find function name and use text object',
      'Position on function name, use ciw and type new name',
      'Position on "calculate", press ciw, type "compute", Esc'
    ]
  },
  {
    id: 'adv-pattern-1',
    title: 'Find and Replace Pattern',
    instructions: 'Change "hello world" to "goodbye world".',
    initialContent: 'hello world is nice\nhello world again',
    targetContent: 'goodbye world is nice\nhello world again',
    targetDescription: 'First "hello world" only changed',
    difficulty: 'advanced',
    hints: [
      'Use :s with pattern on current line',
      'Type :s/hello world/goodbye world/ and press Enter',
      ':s/hello world/goodbye world/'
    ]
  },
  {
    id: 'adv-mark-jump-1',
    title: 'Delete Between Marks',
    instructions: 'Delete text between two marked positions.',
    initialContent: 'start of text DELETE THIS end of text',
    targetContent: 'start of text  end of text',
    targetDescription: '"DELETE THIS " has been removed',
    difficulty: 'advanced',
    hints: [
      'Mark positions with m and jump with backtick',
      'Use mm to mark, then select and delete',
      'Position, press mm, move, press d\'m to delete'
    ]
  },
  {
    id: 'adv-register-1',
    title: 'Copy to Register and Paste',
    instructions: 'Copy word and paste it 3 times.',
    initialContent: 'Copy word and paste here here here',
    targetContent: 'Copy word and paste word word word',
    targetDescription: 'Word pasted 3 times',
    difficulty: 'advanced',
    hints: [
      'Use registers to copy and paste precisely',
      'Use "aw to copy word to register a',
      'Position, type "ayw, position, type "ap three times'
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
const selectedDifficulty = ref<'beginner' | 'intermediate' | 'advanced' | 'all' | 'leaderboard'>('beginner')
const attemptCount = ref(0)

// Time tracking
const startTime = ref<number | null>(null)
const elapsedTime = ref(0)
const timerInterval = ref<NodeJS.Timeout | null>(null)
const newPersonalRecord = ref(false)

// Enhanced progress tracking
const userProgress = ref<UserProgress>(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('vimPracticeProgress')
    return saved ? JSON.parse(saved) : { completedChallenges: [], challengeDetails: {} }
  }
  return { completedChallenges: [], challengeDetails: {} }
})

const completedChallenges = computed(() => userProgress.value.completedChallenges)

const filteredChallenges = computed(() => {
  if (selectedDifficulty.value === 'all') {
    return challenges
  }
  return challenges.filter(c => c.difficulty === selectedDifficulty.value)
})

const progressPercentage = computed(() => {
  return Math.round((completedChallenges.value.length / challenges.length) * 100)
})

const progressByDifficulty = computed(() => {
  const beginner = challenges.filter(c => c.difficulty === 'beginner')
  const intermediate = challenges.filter(c => c.difficulty === 'intermediate')
  const advanced = challenges.filter(c => c.difficulty === 'advanced')

  return {
    beginner: {
      completed: completedChallenges.value.filter(id => beginner.some(c => c.id === id)).length,
      total: beginner.length
    },
    intermediate: {
      completed: completedChallenges.value.filter(id => intermediate.some(c => c.id === id)).length,
      total: intermediate.length
    },
    advanced: {
      completed: completedChallenges.value.filter(id => advanced.some(c => c.id === id)).length,
      total: advanced.length
    }
  }
})

// Format time for display
const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const ms = milliseconds % 1000

  if (minutes > 0) {
    return `${minutes}:${secs.toString().padStart(2, '0')}.${(ms / 10).toFixed(0).padStart(2, '0')}`
  }
  return `${secs}.${(ms / 100).toFixed(0)}s`
}

const formattedElapsedTime = computed(() => formatTime(elapsedTime.value))

// Leaderboard: fastest times
const leaderboard = computed(() => {
  const times: { id: string; title: string; time: number; solves: number }[] = []

  completedChallenges.value.forEach(id => {
    const challenge = challenges.find(c => c.id === id)
    const detail = userProgress.value.challengeDetails[id]
    if (challenge && detail && detail.personalRecord > 0) {
      times.push({
        id,
        title: challenge.title,
        time: detail.personalRecord,
        solves: detail.totalSolves
      })
    }
  })

  return times.sort((a, b) => a.time - b.time).slice(0, 10)
})

// Time-based achievements
const timeAchievements = computed(() => {
  const earned: string[] = []

  // Speed achievements
  const speedRuns = leaderboard.value.filter(r => r.time < 10000) // under 10 seconds
  if (speedRuns.length >= 3) {
    earned.push('⚡ Speed Demon (3+ under 10s)')
  }

  const ultraFast = leaderboard.value.filter(r => r.time < 5000) // under 5 seconds
  if (ultraFast.length >= 5) {
    earned.push('🔥 Lightning Fast (5+ under 5s)')
  }

  // Consistency achievement
  const consistentSolves = completedChallenges.value.filter(id => {
    const detail = userProgress.value.challengeDetails[id]
    return detail && detail.totalSolves >= 3
  })
  if (consistentSolves.length >= 5) {
    earned.push('🎯 Consistent Practitioner (5+ solved 3 times)')
  }

  return earned
})

// Achievement system
const achievements = computed(() => {
  const earned: string[] = []

  // Completion achievements
  if (progressByDifficulty.value.beginner.completed === progressByDifficulty.value.beginner.total) {
    earned.push('🟢 Beginner Master')
  }
  if (progressByDifficulty.value.intermediate.completed === progressByDifficulty.value.intermediate.total) {
    earned.push('🟡 Intermediate Master')
  }
  if (progressByDifficulty.value.advanced.completed === progressByDifficulty.value.advanced.total) {
    earned.push('🔴 Advanced Master')
  }
  if (completedChallenges.value.length === challenges.length) {
    earned.push('⭐ Vim Legend')
  }

  // Skill achievements
  const noHintChallenges = completedChallenges.value.filter(id => {
    const detail = userProgress.value.challengeDetails[id]
    return detail && detail.hintsUsed === 0
  })
  if (noHintChallenges.length >= 5) {
    earned.push('🧠 No Hints Expert')
  }

  // Add time-based achievements
  earned.push(...timeAchievements.value)

  return earned
})

const saveProgress = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('vimPracticeProgress', JSON.stringify(userProgress.value))
  }
}

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const startTimer = () => {
  stopTimer()
  startTime.value = Date.now()
  elapsedTime.value = 0
  newPersonalRecord.value = false

  timerInterval.value = setInterval(() => {
    if (startTime.value) {
      elapsedTime.value = Date.now() - startTime.value
    }
  }, 100)
}

const selectChallenge = (challenge: Challenge) => {
  selectedChallenge.value = challenge
  currentContent.value = challenge.initialContent
  feedback.value = ''
  currentHint.value = null
  hintLevel.value = 0
  isSolved.value = false
  attemptCount.value = 0

  // Initialize challenge detail if not exists
  if (!userProgress.value.challengeDetails[challenge.id]) {
    userProgress.value.challengeDetails[challenge.id] = {
      completed: false,
      hintsUsed: 0,
      attempts: 0,
      firstCompletedAt: 0,
      personalRecord: 0,
      lastAttemptTime: 0,
      totalSolves: 0
    }
  }

  // Start the timer
  startTimer()
}

const checkSolution = () => {
  if (!selectedChallenge.value) return
  attemptCount.value++
  stopTimer()

  if (currentContent.value.trim() === selectedChallenge.value.targetContent.trim()) {
    isSolved.value = true
    const detail = userProgress.value.challengeDetails[selectedChallenge.value.id]

    // Update solve count
    detail.totalSolves++
    detail.lastAttemptTime = elapsedTime.value

    // Check if new personal record
    if (detail.personalRecord === 0 || elapsedTime.value < detail.personalRecord) {
      newPersonalRecord.value = true
      detail.personalRecord = elapsedTime.value
      feedback.value = `🎉 Personal Record! ${formatTime(elapsedTime.value)}`
    } else {
      feedback.value = `✓ Perfect! You solved it in ${formatTime(elapsedTime.value)} (Record: ${formatTime(detail.personalRecord)})`
    }
    feedbackType.value = 'success'

    // Save progress with details
    if (!completedChallenges.value.includes(selectedChallenge.value.id)) {
      completedChallenges.value.push(selectedChallenge.value.id)
      detail.completed = true
      detail.attempts = attemptCount.value
      detail.hintsUsed = hintLevel.value
      detail.firstCompletedAt = Date.now()
    }

    saveProgress()
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

    // Track hint usage
    if (userProgress.value.challengeDetails[selectedChallenge.value.id]) {
      userProgress.value.challengeDetails[selectedChallenge.value.id].hintsUsed = hintLevel.value
      saveProgress()
    }
  }
}

const resetChallenge = () => {
  if (!selectedChallenge.value) return
  currentContent.value = selectedChallenge.value.initialContent
  feedback.value = ''
  currentHint.value = null
  hintLevel.value = 0
  isSolved.value = false
  attemptCount.value = 0
  newPersonalRecord.value = false
  startTimer()
}

const resetProgress = () => {
  userProgress.value = { completedChallenges: [], challengeDetails: {} }
  localStorage.removeItem('vimPracticeProgress')
}

const nextChallenge = () => {
  if (!selectedChallenge.value) return

  const filteredIds = filteredChallenges.value.map(c => c.id)
  const currentIndex = filteredIds.indexOf(selectedChallenge.value!.id)

  if (currentIndex < filteredIds.length - 1) {
    const nextChallenge = challenges.find(c => c.id === filteredIds[currentIndex + 1])
    if (nextChallenge) {
      selectChallenge(nextChallenge)
    }
  } else {
    selectedChallenge.value = null
  }
}

// Clean up timer on component unmount
onBeforeUnmount(() => {
  stopTimer()
})
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

/* Difficulty Filter */
.difficulty-filter {
  display: flex;
  gap: 0.75rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.filter-btn:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.filter-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Progress by Difficulty */
.progress-by-difficulty {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.difficulty-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.difficulty-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.mini-bar {
  height: 12px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.mini-fill {
  background: var(--vp-c-brand);
  height: 100%;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

/* Achievements */
.achievements-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.achievements-section h4 {
  margin-top: 0;
  font-size: 1.3rem;
}

.achievements-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.achievement-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 0.95rem;
}

/* Enhanced Progress Bar */
.progress-fill {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  transition: width 0.4s ease;
}

/* Timer Display */
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.timer-display {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-family: monospace;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.timer-display.new-record {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.attempt-count {
  margin-left: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.personal-record {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.75rem;
  background: rgba(255, 215, 0, 0.9);
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: 600;
}

/* Leaderboard Styles */
.leaderboard-section {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.leaderboard-section h4 {
  margin-top: 0;
  font-size: 1.3rem;
  color: var(--vp-c-brand);
}

.leaderboard-empty {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

.leaderboard-table {
  background: var(--vp-code-bg);
  border-radius: 6px;
  overflow: hidden;
}

.leaderboard-header {
  display: grid;
  grid-template-columns: 50px 1fr 120px 80px;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-brand);
  color: white;
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-divider);
}

.leaderboard-row {
  display: grid;
  grid-template-columns: 50px 1fr 120px 80px;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  align-items: center;
  transition: background 0.3s ease;
}

.leaderboard-row:hover {
  background: var(--vp-c-bg-soft);
}

.leaderboard-row:last-child {
  border-bottom: none;
}

.rank {
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
}

.title {
  color: var(--vp-c-text-1);
}

.time {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-align: center;
}

.solves {
  text-align: center;
  color: var(--vp-c-text-2);
}

/* Challenge card personal record */
.challenge-card {
  position: relative;
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

  .difficulty-filter {
    flex-direction: column;
  }

  .filter-btn {
    width: 100%;
  }

  .progress-by-difficulty {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .achievements-list {
    flex-direction: column;
  }

  .achievement-badge {
    width: 100%;
    text-align: center;
  }

  .editor-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .leaderboard-header,
  .leaderboard-row {
    grid-template-columns: 40px 1fr 80px 60px;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .timer-display {
    padding: 0.4rem 0.8rem;
    font-size: 1rem;
  }
}
</style>
