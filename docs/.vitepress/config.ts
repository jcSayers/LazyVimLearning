import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vim & Neovim Tutorial',
  description: 'Comprehensive Vim/Neovim tutorial with interactive practice game. Learn without AI assistance.',
  lang: 'en-US',
  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/vim-logo.svg',
    siteTitle: 'Vim & Neovim Tutorial',

    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Fundamentals', link: '/fundamentals/' },
      { text: 'Intermediate', link: '/intermediate/' },
      { text: 'Advanced', link: '/advanced/' },
      { text: 'Practice', link: '/practice/' },
      { text: 'Reference', link: '/reference/cheatsheet' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Why Vim?', link: '/getting-started/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Vim Philosophy', link: '/getting-started/vim-philosophy' },
            { text: 'First Steps', link: '/getting-started/first-steps' },
          ]
        }
      ],

      '/fundamentals/': [
        {
          text: 'Fundamentals',
          items: [
            { text: 'Overview', link: '/fundamentals/' },
            { text: 'Understanding Modes', link: '/fundamentals/modes' },
            { text: 'Basic Navigation', link: '/fundamentals/navigation' },
            { text: 'Basic Editing', link: '/fundamentals/basic-editing' },
            { text: 'Search & Replace', link: '/fundamentals/search-and-replace' },
            { text: 'Files & Buffers', link: '/fundamentals/files-and-buffers' },
            { text: 'Practice Games', link: '/fundamentals/interactive-practice' },
          ]
        }
      ],

      '/intermediate/': [
        {
          text: 'Intermediate',
          items: [
            { text: 'Overview', link: '/intermediate/' },
            { text: 'Text Objects', link: '/intermediate/text-objects' },
            { text: 'Advanced Motions', link: '/intermediate/motions-advanced' },
            { text: 'Marks & Jumps', link: '/intermediate/marks-and-jumps' },
            { text: 'Macros', link: '/intermediate/macros' },
            { text: 'Registers', link: '/intermediate/registers' },
            { text: 'Windows & Tabs', link: '/intermediate/windows-and-tabs' },
            { text: 'Advanced Challenges', link: '/intermediate/interactive-challenges' },
          ]
        }
      ],

      '/advanced/': [
        {
          text: 'Advanced',
          items: [
            { text: 'Overview', link: '/advanced/' },
            { text: 'Vimscript Basics', link: '/advanced/vimscript-basics' },
            { text: 'Configuration', link: '/advanced/configuration' },
            { text: 'Plugins', link: '/advanced/plugins' },
            { text: 'Neovim Specific', link: '/advanced/neovim-specific' },
            { text: 'Advanced Patterns', link: '/advanced/advanced-patterns' },
            { text: 'Workflow Optimization', link: '/advanced/workflow-optimization' },
          ]
        }
      ],

      '/practice/': [
        {
          text: 'Practice Hub',
          items: [
            { text: 'Game Hub', link: '/practice/' },
            { text: 'Beginner Challenges', link: '/practice/beginner-challenges' },
            { text: 'Intermediate Challenges', link: '/practice/intermediate-challenges' },
            { text: 'Advanced Challenges', link: '/practice/advanced-challenges' },
            { text: 'Sandbox', link: '/practice/custom-sandbox' },
          ]
        }
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Cheatsheet', link: '/reference/cheatsheet' },
            { text: 'Command Index', link: '/reference/command-index' },
            { text: 'Common Mistakes', link: '/reference/common-mistakes' },
            { text: 'Vim vs Neovim', link: '/reference/vim-vs-neovim' },
            { text: 'Resources', link: '/reference/resources' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    search: {
      provider: 'local'
    }
  },

  markdown: {
    lineNumbers: true,
  }
})
