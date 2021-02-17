import Vue from 'vue'
import genesisAirdrop from '@/static/json/genesis_airdrop.json'

export default (context, inject) => {
  const airdrop = new Vue({
    data () {
      return {
        genesis: genesisAirdrop
      }
    }
  })

  inject('airdrop', airdrop)
}
