import Vue from 'vue'

export default (context, inject) => {
  const dao = new Vue({
    data () {
      return {
        proposalConfig: null,
        cycleConfig: null
      }
    },

    computed: {
      eos () {
        return context.$eos
      }
    },

    created () {
      setTimeout(() => {
        this.getProposalConfig()
      })
    },

    methods: {
      async getProposalConfig () {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'config'
        })
        if (data.rows.length > 0) {
          console.log(data.rows[0])
          this.proposalConfig = data.rows[0]
          this.getCycleConfig(data.rows[0].currentCycle)
        }
      },
      async getCycleConfig (cycle) {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'cycle',
          lower_bound: cycle,
          limit: 1
        })
        if (data.rows.length > 0) {
          console.log(data.rows[0])
          this.cycleConfig = data.rows[0]
        }
      },
      async getIpfsProposal (hash) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = await fetch(process.env.ipfsExplorer + '/ipfs/' + hash)
        return data.json()
      }
    }
  })

  inject('dao', dao)
}
