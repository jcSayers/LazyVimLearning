<template>
  <div v-if="shouldShow" class="show-for" :class="`show-for-${editor}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useVimEditor } from '../composables/useVimEditor'

interface Props {
  editor: 'vim' | 'neovim'
}

const props = defineProps<Props>()
const mounted = ref(false)

const { editorType } = useVimEditor()

const shouldShow = computed(() => {
  // Only show after mount to avoid hydration mismatch
  if (!mounted.value) return false
  return editorType.value === props.editor
})

onMounted(() => {
  mounted.value = true
})
</script>

<style scoped>
.show-for {
  animation: fadeIn 0.3s ease-in-out;
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
