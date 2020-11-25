<template>
  <div>
    <div class="has-text-centered">
      <template v-if="wallet && wallet.auth">
        <button class="button is-primary is-wide m-2">New Proposal</button>
        <nuxt-link :to="'/account/' + wallet.auth.accountName" class="button is-primary is-wide m-2 is-outlined">Your Proposals</nuxt-link>
      </template>
      <ConnectWallet v-else title="New Proposal" button-class="is-wide"/>
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
      proposals: null
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
    async getProposals () {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.proposals = [
          {
            id: 1,
            title: 'Project Management Proposal',
            account: 'extemporized',
            created: '11-11-2020',
            score: 10,
            votes: 23,
            status: 'ACTIVE'
          },
          {
            id: 1,
            title: 'Project Management Proposal',
            account: 'laurenseosio',
            created: '11-24-2020',
            score: 10,
            votes: 23,
            status: 'ACTIVE'
          },
          {
            id: 1,
            title: 'Project Management Proposal',
            account: 'hazdkmbxgene',
            created: '11-25-2020',
            score: 10,
            votes: 23,
            status: 'ACTIVE'
          },
          {
            id: 2,
            title: 'Change to Rebase Sell percentage',
            account: 'extemporized',
            created: '11-11-2020',
            score: -20,
            votes: 30,
            status: 'PENDING'
          },
          {
            id: 3,
            title: 'Change to Rebase Sell percentage',
            account: 'laurens.x',
            created: '11-11-2020',
            votes: 0,
            score: 0,
            status: 'PENDING'
          },
          {
            id: 4,
            title: 'Change to Rebase Sell percentage',
            account: 'extemporized',
            created: '11-11-2020',
            status: 'DRAFT'
          },
          {
            id: 4,
            title: 'Change to Rebase Sell percentage',
            account: 'extemporized',
            created: '11-11-2020',
            status: 'CLOSED'
          }
        ]
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>
