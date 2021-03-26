<template>
  <div>
    <div class="box">
      <h4 class="box-title subtitle">New Proposal</h4>
      <form @submit.prevent="createProposal">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="proposalIpfs.title" required class="input" type="text" placeholder="My Proposal Title">
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="tabs" style="margin-bottom: 0">
            <ul>
              <li :class="{'is-active': !preview}"><a @click.prevent="preview = false">Edit</a></li>
              <li :class="{'is-active': preview}"><a @click.prevent="preview = true">Preview</a></li>
            </ul>
          </div>
          <div v-if="preview" class="p-2">
            <div v-html="$md.render(proposalIpfs.body)" />
          </div>
          <div class="control" v-else>
            <vue-simplemde required v-model="proposalIpfs.body" ref="markdownEditor" :configs="{promptURLs: true, spellChecker: false}" />
          </div>
        </div>

        <div class="field">
          <label class="label">Attachments</label>
          <div class="control">
            <div class="file has-name is-fullwidth">
              <label class="file-label">
                <input class="file-input" type="file" id="file" ref="file" @change="getSelectedFile">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                <span class="file-name">
                  <span v-if="selectedFile">{{selectedFile.name}}</span>
                </span>
                <span>
                  <button :class="{'is-loading': uploadingFile}" :disabled="!selectedFile" @click.prevent="uploadFile" class="button is-primary">Upload File</button>
                </span>
              </label>
            </div>
          </div>
          <table class="table">
            <tbody v-if="proposalIpfs.files.length > 0">
              <tr v-for="file in proposalIpfs.files" :key="file.Hash">
                <td><a :href="ipfsExplorer + '/ipfs/' + file.Hash" target="_blank">{{ file.Name }}</a></td>
                <td>{{ file.Size | formatBytes }}</td>
                <td class="has-text-right"><button @click.prevent="removeFile(file)" class="button is-danger is-small">Remove</button></td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3">No files uploaded</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Reward</label>
              <div class="control has-icons-right">
                <input
                  v-model="proposal.reward"
                  class="input"
                  step="0.0001"
                  type="number"
                  min="0"
                  placeholder="100">
                <span class="icon is-small is-right">
                  EFX
                </span>
              </div>
            </div>
          </div>
          <div class="column is-one-third">
            <div class="field">
              <label class="label">Category</label>
              <div class="control">
                <div class="select" style="width: 100%">
                  <select v-model="proposal.category" required style="width: 100%">
                    <option :value="0" disabled>Governance Proposal</option>
                    <option :value="1">Marketing</option>
                    <option :value="2">Design</option>
                    <option :value="3">Technical</option>
                    <option :value="4">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="has-text-centered" v-show="false" >
          <button class="button is-outlined is-small" disabled @click.prevent="">+ Add another reward</button>
          <div><small class="is-size-7"><i>coming soon</i></small></div>
        </div>

        <fieldset v-show="false" class="collapsible" :class="{'is-expanded': advanced}">
          <legend class="has-text-weight-bold"><a @click.prevent="advanced = !advanced">Advanced</a></legend>
          <div class="field">
            <label class="label">Cycle</label>
            <div class="control">
              <input required class="input" v-model="proposal.cycle" type="number" min="0">
            </div>
          </div>
        </fieldset>

        <div class="field is-grouped is-grouped-right mt-4">
          <div class="control">
            <nuxt-link class="button is-light" to="/proposals">Cancel</nuxt-link>
          </div>
          <div class="control">
            <button type="submit" class="button is-secondary is-wide" :class="{'is-loading': loading}" :disabled="!loggedIn">Save Proposal</button>
            <div><small><i>Proposal Cost: <span v-if="$dao.proposalConfig">{{$dao.proposalConfig.proposal_cost.quantity}}</span><span v-else>...</span></i></small></div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde'

export default {
  components: {
    VueSimplemde
  },
  middleware: ['authenticated'],
  data () {
    let proposal = window.localStorage.getItem('cached_proposal')
    let proposalIpfs = window.localStorage.getItem('cached_proposalIpfs')
    if (proposal) {
      proposal = JSON.parse(proposal)
    } else {
      proposal = {
        content_hash: null,
        category: 1,
        reward: 0,
        cycle: 0
      }
    }
    if (proposalIpfs) {
      proposalIpfs = JSON.parse(proposalIpfs)
    } else {
      proposalIpfs = {
        version: 1,
        title: '',
        body: '> You can use this template as a starting point. Make sure to include as much information about your proposal in this description\n' +
          '\n' +
          '### Summary\n' +
          'insert a short summary including the goal of your proposal\n' +
          '\n' +
          '### Proposal Details\n' +
          'insert a detailed description of your proposal and what it entails\n' +
          '\n' +
          '### Scope\n' +
          'Describe the scope of your proposal. Make sure to scope your proposal. If it is too big, consider multiple proposals with smaller scopes\n' +
          '\n' +
          '### Budget Overview\n' +
          'Insert a detailed overview of your budget here:\n' +
          '| Service | Description | Costs |\n' +
          '| -------- | -------- | -------- |\n' +
          '| Example Service 1 | Description of your example service 1 | ... EFX   |\n' +
          '| Example Service 2 | Description of your example service 2 | ... EFX   |\n' +
          '\n' +
          '### Deliverables\n' +
          'Specify a detailed and scoped list of deliverables for this proposal\n' +
          '\n' +
          '### Timeline\n' +
          'Specify your timeline of the different deliverables here',
        files: []
      }
    }
    return {
      advanced: false,
      success: false,
      ipfsExplorer: process.env.ipfsExplorer,
      loading: false,
      uploadingFile: false,
      selectedFile: null,
      preview: false,
      proposalIpfs,
      proposal,
      cachedFormData: null
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

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    },
    loggedIn () {
      return this.wallet && this.wallet.auth
    },
    // Compares cached user data to live data
    hasChanged () {
      return this.cachedFormData !== this.formDataForComparison()
    }
  },

  watch: {
    proposal: {
      deep: true,
      handler: (proposal) => {
        console.log('caching proposal..')
        window.localStorage.setItem('cached_proposal', JSON.stringify(proposal))
      }
    },
    proposalIpfs: {
      deep: true,
      handler: (proposalIpfs) => {
        console.log('caching proposalIpfs..')
        window.localStorage.setItem('cached_proposalIpfs', JSON.stringify(proposalIpfs))
      }
    }
  },

  created () {
    // eslint-disable-next-line
    window.addEventListener('beforeunload', this.checkClose)
    this.cachedFormData = this.formDataForComparison()
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.checkClose)
  },

  beforeRouteLeave (to, from, next) {
    if (this.checkClose()) {
      next()
    }
  },

  methods: {
    getSelectedFile () {
      this.selectedFile = this.$refs.file.files[0]
    },
    async uploadProposal () {
      if (this.proposalIpfs.body && this.proposalIpfs.title) {
        const blob = new Blob([JSON.stringify(this.proposalIpfs)], { type: 'text/json' })
        const formData = new FormData()
        formData.append('file', blob)
        if (blob.size > 10000000) {
          // TODO: replace with error notification
          alert('Max file size allowed is 10 MB')
          this.proposal.content_hash = null
        } else {
          try {
            const response = await fetch(`${process.env.ipfsNode}/api/v0/add?pin=true`,
              {
                method: 'POST',
                body: formData
              })
            const proposal = await response.json()
            console.log(proposal)
            this.proposal.content_hash = proposal.Hash
          } catch (e) {
            this.proposal.content_hash = null
            console.log(e)
          }
        }
      }
    },
    async uploadFile () {
      if (this.selectedFile) {
        this.uploadingFile = true
        const formData = new FormData()
        formData.append('file', this.selectedFile)
        if (this.selectedFile.size > 10000000) {
          // TODO: replace with error notification
          alert('Max file size allowed is 10 MB')
          this.selectedFile = null
          this.$refs.file.value = ''
        } else {
          try {
            const response = await fetch(`${process.env.ipfsNode}/api/v0/add?pin=true`,
              {
                method: 'POST',
                body: formData
              })
            const file = await response.json()
            this.proposalIpfs.files.push(file)
            this.selectedFile = null
            this.$refs.file.value = ''
          } catch (e) {
            console.log(e)
          }
        }
        this.uploadingFile = false
      }
    },
    removeFile (file) {
      this.proposalIpfs.files.splice(this.proposalIpfs.files.indexOf(file), 1)
    },
    async createProposal () {
      this.loading = true
      await this.uploadProposal()
      if (this.proposal.content_hash) {
        const payoutTime = new Date()
        // payoutTime.setDate(payoutTime.getDate() + 14)
        const actions = []
        const addPayment = true
        if (addPayment) {
          actions.push({
            account: this.$dao.proposalConfig.proposal_cost.contract,
            name: 'transfer',
            authorization: [{
              actor: this.wallet.auth.accountName,
              permission: this.wallet.auth.permission
            }],
            data: {
              from: this.wallet.auth.accountName,
              to: process.env.proposalContract,
              quantity: this.$dao.proposalConfig.proposal_cost.quantity,
              memo: 'proposal'
            }
          })
        }
        actions.push(
          {
            account: process.env.proposalContract,
            name: 'createprop',
            authorization: [{
              actor: this.wallet.auth.accountName,
              permission: this.wallet.auth.permission
            }],
            data: {
              author: this.wallet.auth.accountName,
              pay: [
                {
                  field_0: {
                    quantity: Number.parseFloat(this.proposal.reward).toFixed(4) + ' ' + process.env.efxToken,
                    contract: process.env.tokenContract
                  },
                  field_1: payoutTime.toISOString().slice(0, -1)
                }],
              content_hash: this.proposal.content_hash,
              category: parseInt(this.proposal.category),
              cycle: parseInt(this.proposal.cycle),
              transaction_hash: null
            }
          }
        )
        try {
          await this.$wallet.handleTransaction(actions)
          this.success = true
          this.$modal.show({
            color: 'success',
            title: 'Transaction Sent',
            persistent: true,
            text: 'Your Proposal Creation Transaction was sent! It might take a couple of minutes before your proposals shows up.',
            cancel: false,
            onConfirm: () => {
              this.$router.push({
                path: '/proposals'
              })
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
      this.loading = false
    },
    // Helper method that generates JSON for string comparison
    formDataForComparison () {
      return JSON.stringify({ proposal: this.proposal, proposalIpfs: this.proposalIpfs })
    },
    checkClose (event) {
      if (this.hasChanged && !this.loading && !this.success) {
        const warningMessage = 'You have unsaved changes. Are you sure you wish to leave?'
        if (!confirm(warningMessage)) {
          event.preventDefault()
          event.returnValue = warningMessage
          return false
        }
        return true
      }
      return true
    }
  }
}
</script>

<style lang="scss">
  /*@import '~simplemde/dist/simplemde.min.css';*/
  .CodeMirror {
    pre {
      margin-bottom: 0 !important;
    }
  }
  .editor-toolbar.fullscreen, .CodeMirror-fullscreen, .editor-preview-side {
    z-index: 50
  }
</style>
