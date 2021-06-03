<template>
  <div>
    <div>
      <div class="box">
        <div class="media">
          <div class="media-left">
            <div class="image is-128x128">
              <avatar :account-name="account.name" />
            </div>
          </div>
          <div class="media-content">
            <span>
              <h2 class="subtitle is-3 is-family-sans-serif">{{ account.name }}</h2>
            </span>
            <span>
              <ICountUp v-if="account.power >= 0" class="power" :options="{ prefix: 'Votes: ', suffix: ' ' }" :end-val="account.votes" />
                <div v-else>
                  ...
                </div>
            </span>
            <div v-if="account.signedConstitution">
              <div>
                <ICountUp v-if="account.power >= 0" class="power" :options="{ prefix: 'EFX Power: ', suffix: ' EP' }" :end-val="account.power" />
                <div v-else>
                  ...
                </div>
              </div>
              <div>
                <ICountUp v-if="account.power >= 0" class="power" :options="{ prefix: 'NFX Staked: ', suffix: ' NFX' }" :end-val="account.nfxStaked" />
                <div v-else>
                  ...
                </div>
              </div>
              <div>
                <small>Joined <span v-if="account.registration_time">{{ $moment(account.registration_time).fromNow() }}</span><span v-else>..</span></small>
              </div>
            </div>
            <div v-else-if="account.signedConstitution === false">
              <h5>Not a DAO Member</h5>
            </div>
            <div v-else>
              <h5>Loading..</h5>
            </div>
          </div>
        </div>
        <div class="rank-title" :class="[account.rank ? 'rank-'+account.rank.currentRank : '']" />
        <div v-if="myAccount" class="has-text-centered mt-4">
          <a href="https://avatar.pixeos.art/" target="_blank" class="button is-primary">
            Edit avatar
          </a>
          <button class="button is-danger" :class="{ 'is-loading': loadingLogout }" @click="logout()">
            Disconnect
          </button>
        </div>
      </div>
    </div>
    <div v-if="myAccount" class="mt-5">
      <rank :hide-current-rank="true" />
    </div>
    <div v-else-if="account.rank" class="mt-5">
      <rank-member :power="account.power" :nfx-staked="account.nfxStaked" :stake-age="account.stakeAge" :rank="account.rank" :hide-current-rank="false" />
    </div>
    <div class="box mt-5">
      <h4 v-if="myAccount" class="box-title subtitle">
        Your Proposals
      </h4>
      <h4 v-else class="box-title subtitle">
        Proposals by {{ account.name }}
      </h4>
      <div v-if="loadingProposals">
        Loading Proposals..
      </div>
      <proposals v-else-if="proposals && proposals.length > 0" :proposals="proposals" />
      <div v-else-if="proposals">
        No Proposals
      </div>
      <div v-else>
        Could not retrieve proposals
      </div>
      <div class="has-text-centered mt-4">
        <nuxt-link v-if="myAccount" class="button is-secondary is-wide m-2" to="/proposals/new">
          New Proposal
        </nuxt-link>
        <nuxt-link class="button is-secondary is-outlined is-wide m-2" to="/proposals">
          All Proposals
        </nuxt-link>
      </div>
    </div>
    <div class="box">
      <h4 v-if="myAccount" class="box-title subtitle">
        Your Votes
      </h4>
      <h4 v-else class="box-title subtitle">
        Votes from {{ account.name }}
      </h4>
      <div v-if="loadingVotes">
        Loading Votes..
      </div>
      <div v-else-if="votes && votes.length > 0">
        <nuxt-link v-for="vote in votes" :key="vote.id" :to="'/proposals/'+vote.proposal_id" class="columns is-vcentered is-mobile">
          <div class="column">
            <div>
              Proposal <b>{{ vote.proposal_id }}</b>
            </div>
          </div>
          <div class="column has-text-centered">
            <b :class="{'has-text-success': vote.type === 1, 'has-text-danger': vote.type === 2}">{{ voteTypes.find((vt) => vt.value === vote.type).name }}</b>
          </div>
          <div class="column has-text-centered">
            {{ vote.weight }}
          </div>
        </nuxt-link>
      </div>
      <div v-else-if="votes">
        No Votes
      </div>
      <div v-else>
        Could not retrieve votes
      </div>
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import Avatar from '~/components/Avatar'
import Proposals from '~/components/Proposals'
import Rank from '~/components/Rank'
import RankMember from '~/components/RankMember'

export default {
  components: {
    Avatar,
    ICountUp,
    Proposals,
    Rank,
    RankMember
  },

  data () {
    return {
      loadingLogout: false,
      loadingProposals: false,
      loadingVotes: false,
      loadingDiscord: false,
      account: {
        name: this.$route.params.name
      },
      proposals: null,
      voteTypes: [
        {
          value: 1,
          name: 'Yes'
        },
        {
          value: 2,
          name: 'No'
        },
        {
          value: 0,
          name: 'Abstain'
        }
      ],
      votes: null
    }
  },

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    },
    myAccount () {
      return this.wallet && this.wallet.auth && this.wallet.auth.accountName === this.account.name
    },
    currentCycle () {
      return this.$dao.proposalConfig ? this.$dao.proposalConfig.current_cycle : null
    }
  },

  watch: {
    currentCycle () {
      this.getProposals()
    }
  },

  created () {
    if (!this.wallet || this.wallet.accountName !== this.account.name) {
      this.getAccountInfo()
    }
    this.getProposals()
    this.getVotes()
  },

  methods: {
    async getAccountInfo () {
      try {
        const member = await this.$wallet.getDaoMember(this.account.name)
        console.log(member)
        this.$set(this.account, 'signedConstitution', !!member)
        if (member) {
          this.$set(this.account, 'registration_time', new Date(`${member.registration_time}Z`))
          const stakeInfo = await this.$wallet.getStake(this.account.name)
          stakeInfo.map((row) => {
            if (row.amount.includes(process.env.efxToken)) {
              const efxStaked = parseFloat(row.amount.replace(` ${process.env.efxToken}`, ''))
              const stakeAge = this.$wallet.calculateStakeAge(efxStaked, row.last_claim_time, row.last_claim_age)
              const efxPower = this.$wallet.calculateEfxPower(efxStaked, stakeAge)
              this.$set(this.account, 'efxStaked', efxStaked)
              this.$set(this.account, 'stakeAge', stakeAge)
              this.$set(this.account, 'power', efxPower)
            } else if (row.amount.includes(process.env.nfxToken)) {
              const nfxStaked = parseFloat(row.amount.replace(` ${process.env.nfxToken}`, ''))
              this.$set(this.account, 'nfxStaked', nfxStaked)
            }
          })
          if (!this.account.power) {
            this.$set(this.account, 'power', 0)
          }
          const votes = this.$wallet.calculateVotePower(this.account.power, this.account.nfxStaked)
          this.$set(this.account, 'votes', votes)
        }
      } catch (e) {
        console.log(e)
      }
    },

    async getProposals () {
      this.loadingProposals = true
      if (this.$dao.proposalConfig) {
        try {
          const data = await this.$eos.rpc.get_table_rows({
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'proposal',
            key_type: 'name',
            index_position: 2,
            lower_bound: this.account.name,
            limit: 100
          })
          this.moreProposals = data.more
          this.nextKey = data.next_key
          this.proposals = data.rows.filter(proposal => proposal.author === this.account.name)
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
            try {
              const ipfsProposal = await this.$dao.getIpfsProposal(proposal.content_hash)
              this.$set(proposal, 'title', ipfsProposal.title)
            } catch (e) {
              console.error(e)
            }
          })
        } catch (e) {
          console.log(e)
        }
        this.loadingProposals = false
      }
    },

    async getVotes () {
      this.loadingVotes = true
      try {
        const config = {
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'vote',
          key_type: 'name',
          index_position: 3,
          lower_bound: this.account.name,
          upper_bound: this.account.name,
          limit: 100
        }
        // if (this.nextKey) {
        //   config.lower_bound = this.nextKey
        // }
        const data = await this.$eos.rpc.get_table_rows(config)
        // this.moreVotes = data.more
        // this.nextKey = data.next_key
        if (!this.votes) {
          this.votes = data.rows
        } else {
          this.votes = this.votes.concat(data.rows)
        }
      } catch (e) {
        console.log(e)
      }
      // if (this.moreProposals) {
      //   this.getProposals()
      // }
      // this.loadingVotes = false
      this.loadingVotes = false
    },

    async logout () {
      this.loadingLogout = true
      await this.$transit.logout()
      this.loadingLogout = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
