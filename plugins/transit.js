import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import anchor from 'eos-transit-anchorlink-provider'
import tp from 'eos-transit-tokenpocket-provider'
import Vue from 'vue'

const accessContext = initAccessContext({
  appName: 'Effect Dashboard',
  network: {
    host: process.env.eosNodeUrl,
    port: 443,
    protocol: 'https',
    chainId: process.env.eosChainId
  },
  walletProviders: [
    scatter(),
    anchor('effect-dashboard'),
    tp()
  ]
})

export default (context, inject) => {
  const transit = new Vue({
    data () {
      return {
        wallet: null
      }
    },
    methods: {
      async login (index) {
        const providers = accessContext.getWalletProviders()
        const selectedProvider = providers[index]

        const wallet = accessContext.initWallet(selectedProvider)
        await wallet.connect()
        await wallet.login()

        this.wallet = wallet
      }
    }
  })

  inject('transit', transit)
}
