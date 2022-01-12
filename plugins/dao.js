import Vue from 'vue'

export default (context, inject) => {
  const dao = new Vue({
    data () {
      return {
        proposalConfig: null,
        cycleConfig: null,
        nextCycleConfig: null,
        hackathonConfig: null,
        hackathonCycleConfig: null,
        discordMembersOnline: null,
        lastTerms: null
      }
    },

    computed: {
      eos () {
        return context.$eos
      }
    },

    created () {
      this.getDiscordMembersOnline()

      setTimeout(() => {
        this.getProposalConfig()
        this.getLastTerms()
        this.getHackathonVotesConfig()
      })
    },

    methods: {
      getDiscordMembersOnline () {
        fetch(`https://discord.com/api/guilds/${process.env.discordGuildId}/widget.json`)
          .then(data => data.json())
          .then((data) => {
            this.discordMembersOnline = data.presence_count
          })
      },
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
      async getProposalConfig () {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.votingContract,
          scope: process.env.votingContract,
          table: 'config'
        })
        if (data.rows.length > 0) {
          // console.log(data.rows[0])
          this.proposalConfig = data.rows[0]
          this.cycleConfig = await this.getCycleConfig(data.rows[0].current_cycle)
          this.nextCycleConfig = await this.getCycleConfig(data.rows[0].current_cycle + 1)
        }
      },
      async getCycleConfig (cycle) {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.votingContract,
          scope: process.env.votingContract,
          table: 'cycle',
          lower_bound: cycle,
          limit: 1
        })
        if (data.rows.length > 0) {
          return data.rows[0]
        }
      },
      async getHackathonVotesConfig () {
        console.log(`GetHackathonVotesConfig:: ${process.env.hackathonContract}`)
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.hackathonConfig,
          scope: process.env.hackathonConfig,
          table: 'config'
        }).catch(err => console.error(`Error getting hackathon config: ${err}`))
        console.log(data)
        if (data.rows.length > 0) {
          this.hackathonConfig = data.rows[0]
          this.hackathonCycleConfig = await this.getHackathonCycleConfig(data.rows[0].current_cycle)
        }
      },
      async getHackathonCycleConfig (cycle) {
        console.log('getHackathonCycleConfig')
        const data = await this.eos.rpc.get_table_rows({
          // code: process.env.hackathonConfig,
          // scope: process.env.hackathonConfig,
          code: 'effectvotess',
          scope: 'effectvotess',
          table: 'cycle',
          lower_bound: cycle,
          limit: 1
        }).catch(error => console.log(`getHackathonCycleConfig Error: ${error}`))
        console.log(data)
        if (data.rows.length > 0) {
          console.log(`Hackathon cycles: ${JSON.stringify(data)}`)
          return data.rows[0]
        }
      },
      async getIpfsContent (hash) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = await fetch(process.env.ipfsExplorer + '/ipfs/' + hash)
        return data.json()
      }
    }
  })

  inject('dao', dao)
}
