<template>
  <div>
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
          <div>
            <button class="button is-primary is-fullwidth" disabled="disabled">Vote</button>
          </div>
        </div>
        <div class="box mt-5">
          <h5 class="box-title">Votes</h5>
          <div class="has-text-centered">No votes yet</div>
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
            <i>requestable</i>
            <b>{{ $moment(pay.field_1 + "Z").fromNow()}}</b>
          </div>
          <div class="block">
            IPFS Hash
            <div class="hash"><a target="_blank" :href="`${ipfsExplorer}/ipfs/${proposal.content_hash}`">{{ proposal.content_hash }}</a></div>
          </div>
          <div v-if="myProposal" class="mt-2"><nuxt-link class="button is-primary is-fullwidth" :to="`/proposals/${id}/edit`"><b>Edit</b></nuxt-link> </div>
          <div v-if="myProposal && $dao.proposalConfig && proposal.cycle === 0" class="mt-2"><button class="button is-primary is-outlined is-fullwidth" @click.prevent="assignToNextCycle()"><b>Assign to next cycle</b></button> </div>
        </div>
        <div class="box">
          <h5 class="box-title">Results</h5>
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
      categories: {
        0: 'Governance Proposal',
        1: 'Funding Proposal'
      }
    }
  },

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    },
    myProposal () {
      return this.proposal && this.wallet && this.wallet.auth && this.wallet.auth.accountName === this.proposal.author
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
          const ipfsProposal = await this.$dao.getIpfsProposal(this.proposal.content_hash)
          this.$set(this.proposal, 'title', ipfsProposal.title)
          this.$set(this.proposal, 'body', ipfsProposal.body)
          this.$set(this.proposal, 'files', ipfsProposal.files ? ipfsProposal.files : [])
        } catch (e) {
          console.log(e)
        }
        this.loading = false
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
