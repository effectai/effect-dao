import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import anchor from 'eos-transit-anchorlink-provider'
import tp from 'eos-transit-tokenpocket-provider'
import Vue from 'vue'
import lynx from 'eos-transit-lynx-provider'

// Here

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
    methods: {
      async login (provider) {
        const providers = accessContext.getWalletProviders()
        const selectedProvider = providers.find(r => r.id === provider)
        const wallet = accessContext.initWallet(selectedProvider)
        await wallet.connect()
        await wallet.login()

        context.$wallet.init(wallet)
      },

      async logout () {
        await context.$wallet.wallet.logout()
        context.$wallet.clear()
      }
    }
  })

  inject('transit', transit)
}
