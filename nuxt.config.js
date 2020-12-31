export default {
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  generate: {
    fallback: true
  },

  env: {
    eosNodeUrl: 'eos.greymass.com',
    eosChainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    explorerUrl: 'https://bloks.io',
    ipfsNode: 'https://ipfs.effect.ai',
    ipfsExplorer: 'https://ipfs.effect.ai',
    tokenContract: 'effecttokens',
    stakingContract: 'efxstakepool',
    daoContract: 'theeffectdao',
    proposalContract: 'daoproposals',
    efxToken: 'EFX',
    nfxToken: 'NFX',
    discordGuildId: '519860537891487745',
    discordInviteUrl: 'https://discord.gg/hM3237cYXP'
  },

  // env: {
  //   eosNodeUrl: 'kylin.eosn.io',
  //   eosChainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  //   explorerUrl: 'https://kylin.bloks.io',
  //   ipfsNode: 'https://ipfs.effect.ai',
  //   ipfsExplorer: 'https://ipfs.effect.ai',
  //   tokenContract: 'tokenonkylin',
  //   stakingContract: 'stak3onkylin',
  //   daoContract: 'thedaonkylin',
  //   proposalContract: 'propsonkylin',
  //   efxToken: 'UTL',
  //   nfxToken: 'GRN',
  //   discordGuildId: '519860537891487745',
  //   discordInviteUrl: 'https://discord.gg/hM3237cYXP'
  // },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Effect Dashboard',
    title: 'Effect Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'bulma/css/bulma.css',
    '@/assets/css/global.scss',
    'simplemde/dist/simplemde.min.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/transit.js', mode: 'client' },
    { src: '@/plugins/wallet.js', mode: 'client' },
    { src: '@/plugins/dao.js', mode: 'client' },
    '@/plugins/modal.js',
    '@/plugins/eos.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    injected: true,
    // preset: 'default',
    linkify: true,
    breaks: true
    // use: [
    //   'markdown-it-div',
    //   'markdown-it-attrs'
    // ]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'eosjs',
      'countup.js',
      'vue-countup-v2'
    ],
    loaders: {
      scss: {
        additionalData: "@import '~assets/css/variables.scss';"
      }
    }
  },

  bundleRenderer: {
    shouldPreload: (file, type) => {
      return ['script', 'style', 'font'].includes(type)
    }
  }
}
