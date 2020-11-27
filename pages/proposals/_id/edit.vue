<template>
  <div>
    <div class="box">
      <h4 class="box-title">Edit Proposal</h4>
      <h5 v-if="loadingProposal" class="has-text-centered">Loading proposal..</h5>
      <form @submit.prevent="saveProposal" v-else-if="proposal">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="proposal.title" required class="input" type="text" placeholder="My Proposal Title">
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
            <div v-html="$md.render(proposal.body)" />
          </div>
          <div class="control" v-else>
            <vue-simplemde required v-model="proposal.body" ref="markdownEditor" :configs="{promptURLs: true, spellChecker: false}" />
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
                    <i class="fas fa-upload"></i>
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
            <tbody v-if="proposal.files.length > 0">
            <tr v-for="file in proposal.files" :key="file.name">
              <td>{{ file.name }}</td>
              <td>{{ file.size | formatBytes }}</td>
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
            <button type="submit" class="button is-primary is-wide" :class="{'is-loading': loading}" :disabled="!loggedIn">Save Proposal</button>
          </div>
        </div>
      </form>
      <h5 v-else class="has-text-centered">Could not retrieve proposal</h5>
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
      id: this.$route.params.id,
      preview: false,
      loading: false,
      loadingProposal: false,
      uploadingFile: false,
      selectedFile: null,
      removedFiles: [],
      proposal: null,
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

  async created () {
    this.proposal = await this.getProposal(this.id)
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
    async getProposal (id) {
      this.loadingProposal = true
      let proposal
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        proposal = {
          title: 'My Proposal',
          body: 'This is my proposal',
          type: 'worker',
          files: [],
          reward: 3000
        }
      } catch (e) {
        console.log(e)
      }
      this.loadingProposal = false
      return proposal
    },
    getSelectedFile () {
      this.selectedFile = this.$refs.file.files[0]
    },
    async uploadFile () {
      if (this.selectedFile) {
        this.uploadingFile = true
        const formData = new FormData()
        formData.append('file', this.selectedFile)
        try {
          await new Promise(resolve => setTimeout(resolve, 1500))
          // axios.post( '/single-file',
          //   formData,
          //   {
          //     headers: {
          //       'Content-Type': 'multipart/form-data'
          //     }
          //   }
          // )
          console.log(this.selectedFile)
          this.proposal.files.push(this.selectedFile)
          this.selectedFile = null
          this.$refs.file.value = ''
        } catch (e) {
          console.log(e)
        }
        this.uploadingFile = false
      }
    },
    removeFile (file) {
      this.proposal.files.splice(this.proposal.files.indexOf(file), 1)
      this.removedFiles.push(file)
    },
    async saveProposalsaveProposal () {
      this.loading = true
      // this.id
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Remove files in removedFiles
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
