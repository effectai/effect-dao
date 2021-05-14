<template>
  <div>
    <div class="has-text-centered my-6">
      <div v-if="wallet && wallet.auth">
        <div class="image is-64x64 avatar">
          <avatar class="is-rounded" style="margin: 0 auto" :account-name="wallet.auth.accountName" />
        </div>
        <h1 class="title">Hi, {{ wallet.auth.accountName }}!</h1>
        <div class="subtitle">Welcome to the Effect Dashboard.</div>
      </div>
      <div v-else class="has-text-centered">
        <h1 class="title">Welcome to the Effect Dashboard.</h1>
        <div class="subtitle">Stake, vote and swap all in one place!</div>
        <div class="has-text-centered my-4">
          <a class="button is-secondary" @click="$wallet.loginModal = true">
            <strong>Connect Wallet</strong>
          </a>
        </div>
      </div>
    </div>

    <div v-if="wallet" class="columns balances">
      <div class="column">
        <div class="box">
          <h5 class="box-title subtitle">
            <img src="@/assets/img/efx-icon.png" class="token-icon">EFX Balance
          </h5>
          <div class="has-text-centered">
            <div class="mb-3">
              <div class="is-size-6">Available</div>
              <div class="subtitle is-3 has-text-weight-semibold">
                <ICountUp :end-val="efxAvailable" /> <span class="symbol">EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">Staked</div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <ICountUp :end-val="efxStaked" /> <span class="symbol">EFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">Total</div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <ICountUp :end-val="efxAvailable + efxStaked" /> <span class="symbol">EFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="box">
          <h5 class="box-title subtitle">
            <img src="@/assets/img/nfx-icon.png" class="token-icon nfx">NFX Balance
          </h5>
          <div class="has-text-centered">
            <div class="mb-3">
              <div class="is-size-6">Available</div>
              <div class="subtitle is-3 has-text-weight-semibold">
                <ICountUp :end-val="nfxAvailable" /> <span class="symbol">NFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">Staked</div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <ICountUp :end-val="nfxStaked" /> <span class="symbol">NFX</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="is-size-6">Total</div>
              <div class="subtitle is-5 has-text-weight-semibold">
                <ICountUp :end-val="nfxAvailable + nfxStaked" /> <span class="symbol">NFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <h5 class="subtitle box-title">
        Staking Overview
      </h5>
      <div class="columns has-text-centered py-4">
        <div class="column">
          <div class="icon">
            <img src="@/assets/img/icons/staking.svg" class="">
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
        <div class="column">
          <div class="icon">
            <img src="@/assets/img/icons/usd.svg" class="">
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
        <div class="column">
          <div class="icon">
            <img src="@/assets/img/icons/supply.svg" class="">
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

    <div class="box mt-5 mb-6">
      <h5 class="subtitle box-title">
        Effect Force Overview
      </h5>
      <div class="columns has-text-centered py-4">
        <div class="column">
          <div class="icon">
            <img src="@/assets/img/icons/transactions.svg" class="">
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
        <div class="column">
          <div class="icon">
            <img src="@/assets/img/icons/payouts.svg" class="">
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="forceEfxPaid > 0"  :end-val="forceEfxPaid" />
              <span v-else>..</span>
              <span class="symbol">EFX</span>
            </span> <br>
            <span class="low">Total payouts</span>
          </div>
        </div>
        <div class="splitter"></div>
        <div class="column">
          <div class="icon">
            <img src="@/assets/img/icons/workers.svg" class="">
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
</template>

<script>
import ICountUp from 'vue-countup-v2'
import Avatar from '~/components/Avatar'

export default {
  components: {
    ICountUp,
    Avatar
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
        this.circSupply = parseFloat(res.rows[0].supply.replace(` ${process.env.efxToken}`, '')) - 170331473 - 100000000 - 88447533
      }
    },

    async getPoolBalance () {
      const res = await this.$eos.rpc.get_currency_balance(process.env.tokenContract, process.env.stakingContract, process.env.efxToken)
      this.poolBalance = parseFloat(res[0].replace(` ${process.env.efxToken}`, ''))
    },

    async getEFXPrice () {
      this.efxPrice = await fetch('https://api.coingecko.com/api/v3/coins/effect-network/tickers')
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
.high {
  font-size: 22px;
  font-weight: 700;
}

.low {
  font-weight: 300;
  font-size: small;
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
