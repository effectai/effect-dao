<template>
  <div>
    <div class="has-text-centered">
        <nuxt-link class="button is-primary is-wide m-2" to="/proposals/new">New Proposal</nuxt-link>
        <nuxt-link v-if="wallet && wallet.auth" :to="'/account/' + wallet.auth.accountName" class="button is-primary is-wide m-2 is-outlined">Your Proposals</nuxt-link>
        <ConnectWallet v-else title="Your Proposals" button-class="is-wide is-outlined m-2"/>
    </div>
    <div class="box mt-5">
      <h4 class="box-title mb-0">Proposals
        <div class="is-size-6">
          <small>
            <span v-if="currentCycle">Cycle {{currentCycle}}
              <span v-if="$dao.cycleConfig">started {{ $moment($dao.cycleConfig.start_time + "Z").fromNow() }}</span>
            </span>
            <span v-else-if="$dao.cycleConfig">
              <!-- Genesis cycle!-->
              Waiting for <i>Genesis Cycle</i>
              <span v-if="$dao.cycleConfig">start {{ $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow() }}</span>
            </span>

          </small>
        </div>
      </h4>
      <div class="tabs">
        <ul>
          <li v-for="status in statuses" :key="status.id" :class="{'is-active': filter === status.id}"><a @click.prevent="filter = status.id">{{status.name}}</a></li>
        </ul>
      </div>
      <template v-if="$dao.cycleConfig">
        <template v-if="currentCycle">
          <h5 v-if="filter === 'ACTIVE'">
            Cycle {{currentCycle}} ends {{ $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow() }}
          </h5>
          <h5 v-else-if="filter === 'PENDING'">
            Proposals for cycle {{currentCycle + 1}} starting {{ $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow() }}
          </h5>
        </template>
        <template v-else>
          <!-- Genesis cycle! -->
          <h5 v-if="filter === 'ACTIVE'">
            Waiting for <i>Genesis Cycle</i> {{currentCycle + 1}} start {{ $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow() }}
          </h5>
          <h5 v-if="filter === 'PENDING'">
            Proposals for <i>Genesis Cycle</i> {{currentCycle + 1}} starting {{ $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow() }}
          </h5>
        </template>
      </template>
      <h5 v-if="filter === 'DRAFT'">
        Not yet assigned to a cycle
      </h5>
      <h5 v-else-if="filter === 'CLOSED'">
        Accepted or rejected proposals
      </h5>
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
      filter: 'ALL',
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
      moreProposals: null,
      nextKey: null
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
    },
    currentCycle () {
      return this.$dao.proposalConfig ? this.$dao.proposalConfig.current_cycle : null
    }
  },

  created () {
    this.getProposals()
  },

  watch: {
    currentCycle () {
      this.getProposals()
    }
  },

  methods: {
    async getProposals () {
      this.loading = true
      if (this.$dao.proposalConfig) {
        try {
          const config = {
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'proposal',
            limit: 20
          }
          if (this.nextKey) {
            config.lower_bound = this.nextKey
          }
          const data = await this.$eos.rpc.get_table_rows(config)
          this.moreProposals = data.more
          this.nextKey = data.next_key
          if (!this.proposals) {
            this.proposals = data.rows
          } else {
            this.proposals = this.proposals.concat(data.rows)
          }
          this.proposals.forEach(async (proposal) => {
            if (!proposal.status) {
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
            }
            if (!proposal.title) {
              try {
                const ipfsProposal = await this.$dao.getIpfsProposal(proposal.content_hash)
                this.$set(proposal, 'title', ipfsProposal.title)
              } catch (e) {
                console.error(e)
              }
            }
          })
        } catch (e) {
          console.log(e)
        }
        if (this.moreProposals) {
          this.getProposals()
        }
        this.loading = false
      }
    }
  }
}
</script>
