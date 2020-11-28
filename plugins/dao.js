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
        const data = await fetch('https://cloudflare-ipfs.com/ipfs/' + hash)
        return data.json()
        // return {
        //   title: 'Example Proposal Title',
        //   description: '## Introduction\n' +
        //     'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n' +
        //     '\n' +
        //     '## Specifications\n' +
        //     'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
        //     '\n' +
        //     '## Timeline\n' +
        //     'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n' +
        //     '\n' +
        //     '## Deliverables\n' +
        //     'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n',
        //   files: []
        // }
      }
    }
  })

  inject('dao', dao)
}
