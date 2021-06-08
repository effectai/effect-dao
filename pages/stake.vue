<template>
  <div>
    <div>
      <div class="modal" :class="{ 'is-active': stakingModal }">
        <div class="modal-background" />
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              Stake {{ stakingModalEfx ? 'EFX' : 'NFX' }}
            </p>
            <button class="delete" aria-label="close" @click="stakingModal = false" />
          </header>
          <section class="modal-card-body">
            <div v-if="stakingModalEfx" class="notification is-primary">
              <div><strong>Current Stake</strong>: {{ efxStaked }} EFX</div>
              <div v-if="addStake > 0"><strong>New Stake</strong>: {{ parseFloat(efxStaked) + parseFloat(addStake) }} EFX</div>
            </div>
            <div v-else class="notification is-primary">
              <div><strong>Current Stake</strong>: {{ nfxStaked }} NFX</div>
              <div v-if="addStake > 0"><strong>New Stake</strong>: {{ parseFloat(nfxStaked) + parseFloat(addStake) }} NFX</div>
            </div>
            <div class="new-stake">
              <div class="is-pulled-left text">
                Add Stake:
              </div>
              <div class="is-pulled-right">
                <input
                  v-model.number="addStake"
                  class="input is-full"
                  type="number"
                  step="0.0001"
                  min="0"
                  @change="trimDecimals"
                >
              </div>
            </div>
            <input
              v-model="addStake"
              class="slider is-fullwidth is-medium is-success is-circle"
              step="1"
              min="0"
              :max="(stakingModalEfx) ? efxAvailable : nfxAvailable"
              type="range"
            >
            <div class="input-lower">
              <div class="is-pulled-left">
                0 {{ stakingModalEfx ? 'EFX' : 'NFX' }}
              </div>
              <div v-if="stakingModalEfx" class="is-pulled-right">
                {{ efxAvailable }} EFX
              </div>
              <div v-else class="is-pulled-right">
                {{ nfxAvailable }} NFX
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button v-if="stakingModalEfx" class="button is-success is-fullwidth" :class="{ 'is-loading': loading }" @click="stake">
              Stake {{ addStake }} EFX
            </button>
            <button v-else-if="!stakingModalEfx" class="button is-success is-fullwidth" :class="{ 'is-loading': loading }" @click="stake">
              Stake {{ addStake }} NFX
            </button>
          </footer>
        </div>
      </div>

      <div class="modal" :class="{ 'is-active': unstakingModal }">
        <div class="modal-background" />
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              Unstake {{ stakingModalEfx ? 'EFX' : 'NFX' }}
            </p>
            <button class="delete" aria-label="close" @click="unstakingModal = false" />
          </header>
          <section class="modal-card-body">
            <div v-if="stakingModalEfx" class="notification is-primary">
              <div><strong>Current Stake</strong>: {{ efxStaked }} EFX</div>
              <div v-if="removeStake > 0"><strong>New Stake</strong>: {{ Math.max(0, parseFloat(efxStaked) - parseFloat(removeStake)) }} EFX</div>
            </div>
            <div v-else class="notification is-primary">
              <div><strong>Current Stake</strong>: {{ nfxStaked }} NFX</div>
              <div><strong>New Stake</strong>: {{ Math.max(0, parseFloat(nfxStaked) - parseFloat(removeStake)) }} NFX</div>
            </div>
            <div class="new-stake">
              <div class="is-pulled-left text">
                Remove Stake:
              </div>
              <div class="is-pulled-right">
                <input
                  v-model.number="removeStake"
                  class="input is-full"
                  type="number"
                  step="0.0001"
                  min="0"
                  @change="trimDecimals"
                >
              </div>
            </div>
            <input
              v-model="removeStake"
              class="slider is-fullwidth is-medium is-primary is-circle"
              step="1"
              min="0"
              :max="(stakingModalEfx) ? efxStaked : nfxStaked"
              type="range"
            >
            <div class="input-lower">
              <div class="is-pulled-left">
                0 {{ stakingModalEfx ? 'EFX' : 'NFX' }}
              </div>
              <div v-if="stakingModalEfx" class="is-pulled-right">
                {{ efxStaked }} EFX
              </div>
              <div v-else class="is-pulled-right">
                {{ nfxStaked }} NFX
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button v-if="stakingModalEfx" class="button is-danger is-fullwidth" :class="{ 'is-loading': loading }" @click="unstake">
              Unstake {{ removeStake }} EFX
            </button>
            <button v-else-if="!stakingModalEfx" class="button is-danger is-fullwidth" :class="{ 'is-loading': loading }" @click="unstake">
              Unstake {{ removeStake }} NFX
            </button>
          </footer>
        </div>
      </div>

      <div v-if="nfxStillClaimable > 0" class="notification is-primary unstake mb-0 is-outlined notif-w-btn">
        You can claim <b>{{ nfxStillClaimable }}</b> NFX.
        <div class="is-pulled-right notif-btn">
          <button class="button is-success claim-nfx" @click="claimNfx">
            Claim
          </button>
        </div>
      </div>

      <div v-if="!efxCanRefund && efxUnstaking > 0" class="notification is-primary has-text-centered unstake mb-0 is-outlined">
        You have a pending unstake of <b>{{ efxUnstaking }} EFX</b> refundable <b>{{ $moment(efxUnstakingTime+"Z").fromNow() }}</b>.
      </div>

      <div v-else-if="efxCanRefund && efxUnstaking > 0" class="notification is-primary unstake mb-0 is-outlined">
        You have an available refund of <b>{{ efxUnstaking }}</b> EFX
        <button class="button is-success is-pulled-right claim-efx" :class="{ 'is-loading': loading }" @click="refund('4,EFX')">
          Refund
        </button>
      </div>

      <div v-if="!nfxCanRefund && nfxUnstaking > 0" class="notification is-primary unstake mb-0 is-outlined has-text-centered">
        You have a pending unstake of <b>{{ nfxUnstaking }} NFX</b> refundable at <b>{{ $moment(nfxUnstakingTime+"Z").fromNow() }}</b>.
      </div>

      <div v-else-if="nfxCanRefund && nfxUnstaking > 0" class="notification is-primary unstake mb-0 is-outlined">
        You have an available refund of <b>{{ nfxUnstaking }}</b> NFX
        <button class="button is-success is-pulled-right claim-efx" :class="{ 'is-loading': loading }" @click="refund('4,NFX')">
          Refund
        </button>
      </div>

      <div class="columns stakes is-multiline mt-5">
        <div class="column is-half">
          <div class="box">
            <h5 class="subtitle box-title">
              <img src="@/assets/img/efx-icon.png" class="token-icon">Staked EFX
            </h5>
            <div class="has-text-centered">
              <h3 class="subtitle is-3 has-text-weight-bold">
                <ICountUp :end-val="efxStaked" />
                <span class="symbol">EFX</span>
              </h3>
              <div class="buttons" >
                <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" :disabled="efxAvailable === 0" @click="stakingModal = true; stakingModalEfx = true; addStake = efxAvailable">
                  Stake EFX
                </button>
                <button class="button is-primary is-outlined" :class="{ 'is-loading': loading }" :disabled="efxStaked === 0" @click="unstakingModal = true; stakingModalEfx = true; removeStake = 0">
                  Unstake EFX
                </button>
              </div>
              <div class="has-text-centered is-italic"><small>Unstaking takes 5 days</small></div>
              <hr class="has-background-grey-lighter">
              <div>
                <a href="https://effect.network/token-page/" target="_blank" rel="noopener noreferrer">
                Get EFX <font-awesome-icon :icon="['fas', 'external-link-alt']"/>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-half">
          <div class="box">
            <h5 class="subtitle box-title">
              <img src="@/assets/img/nfx-icon.png" class="token-icon nfx">Staked NFX
            </h5>
            <div class="has-text-centered">
              <h3 class="subtitle is-3 has-text-weight-bold">
                <ICountUp :end-val="nfxStaked" />
                <span class="symbol">NFX</span>
              </h3>
              <div class="buttons">
                <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" :disabled="nfxAvailable === 0" @click="stakingModal = true; stakingModalEfx = false; addStake = nfxAvailable">
                  Stake NFX
                </button>
                <button class="button is-primary is-outlined" :class="{ 'is-loading': loading }" :disabled="nfxStaked === 0" @click="unstakingModal = true; stakingModalEfx = false; removeStake = 0">
                  Unstake NFX
                </button>
              </div>
              <div class="has-text-centered is-italic"><small>Unstaking takes 15 days</small></div>
              <hr class="has-background-grey-lighter">
              <div>
                <a href=" https://defibox.io/pool-market-details/437" target="_blank" rel="noopener noreferrer" data-tooltip="NFX can only be bought with EFX">
                Get NFX <font-awesome-icon :icon="['fas', 'external-link-alt']"/>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="box">
            <h5 class="subtitle box-title">
              Stake AGE
            </h5>
            <div class="has-text-centered">
              <vue-circle
                v-if="stakeAge"
                class="mt-2"
                :progress="(stakeAge / (1000 * 24 * 3600))*100"
                :size="250"
                :fill="{ color: '#d7ac00' }"
                empty-fill="rgba(0,0,0,.02)"
                :animation-start-value="0.0"
                insert-mode="append"
                :thickness="30"
                :start-angle="-Math.PI"
                :show-percent="false"
              >
                <div class="value-circle">
                  <h1 class="title">{{ stakeAge / (1000 * 24 * 3600) | percentage(1) }}<span class="has-text-weight-light">%</span></h1>
                  <div class="age-amount">
                    {{ stakeAge | formatSeconds(this) }}
                  </div>
                </div>
              </vue-circle>
              <h2 v-else>
                ...
              </h2>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="box" style="height:100%">
            <h5 class="subtitle box-title">
              EFX Power
            </h5>
            <div class="value-circle big mt-6 glow">
              <div class="has-text-centered">
                <h3 class="has-text-weight-bold is-size-4">
                  <ICountUp :options="{decimalPlaces: 0}" :end-val="power" />
                  <small class="symbol has-text-weight-light is-size-6">EP</small>
                </h3>
                <span>EFX Power</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <div v-else class="has-text-centered">-->
<!--      <a class="button is-primary" @click="$wallet.loginModal = true">-->
<!--        <strong>Connect Wallet</strong>-->
<!--      </a>-->
<!--    </div>-->
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import VueCircle from 'vue2-circle-progress/src/index.vue'
// TODO add external link icon
export default {
  components: {
    ICountUp,
    VueCircle
  },
  middleware: ['authenticated'],
  filters: {
    percentage (value, decimals) {
      if (!value) {
        value = 0
      }
      if (!decimals) {
        decimals = 0
      }
      value *= 100
      return `${Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)}`
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
      unstakingModal: false,
      stakingModal: false,
      stakingModalEfx: false,
      removeStake: 0,
      addStake: 0
    }
  },

  computed: {
    wallet () {
      return this.$wallet.wallet
    },
    nfxStillClaimable () {
      return this.$wallet.nfxStillClaimable
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
    },
    efxUnstaking () {
      return this.$wallet.efxUnstaking
    },
    efxUnstakingTime () {
      return this.$wallet.efxUnstakingTime
    },
    nfxUnstaking () {
      return this.$wallet.nfxUnstaking
    },
    nfxUnstakingTime () {
      return this.$wallet.nfxUnstakingTime
    },
    efxCanRefund () {
      return this.$wallet.efxCanRefund
    },
    nfxCanRefund () {
      return this.$wallet.nfxCanRefund
    },
    signedConstitution () {
      return this.$wallet.signedConstitution
    }
  },

  methods: {
    trimDecimals (event) {
      this.removeStake = Math.floor(this.removeStake * 10000) / 10000
      this.addStake = Math.floor(this.addStake * 10000) / 10000
    },

    stake () {
      this.loading = true
      const actions = []

      if ((this.stakingModalEfx && this.efxStaked > 0) || (!this.stakingModalEfx && this.nfxStaked > 0)) {
        actions.push({
          account: process.env.stakingContract,
          name: 'claim',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            owner: this.wallet.auth.accountName,
            symbol: `4,${(this.stakingModalEfx) ? process.env.efxToken : process.env.nfxToken}`
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
            symbol: `4,${(this.stakingModalEfx) ? process.env.efxToken : process.env.nfxToken}`,
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
          quantity: `${Number.parseFloat(this.addStake).toFixed(4)} ${(this.stakingModalEfx) ? process.env.efxToken : process.env.nfxToken}`,
          memo: 'stake'
        }
      })

      this.$wallet.handleTransaction(actions)
        .then((transaction) => {
          this.$wallet.updateAccount()
          this.stakingModal = false
        })
        .finally(() => {
          this.loading = false
        })
    },

    unstake () {
      let quantity = `${Number.parseFloat(this.removeStake).toFixed(4)} ${process.env.efxToken}`
      if (!this.stakingModalEfx) {
        quantity = `${Number.parseFloat(this.removeStake).toFixed(4)} ${process.env.nfxToken}`
      }

      this.loading = true
      const actions = [
        {
          account: process.env.stakingContract,
          name: 'claim',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            owner: this.wallet.auth.accountName,
            symbol: `4,${(this.stakingModalEfx) ? process.env.efxToken : process.env.nfxToken}`
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
            quantity
          }
        }
      ]

      this.$wallet.handleTransaction(actions)
        .then((transaction) => {
          this.$wallet.updateAccount()
          this.stakingModal = false
        })
        .finally(() => {
          this.loading = false
        })
    },

    claimNfx () {
      this.loading = true
      const actions = [
        {
          account: process.env.stakingContract,
          name: 'claim',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            owner: this.wallet.auth.accountName,
            symbol: `4,${process.env.efxToken}`
          }
        }
      ]

      this.$wallet.handleTransaction(actions)
        .then((transaction) => {
          this.$wallet.updateAccount()
        })
        .finally(() => {
          this.loading = false
        })
    },

    refund (sym) {
      this.loading = true
      const actions = [
        {
          account: process.env.stakingContract,
          name: 'refund',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            owner: this.wallet.auth.accountName,
            symbol: sym
          }
        }
      ]

      this.$wallet.handleTransaction(actions)
        .then((transaction) => {
          this.$wallet.updateAccount()
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
.circle {
  canvas {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px #d7ac00d4;
    border-radius: 100%;
  }
}
</style>

<style lang="scss" scoped>
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

  .notification {
    margin-bottom: 12px !important;
  }

  .claim-efx {
    margin-top: -7px;
    margin-right: -12px;
  }

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
    margin-top: 0px;
    padding-bottom: 40px;
    .text {
      margin-top: 10px;
    }
  }

  .progress-bar {
    margin-top: 40px;
  }

  .stakes {
    .column {
      padding: 0.75rem;
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
</style>
