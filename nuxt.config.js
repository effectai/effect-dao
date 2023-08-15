export default {
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  generate: {
    fallback: true
  },

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  /**
   * Production
   */
  env: {
    eosNodeUrl: 'eos.greymass.com',
    protocolUrl: 'https',
    portUrl: '443',
    eosChainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    explorerUrl: 'https://bloks.io',
    ipfsNode: 'https://ipfs.effect.ai',
    ipfsExplorer: 'https://ipfs.effect.ai',
    tokenContract: 'effecttokens',
    stakingContract: 'efxstakepool',
    daoContract: 'theeffectdao',
    proposalContract: 'daoproposals',
    feepoolContract: 'feepool.efx',
    votingContract: 'effectvotess',
    forceContract: 'force.efx',
    vaccountContract: 'vaccount.efx',
    efxToken: 'EFX',
    nfxToken: 'NFX',
    discordGuildId: '519860537891487745',
    discordInviteUrl: 'https://discord.gg/hM3237cYXP',
    constitutionUrl: 'https://raw.githubusercontent.com/effectai/effect-network-eos/9522a000cf96269912a47fdd4653c14ac26bbf61/constitution/constitution.md'
  },

  // Kylin Developement
  // env: {
  //   eosNodeUrl: 'kylin.eosn.io',
  //   protocolUrl: 'https',
  //   portUrl: 443,
  //   eosChainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  //   explorerUrl: 'https://kylin.bloks.io',
  //   ipfsNode: 'https://ipfs.effect.ai',
  //   ipfsExplorer: 'https://ipfs.effect.ai',
  //   tokenContract: 'tokenonkylin',
  //   stakingContract: 'stak3onkylin',
  //   daoContract: 'thedaonkylin',
  //   proposalContract: 'propsonkylin',
  //   votingContract: 'effect.votes',
  //   feepoolContract: 'feepoolkylin',
  //   efxToken: 'UTL',
  //   nfxToken: 'GRN',
  //   discordGuildId: '519860537891487745',
  //   discordInviteUrl: 'https://discord.gg/hM3237cYXP',
  //   constitutionUrl: 'https://raw.githubusercontent.com/effectai/effect-network-eos/9522a000cf96269912a47fdd4653c14ac26bbf61/constitution/constitution.md'

  // },

  // Local Developement
  /**
   * You can run this command to bootstrap a local blockchain:
    nodeos -e -p eosio --plugin eosio::producer_plugin --plugin eosio::producer_api_plugin --plugin eosio::chain_api_plugin \
    --plugin eosio::http_plugin --plugin eosio::history_plugin --plugin eosio::history_api_plugin --filter-on="*" \
    --access-control-allow-origin='*'  --data-dir ~/.local/share/eosio/nodeos_local --contracts-console  --delete-all-blocks
   */

  /**
   * git clone git@github.com:effectai/effect-network.git
   * npm run lumo e2e.scenario
   * copy paste new contract nameAddresses below in the configuration: ("tknbbhbf" "stkfhgae" "daogfhcd" "prpagacf" "feeffgee")
   */
  // env: {
  //   eosNodeUrl: '127.0.0.1',
  //   protocolUrl: 'http',
  //   portUrl: 8888,
  //   eosChainId: '8a34ec7df1b8cd06ff4a8abbaa7cc50300823350cadc59ab296cb00d104d2b8f',
  //   explorerUrl: 'https://kylin.bloks.io',
  //   ipfsNode: 'https://ipfs.effect.ai',
  //   ipfsExplorer: 'https://ipfs.effect.ai',
  //   tokenContract: 'tknbbhbf',
  //   stakingContract: 'stkfhgae',
  //   daoContract: 'daogfhcd',
  //   proposalContract: 'prpagacf',
  //   feepoolContract: 'feeffgee',
  //   efxToken: 'EFX',
  //   nfxToken: 'NFX',
  //   discordGuildId: '519860537891487745',
  //   discordInviteUrl: 'https://discord.gg/hM3237cYXP',
  //   constitutionUrl: 'https://raw.githubusercontent.com/effectai/effect-network-eos/9522a000cf96269912a47fdd4653c14ac26bbf61/constitution/constitution.md'

  // },

  /**
   * ./local.sh from scripts folder in `effect-network`
   */
  // env: {
  //   eosNodeUrl: '127.0.0.1',
  //   protocolUrl: 'http',
  //   portUrl: 8888,
  //   eosChainId: '8a34ec7df1b8cd06ff4a8abbaa7cc50300823350cadc59ab296cb00d104d2b8f',
  //   explorerUrl: 'https://local.bloks.io',
  //   ipfsNode: 'https://ipfs.effect.ai',
  //   ipfsExplorer: 'https://ipfs.effect.ai',
  //   tokenContract: 'effect.token',
  //   stakingContract: 'effect.stake',
  //   daoContract: 'effect.daofx',
  //   proposalContract: 'effect.props',
  //   votingContract: 'effect.votes',
  //   feepoolContract: 'effect.feefx',
  //   efxToken: 'EFX',
  //   nfxToken: 'NFX',
  //   discordGuildId: '519860537891487745',
  //   discordInviteUrl: 'https://discord.gg/hM3237cYXP',
  //   constitutionUrl: 'https://raw.githubusercontent.com/effectai/effect-network-eos/9522a000cf96269912a47fdd4653c14ac26bbf61/constitution/constitution.md'
  // },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Effect Dashboard',
    title: 'Effect DAO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Decentralized Proposals and voting. Power to the people.'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://dao.effect.network/'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Effect Dashboard'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Decentralized Proposals and voting. Power to the people.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://effect.network/img/logo/effect-dao-new.png'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:domain',
        property: 'twitter:domain',
        content: 'dao.effect.network'
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: 'https://dao.effect.network/'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Effect Dashboard'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'Decentralized Proposals and voting. Power to the people.'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: 'https://effect.network/img/logo/effect-dao-new.png'
      }
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

  fontawesome: {
    icons: {
      brands: [
        'faDiscord',
        'faTelegram',
        'faGithub',
        'faTwitter'
      ],
      solid: [
        'faCaretSquareDown',
        'faStickyNote',
        'faTimes',
        'faCheck',
        'faInfoCircle',
        'faHandPaper',
        'faExternalLinkAlt',
        'faArrowUp',
        'faArrowDown',
        'faMinus',
        'faCommentDots',
        'faCheckSquare',
        'faBlog',
        'faFileWord',
        'faChevronCircleRight',
        'faEdit',
        'faCalendarAlt'
      ]
    }
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/transit.js', mode: 'client' },
    { src: '@/plugins/wallet.js', mode: 'client' },
    { src: '@/plugins/dao.js', mode: 'client' },
    '@/plugins/modal.js',
    '@/plugins/eos.js',
    '@plugins/atomic.js',
    '@/plugins/helpers.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome'
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
