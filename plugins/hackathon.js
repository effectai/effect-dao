import Vue from 'vue'

export default (context, inject) => {
  const hackathon = new Vue({
    data () {
      return {

      }
    },

    computed: {
      eos () {
        return context.$eos
      }
    },

    created () {
      setTimeout(() => {
        this.getLastTerms()
      })
    },

    methods: {
      async getLastTerms () {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.daoContract,
          scope: process.env.daoContract,
          table: 'memberterms',
          reverse: true,
          limit: 1
        })

        this.lastTerms = data.rows[0]
      },
      async getIpfsContent (hash) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = await fetch(process.env.ipfsExplorer + '/ipfs/' + hash)
        return data.json()
      }
    }
  })

  inject('hackathon', hackathon)
}
