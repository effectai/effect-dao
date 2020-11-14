<template>
  <div>
    <div v-if="isTestnet" class="testnet">
      Connected to Kylin testnet ({{ node }})
    </div>
    <NavBar />
    <div class="container is-max-widescreen content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components: {
    NavBar
  },

  data () {
    return {
      isTestnet: process.env.eosNodeUrl.includes('kylin'),
      node: process.env.eosNodeUrl
    }
  }
}
</script>

<style>
  .content {
    margin-top: 20px;
  }

  .testnet {
    background: #f4bf55;
    font-weight: bold;
    text-align: center;
  }
</style>
