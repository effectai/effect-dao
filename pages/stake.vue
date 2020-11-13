<template>
  <div class="stake">
    <div v-if="wallet">
      <div class="modal" :class="{ 'is-active': stakingModal }">
        <div class="modal-background" />
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              Stake EFX
            </p>
            <button class="delete" aria-label="close" @click="stakingModal = false" />
          </header>
          <section class="modal-card-body">
            <div class="notification is-primary">
              <strong>Current Stake</strong>: {{ efxStaked }} EFX
            </div>
            <div class="new-stake">
              <div class="is-pulled-left text">
                New Stake:
              </div>
              <div class="is-pulled-right">
                <input
                  v-model.number="newStake"
                  class="input is-full"
                  type="number"
                  step="0.0001"
                  min="0"
                  @change="trimDecimals"
                >
              </div>
            </div>
            <input
              v-model="newStake"
              class="slider is-fullwidth is-medium is-success is-circle"
              step="1"
              min="0"
              :max="efxStaked + efxAvailable"
              type="range"
            >
            <div class="input-lower">
              <div class="is-pulled-left">
                0 EFX
              </div>
              <div class="is-pulled-right">
                {{ efxAvailable + efxStaked }} EFX
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button v-if="newStake < efxStaked" class="button is-danger is-fullwidth" :class="{ 'is-loading': loading }" @click="unstake()">
              Unstake {{ efxStaked - newStake }} EFX
            </button>
            <button v-else-if="newStake > efxStaked" class="button is-success is-fullwidth" :class="{ 'is-loading': loading }" @click="stake()">
              Stake {{ newStake - efxStaked }} EFX
            </button>
          </footer>
        </div>
      </div>

      <div v-if="claimableNfx > 0" class="notification is-primary unstake mb-0">
        You can claim <b>{{ claimableNfx }}</b>.
        <button class="button is-success is-pulled-right claim-nfx">
          Claim
        </button>
      </div>

      <div v-if="unstakeAmount && !canClaim" class="notification is-primary unstake mb-0">
        You have a pending unstake of <b>{{ unstakeAmount }}</b>, claimable at <b>{{ unstakeTime.toLocaleString() }}</b>.
      </div>

      <div v-else-if="unstakeAmount && canClaim" class="notification is-primary unstake mb-0">
        You can claim <b>{{ unstakeAmount }}</b>.
        <button class="button is-success is-pulled-right claim-efx">
          Claim
        </button>
      </div>

      <div v-if="wallet" class="columns stakes is-multiline">
        <div class="column is-half">
          <div class="treasury block-shadow mt-5">
            <h1 class="block-title">
              <img src="@/assets/img/efx-icon.png" class="token-icon">Staked EFX
            </h1>
            <div class="balance">
              <p>
                <ICountUp :end-val="efxStaked" />
                <span class="symbol">EFX</span>
              </p>
              <div class="buttons">
                <button class="button is-success is-fullwidth" @click="stakingModal = true">
                  Stake EFX
                </button>
                <button class="button is-danger" :disabled="efxStaked === 0" @click="stakingModal = true">
                  Unstake EFX
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-half">
          <div class="treasury block-shadow mt-5">
            <h1 class="block-title">
              <img src="@/assets/img/nfx-icon.png" class="token-icon nfx">Staked NFX
            </h1>
            <div class="balance">
              <p>
                <ICountUp :end-val="efxStaked" />
                <span class="symbol">NFX</span>
              </p>
              <div class="buttons">
                <button class="button is-success is-fullwidth" @click="stakingModal = true">
                  Stake NFX
                </button>
                <button class="button is-danger" :disabled="efxStaked === 0" @click="stakingModal = true">
                  Unstake NFX
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="treasury block-shadow">
            <h1 class="block-title">
              Stake AGE
            </h1>
            <div class="block-columns has-text-centered">
              <vue-circle
                class="mt-2"
                v-if="stakeAge"
                :progress="(stakeAge / (200 * 24 * 3600))*100"
                :size="250"
                :fill="{ color: '#39e7bf' }"
                empty-fill="rgba(0,0,0,.02)"
                :animation-start-value="0.0"
                insert-mode="append"
                :thickness="30"
                :start-angle="-Math.PI"
                :show-percent="false">
                <div class="value-circle">
                  <h1>{{ stakeAge / (200 * 24 * 3600) | percentage(1)}}</h1>
                  <div class="age-amount">{{ stakeAge | formatSeconds(this) }}</div>
                </div>
              </vue-circle>
              <h2 v-else>...</h2>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="treasury block-shadow" style="height:100%">
            <h1 class="block-title">
              EFX Power
            </h1>
            <div class="block-columns">
              <div class="value-circle big mt-6 glow">
                <div class="balance ">
                  <h3>
                    <ICountUp :options="{decimalPlaces: 0}" :end-val="power" />
                    <span class="symbol">EP</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="connect-wallet connect-wallet-stake">
      <ConnectWallet />
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import VueCircle from 'vue2-circle-progress/src/index.vue'
import ConnectWallet from '~/components/ConnectWallet'

export default {
  components: {
    ICountUp,
    ConnectWallet,
    VueCircle
  },

  filters: {
    percentage (value, decimals) {
      if (!value) {
        value = 0
      }
      if (!decimals) {
        decimals = 0
      }
      value *= 100
      return `${Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)}%`
    },
    formatSeconds (seconds, vm) {
      if (!seconds) {
        seconds = 0
      }
      return `${Math.floor(vm.$moment.duration(seconds, 'seconds').asDays())}:${vm.$moment.duration(seconds, 'seconds').hours()}:${vm.$moment.duration(seconds, 'seconds').minutes()}:${vm.$moment.duration(seconds, 'seconds').seconds()}`
    }
  },

  data () {
    return {
      loading: false,
      lastClaimTime: null,
      lastClaimAge: null,
      stakingModal: false,
      newStake: 0,

      unstakeAmount: null,
      unstakeTime: null,
      canClaim: false
    }
  },

  computed: {
    wallet () {
      return this.$wallet.wallet
    },
    claimableNfx () {
      return this.$wallet.claimableNfx
    },
    stakeAge () {
      return this.$wallet.stakeAge
    },
    power () {
      return this.$wallet.power
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

  methods: {
    trimDecimals (event) {
      this.newStake = Math.floor(this.newStake * 10000) / 10000
    },

    stake () {
      this.loading = true
      const actions = []

      if (this.efxStaked > 0) {
        actions.push({
          account: process.env.stakingContract,
          name: 'claim',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            owner: this.wallet.auth.accountName
          }
        })
      } else {
        actions.push({
          account: process.env.stakingContract,
          name: 'open',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            owner: this.wallet.auth.accountName,
            ram_payer: this.wallet.auth.accountName
          }
        })
        actions.push({
          account: process.env.tokenContract,
          name: 'open',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            owner: this.wallet.auth.accountName,
            symbol: `4,${process.env.nfxToken}`,
            ram_payer: this.wallet.auth.accountName
          }
        })
      }

      actions.push({
        account: process.env.tokenContract,
        name: 'transfer',
        authorization: [{
          actor: this.wallet.auth.accountName,
          permission: this.wallet.auth.permission
        }],
        data: {
          from: this.wallet.auth.accountName,
          to: process.env.stakingContract,
          quantity: `${Number.parseFloat(this.newStake).toFixed(4)} ${process.env.efxToken}`,
          memo: 'stake'
        }
      })

      this.wallet.eosApi.transact({ actions }, { blocksBehind: 3, expireSeconds: 60 })
        .then((transaction) => {
          console.log(transaction)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => {
          this.loading = false
        })
    },

    unstake () {
      this.loading = true
      this.wallet.eosApi.transact({
        actions: [
          {
            account: process.env.stakingContract,
            name: 'claim',
            authorization: [{
              actor: this.wallet.auth.accountName,
              permission: this.wallet.auth.permission
            }],
            data: {
              owner: this.wallet.auth.accountName
            }
          },
          {
            account: process.env.stakingContract,
            name: 'unstake',
            authorization: [{
              actor: this.wallet.auth.accountName,
              permission: this.wallet.auth.permission
            }],
            data: {
              owner: this.wallet.auth.accountName,
              quantity: `${Number.parseFloat(this.efxStaked - this.newStake).toFixed(4)} ${process.env.efxToken}`
            }
          }
        ]
      }, { blocksBehind: 3, expireSeconds: 60 })
        .then((transaction) => {
          console.log(transaction)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => {
          this.loading = false
        })
    },

    formatSeconds (seconds, vm) {
      if (!seconds) { seconds = 0 }
      return `${Math.floor(vm.$moment.duration(seconds, 'seconds').asDays())}:${vm.$moment.duration(seconds, 'seconds').hours()}:${vm.$moment.duration(seconds, 'seconds').minutes()}:${vm.$moment.duration(seconds, 'seconds').seconds()}`
    }
  }
}
</script>

<style lang="scss">
  @keyframes glow {
    from {
      box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 29px -22px #39e7bfd4;
    }
    to {
      box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 29px 0px #39e7bfd4;
    }
  }
  .circle {
    canvas {
      box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px #39e7bfd4;
      border-radius: 100%;
    }
  }
  .value-circle {
    height: 132px;
    width: 132px;
    &.big {
      width: 200px;
      height: 200px;
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
  .progress::-moz-progress-bar, .progress::-webkit-progress-bar {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
    animation: moveGradient 3s linear infinite;
  }

  @keyframes moveGradient {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -200% 0%;
    }
  }

  .stake {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;

    .buttons {
      margin-top: 15px;

      button {
        margin-right: 0;
        width: 100%;
        font-weight: bold;
      }
    }

    .modal-card-title {
      margin-bottom: 0 !important;
    }

    .modal-card-body {
      border-radius: 0 !important;
    }

    .input-lower {
      font-size: 12px;
      margin-top: -15px;
    }

    .new-stake {
      margin-top: -10px;
      padding-bottom: 40px;
      .text {
        margin-top: 10px;
      }
    }
  }

  .stakes {
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

    .claim-btn {
      margin-top: 20px;
      margin-bottom: 35px;
    }

    .claim-efx {
      margin-top: -7px;
      margin-bottom: -7px;
      margin-right: -15px;
    }
  }

  .connect-wallet-stake {
    margin-top: 100px;
  }
</style>
