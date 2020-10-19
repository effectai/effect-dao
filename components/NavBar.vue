<template>
  <div>
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="container is-max-widescreen">
        <div class="navbar-start">
          <a class="navbar-item navbar-title" href="#">
            <img src="@/assets/img/logo.png" class="logo">
            Effect Dashboard
          </a>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <nuxt-link class="navbar-item" to="/" exact-active-class="is-active">
            Home
          </nuxt-link>

          <nuxt-link class="navbar-item" to="/stake" exact-active-class="is-active">
            Stake
          </nuxt-link>

          <a class="navbar-item">
            Vote
          </a>

          <a class="navbar-item">
            DAO
          </a>

          <a class="navbar-item">
            Galaxy Pool
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <ConnectWallet v-if="!wallet || !wallet.connected" />
              <a v-else class="button is-primary" @click="walletModal = true">
                <strong>{{ wallet.auth.accountName }}</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="wallet && wallet.connected && walletModal">
      <div class="modal is-active">
        <div class="modal-background" />

        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              {{ wallet.auth.accountName }}
            </p>
            <button class="delete" aria-label="close" @click="walletModal = false" />
          </header>
          <section class="modal-card-body">
            <button class="button is-medium is-fullwidth is-danger" :class="{ 'is-loading': loading }" @click="logout()">
              Disconnect
            </button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConnectWallet from '@/components/ConnectWallet'

export default {
  components: {
    ConnectWallet
  },

  data () {
    return {
      walletModal: false,
      loading: false
    }
  },

  computed: {
    wallet () {
      return (this.$transit) ? this.$transit.wallet : null
    }
  },

  methods: {
    async logout () {
      this.loading = true
      await this.$transit.logout()
      this.loading = false
      this.walletModal = false
    }
  }
}
</script>

<style lang="scss">
  .navbar {
    background: transparent;
    margin-top: 8px;

    .navbar-title {
      min-width: 100px;
      font-weight: 700;
      font-size: 18px;
      .logo {
        height: 35px;
        max-width: none;
        max-height: none;
        margin-right: 8px;
      }
      &:hover {
        color: inherit;
      }
    }

    .navbar-menu {
      margin-top: 2px;
      justify-content: center;
      .navbar-item {
        font-weight: 700;
        &.is-active {
          color: #00d1b2;
        }
      }
    }

    .navbar-end {
      margin-top: 2px;
    }
  }

  .modal-card {
    max-width: 500px;
  }
</style>
