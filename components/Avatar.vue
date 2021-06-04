<template>
  <img :src="`https://avatar.pixeos.art/avatar/${this.accountName}`" @error="((evt) => fallbackAvatar(evt))">
</template>

<script>
export default {
  props: {
    accountName: {
      type: String,
      required: true
    }
  },

  methods: {
    // TODO add identicon here.
    fallbackAvatar (event) {
      event.target.src = `https://ui-avatars.com/api/?name=${this.accountName}&size=100`
    }
  }
}
</script>
