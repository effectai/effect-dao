<template>
  <div>
    <div class="box">
      <h4 class="box-title">New Proposal</h4>
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
                <input v-model="proposal.reward" class="input" type="number" min="0" placeholder="100">
                <span class="icon is-small is-right">
                  EFX
                </span>
              </div>
            </div>
          </div>
          <div class="column is-one-third">
            <div class="field">
              <label class="label">Type</label>
              <div class="control">
                <div class="select" style="width: 100%">
                  <select v-model="proposal.type" required style="width: 100%">
                    <option value="worker">Worker Proposal</option>
                    <option value="governance" disabled>Governance Proposal</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <nuxt-link class="button is-light" to="/proposals">Cancel</nuxt-link>
          </div>
          <div class="control">
            <button type="submit" class="button is-primary is-wide" :class="{'is-loading': loading}" :disabledtodo="!loggedIn">Save Proposal</button>
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
  data () {
    return {
      ipfsExplorer: process.env.ipfsExplorer,
      loading: false,
      uploadingFile: false,
      selectedFile: null,
      preview: false,
      proposalIpfs: {
        version: 1,
        title: '',
        body: '',
        files: []
      },
      proposal: {
        hash: null,
        type: 'worker',
        reward: 0
      },
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
      this.loading = true
      const blob = new Blob([JSON.stringify(this.proposalIpfs)], { type: 'text/json' })
      const formData = new FormData()
      formData.append('file', blob)
      try {
        const response = await fetch(`${process.env.ipfsNode}/api/v0/add?pin=true`,
          {
            method: 'POST',
            body: formData
          })
        const proposal = await response.json()
        console.log(proposal)
        this.proposal.hash = proposal.Hash
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    },
    async uploadFile () {
      if (this.selectedFile) {
        this.uploadingFile = true
        const formData = new FormData()
        formData.append('file', this.selectedFile)
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
        this.uploadingFile = false
      }
    },
    removeFile (file) {
      this.proposalIpfs.files.splice(this.proposalIpfs.files.indexOf(file), 1)
    },
    async createProposal () {
      this.loading = true
      await this.uploadProposal()
      if (this.proposal.hash) {
        // TODO: upload to blockchain
        console.log('TODO: upload to blockchain')
      }
      this.loading = false
    },
    // Helper method that generates JSON for string comparison
    formDataForComparison () {
      return JSON.stringify(this.proposal)
    },
    checkClose (event) {
      if (this.hasChanged) {
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
