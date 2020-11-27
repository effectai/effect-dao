<template>
  <div>
    <div class="has-text-centered">
        <nuxt-link class="button is-primary is-wide m-2" to="/proposals/new">New Proposal</nuxt-link>
        <nuxt-link v-if="wallet && wallet.auth" :to="'/account/' + wallet.auth.accountName" class="button is-primary is-wide m-2 is-outlined">Your Proposals</nuxt-link>
        <ConnectWallet v-else title="Your Proposals" button-class="is-wide is-outlined m-2"/>
    </div>
    <div class="box mt-5">
      <h4 class="box-title mb-0">Proposals</h4>
      <div class="tabs">
        <ul>
          <li v-for="status in statuses" :key="status.id" :class="{'is-active': filter === status.id}"><a @click.prevent="filter = status.id">{{status.name}}</a></li>
        </ul>
      </div>
      <proposals v-if="proposals && proposals.length > 0" :proposals="proposalsFiltered" />
      <div v-else-if="proposals && proposals.length == 0">
        No proposals
      </div>
      <h4 v-if="loading" class="has-text-centered">
        Loading proposals..
      </h4>
    </div>
  </div>
</template>

<script>
import Proposals from '~/components/Proposals'
import ConnectWallet from '~/components/ConnectWallet'

export default {
  components: {
    Proposals,
    ConnectWallet
  },

  data () {
    return {
      filter: 'ACTIVE',
      statuses: [
        {
          id: 'ACTIVE',
          name: 'Active'
        },
        {
          id: 'PENDING',
          name: 'Pending'
        },
        {
          id: 'DRAFT',
          name: 'Draft'
        },
        {
          id: 'CLOSED',
          name: 'Closed'
        },
        {
          id: 'ALL',
          name: 'All'
        }
      ],
      loading: false,
      proposals: null,
      moreProposals: true,
      nextKey: null,
      currentCycle: 1
    }
  },

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    },
    proposalsFiltered () {
      return this.proposals.filter((proposal) => {
        if (!this.filter || this.filter === 'ALL') {
          return true
        }
        return proposal.status === this.filter
      })
    }
  },

  created () {
    this.getProposals()
  },

  methods: {
    async getIpfsProposal (hash) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        title: 'Example Proposal Title',
        description: 'test description'
      }
    },
    async getProposals () {
      this.loading = true
      try {
        const data = await this.$eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'proposal',
          limit: 100
        })
        this.moreProposals = data.more
        this.nextKey = data.next_key
        this.proposals = data.rows
        console.log(data.rows)
        this.proposals.forEach(async (proposal) => {
          let status = 'CLOSED'
          if (proposal.state === 0) {
            if (!proposal.cycle) {
              status = 'DRAFT'
            } else if (proposal.cycle === this.currentCycle) {
              status = 'ACTIVE'
            } else {
              status = 'PENDING'
            }
          }
          this.$set(proposal, 'status', status)
          proposal.pay = [proposal.pay]
          try {
            const ipfsProposal = await this.getIpfsProposal(proposal.hash)
            this.$set(proposal, 'title', ipfsProposal.title)
          } catch (e) {
            console.error(e)
          }
        })
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>
