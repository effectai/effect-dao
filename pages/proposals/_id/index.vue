<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous">
    <div class="mb-2"><nuxt-link to="/proposals" class="is-size-7">&lt; All Proposals</nuxt-link></div>
    <div v-if="loading">Loading Proposal..</div>
    <div v-else-if="proposal" class="columns">
      <div class="column is-two-thirds">
        <div class="is-pulled-right"><span class="tag" :class="{'is-success': proposal.status == 'ACTIVE', 'is-warning': proposal.status == 'DRAFT', 'is-link': proposal.status == 'PENDING', 'is-dark': proposal.status == 'CLOSED'}">{{ proposal.status }}</span></div>
        <div v-if="proposal.title" class="title is-4">{{proposal.title}}</div>
        <div v-else class="title is-4">...</div>
        <div class="subtitle is-6"><b>{{ categories[proposal.category] }}</b></div>
        <small>
          <div v-if="proposal.body" v-html="$md.render(proposal.body)" />
          <div v-else>Loading content..</div>
        </small>
        <div class="box mt-5">
          <h4 class="box-title">Attachments</h4>
          <table class="table" v-if="proposal.files">
            <tbody v-if="proposal.files.length > 0">
            <tr v-for="file in proposal.files" :key="file.Hash">
              <td><a :href="ipfsExplorer + '/ipfs/' + file.Hash" target="_blank">{{ file.Name }}</a></td>
              <td>{{ file.Size | formatBytes }}</td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
              <td colspan="2">No files attached</td>
            </tr>
            </tbody>
          </table>
          <div v-else>Loading attachments..</div>
        </div>
        <div class="box mt-5">
          <h5 class="box-title">Cast your vote</h5>
          <div v-if="myVote">
            <b>Current Vote {{myVote.voter}}:</b> {{voteTypes.find((vt) => vt.value === myVote.type).name}} - {{myVote.weight}}
          </div>
          <div class="columns">
            <div class="control column" v-for="voteType in voteTypes" :key="voteType.value">
              <button class="button is-fullwidth" @click.prevent="vote_type = voteType.value" :class="{'is-dark': voteType.value === 0, 'is-danger': voteType.value === 2, 'is-success': voteType.value === 1, 'is-outlined': vote_type !== voteType.value}">
                <span class="icon">
                  <i class="fas" :class="{'fa-sticky-note': voteType.value === 0, 'fa-times': voteType.value === 2, 'fa-check': voteType.value === 1}"></i>
                </span>
                <span>{{voteType.name}}</span>
              </button>
            </div>
          </div>
          <div>
            <button class="button is-primary is-fullwidth" @click.prevent="vote" :disabled="!votes || vote_type === null || !wallet || !wallet.auth">Vote</button>
          </div>
        </div>
        <div class="box mt-5">
          <h5 class="box-title">Votes</h5>
          <div v-if="votes && votes.length">
            <div class="columns is-vcentered is-mobile" v-for="vote in votes" :key="vote.id" >
              <div class="column is-4">
                <div class="is-flex is-align-items-center">
                  <div class="image is-32x32 is-rounded mr-2">
                    <avatar :account-name="vote.voter" />
                  </div>
                  <span>{{vote.voter}}</span>
                </div>
              </div>
              <div class="column is-4 has-text-centered">
                <b :class="{'has-text-success': vote.type === 1, 'has-text-danger': vote.type === 2}">{{voteTypes.find((vt) => vt.value === vote.type).name}}</b>
              </div>
              <div class="column is-4 has-text-centered">
                <b>{{vote.weight}}</b>
              </div>
            </div>
          </div>
          <div class="has-text-centered" v-else-if="votes">No votes yet</div>
          <div class="has-text-centered" v-else>Loading votes..</div>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="box">
          <h5 class="box-title">Information</h5>
          <div class="block">
              <i>author</i><br>
              <nuxt-link :to="'/account/'+proposal.author"><b>{{proposal.author}}</b></nuxt-link>
          </div>
          <div class="block" v-for="(pay, index) in proposal.pay" :key="index">
            <i>requesting</i><br>
            <b>{{ pay.field_0.quantity }}</b><br>
            <i v-if="false">requestable</i>
            <b v-if="false">{{ $moment(pay.field_1 + "Z").fromNow()}}</b>
          </div>
          <div class="block">
            IPFS Hash
            <div class="hash"><a target="_blank" :href="`${ipfsExplorer}/ipfs/${proposal.content_hash}`">{{ proposal.content_hash }}</a></div>
          </div>
          <div v-if="isMyProposal" class="mt-2"><nuxt-link class="button is-primary is-fullwidth" :to="`/proposals/${id}/edit`"><b>Edit</b></nuxt-link> </div>
          <div v-if="isMyProposal && $dao.proposalConfig && proposal.cycle === 0" class="mt-2"><button class="button is-primary is-outlined is-fullwidth" @click.prevent="assignToNextCycle()"><b>Assign to next cycle</b></button> </div>
        </div>
        <div class="box">
          <h5 class="box-title">Results</h5>
          <div class="columns is-vcentered is-mobile" v-for="result in voteResults" :key="result.type" >
            <div class="column is-4">
              <b :class="{'has-text-success': result.type === 1, 'has-text-danger': result.type === 2}">{{voteTypes.find((vt) => vt.value == result.type).name}}</b>
            </div>
            <div class="column is-6">
              <small># votes: </small> <span>{{result.votes}}</span>
            </div>
            <div class="column is-2">
              <b>{{result.weight}}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 v-else class="has-text-centered">Could not retrieve proposal</h4>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ipfsExplorer: process.env.ipfsExplorer,
      loading: false,
      proposal: null,
      id: this.$route.params.id,
      vote_type: null,
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
      return this.$dao.proposalConfig ? this.$dao.proposalConfig.currentCycle : null
    }
  },

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

  watch: {
    currentCycle () {
      this.getProposal(this.id)
    }
  },

  created () {
    this.getProposal(this.id)
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
              return false
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
          this.loading = false
          let status = 'CLOSED'
          if (this.proposal.state === 0) {
            if (!this.proposal.cycle) {
              status = 'DRAFT'
            } else if (this.proposal.cycle === this.currentCycle) {
              status = 'ACTIVE'
            } else {
              status = 'PENDING'
            }
          }
          this.$set(this.proposal, 'status', status)
          console.log(this.proposal)
          const ipfsProposal = await this.$dao.getIpfsProposal(this.proposal.content_hash)
          this.$set(this.proposal, 'title', ipfsProposal.title)
          this.$set(this.proposal, 'body', ipfsProposal.body)
          this.$set(this.proposal, 'files', ipfsProposal.files ? ipfsProposal.files : [])
          await this.getVotes(parseInt(id))
        } catch (e) {
          console.log(e)
        }
        this.loading = false
      }
    },
    async getVotes (id) {
      this.loading = true
      if (this.$dao.proposalConfig) {
        try {
          const config = {
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            index_position: 4,
            key_type: 'i64',
            limit: 100,
            lower_bound: id,
            upper_bound: id + 1
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
            persistent: true,
            text: 'Your vote for the proposal is sent!',
            cancel: false,
            onConfirm: () => {
              this.getProposal(this.id)
              return false
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
</style>
