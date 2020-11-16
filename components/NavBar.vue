<template>
  <div>
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="container is-max-widescreen">
        <div class="navbar-start">
          <nuxt-link class="navbar-item navbar-item navbar-title" to="/">
            <img src="@/assets/img/logo.png" class="logo">
            <span class="top-title"><span class="has-text-weight-normal">Effect</span>&nbsp;<b class="has-text-weight-bold">Dashboard</b></span>
          </nuxt-link>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            @click="mobileMenu = !mobileMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': mobileMenu}">
          <div @click="mobileMenu = false">
            <nuxt-link class="navbar-item" to="/" exact-active-class="is-active">
              Home
            </nuxt-link>
          </div>
          <div @click="mobileMenu = false">
            <nuxt-link class="navbar-item" to="/stake" exact-active-class="is-active">
              Stake
            </nuxt-link>
          </div>
          <div @click="mobileMenu = false">
            <nuxt-link class="navbar-item" to="/vote" exact-active-class="is-active">
              Vote
            </nuxt-link>
          </div>
          <div @click="mobileMenu = false">
            <nuxt-link class="navbar-item" to="/dao" exact-active-class="is-active">
              DAO
            </nuxt-link>
          </div>
          <div @click="mobileMenu = false">
            <nuxt-link class="navbar-item" to="/token" exact-active-class="is-active">
              Token Map
            </nuxt-link>
          </div>

          <a class="navbar-item connect-wallet mobile-connect" @click="mobileMenu = false">
            <ConnectWallet v-if="!wallet" />
            <a v-else class="button is-primary" @click="walletModal = true">
              <strong>{{ wallet.auth.accountName }}</strong>
            </a>
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons wallet">
              <ConnectWallet v-if="!wallet" />
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
            <figure class="image is-128x128 avatar mb-5">
              <img class="is-rounded" :src="`https://avatar.pixeos.art/avatar/${wallet.auth.accountName}`" @error="fallbackAvatar">
            </figure>
            <a href="https://avatar.pixeos.art/" target="_blank">
              <button class="button is-medium is-fullwidth is-primary mb-3">
                Edit avatar
              </button>
            </a>
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
      loading: false,
      mobileMenu: false
    }
  },

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    }
  },

  methods: {
    fallbackAvatar (event) {
      event.target.src = `https://ui-avatars.com/api/?name=${this.wallet.auth.accountName}&size=128`
    },

    logout () {
      this.loading = true
      this.$transit.logout()
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

    .navbar-burger.burger {
      margin-top: -48px;
    }

    .mobile-connect {
      display: none;
      margin-bottom: -50px;
      margin-top: 12px;
    }

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
        &:after {
          display:block;
          width:0;
          height:2px;
          position: absolute;
          transition: width 0.5s;
          bottom: 20px;
          background: $accent;
          content: "";
        }
        &.is-active {
          color: $primary;
          &:after {
            width: calc(100% - 1.5rem);
          }
        }
      }
    }

    .navbar-end {
      margin-top: 2px;
    }
    @media all and (max-width: 1024px) {
      .top-title {
        display: block;
        margin-top: -39px;
        margin-left: 40px;
      }

      .navbar-end {
        display: none;
      }

      .mobile-connect {
        display: block;
      }

      .navbar-menu {
        .navbar-item {
          &:after {
            display:none;
          }
        }
      }
    }
  }

  .modal-card {
    max-width: 500px;
  }

  .avatar {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>
