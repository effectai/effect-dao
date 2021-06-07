<template>
  <div class="content">
    <div class="mb-2">
      <nuxt-link to="/proposals" class="is-size-7">
        &lt; All Proposals
      </nuxt-link>
    </div>
    <div v-if="loading">
      Loading Proposal..
    </div>
    <div v-else-if="proposal" class="columns">

      <div class="column is-two-thirds">

        <div class="message is-dark" v-if="proposalComment !== undefined">
          <div class="message-header">High Guard Comment</div>
          <div class="message-body" v-html="proposalComment"></div>
        </div>

        <div v-if="proposal.title" class="title is-4">
          #{{ proposal.id }}: {{ proposal.title }}
        </div>
        <div v-else class="title is-4">
          ...
        </div>
        <small>
          <div v-if="proposal.body" v-html="$md.render(proposal.body)" />
          <div v-else>Loading content..</div>
        </small>
        <div class="box mt-5">
          <h4 class="box-title subtitle">
            Attachments
          </h4>
          <table v-if="proposal.files" class="table">
            <tbody v-if="proposal.files.length > 0">
              <tr v-for="file in proposal.files" :key="file.Hash">
                <td><a :href="ipfsExplorer + '/ipfs/' + file.Hash" target="_blank">{{ file.Name }}</a></td>
                <td>{{ file.Size | formatBytes }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="2">
                  No files attached
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            Loading attachments..
          </div>
        </div>
        <div v-if="proposal.status === 'ACTIVE' || proposal.status === 'CLOSED'" class="box mt-5">
          <h5 class="box-title">
            Cast your vote
          </h5>
          <div v-if="proposalCycle" class="has-text-centered mb-4">
            <span v-if="$moment(proposalCycle.start_time + 'Z').add($dao.proposalConfig.cycle_voting_duration_sec, 'seconds').isBefore()">
              Voting Closed
            </span>
            <span v-else>
              Voting ends {{ $moment(proposalCycle.start_time + "Z").add($dao.proposalConfig.cycle_voting_duration_sec, 'seconds').fromNow() }}
            </span>
            <!--            <b>Current Vote {{ myVote.voter }}:</b> {{ voteTypes.find((vt) => vt.value === myVote.type).name }} - {{ myVote.weight }}-->
          </div>
          <div v-else-if="myVote && proposal.status === 'CLOSED'">
            <b>You voted {{ myVote.voter }}:</b> {{ voteTypes.find((vt) => vt.value === myVote.type).name }} - {{ myVote.weight }}
          </div>
          <div v-if="proposal.status === 'ACTIVE' && proposalCycle && $moment(proposalCycle.start_time + 'Z').add($dao.proposalConfig.cycle_voting_duration_sec, 'seconds').isAfter()" class="columns">
            <div v-for="voteType in voteTypes" :key="voteType.value" class="control column">
              <button class="button is-fullwidth" :class="{'is-dark': voteType.value === 0, 'is-danger': voteType.value === 2, 'is-success': voteType.value === 1, 'is-outlined': vote_type !== voteType.value}" @click.prevent="vote_type = voteType.value">
                <span class="icon">
                  <font-awesome-icon v-if="voteType.value === 0" :icon="['fas', 'hand-paper']" />
                  <font-awesome-icon v-else-if="voteType.value === 2" :icon="['fas', 'times']" />
                  <font-awesome-icon v-else-if="voteType.value === 1" :icon="['fas', 'check']" />
                </span>
                <span>{{ voteType.name }}</span>
              </button>
            </div>
          </div>
          <div>
            <NuxtLink v-if="wallet && wallet.auth && !signedLastConstitution" to="/dao">
              <button class="button is-primary is-fullwidth">
                Sign new constitution
              </button>
            </NuxtLink>
            <button v-else class="button is-primary is-fullwidth" :disabled="!votes || vote_type === null || !wallet || !wallet.auth || wallet.nfxStillClaimable || $wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked) < 1 " @click.prevent="vote">
              <span v-if="!wallet || !wallet.auth">Not connected to wallet</span>
              <span v-else-if="$wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked) < 1">No voting power</span>
              <span v-else-if="wallet.nfxStillClaimable">Claim NFX before you can vote</span>
              <span v-else>Vote</span>
            </button>
          </div>
        </div>
        <div v-else class="box mt-5 faded">
          <h5 class="box-title">
            Cast your vote
          </h5>
          <p v-if="proposal.status === 'PENDING' || proposal.status === 'PROCESSING'" class="has-text-centered">
            <span v-if="proposal.cycle < currentCycle || proposal.status === 'PROCESSING'">
              Voting closed.
            </span>
            <span v-else>
              Voting will be possible once cycle {{ proposal.cycle }} is active.
            </span>
          </p>
          <p v-else-if="proposal.status === 'DRAFT'" class="has-text-centered">
            This proposal is currently in draft. It can be voted on once it is pushed to a cycle by the author and that cycle is live.
          </p>
        </div>
        <div class="box mt-5">
          <h5 class="box-title">
            Votes ({{ totalVotes }})
          </h5>
          <div v-if="votes && votes.length">
            <div v-for="vote in votes" :key="vote.id + vote.voter" class="columns is-vcentered is-mobile">
              <div class="column is-6">
                <div class="is-flex is-align-items-center">
                  <div class="image is-32x32 is-rounded mr-2">
                    <avatar :account-name="vote.voter" />
                  </div>
                  <nuxt-link :to="'/account/'+vote.voter">
                    <b>{{ vote.voter }}</b>
                  </nuxt-link>
                </div>
              </div>
              <div class="column is-3 has-text-centered">
                <b :class="{'has-text-success': vote.type === 1, 'has-text-danger': vote.type === 2}">{{ voteTypes.find((vt) => vt.value === vote.type).name }}</b>
              </div>
              <div class="column is-3 has-text-centered" :data-tooltip="'Vote-weight: ' + vote.weight">
                <b>{{ $wallet.formatNumber(vote.weight) }}</b>
              </div>
            </div>
          </div>
          <div v-else-if="votes" class="has-text-centered">
            No votes yet
          </div>
          <div v-else class="has-text-centered">
            Loading votes..
          </div>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="box">
          <h5 class="box-title">
            Information
          </h5>
          <div class="block">
            <i>author</i><br>
            <nuxt-link :to="'/account/'+proposal.author">
              <b>{{ proposal.author }}</b>
            </nuxt-link>
          </div>
          <div class="block">
            <i>Status</i><br>
            <b class="tag" :class="{'is-success': proposal.status === 'ACTIVE' || proposal.status === 'EXECUTED' || proposal.status == 'ACCEPTED', 'is-warning': proposal.status === 'DRAFT', 'is-link': proposal.status === 'PENDING', 'is-dark': proposal.status === 'WARNING', 'is-danger': proposal.status === 'REJECTED'}">{{ proposal.status }}</b>
          </div>
          <div v-for="(pay, index) in proposal.pay" :key="index" class="block">
            <i>requesting</i><br>
            <b>{{ pay.field_0.quantity }}</b><br>
            <i v-if="false">requestable</i>
            <b v-if="false">{{ $moment(pay.field_1 + "Z").fromNow() }}</b>
          </div>
          <div class="block">
            IPFS Hash
            <div class="hash">
              <a target="_blank" :href="`${ipfsExplorer}/ipfs/${proposal.content_hash}`">{{ proposal.content_hash }}</a>
            </div>
          </div>
          <div class="block">
            <i>cycle</i><br>
            <b>{{ proposal.cycle }}</b>
          </div>
          <div class="block">
            <i>Category</i><br>
            <b>{{ categories[proposal.category] }}</b>
          </div>
          <div v-if="isMyProposal" class="mt-2">
            <nuxt-link class="button is-primary is-fullwidth" :to="`/proposals/${id}/edit`">
              <b>Edit</b>
            </nuxt-link>
          </div>
          <div v-if="isMyProposal && $dao.proposalConfig && proposal.cycle === 0" class="mt-2">
            <button class="button is-primary is-outlined is-fullwidth" @click.prevent="assignToNextCycle()">
              <b>Assign to next cycle</b>
            </button>
          </div>
        </div>
        <div class="box">
          <h5 class="box-title" :data-tooltip="'Total vote-weight: ' + this.totalVoteWeight">
            Results: {{ $wallet.formatNumber(this.totalVoteWeight) }}
          </h5>
          <div v-for="result in voteResults" :key="result.type">
            <div class="columns is-vcentered is-mobile">
              <div class="column is-4">
                <b :class="{'has-text-success': result.type === 1, 'has-text-danger': result.type === 2}">{{ voteTypes.find((vt) => vt.value == result.type).name }}</b>
              </div>
              <div class="column is-4" data-tooltip="Number of votes">
                # {{ result.votes }}
              </div>
              <div class="column is-2" :data-tooltip="'Vote-weight: ' + result.weight">
                <b>{{ $wallet.formatNumber(result.weight) }}</b>
              </div>
            </div>
            <progress :class="['progress', 'is-small', 'progress-type-' + result.type, {'is-danger': result.type === 2}, {'is-success': result.type === 1}]" :value="result.weight" :max="totalVoteWeight" />
          </div>
          <div class="has-text-centered is-italic mt-4 is-size-7">Quorum: {{ this.quorum }}</div>
        </div>
      </div>
    </div>
    <h4 v-else class="has-text-centered subtitle">
      Could not retrieve proposal
    </h4>
  </div>
</template>

<script>
import jsonComment from '@/static/json/high_guard_comment.json'

export default {
  filters: {
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) {
        return '0 Bytes'
      }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }
  },
  data () {
    return {
      quorum: 0,
      ipfsExplorer: process.env.ipfsExplorer,
      loading: false,
      proposal: null,
      proposalCycle: null,
      id: this.$route.params.id,
      vote_type: null,
      voteTypes: [
        {
          value: 1,
          name: 'Yes'
        },
        {
          value: 0,
          name: 'Abstain'
        },
        {
          value: 2,
          name: 'No'
        }
      ],
      votes: null,
      categories: {
        0: 'Governance Proposal',
        1: 'Marketing',
        2: 'Design',
        3: 'Technical',
        4: 'Other'
      }
    }
  },

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    },
    isMyProposal () {
      return this.proposal && this.wallet && this.wallet.auth && this.wallet.auth.accountName === this.proposal.author
    },
    voteResults () {
      const results = [
        {
          type: 1,
          votes: 0,
          weight: 0
        },
        {
          type: 2,
          votes: 0,
          weight: 0
        },
        {
          type: 0,
          votes: 0,
          weight: 0
        }
      ]
      if (this.votes) {
        this.votes.forEach((vote) => {
          const result = results.find(result => result.type === parseInt(vote.type))
          result.votes++
          result.weight += vote.weight
        })
      }
      return results
    },
    totalVoteWeight () {
      return Object.values(this.voteResults).reduce((acc, val) => acc + val.weight, 0)
    },
    totalVotes () {
      return Object.values(this.voteResults).reduce((acc, val) => acc + val.votes, 0)
    },
    myVote () {
      if (!this.votes || !this.wallet || !this.wallet.auth) {
        return null
      }
      const vote = this.votes.find(vote => vote.voter === this.wallet.auth.accountName)
      if (vote && this.vote_type === null) {
        // TODO: side effect in computed property, move to watcher
        // eslint-disable-next-line
        this.vote_type = vote.type
      }
      return vote
    },
    currentCycle () {
      return this.$dao.proposalConfig ? this.$dao.proposalConfig.current_cycle : null
    },
    signedLastConstitution () {
      return this.$wallet.signedConstitutionVersion === (this.$dao.lastTerms ? this.$dao.lastTerms.version : 0)
    },
    proposalComment () {
      if (this.$route.params.id === undefined) {
        return undefined
      } else if (jsonComment[this.$route.params.id] === undefined) {
        return undefined
      } else {
        return jsonComment[this.$route.params.id].text
      }
    }
  },

  watch: {
    currentCycle () {
      this.getProposal(this.id)
    }
  },

  created () {
    this.getProposal(this.id)
    // this.getQuorum()
  },

  methods: {
    async assignToNextCycle () {
      if (this.$dao.proposalConfig && this.proposal) {
        const actions = [{
          account: process.env.proposalContract,
          name: 'updateprop',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            id: this.proposal.id,
            pay: this.proposal.pay,
            content_hash: this.proposal.content_hash,
            category: this.proposal.category,
            cycle: this.$dao.proposalConfig.current_cycle + 1,
            transaction_hash: this.proposal.transaction_hash
          }
        }]
        try {
          await this.$wallet.handleTransaction(actions)
          this.$modal.show({
            color: 'success',
            title: 'Transaction Sent',
            persistent: true,
            text: 'Your transaction to assign proposal to next cycle is sent!',
            cancel: false,
            onConfirm: () => {
              this.getProposal(this.id)
              return true
            }
          })
        } catch (e) {
          this.$modal.show({
            color: 'danger',
            title: 'Error',
            persistent: true,
            text: e
          })
        }
      }
    },
    async getQuorum (cycleNumber) {
      if (cycleNumber.id === 0) {
        this.quorom = 0
      } else {
        const data = await this.$eos.rpc.get_table_rows({
          json: true, // optional ?
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'cycle',
          limit: 1,
          lower_bound: cycleNumber.id // This parameter is how we can query by id.
        })
        this.quorum = data.rows[0].quorum
      }
    },
    async getProposal (id) {
      this.loading = true
      if (this.$dao.proposalConfig) {
        try {
          const data = await this.$eos.rpc.get_table_rows({
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'proposal',
            lower_bound: id,
            limit: 1
          })
          this.proposal = data.rows[0]
          this.proposalCycle = await this.$dao.getCycleConfig(this.proposal.cycle)
          this.loading = false
          let status = 'CLOSED'
          if (this.proposal.state === 1) {
            status = 'ACCEPTED'
          } else if (this.proposal.state === 2) {
            status = 'REJECTED'
          } else if (this.proposal.state === 3) {
            status = 'EXECUTED'
          } else if (this.proposal.state === 0) {
            if (!this.proposal.cycle) {
              status = 'DRAFT'
            } else if (this.proposalCycle && this.proposal.cycle === this.$dao.proposalConfig.current_cycle && this.$moment(this.proposalCycle.start_time + 'Z').add(this.$dao.proposalConfig.cycle_voting_duration_sec, 'seconds').isAfter()) {
              status = 'ACTIVE'
            } else if (this.proposalCycle && this.$moment(this.proposalCycle.start_time + 'Z').add(this.$dao.proposalConfig.cycle_voting_duration_sec, 'seconds').isBefore()) {
              status = 'PROCESSING'
            } else if (this.proposalCycle && this.proposalCycle.id < this.$dao.proposalConfig.current_cycle) {
              status = 'PROCESSING'
            } else {
              status = 'PENDING'
            }
          }
          this.$set(this.proposal, 'status', status)
          const ipfsProposal = await this.$dao.getIpfsProposal(this.proposal.content_hash)
          this.$set(this.proposal, 'title', ipfsProposal.title)
          this.$set(this.proposal, 'body', ipfsProposal.body)
          this.$set(this.proposal, 'files', ipfsProposal.files ? ipfsProposal.files : [])
          await this.getVotes(parseInt(id))
          await this.getQuorum(this.proposalCycle)
        } catch (e) {
          console.log(e)
        }
        this.loading = false
      }
    },
    async getVotes (id) {
      // this.loading = true
      if (this.$dao.proposalConfig) {
        try {
          const config = {
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            index_position: 4,
            key_type: 'i64',
            limit: 1000,
            lower_bound: id,
            upper_bound: id
          }
          // if (this.nextKey) {
          //   config.lower_bound = this.nextKey
          // }
          const data = await this.$eos.rpc.get_table_rows(config)
          // this.moreVotes = data.more
          // this.nextKey = data.next_key
          this.votes = data.rows
          // if (!this.votes) {
          //   this.votes = data.rows
          // } else {
          //   this.votes = this.votes.concat(data.rows)
          // }
        } catch (e) {
          console.log(e)
        }
        // if (this.moreProposals) {
        //   this.getProposals()
        // }
        // this.loadingVotes = false
      }
    },
    async vote () {
      if (this.proposal && this.vote_type !== null) {
        const actions = [{
          account: process.env.proposalContract,
          name: 'addvote',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            voter: this.wallet.auth.accountName,
            prop_id: this.proposal.id,
            vote_type: this.vote_type
          }
        }]
        try {
          await this.$wallet.handleTransaction(actions)
          this.$modal.show({
            color: 'success',
            title: 'Vote Submitted',
            persistent: false,
            text: 'Your vote for the proposal is sent!',
            cancel: false,
            onConfirm: () => {
              this.getProposal(this.id)
              return true
            }
          })
        } catch (e) {
          this.$modal.show({
            color: 'danger',
            title: 'Error',
            persistent: true,
            text: e
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .hash {
    white-space: nowrap;
    overflow: hidden;
    font-family: monospace;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .progress {
    margin-top: -22px;
    margin-bottom: 12px;
  }
</style>
