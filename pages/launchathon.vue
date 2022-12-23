<template>
  <div class="content">
    <div v-if="loading">
      Loading Proposal..
    </div>
    <div v-else-if="proposal" class="columns">
      <div class="column is-two-thirds">
        <div v-if="proposalComment !== undefined" class="message is-dark">
          <div class="message-header">
            High Guard Comment
          </div>
          <div class="message-body" v-html="proposalComment" />
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
          <h2>Launchathon Submissions</h2>
          <div v-for="submission in submissions" :key="submission.group_name">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="image is-32x32 media-left">
                    <avatar :account-name="submission.group_name" />
                  </div>
                  <div class="title is-3">
                    {{ submission.group_name }}
                  </div>
                </div>
                <hr>
                <div class="subtitle is-6">
                  {{ submission.description }}
                </div>
                <div v-if="submission.github_url">
                  <a :href="submission.github_url" target="_blank">🞄 GitHub</a>
                  <br>
                </div>
                <div v-if="submission.campaign_url">
                  <a :href="submission.campaign_url" target="_blank">🞄 Campaign</a>
                  <br>
                </div>
                <div v-if="submission.website">
                  <a :href="submission.website" target="_blank" rel="noopener noreferrer">🞄 Website</a>
                  <br>
                </div>
                <div v-if="submission.youtube_url">
                  <a :href="submission.youtube_url" target="_blank" rel="noopener noreferrer">🞄 YouTube</a>
                  <br>
                </div>
                <div v-if="submission.devpost">
                  <a :href="submission.devpost" target="_blank" rel="noopener noreferrer">🞄 Devpost</a>
                  <hr>
                </div>
                <hr>
                <button v-if="votes_list.find(v => v.id === submission.id)" disabled class="button is-centered is-fullwidth">
                  Added: #{{ votes_list.indexOf(votes_list.find(v => v.id === submission.id)) + 1 }}
                </button>
                <button v-else class="button is-centered is-primary is-fullwidth" @click="addVoteToList(submission)">
                  Add to VoteList
                </button>
              </div>
            </div>
            <br>
          </div>
        </div>

        <div class="box mt-5 has-text-centered">
          <h5>Selection List</h5>

          <ul>
            <li v-for="(item, index) of votes_list" :key="item.group_name">
              {{ index + 1 }} - {{ item.group_name }}
            </li>
          </ul>
          <button class="button is-warning" @click="clearVotesList()">
            Clear
          </button>
        </div>

        <div v-if="proposal.status === 'ACTIVE' || proposal.status === 'CLOSED'" class="box mt-5">
          <h5 class="box-title">
            Cast your vote
          </h5>

          <div v-if="proposalCycle" class="has-text-centered mb-4">
            <span v-if="$moment(proposalCycle.start_time + 'Z').add($dao.hackathonConfig.cycle_voting_duration_sec, 'seconds').isBefore()">
              Voting Closed
            </span>
            <span v-else>
              Voting ends {{ $moment(proposalCycle.start_time + "Z").add($dao.hackathonConfig.cycle_voting_duration_sec, 'seconds').fromNow() }}
            </span>
            <!--            <b>Current Vote {{ myVote.voter }}:</b> {{ voteTypes.find((vt) => vt.value === myVote.type).name }} - {{ myVote.weight }}-->
          </div>
          <div v-else-if="myVote && proposal.status === 'CLOSED'">
            <b>You voted {{ myVote.voter }}:</b> {{ voteTypes.find((vt) => vt.value === myVote.type).name }} - {{ myVote.weight }}
          </div>
          <div v-if="proposal.status === 'ACTIVE' && proposalCycle && $moment(proposalCycle.start_time + 'Z').add($dao.hackathonConfig.cycle_voting_duration_sec, 'seconds').isAfter()">
          </div>
          <div>
            <NuxtLink v-if="wallet && wallet.auth && !signedLastConstitution" to="/dao">
              <button class="button is-primary is-fullwidth">
                Sign new constitution
              </button>
            </NuxtLink>
            <button v-else class="button is-success is-outlined is-fullwidth" :disabled=" !wallet || !wallet.auth || wallet.nfxStillClaimable || $wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked) < 1 || this.votes_list.length < 7" @click="vote()">
              <span v-if="!wallet || !wallet.auth">Not connected to wallet</span>
              <span v-else-if="$wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked) < 1">No voting power</span>
              <span v-else-if="wallet.nfxStillClaimable">Claim NFX before you can vote</span>
              <span v-else>Vote</span>
              <span class="icon">
                <font-awesome-icon :icon="['fas', 'check']" />
              </span>
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
              <div class="column is-5">
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
              <div class="column is-2 has-text-centered" :data-tooltip="'Vote-weight: ' + vote.weight">
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

          <div class="block">
            IPFS Hash
            <div class="hash">
              <a target="_blank" :href="`${ipfsExplorer}/ipfs/${proposal.content_hash}`">{{ proposal.content_hash }}</a>
            </div>
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
          <div v-if="isMyProposal && $dao.hackathonConfig && proposal.cycle === 3" class="mt-2">
            <button class="button is-primary is-outlined is-fullwidth" @click.prevent="assignToNextCycle()">
              <b>Assign to next cycle</b>
            </button>
          </div>
        </div>
        <div class="box">
          <h5 class="box-title" :data-tooltip="'Total vote-weight: ' + this.totalVoteWeight">
            Results: {{ $wallet.formatNumber(this.totalVoteWeight) }}
          </h5>
          <div class="has-text-centered is-italic mt-4 is-size-7">
            Quorum: {{ this.quorum }}
          </div>
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
// import hackathon from '@/static/json/hackathon.json'
import launchathon from '@/static/json/launchathon.json'

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

const launchathonList = launchathon.submissions.sort((a, b) => Math.random() - 0.5)
shuffle(launchathonList)

// Load hackathon into hackathon.json
// console.log(`Hackathon Submissions${JSON.stringify(hackathon)}`)

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
      modalVisible: false,
      proposal: undefined,
      hideComment: true,
      proposalCycle: null,
      id: '2',
      cycle: 3,
      vote_type: null,
      comment: null,
      submissions: launchathonList,
      votes_list: [],
      voteTypes: [
        {
          value: 1,
          name: 'Y',
          fullName: 'Yes'
        },
        {
          value: 0,
          name: 'A',
          fullName: 'Abstain'
        },
        {
          value: 2,
          name: 'N',
          fullName: 'No'
        }
      ],
      votes: null,
      categories: {
        0: 'Governance Proposal',
        1: 'Hackathon'
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
      return this.$dao.hackathonConfig ? this.$dao.hackathonConfig.current_cycle : null
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
      // this.getProposal(0)
      // console.log('Current Cycle')
    }
  },

  created () {
    // this.proposal = proposal
    this.getProposal(this.id)
    // this.getQuorum()
    console.log('hackathonConfig', this.$dao.hackathonConfig)
  },

  methods: {
    async assignToNextCycle () {
      if (this.$dao.hackathonConfig && this.proposal) {
        const actions = [{
          account: process.env.votingContract,
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
            cycle: this.$dao.hackathonConfig.current_cycle + 1,
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
      if (!cycleNumber || cycleNumber.id === 0) {
        this.quorum = 0
      } else {
        const data = await this.$eos.rpc.get_table_rows({
          json: true, // optional ?
          code: process.env.votingContract,
          scope: process.env.votingContract,
          table: 'cycle',
          limit: 1,
          lower_bound: cycleNumber.id // This parameter is how we can query by id.
        })
        this.quorum = data.rows[0].quorum
      }
    },
    async getProposal (id) {
      this.loading = true
      if (this.$dao.hackathonConfig) {
        try {
          const data = await this.$eos.rpc.get_table_rows({
            code: process.env.votingContract,
            scope: process.env.votingContract,
            table: 'proposal',
            lower_bound: 0,
            limit: 100
          }).catch(error => console.error(`hackathon, getproposal error: ${error}`))
          // console.log(`getProposal::Data: ${JSON.stringify(data)}`)
          this.proposal = data.rows[parseInt(id)]
          // console.table(data)
          this.proposalCycle = await this.$dao.getHackathonCycleConfig(this.proposal.cycle)
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
            } else if (this.proposalCycle && this.proposal.cycle === this.$dao.hackathonConfig.current_cycle && this.$moment(this.proposalCycle.start_time + 'Z').add(this.$dao.hackathonConfig.cycle_voting_duration_sec, 'seconds').isAfter()) {
              status = 'ACTIVE'
            } else if (this.proposalCycle && this.$moment(this.proposalCycle.start_time + 'Z').add(this.$dao.hackathonConfig.cycle_voting_duration_sec, 'seconds').isBefore()) {
              status = 'PROCESSING'
            } else if (this.proposalCycle && this.proposalCycle.id < this.$dao.hackathonConfig.current_cycle) {
              status = 'PROCESSING'
            } else {
              status = 'PENDING'
            }
          }
          this.$set(this.proposal, 'status', status)
          const ipfsProposal = await this.$dao.getIpfsContent(this.proposal.content_hash)
          // console.log(`ipfsProposal: ${ipfsProposal}`)
          this.$set(this.proposal, 'title', ipfsProposal.title)
          this.$set(this.proposal, 'body', ipfsProposal.body)
          this.$set(this.proposal, 'files', ipfsProposal.files ? ipfsProposal.files : [])
          await this.getVotes(parseInt(this.id))
          await this.getQuorum(this.proposalCycle)
        } catch (e) {
          console.error('ERROR', e)
          this.$modal.show({
            color: 'danger',
            title: 'Error',
            persistent: true,
            text: e
          })
        }
        this.loading = false
      }
    },
    async createCommentHash () {
      if (this.comment == null || this.comment === '') { return null }
      this.comment = this.sanitize(this.comment)
      const blob = new Blob([JSON.stringify(this.comment)], { type: 'text/json' })
      const formData = new FormData()
      formData.append('file', blob)
      if (blob.size > 500) {
        this.$modal.show({
          color: 'danger',
          title: 'Error',
          persistent: true,
          text: 'Comment cannot contain more than 500 characters.'
        })
        this.modalVisible = true
      } else {
        try {
          const response = await fetch(`${process.env.ipfsNode}/api/v0/add?pin=true`,
            {
              method: 'POST',
              body: formData
            })
          const comment = await response.json()
          return comment.Hash
        } catch (e) {
          this.$modal.show({
            color: 'danger',
            title: 'Error',
            persistent: true,
            text: e
          })
          this.modalVisible = true
          return ''
        }
      }
    },
    sanitize (str) {
      const arr = str.trim().split(' ')
      return arr.filter(n => n).join(' ')
    },
    async getVotes (id) {
      // this.loading = true
      if (this.$dao.hackathonConfig) {
        try {
          const config = {
            code: process.env.votingContract,
            scope: process.env.votingContract,
            table: 'vote',
            index_position: 4,
            key_type: 'i64',
            limit: -1,
            lower_bound: id,
            upper_bound: id
          }
          // if (this.nextKey) {
          //   config.lower_bound = this.nextKey
          // }
          const data = await this.$eos.rpc.get_table_rows(config)
          this.moreVotes = data.more
          this.nextKey = data.next_key
          this.votes = data.rows
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
    async commentModal (vote) {
      if (vote.comment_hash != null) {
        const comment = await this.$dao.getIpfsContent(vote.comment_hash)
        this.$modal.show({
          color: 'default',
          title: `Comment | ${vote.voter}`,
          persistent: false,
          text: comment
        })
      }
    },
    mapList () {
      // const votePowerUser = this.$wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked)
      const commentList = this.votes_list.map((el) => {
        return el.id
      }).join(',')
      console.log(`CommentList: ${commentList}`)
      return commentList
    },
    async vote () {
      if (this.votes_list.length === 7) {
        // const hash = await this.createCommentHash()
        const actions = [{
          account: process.env.votingContract,
          name: 'addvote',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            voter: this.wallet.auth.accountName,
            prop_id: this.proposal.id,
            vote_type: 1,
            comment_hash: this.mapList()
          }
        }]
        try {
          if (!this.modalVisible) {
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
          }
          setTimeout(() => this.getVotes(this.id), 5e3)
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
    addVoteToList (submsission) {
      if (this.votes_list.length === 7) {
        alert('You can only choose 7 candidates, remember; the order matters.')
        return
      }
      if (!this.votes_list.includes(submsission)) {
        this.votes_list.push(submsission)
        // console.log(this.votes_list)
        this.mapList()
      }
    },
    clearVotesList () {
      this.votes_list = []
    }
  },
  head () {
    return {
      title: 'Proposal ' + this.id
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

  small {
    .comment-button {
    font-size: 0.7em;
    }
  }
  textarea {
    width: 100%;
  }
</style>
