<template>
  <div>
    <div class="box">
      <h4 class="box-title">New Proposal</h4>
      <form @submit.prevent="createProposal">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="proposal.title" required class="input" type="text" placeholder="My Proposal Title">
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea rows="10" required v-model="proposal.description" class="textarea" placeholder="Your Proposal Content"></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">URL</label>
          <div class="control">
            <input v-model="proposal.url" class="input" type="url" placeholder="https://..">
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Reward</label>
              <div class="control has-icons-right">
                <input v-model="proposal.reward" class="input" type="number" placeholder="100">
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      proposal: {
        title: '',
        description: '',
        type: 'worker',
        url: '',
        reward: 0
      },
      cachedFormData: null
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
    async createProposal () {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))
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
