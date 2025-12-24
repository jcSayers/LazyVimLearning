import { ref, computed } from 'vue'

export type EditorType = 'vim' | 'neovim'

const editorType = ref<EditorType>('vim')

export const useVimEditor = () => {
  // Load saved preference from localStorage
  const loadPreference = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vimEditorPreference')
      if (saved === 'neovim' || saved === 'vim') {
        editorType.value = saved
      }
    }
  }

  // Save preference to localStorage
  const savePreference = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vimEditorPreference', editorType.value)
    }
  }

  // Toggle between editors
  const toggleEditor = () => {
    editorType.value = editorType.value === 'vim' ? 'neovim' : 'vim'
    savePreference()
  }

  // Set specific editor
  const setEditor = (type: EditorType) => {
    editorType.value = type
    savePreference()
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

  // Initialize
  if (typeof window !== 'undefined') {
    loadPreference()
  }

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
