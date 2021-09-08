<template>
  <span v-if="loading">Loading constitution..</span>
  <div v-else v-html="$md.render(constitution)" />
</template>

<script>
import { sha256 } from 'eosjs-ecc'

export default {

  components: {
  },

  data () {
    return {
      loading: false,
      constitution: '',
      constitutionHash: ''
    }
  },

  computed: {
  },

  beforeMount () {
    this.downloadConstitution()
  },

  methods: {
    async downloadConstitution () {
      this.loading = true
      await fetch(process.env.constitutionUrl)
        .then(data => data.text())
        .then((data) => {
          this.constitution = data
          this.constitutionHash = sha256(data)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
