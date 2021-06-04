<template>
  <div>
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="container is-max-widescreen">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item navbar-item navbar-title" to="/">
            <img src="@/assets/img/effect-dao_h100.png"  class="logo">
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
          <div class="navbar-start is-justify-content-center" style="width: 100%">
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
            <div @click="mobileMenu = false">
              <nuxt-link class="navbar-item" to="/distribution" exact-active-class="is-active">
                Rewards
              </nuxt-link>
            </div>
          </div>
          <div class="navbar-end">
              <div class="pt-0 navbar-item">
                <a v-if="!wallet" class="button is-secondary" @click="$wallet.loginModal = true">
                  <strong>Connect Wallet</strong>
                </a>
                <div v-else class="dropdown account-name-dropdown" :class="{'is-active': dropdown}">
                  <div class="dropdown-trigger" @click="dropdown = !dropdown">
                    <span>{{ wallet.auth.accountName }}</span>
                    <font-awesome-icon :icon="['fas', 'caret-square-down']" style="font-size: 12px" />
                  </div>
                  <div id="dropdown-menu" class="dropdown-menu" role="menu">
                    <div class="dropdown-content" @click="dropdown = false">
                      <nuxt-link class="dropdown-item" :to="`/account/${wallet.auth.accountName}`">
                        View Profile
                      </nuxt-link>
                      <hr class="dropdown-divider">
                      <a href="#" class="dropdown-item" @click="$transit.logout()">
                        Disconnect
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      loading: false,
      mobileMenu: false,
      dropdown: false
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

  .navbar-title {
    min-width: 100px;
    font-weight: 700;
    font-size: 18px;

    .logo {
      height: 45px;
      max-width: none;
      max-height: none;
      margin-right: 8px;
    }

    &:hover {
      color: inherit;
    }
  }

  .account-name-dropdown {
    font-weight: bold;
    border: 1px solid #d6d7db;
    border-radius: 4px;
    padding: 4px;
    user-select: none;
    &:hover {
      cursor: pointer;
    }

    .image {
      float: left;
      margin-top: -4px;
      margin-right: 4px;
      img {
        border-radius: 100%;
        width: 28px;
      }
    }

    svg {
      position: relative;
      opacity: 0.4;
      margin-left: 4px;
      margin-right: 4px;
    }

    &.is-active, &:hover {
      background: #d6d7db;
    }

    &.is-active {
      svg {
        opacity: 0.75;
        transform: rotate(180deg);
        //transition: transform 100ms linear;
      }
    }
  }

  .navbar-menu {
    margin-top: 8px;
    justify-content: center;

    .navbar-item {

      &:after {
        display: block;
        width: 0;
        height: 2px;
        position: absolute;
        transition: width 0.5s;
        bottom: 10px;
        background: $accent;
        content: "";
      }

      &.is-active {
        color: $primary;
        font-weight: 600;
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
