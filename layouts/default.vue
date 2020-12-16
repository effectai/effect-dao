<template>
  <div>
    <div v-if="isTestnet" class="testnet">
      Connected to Kylin testnet ({{ node }})
    </div>
    <div class="discord">
      <div class="container is-max-widescreen">
        <img src="@/assets/img/discord.png" alt="Discord logo">
        <p class="is-hidden-mobile">
          The DAO Discord is now open with
          <b>
            <span v-if="discordMembersOnline">{{ discordMembersOnline }}</span><span v-else>..</span> members
          </b> online!
        </p>
        <p class="is-hidden-desktop">
          The DAO Discord is now open!
        </p>
        <a :href="discordUrl" target="_blank">
          <button class="discord-btn">
            Join
          </button>
        </a>
      </div>
    </div>
    <modal />
    <connect-wallet />

    <div v-if="transaction" class="notification is-success global-notification">
      <button class="delete" @click="clearTransaction" />
      <b>Transaction successful!</b><br>
      <a :href="`${explorerUrl}/transaction/${transaction.transaction_id}`" target="_blank">View on bloks.io</a>
    </div>

    <div v-else-if="transactionError" class="notification is-danger global-notification">
      <button class="delete" @click="clearTransaction" />
      <b>Transaction error</b><br>
      {{ transactionError }}
    </div>

    <nav-bar />
    <div class="container is-max-desktop content">
      <nuxt />
    </div>
    <foot />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Foot from '@/components/Footer'
import ConnectWallet from '@/components/ConnectWallet'

export default {
  components: {
    NavBar,
    Foot,
    ConnectWallet
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
    },

    discordUrl () {
      return process.env.discordInviteUrl
    },

    discordMembersOnline () {
      return this.$dao.discordMembersOnline
    }
  },

  methods: {
    clearTransaction () {
      this.$wallet.clearTransaction()
    }
  }
}
</script>

<style lang="scss">
.content {
  margin-top: 20px;
}

.testnet {
  background: #f4bf55;
  font-weight: bold;
  text-align: center;
}

.discord {
  background: #7289da;
  color: #FFF;
  height: 30px;

  img {
    height: 26px;
    margin-top: 2px;
    float: left;
    margin-left: 12px;
  }

  p {
    margin-top: 2px;
    margin-left: 8px;
    display: inline-block;
  }

  button {
    float: right;
    border: 1px solid #6575b5;
    border-radius: 4px;
    background: #3d476e;
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
    padding: 3px 10px;
    margin-top: 2px;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}

.global-notification {
  width: 300px;
  position: absolute;
  right: 20px;
  z-index: 9999;
  top: 20px;
}
</style>
