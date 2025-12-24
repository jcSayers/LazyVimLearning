<template>
  <div class="editor-toggle">
    <button
      :class="['toggle-btn', { active: isVim }]"
      @click="() => setEditor('vim')"
      title="Show Vim content"
    >
      Vim
    </button>
    <button
      :class="['toggle-btn', { active: isNeovim }]"
      @click="() => setEditor('neovim')"
      title="Show Neovim content"
    >
      Neovim
    </button>
  </div>
</template>

<script setup lang="ts">
import { useVimEditor } from '../composables/useVimEditor'

const { isVim, isNeovim, setEditor } = useVimEditor()
</script>

<style scoped>
.editor-toggle {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: var(--vp-c-bg-soft);
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.toggle-btn {
  padding: 0.4rem 1rem;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand);
}

.toggle-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .editor-toggle {
    padding: 0.3rem 0.5rem;
  }

  .toggle-btn {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>
