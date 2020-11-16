<template>
  <div>
    <div v-if="transaction" class="notification is-primary global-notification">
      <button class="delete" @click="clearTransaction" />
      <b>Transaction successful!</b><br>
      <a :href="`${explorerUrl}/transaction/${transaction.transaction_id}`" target="_blank">View on bloks.io</a>
    </div>

    <div v-else-if="transactionError" class="notification is-danger global-notification">
      <button class="delete" @click="clearTransaction" />
      <b>Transaction error</b><br>
      {{ transactionError }}
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
  },

  computed: {
    transaction () {
      return this.$wallet.transaction
    },

    transactionError () {
      return this.$wallet.transactionError
    },

    explorerUrl () {
      return process.env.explorerUrl
    }
  },

  methods: {
    clearTransaction () {
      this.$wallet.clearTransaction()
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

  .global-notification {
    width: 300px;
    position: absolute;
    right: 20px;
    z-index: 9999;
    top: 20px;
  }
</style>
