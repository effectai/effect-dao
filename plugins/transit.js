import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import anchor from 'eos-transit-anchorlink-provider'
import tp from 'eos-transit-tokenpocket-provider'
import Vue from 'vue'
import lynx from 'eos-transit-lynx-provider'

const appName = 'effect_dashboard'
const accessContext = initAccessContext({
  appName,
  network: {
    host: process.env.eosNodeUrl,
    port: process.env.portUrl,
    protocol: process.env.protocolUrl,
    chainId: process.env.eosChainId
  },
  walletProviders: [
    scatter(),
    anchor(appName),
    tp(),
    lynx()
  ]
})

export default (context, inject) => {
  const transit = new Vue({
    data () {
      return {
        providers: {
          scatter: 'scatter',
          anchor: 'anchor-link',
          tokenpocket: 'TokenPocket',
          lynx: 'EOS Lynx'
        }
      }
    },
    created () {
      setTimeout(() => {
        if (localStorage.getItem('accountInfo')) {
          const accountInfo = JSON.parse(localStorage.getItem('accountInfo'))
          this.login(accountInfo.provider, accountInfo.auth)
        }
      }, 50)
    },
    methods: {
      async login (provider, auth) {
        const providers = accessContext.getWalletProviders()
        const selectedProvider = providers.find(r => r.id === provider)
        const wallet = accessContext.initWallet(selectedProvider)
        await wallet.connect()

        if (auth !== undefined) {
          await wallet.login(auth.accountName, auth.permission)
          context.$wallet.init(wallet)
        } else {
          wallet.login().then(() => {
            localStorage.setItem('accountInfo', JSON.stringify({ loggedIn: true, provider, auth: wallet.auth }))
            context.$wallet.init(wallet)
          }).catch((err) => {
            localStorage.removeItem('accountInfo')
            console.log(err)
          })
        }
      },

      async logout () {
        localStorage.removeItem('accountInfo')
        await context.$wallet.wallet.logout()
        context.$wallet.clear()
      }
    }
  })

  inject('transit', transit)
}
