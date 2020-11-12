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

      <div v-if="wallet" class="columns stakes">
        <div class="column">
          <div class="treasury block-shadow mt-5">
            <h2 class="block-title">
              <img src="@/assets/img/efx-icon.png" class="token-icon">Staked EFX
            </h2>
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

        <div class="column">
          <div class="treasury block-shadow mt-5">
            <h2 class="block-title">
              <img src="@/assets/img/nfx-icon.png" class="token-icon nfx">Staked NFX
            </h2>
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
      </div>

      <div class="treasury block-shadow">
        <h2 class="block-title">
          Stake Age
        </h2>
        <div class="block-columns">
          <progress class="progress is-large mt-5 mb-3" :value="stakeAge/(1000*3600*24)" max="1" />
          <div>{{ stakeAge/(1000*3600*24) * 100 }}%</div>
          <div class="age-amount">
            {{ stakeAge | formatSeconds(this) }}
          </div>
          Power: {{ power }}
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
import ConnectWallet from '~/components/ConnectWallet'

export default {
  components: {
    ICountUp,
    ConnectWallet
  },

  filters: {
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

  watch: {
    wallet () {
      this.init()
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
    max-width: 750px;
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
