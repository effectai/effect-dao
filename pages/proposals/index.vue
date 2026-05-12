<template>
  <div>
    <div class="has-text-centered">
      <nuxt-link class="button is-primary is-wide m-2" to="/proposals/new">
        New Proposal
      </nuxt-link>
      <nuxt-link
        v-if="wallet && wallet.auth"
        :to="'/account/' + wallet.auth.accountName"
        class="button is-primary is-wide m-2 is-outlined"
      >
        Your Proposals
      </nuxt-link>
      <ConnectWallet v-else title="Your Proposals" button-class="is-wide is-outlined m-2" />
    </div>
    <div class="box mt-5">
      <h4 class="subtitle box-title mb-0 is-4 has-text-weight-bold">
        Proposals
        <div class="is-size-6 mt-2">
          <small>
            <span v-if="$dao.cycleConfig && $moment($dao.cycleConfig.start_time + 'Z').add($dao.proposalConfig.cycle_voting_duration_sec, 'seconds').isAfter()">
              <span v-if="currentCycle">Cycle {{ currentCycle }}
                <span v-if="$dao.cycleConfig">
                  started {{ $moment($dao.cycleConfig.start_time + "Z").fromNow() }} and ends {{
                    $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow()
                  }} <br>
                  Voting ends {{ $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_voting_duration_sec, 'seconds').fromNow() }}
                </span>
              </span>
            </span>
            <span v-else-if="$dao.cycleConfig && currentCycle">
              New cycle starts {{ $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow() }}
            </span>
            <span v-else-if="$dao.cycleConfig">
              <!-- Genesis cycle!-->
              Waiting for <i>Genesis Cycle</i>
              <span v-if="$dao.cycleConfig">start {{
                $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow()
              }}</span>
            </span>
          </small>
        </div>
      </h4>
      <div class="tabs is-centered">
        <ul>
          <li v-for="status in statuses" :key="status.id" :class="{'is-active': filter === status.id}">
            <a
              v-if="status.name != 'Pending'"
              @click.prevent="filter = status.id"
            >{{ status.name }}</a>
          </li>
        </ul>
      </div>
      <template v-if="$dao.cycleConfig">
        <template v-if="currentCycle">
          <h5 v-if="filter === 'ACTIVE'" />
          <h5 v-else-if="filter === 'PENDING'">
            Proposals for cycle {{ currentCycle + 1 }} starting {{
              $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow()
            }}
          </h5>
        </template>
        <template v-else>
          <!-- Genesis cycle! -->
          <h5 v-if="filter === 'ACTIVE'">
            Waiting for <i>Genesis Cycle</i> {{ currentCycle + 1 }} start {{
              $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow()
            }}
          </h5>
          <h5 v-if="filter === 'PENDING'">
            Proposals for <i>Genesis Cycle</i> {{ currentCycle + 1 }} starting {{
              $moment($dao.cycleConfig.start_time + "Z").add($dao.proposalConfig.cycle_duration_sec, 'seconds').fromNow()
            }}
          </h5>
        </template>
      </template>
      <h5 v-if="filter === 'DRAFT'" class="subtitle has-text-centered">
        Not yet assigned to a cycle
      </h5>
      <h5 v-else-if="filter === 'CLOSED'" class="subtitle has-text-centered">
        Accepted or rejected proposals
      </h5>
      <proposals v-if="paginatedProposals.length > 0" :proposals="paginatedProposals" />
      <div v-else-if="proposals && proposalsFiltered.length === 0">
        No proposals
      </div>
      <nav
        v-if="totalProposalPages > 1"
        class="pagination is-centered mt-5"
        role="navigation"
        aria-label="pagination"
      >
        <button
          class="pagination-previous"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <button
          class="pagination-next"
          :disabled="currentPage === totalProposalPages"
          @click="currentPage++"
        >
          Next
        </button>
        <ul class="pagination-list">
          <li v-for="page in visiblePages" :key="page">
            <button
              class="pagination-link"
              :class="{ 'is-current': currentPage === page }"
              :aria-label="'Go to page ' + page"
              :aria-current="currentPage === page ? 'page' : null"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </li>
        </ul>
      </nav>
      <p v-if="proposalsFiltered.length > 0" class="has-text-centered is-size-7 mt-2">
        Showing {{ pageStart }}-{{ pageEnd }} of {{ proposalsFiltered.length }} proposals
      </p>
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
          id: 'PROCESSING',
          name: 'Processing'
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
      nextKey: null,
      currentPage: 1,
      pageSize: 20
    }
  },

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    },
    proposalsFiltered () {
      if (!this.proposals) {
        return []
      }
      if (this.filter === 'ACTIVE') {
        return this.proposals.filter((proposal) => {
          return proposal.status === 'ACTIVE' || proposal.status === 'PENDING'
        })
      } else {
        const filteredProps = this.proposals.filter((proposal) => {
          if (!this.filter || this.filter === 'ALL') {
            return true
          }

          return proposal.status === this.filter
        })

        const isActive = filteredProps.filter((proposal) => {
          return proposal.status === 'ACTIVE'
        }).reverse()

        const isPending = filteredProps.filter((proposals) => {
          return proposals.status === 'PENDING'
        }).reverse()

        const isProcessing = filteredProps.filter((proposals) => {
          return proposals.status === 'PROCESSING'
        }).reverse()

        const isDraft = filteredProps.filter((proposals) => {
          return proposals.status === 'DRAFT'
        }).reverse()

        const isClosed = filteredProps.filter((proposals) => {
          return proposals.status === 'CLOSED'
        }).reverse()

        return [].concat(isActive, isPending, isProcessing, isDraft, isClosed)
      }
    },
    paginatedProposals () {
      const start = (this.currentPage - 1) * this.pageSize
      return this.proposalsFiltered.slice(start, start + this.pageSize)
    },
    totalProposalPages () {
      return Math.ceil(this.proposalsFiltered.length / this.pageSize)
    },
    visiblePages () {
      const pages = []
      const firstPage = Math.max(this.currentPage - 2, 1)
      const lastPage = Math.min(firstPage + 4, this.totalProposalPages)
      for (let page = firstPage; page <= lastPage; page++) {
        pages.push(page)
      }
      return pages
    },
    pageStart () {
      if (this.proposalsFiltered.length === 0) {
        return 0
      }
      return ((this.currentPage - 1) * this.pageSize) + 1
    },
    pageEnd () {
      return Math.min(this.currentPage * this.pageSize, this.proposalsFiltered.length)
    },
    currentCycle () {
      return this.$dao.proposalConfig ? this.$dao.proposalConfig.current_cycle : null
    }
  },

  watch: {
    currentCycle () {
      this.getProposals()
    },
    filter () {
      this.currentPage = 1
      this.$nextTick(this.loadVisibleProposalDetails)
    },
    currentPage () {
      this.$nextTick(this.loadVisibleProposalDetails)
    },
    proposalsFiltered () {
      if (this.currentPage > this.totalProposalPages) {
        this.currentPage = 1
      }
      this.$nextTick(this.loadVisibleProposalDetails)
    }
  },

  created () {
    this.getProposals()
  },

  methods: {
    async getProposals () {
      this.loading = true
      if (!this.$dao.proposalConfig) {
        this.loading = false
        return
      }
      this.proposals = []
      this.moreProposals = null
      this.nextKey = null
      try {
        do {
          const config = {
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'proposal',
            limit: 100
          }
          if (this.nextKey) {
            config.lower_bound = this.nextKey
          }
          const data = await this.$eos.rpc.get_table_rows(config)
          this.moreProposals = data.more
          this.nextKey = data.next_key
          await Promise.all(data.rows.map(this.setProposalStatus))
          this.proposals = this.proposals.concat(data.rows)
        } while (this.moreProposals)
        this.loadVisibleProposalDetails()
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    },
    async setProposalStatus (proposal) {
      if (proposal.status) {
        return
      }
      let status = 'CLOSED'
      if (proposal.state === 0) {
        if (!proposal.cycle) {
          status = 'DRAFT'
        } else {
          const proposalCycle = await this.$dao.getCycleConfig(proposal.cycle)
          if (proposalCycle && proposal.cycle === this.$dao.proposalConfig.current_cycle && this.$moment(proposalCycle.start_time + 'Z').add(this.$dao.proposalConfig.cycle_voting_duration_sec, 'seconds').isAfter()) {
            status = 'ACTIVE'
          } else if (proposalCycle && this.$moment(proposalCycle.start_time + 'Z').add(this.$dao.proposalConfig.cycle_voting_duration_sec, 'seconds').isBefore()) {
            status = 'PROCESSING'
          } else if (proposalCycle && proposal.cycle < this.currentCycle) {
            status = 'PROCESSING'
          } else {
            status = 'PENDING'
          }
        }
      }
      this.$set(proposal, 'status', status)
    },
    loadVisibleProposalDetails () {
      this.paginatedProposals.forEach(async (proposal) => {
        if (!proposal.title) {
          try {
            const ipfsProposal = await this.$dao.getIpfsContent(proposal.content_hash)
            this.$set(proposal, 'title', ipfsProposal.title)
          } catch (e) {
            console.error(e)
          }
        }
        if (proposal.status === 'ACTIVE' && this.wallet && !Object.keys(proposal).includes('vote_status')) {
          const name = this.wallet.accountInfo.account_name
          const hex = this.$helpers.getCompositeKey(name, proposal.id)
          const voteData = await this.$eos.rpc.get_table_rows({
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            key_type: 'i128',
            index_position: 2,
            lower_bound: hex,
            upper_bound: hex,
            limit: 10
          })
          voteData.rows.forEach((vote) => {
            if (proposal.id === vote.proposal_id) { this.$set(proposal, 'vote_status', vote.type) }
          })
        }
      })
    }
  },
  head () {
    return {
      title: 'Proposals'
    }
  }
}
</script>
