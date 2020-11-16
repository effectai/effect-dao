<template>
  <div>
    <div class="index">
      <div class="intro" v-if="wallet && wallet.auth">
        <div class="image is-64x64 avatar has-text-centered">
          <img class="is-rounded" style="margin: 0 auto" :src="`https://avatar.pixeos.art/avatar/${wallet.auth.accountName}`" @error="fallbackAvatar">
        </div>
        <h1>Hi, {{wallet.auth.accountName}}!</h1>
        <h4>Welcome to the Effect Dashboard.</h4>
      </div>
      <div class="intro" v-else>
        <h1>Welcome to the Effect Dashboard.</h1>
        <h4>Stake, vote and swap all in one place!</h4>
      </div>

      <div v-if="wallet" class="columns balances">
        <div class="column">
          <div class="treasury block-shadow mt-5">
            <h2 class="block-title">
              <img src="@/assets/img/efx-icon.png" class="token-icon" />EFX Balance
            </h2>
            <div class="balance">
              <p>
                <ICountUp :end-val="efxAvailable + efxStaked" /> <span class="symbol">EFX</span>
              </p>
              <span>Staked: <ICountUp :end-val="efxStaked" /> EFX</span>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="treasury block-shadow mt-5">
            <h2 class="block-title">
              <img src="@/assets/img/nfx-icon.png" class="token-icon nfx" />NFX Balance
            </h2>
            <div class="balance">
              <div class="balance">
                <p>
                  <ICountUp :end-val="nfxAvailable + nfxStaked" /> <span class="symbol">NFX</span>
                </p>
                <span>Staked: <ICountUp :end-val="nfxStaked" /> NFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="connect-wallet">
        <ConnectWallet />
      </div>

      <div class="treasury block-shadow">
        <h2 class="block-title">
          Staking Overview
        </h2>
        <div class="columns block-columns is-desktop">
          <div class="column has-text-centered">
            <div class="icon">
              <img src="@/assets/img/icons/staking.svg" class="" />
            </div>
            <div class="text">
              <span class="high">
                <ICountUp v-if="poolBalance > 0" :end-val="poolBalance" />
                <span v-else>..</span>
              </span> <br>
              <span class="low">EFX in staking pool</span>
            </div>
          </div>
          <div class="splitter"></div>
          <div class="column  has-text-centered">
            <div class="icon">
              <img src="@/assets/img/icons/usd.svg" class="" />
            </div>
            <div class="text">
              <span class="high">
                <ICountUp v-if="poolValue > 0" :options="{ prefix: '$' }" :end-val="poolValue" />
                <span v-else>..</span>
              </span> <br>
              <span class="low">Staking pool value</span>
            </div>
          </div>
          <div class="splitter"></div>
          <div class="column has-text-centered">
            <div class="icon">
              <img src="@/assets/img/icons/supply.svg" class="" />
            </div>
            <div class="text">
              <span class="high">
                <ICountUp v-if="percentStaked > 0" :options="{ suffix: '%' }" :end-val="percentStaked" />
                <span v-else>..</span>
              </span> <br>
              <span class="low">Of circ. supply staked</span>
            </div>
          </div>
        </div>
      </div>

      <div class="treasury block-shadow mt-5 mb-6">
        <h2 class="block-title">
          Effect Force Overview
        </h2>
        <div class="columns block-columns">
          <div class="column has-text-centered">
            <div class="icon">
              <img src="@/assets/img/icons/transactions.svg" class="" />
            </div>
            <div class="text">
              <span class="high">
                <ICountUp v-if="forceTransactions > 0" :end-val="forceTransactions" />
                <span v-else>..</span>
              </span> <br>
              <span class="low">Total transactions</span>
            </div>
          </div>
          <div class="splitter"></div>
          <div class="column has-text-centered">
            <div class="icon">
              <img src="@/assets/img/icons/payouts.svg" class="" />
            </div>
            <div class="text">
              <span class="high">
                <ICountUp v-if="forceEfxPaid > 0" :options="{ suffix: ' EFX' }" :end-val="forceEfxPaid" />
                <span v-else>..</span>
              </span> <br>
              <span class="low">Total payouts</span>
            </div>
          </div>
          <div class="splitter"></div>
          <div class="column has-text-centered">
            <div class="icon">
              <img src="@/assets/img/icons/workers.svg" class="" />
            </div>
            <div class="text">
              <span class="high">
                <ICountUp v-if="forceUsers > 0" :end-val="forceUsers" />
                <span v-else>..</span>
              </span> <br>
              <span class="low">Registered workers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import ConnectWallet from '../components/ConnectWallet'
// import Sun from '../components/Sun'

export default {
  components: {
    ICountUp,
    ConnectWallet
  },

  data () {
    return {
      efxPrice: 0,
      poolBalance: 0,
      circSupply: 0,
      forceTransactions: 0,
      forceEfxPaid: 0,
      forceUsers: 0
    }
  },

  computed: {
    poolValue () {
      return parseInt(this.efxPrice * this.poolBalance)
    },
    percentStaked () {
      return parseInt((this.poolBalance / this.circSupply) * 100)
    },
    wallet () {
      return this.$wallet.wallet
    },
    efxAvailable () {
      return this.$wallet.efxAvailable
    },
    efxStaked () {
      return this.$wallet.efxStaked
    },
    nfxAvailable () {
      return this.$wallet.nfxAvailable
    },
    nfxStaked () {
      return this.$wallet.nfxStaked
    }
  },

  created () {
    this.init()
  },

  methods: {
    fallbackAvatar (event) {
      event.target.src = `https://ui-avatars.com/api/?name=${this.wallet.auth.accountName}&size=128`
    },

    init () {
      this.getForceStats()
      this.getCircSupply()
      this.getPoolBalance()
      this.getEFXPrice()
    },

    async getCircSupply () {
      const res = await this.$eos.rpc.get_table_rows({ code: process.env.tokenContract, scope: process.env.efxToken, table: 'stat' })
      if (res && res.rows && res.rows.length === 1) {
        this.circSupply = parseFloat(res.rows[0].supply.replace(` ${process.env.efxToken}`, ''))
      }
    },

    async getPoolBalance () {
      const res = await this.$eos.rpc.get_currency_balance(process.env.tokenContract, process.env.stakingContract, process.env.efxToken)
      this.poolBalance = parseFloat(res[0].replace(` ${process.env.efxToken}`, ''))
    },

    async getEFXPrice () {
      this.efxPrice = await fetch('https://api.coingecko.com/api/v3/coins/effect-ai/tickers')
        .then(data => data.json())
        .then((data) => {
          return data.tickers[0].converted_last.usd
        })
    },

    async getForceStats () {
      await fetch('https://worker.effect.ai/user/statistics')
        .then(data => data.json())
        .then((data) => {
          this.forceEfxPaid = data.total_efx_spent
          this.forceTransactions = data.total_transactions
          this.forceUsers = data.total_accounts
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;

    .intro {
      padding: 40px 0;
      margin-bottom: -30px;
      text-align: center;
      h4 {
        font-weight: 400;
      }
    }

    .block-columns {
      margin-top: 25px;
      padding-bottom: 15px;
      margin-left: 0;
    }

    .icon {
      font-size: 32px;
      img {
        max-height: 100%;
      }
    }

    .high {
      font-size: 22px;
      font-weight: 700;
    }

    .low {
      font-weight: 300;
      font-size: small;
    }

    .balances {
      .column {
        padding: 0.75rem;
      }
      .balance {
        text-align: center;
        p {
          padding-top: 8px;
          font-size: 31px;
          margin-bottom: 0;
          span.symbol {
            font-weight: 300;
            font-size: 18px;
          }
        }
      }
      .token-icon {
        height: 40px;
        margin-top: -11px;
        float: left;
        margin-right: -40px;
        &.nfx {
          height: 45px;
          margin-top: -13px;
        }
      }
    }

    .modal-card-title {
      margin-bottom: 0 !important;
    }
  }
  .avatar {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .splitter {
    border-left: 1px solid #CDD4E6;
    margin: 0.75em 0 0.75em 0;
  }
</style>
