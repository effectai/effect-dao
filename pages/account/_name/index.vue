<template>
  <div>
    <div v-if="loadingAccount">loading account info..</div>
    <div v-else-if="account">
      <div class="box">
        <div class="media">
          <div class="media-left">
            <div class="image is-128x128">
              <avatar :account-name="account.name" />
            </div>
          </div>
          <div class="media-content">
            <h2>{{ account.name }}</h2>
            <h4 v-if="account.rank" class="rank">Rank {{ account.rank.currentRank }}</h4>
            <div v-if="account.signedConstitution">
              <ICountUp v-if="account.power >= 0" class="power" :options="{ prefix: 'EFX Power ', suffix: ' EP' }" :end-val="account.power" />
              <div v-else>
                ...
              </div>
              <div>
                <small>Joined <span v-if="account.registration_time">{{ $moment(account.registration_time).fromNow() }}</span><span v-else>..</span></small>
              </div>
            </div>
            <div v-else>
              <h5>Not a DAO Member</h5>
            </div>
          </div>
          <div class="media-right">
            <div v-if="account.rank && account.rank.currentRank > 0" :class="['rank-icon', 'rank-'+account.rank.currentRank]"><img width="64px" :src="'/img/guardian-icons/guardian-'+account.rank.currentRank+'.png'" /></div>
          </div>
        </div>
        <div class="rank-title" :class="[account.rank ? 'rank-'+account.rank.currentRank : '']"></div>
      </div>
      <div class="box">
        <h4 class="box-title">Proposals by {{account.name}}</h4>
        <div v-if="loadingProposals">Loading Proposals..</div>
        <proposals v-else-if="proposals && proposals.length > 0" :proposals="proposals" />
        <div v-else-if="proposals">
          No Proposals
        </div>
        <div v-else>
          Could not retrieve proposals
        </div>
      </div>
      <div class="box">
        <h4 class="box-title">Votes from {{account.name}}</h4>
        <div v-if="loadingVotes">Loading Votes..</div>
        <div v-else-if="votes && votes.length > 0">
          <div v-for="vote in votes" :key="vote.id">
            {{vote}}
          </div>
        </div>
        <div v-else-if="votes">
          No Votes
        </div>
        <div v-else>
          Could not retrieve votes
        </div>
      </div>
    </div>
    <h4 v-else class="has-text-centered">Could not retrieve account</h4>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import Avatar from '~/components/Avatar'
import Proposals from '~/components/Proposals'

export default {
  components: {
    Avatar,
    ICountUp,
    Proposals
  },

  data () {
    return {
      loadingAccount: false,
      loadingProposals: false,
      loadingVotes: false,
      account: {
        name: this.$route.params.name
      },
      proposals: null,
      votes: null
    }
  },

  created () {
    this.getAccountInfo()
    this.getProposals()
    this.getVotes()
  },

  methods: {
    async getAccountInfo () {
      this.loadingAccount = true
      try {
        const member = await this.$wallet.getDaoMember(this.account.name)
        console.log(member)
        this.$set(this.account, 'signedConstitution', !!member)
        if (member) {
          this.$set(this.account, 'registration_time', new Date(`${member.registration_time}Z`))
          const stakeInfo = await this.$wallet.getStake(this.account.name)
          stakeInfo.map((row) => {
            if (row.amount.includes(process.env.efxToken)) {
              const efxStaked = parseFloat(row.amount.replace(` ${process.env.efxToken}`, '').replace('.', ','))
              const stakeAge = this.$wallet.calculateStakeAge(efxStaked, row.last_claim_time, row.last_claim_age)
              const efxPower = this.$wallet.calculateEfxPower(efxStaked, stakeAge)
              this.$set(this.account, 'efxStaked', efxStaked)
              this.$set(this.account, 'stakeAge', stakeAge)
              this.$set(this.account, 'power', efxPower)
            } else if (row.amount.includes(process.env.nfxToken)) {
              const nfxStaked = parseFloat(row.amount.replace(` ${process.env.nfxToken}`, '').replace('.', ','))
              this.$set(this.account, 'nfxStaked', nfxStaked)
            }
          })
          if (!this.account.power) {
            this.$set(this.account, 'power', 0)
          }
          this.$set(this.account, 'rank', this.$wallet.calculateRankProgress(this.account.power, this.account.nfxStaked))
        }
      } catch (e) {
        console.log(e)
      }
      this.loadingAccount = false
    },

    async getProposals () {
      this.loadingProposals = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const proposals = [
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
        this.proposals = proposals.filter(p => p.account === this.account.name)
      } catch (e) {
        console.log(e)
      }
      this.loadingProposals = false
    },

    async getVotes () {
      this.loadingVotes = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.votes = []
      } catch (e) {
        console.log(e)
      }
      this.loadingVotes = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
