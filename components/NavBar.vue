<template>
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
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Stake
        </a>

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
            <!--            <ConnectWallet />-->
            <ConnectWallet v-if="!wallet || !wallet.connected" />
            <a v-else class="button is-primary">
              <strong>{{ wallet.auth.accountName }}</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ConnectWallet from '@/components/ConnectWallet'

export default {
  components: {
    ConnectWallet
  },

  computed: {
    wallet () {
      return this.$transit.wallet
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
      }
    }

    .navbar-end {
      margin-top: 2px;
    }
  }
</style>
