<template>
  <div class="index">
    <div class="intro">
      <h1>Welcome to the Effect Dashboard.</h1>
      <h4>Stake, vote and swap all in one place!</h4>
    </div>

    <div v-if="wallet" class="columns balances">
      <div class="column">
        <div class="treasury block-shadow mt-5">
          <h2 class="block-title">
            <img src="@/assets/img/efx-icon.png" class="token-icon">EFX Balance
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
            <img src="@/assets/img/nfx-icon.png" class="token-icon nfx">NFX Balance
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
        <div class="column">
          <div class="icon">
            🔐
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="poolBalance > 0" :end-val="poolBalance" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">EFX in staking pool</span>
          </div>
        </div>
        <div class="column">
          <div class="icon">
            💲
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="poolValue > 0" :options="{ prefix: '$' }" :end-val="poolValue" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">staking pool value</span>
          </div>
        </div>
        <div class="column">
          <div class="icon">
            😲
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="percentStaked > 0" :options="{ suffix: '%' }" :end-val="percentStaked" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">of circ. supply staked</span>
          </div>
        </div>
      </div>
    </div>

    <div class="treasury block-shadow mt-5">
      <h2 class="block-title">
        Effect Force Overview
      </h2>
      <div class="columns block-columns">
        <div class="column">
          <div class="icon">
            ⛓️
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="forceTransactions > 0" :end-val="forceTransactions" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">total transactions</span>
          </div>
        </div>
        <div class="column">
          <div class="icon">
            💸
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="forceEfxPaid > 0" :options="{ suffix: ' EFX' }" :end-val="forceEfxPaid" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">total payouts</span>
          </div>
        </div>
        <div class="column">
          <div class="icon">
            👩‍💻
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="forceUsers > 0" :end-val="forceUsers" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">registered workers</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import ConnectWallet from '../components/ConnectWallet'

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
          this.forceEfxPaid = data.spentEfxTotal
          this.forceTransactions = data.totalTransactions
          this.forceUsers = data.usersRegisteredTotal
        })
    }
  }
}
</script>

<style lang="scss">
  .index {
    max-width: 960px;
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
      margin-top: 20px;
      padding-bottom: 15px;
      margin-left: 0;
    }

    .icon {
      float: left;
      font-size: 32px;
      margin-top: 18px;
      margin-right: 20px;
    }

    .high {
      font-size: 22px;
      font-weight: 700;
    }

    .low {
      font-weight: 300;
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
</style>
