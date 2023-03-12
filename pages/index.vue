<template>
  <div>
    <div class="has-text-centered my-6">
      <div v-if="wallet && wallet.auth">
        <h1 class="title">Welcome {{wallet.auth.accountName}}!</h1>
        <div class="value-circle big my-6 glow">
          <h3 class="has-text-weight-bold is-size-2">
            {{ $wallet.formatNumber(votes) }}
          </h3>
          <span>Your power</span>
        </div>
        <!-- <div class="subtitle">Effect Network Dashboard</div> -->
      </div>

      <div v-else class="has-text-centered">
        <h1 class="title">Effect Network DAO</h1>
        <div class="subtitle">Stake, vote and swap all in one place!</div>
        <div class="has-text-centered my-4">
          <a class="button is-primary" @click="$wallet.loginModal = true">
            <strong>Connect Wallet</strong>
          </a>
        </div>
      </div>
    </div>

    <h3 class="subtitle has-text-centered">Proposals now active:</h3>
    <div class="table has-shadow-outside mb-6" v-if="proposals && proposals.length > 0">
      <!-- <div class="cell  has-text-weight-bold is-size-6"> -->
      <!--   Proposals now active -->
      <!-- </div> -->
      <div class="cell" v-for="prop in proposals"   :key="prop.id">
        <nuxt-link :to="'/proposals/'+prop.id" class="is-flex-direction-row">
          <div class="is-size-6 has-text-primary is-flex-grow-1">
            #{{ prop.id }}: {{ prop.title }}
          </div>
          <div>
            <font-awesome-icon :icon="['fas', 'chevron-circle-right']" class="icon has-text-primary mx-3" />
          </div>
        </nuxt-link>
      </div>
    </div>

    <!-- <h3 class="subtitle">Cycle information:</h3> -->
    <div class="box mb-6">
      <div class="columns has-text-centered py-2">
        <div class="column">
          <div class="text">
            <span class="high is-size-3">
              <ICountUp v-if="currentCycle" :end-val="currentCycle" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">Cycle</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="nfxPoolBalance > 0" class="high is-size-3">
              ${{ $wallet.formatNumber(nfxPoolBalance)  }}
            </span>
            <span v-else>..</span><br>
            <span class="low">Rewards</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="poolValue > 0" class="high is-size-3">
              ${{ $wallet.formatNumber(poolValue) }}
            </span>
            <span v-else>..</span><br>
            <span class="low">Some text</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="percentStaked > 0" class="high is-size-3">
              {{ percentStaked }}%
            </span>
            <span v-else>..</span><br>
            <span class="low">Number staked</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="wallet" class="columns balances">
      <div class="column">
        <div class="box">
          <h5 class="box-title subtitle">
            <img src="@/assets/img/efx-icon.png" class="token-icon">Your EFX
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
            <img src="@/assets/img/nfx-icon.png" class="token-icon nfx">Your NFX
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
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'

export default {
  components: {
    ICountUp
  },
  data () {
    return {
      efxPrice: 0,
      poolBalance: 0,
      nfxPoolBalance: 0,
      circSupply: 0,
      forceTransactions: 0,
      forceEfxPaid: 0,
      forceUsers: 0,
      proposals: null
    }
  },

  computed: {
    votes () {
      return this.$wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked)
    },
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
    },
    currentCycle () {
      return this.$dao.proposalConfig ? this.$dao.proposalConfig.current_cycle : null
    }
  },

  created () {
    this.init()
  },

  watch: {
    currentCycle () {
      this.getProposals()
    }
  },

  methods: {
    init () {
      this.getForceStats()
      this.getCircSupply()
      this.getPoolBalance()
      this.getNFXPoolBalance()
      this.getEFXPrice()
      this.getProposals()
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

    async getNFXPoolBalance () {
      const res = await this.$eos.rpc.get_currency_balance(process.env.tokenContract, process.env.stakingContract, process.env.nfxToken)
      this.nfxPoolBalance = parseFloat(res[0].replace(` ${process.env.nfxToken}`, ''))
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
    },

    async getProposals () {
      if (this.$dao.proposalConfig) {
        const config = {
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'proposal',
          key_type: 'i64',
          index_position: 3,
          upper_bound: 58,
          lower_bound: 58,
          limit: 20
        }
        const data = await this.$eos.rpc.get_table_rows(config)
        this.proposals = data.rows
        this.proposals.forEach(async (proposal) => {
          if (!proposal.title) {
            try {
              const ipfsProposal = await this.$dao.getIpfsContent(proposal.content_hash)
              this.$set(proposal, 'title', ipfsProposal.title)
            } catch (e) {
              console.error(e)
            }
          }
        })
        console.log(data)
      } else {
        console.log('Still waiting for cycle')
      }
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

.splitter {
  border-left: 1px solid #CDD4E6;
  margin: 0.75em 0 0.75em 0;
}

  @keyframes glow {
    from {
      box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 29px -22px #d7ac00d4;
    }
    to {
      box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 15px #d7ac00d4;
    }
  }
  .circle {
    .age-amount {
      font-size: 0.75rem;
    }
  }
  .value-circle {
    height: 125px;
    width: 125px;
    &.big {
      width: 175px;
      height: 175px;
    }

    margin: -9px auto 0;

    border-radius: 100%;
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6;
    &.glow {
      animation: glow 2s infinite alternate ease-out;
      //box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 29px -22px #39e7bfd4;
    }
    background-color: #F0F2F7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      margin-bottom: 0;
    }
  }
</style>
