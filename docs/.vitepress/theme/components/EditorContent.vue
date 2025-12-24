<template>
  <div class="editor-content">
    <div v-if="showVim" class="vim-content">
      <slot name="vim" />
    </div>
    <div v-if="showNeovim" class="neovim-content">
      <slot name="neovim" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useVimEditor } from '../composables/useVimEditor'

const { isVim, isNeovim } = useVimEditor()

const showVim = computed(() => isVim.value)
const showNeovim = computed(() => isNeovim.value)
</script>

<style scoped>
.editor-content {
  width: 100%;
}

.vim-content,
.neovim-content {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
