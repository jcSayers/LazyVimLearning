import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ToggleEditor from './components/ToggleEditor.vue'
import ShowFor from './components/ShowFor.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () => h(ToggleEditor),
    })
  },
  enhanceApp({ app }) {
    app.component('ToggleEditor', ToggleEditor)
    app.component('ShowFor', ShowFor)
  }
} satisfies Theme
