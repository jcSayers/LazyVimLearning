import { ref, computed, watch } from 'vue'

export type EditorType = 'vim' | 'neovim'

// Global state
const editorType = ref<EditorType>('vim')
const isInitialized = ref(false)

export const useVimEditor = () => {
  // Load saved preference from localStorage (only on client)
  const loadPreference = () => {
    if (typeof window !== 'undefined' && !isInitialized.value) {
      const saved = localStorage.getItem('vimEditorPreference')
      if (saved === 'neovim' || saved === 'vim') {
        editorType.value = saved
      }
      isInitialized.value = true
    }
  }

  // Save preference to localStorage
  const savePreference = (type: EditorType) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vimEditorPreference', type)
    }
  }

  // Toggle between editors
  const toggleEditor = () => {
    const newType = editorType.value === 'vim' ? 'neovim' : 'vim'
    setEditor(newType)
  }

  // Set specific editor
  const setEditor = (type: EditorType) => {
    editorType.value = type
    savePreference(type)
  }

  // Get editor display name
  const editorName = computed(() => {
    return editorType.value === 'vim' ? 'Vim' : 'Neovim'
  })

  // Check if using Neovim
  const isNeovim = computed(() => editorType.value === 'neovim')

  // Check if using Vim
  const isVim = computed(() => editorType.value === 'vim')

  // Get command based on editor
  const getCommand = (vimCmd: string, neovimCmd?: string) => {
    if (isNeovim.value && neovimCmd) {
      return neovimCmd
    }
    return vimCmd
  }

  // Get file path based on editor
  const getConfigFile = () => {
    return isNeovim.value ? '~/.config/nvim/init.lua' : '~/.vimrc'
  }

  // Get install command based on editor
  const getInstallCommand = (platform: 'windows' | 'mac' | 'linux') => {
    const commands: Record<string, Record<string, string>> = {
      windows: {
        vim: 'choco install vim',
        neovim: 'choco install neovim',
      },
      mac: {
        vim: 'brew install vim',
        neovim: 'brew install neovim',
      },
      linux: {
        vim: 'sudo apt install vim',
        neovim: 'sudo apt install neovim',
      },
    }
    return commands[platform]?.[editorType.value] || ''
  }

  // Initialize on first use
  loadPreference()

  return {
    editorType,
    toggleEditor,
    setEditor,
    editorName,
    isNeovim,
    isVim,
    getCommand,
    getConfigFile,
    getInstallCommand,
    loadPreference,
    savePreference,
  }
}

// Export for use in components
export const getEditorType = () => editorType.value
export const setGlobalEditorType = (type: EditorType) => {
  editorType.value = type
  if (typeof window !== 'undefined') {
    localStorage.setItem('vimEditorPreference', type)
  }
}
