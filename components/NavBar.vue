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
            <nuxt-link class="navbar-item" to="/proposals" exact-active-class="is-active">
              Proposals
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
            <a v-if="!wallet" class="button is-primary" @click="$wallet.loginModal = true">
              <strong>Connect Wallet</strong>
            </a>
            <nuxt-link v-else class="button is-primary" :to="'/account/'+wallet.auth.accountName">
              <strong>{{ wallet.auth.accountName }}</strong>
            </nuxt-link>
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons wallet">
              <a v-if="!wallet" class="button is-primary" @click="$wallet.loginModal = true">
                <strong>Connect Wallet</strong>
              </a>
              <nuxt-link v-else class="button is-primary" :to="'/account/'+wallet.auth.accountName">
                <strong>{{ wallet.auth.accountName }}</strong>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      mobileMenu: false
    }
  },

  computed: {
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
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
          bottom: 10px;
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
    @media all and (max-width: 828px) {
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
            display: none;
          }
        }
      }
    }
  }
</style>
