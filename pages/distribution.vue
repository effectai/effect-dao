<template>
  <div>
    <div class="columns stakes is-multiline mt-5">
      <div class="column is-half">
        <div class="box">
          <h5 class="box-title">
            Cycle {{ lastCycleId }} Fees
          </h5>
          <div class="has-text-centered">
            <h3>
              <ICountUp :end-val="lastCycleTotalFees" />
              <span class="symbol">{{ efxToken }}</span>
            </h3>
          </div>
          <h5 class="box-title mt-6">
            Cycle {{ lastCycleId }} Vote Weight
          </h5>
          <div class="has-text-centered">
            <h3>
              <ICountUp :end-val="lastCycleTotalWeight" />
            </h3>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="box">
          <h5 class="box-title">
            Your Share
          </h5>
          <div v-if="accountName" class="has-text-centered">
            <div class="has-text-centered">
              <h3>
                <ICountUp :end-val="lastCycleUserFees" />
                <span class="symbol">{{ efxToken }}</span>
              </h3>
              <h6>{{ lastCycleUserShare }}% of pool</h6>
            </div>
            <div class="buttons">
              <button
                class="button is-primary is-fullwidth rainbow-btn"
                :class="{ 'is-loading': loading }"
                :disabled="!canClaim"
                @click="claimRewards(true)"
              >
                Claim & Stake Rewards
              </button>
              <button
                class="button is-primary is-fullwidth"
                :class="{ 'is-loading': loading }"
                :disabled="!canClaim"
                @click="claimRewards"
              >
                Claim Rewards
              </button>
            </div>
          </div>
          <div v-else class="has-text-centered">
            <a class="button is-primary" @click="$wallet.loginModal = true">
              <strong>Connect Wallet</strong>
            </a>
          </div>
        </div>
      </div>

      <div class="column is-full">
        <div class="box">
          <h5 class="box-title">
            Distribution History
          </h5>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th>Cycle</th>
                  <th><abbr title="Total EFX">Total</abbr></th>
                  <th><abbr title="Your Claimed EFX">You claimed</abbr></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="balance in distributionBalances" :key="balance.cycle_id">
                  <th>{{ balance.cycle_id }}</th>
                  <th>
                    <span v-if="balance.balance.length > 0">
                      {{ balance.balance[0].value / 10000 }} {{ efxToken }}
                    </span>
                  </th>
                  <th>{{ getUserCycleClaim(balance.cycle_id) }} {{ efxToken }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import Long from 'long'
import { Serialize } from 'eosjs'

export default {
  components: {
    ICountUp
  },

  data () {
    return {
      loading: false,
      balances: [],
      claims: {},
      totalFees: 0,
      lastCycleTotalFees: 0,
      lastCycleTotalWeight: 0,
      lastCycleUserWeight: 0
    }
  },

  computed: {
    accountName () {
      // return 'efxkylin1111'
      return (this.$wallet && this.$wallet.wallet) ? this.$wallet.wallet.auth.accountName : null
    },
    distributionBalances () {
      const tbl = this.balances
      return tbl.reverse() // reverse the temp var instead of the original var
    },
    lastCycleId () {
      return (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id - 1 : null
    },
    lastCycleUserFees () {
      return (this.lastCycleTotalFees > 0 && this.lastCycleUserWeight > 0) ? this.lastCycleTotalFees * (this.lastCycleUserWeight / this.lastCycleTotalWeight) : 0
    },
    lastCycleUserShare () {
      return (this.lastCycleUserFees > 0) ? (this.lastCycleUserWeight / this.lastCycleTotalWeight * 100).toFixed(2) : 0
    },
    canClaim () {
      return true
      // return !this.claims[this.lastCycleId] && this.lastCycleUserFees > 0
    },
    efxToken () {
      return process.env.efxToken
    }
  },

  watch: {
    accountName () {
      this.init()
    },
    lastCycleId () {
      this.init()
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      if (!this.lastCycleId) {
        return
      }

      await this.getClaims()

      const feeData = await this.$eos.rpc.get_table_rows({
        code: process.env.feepoolContract,
        scope: process.env.feepoolContract,
        table: 'balance'
      })

      if (feeData && feeData.rows.length > 0) {
        this.balances = feeData.rows

        const proposalData = await this.$eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'proposal',
          key_type: 'i64',
          index_position: 3,
          lower_bound: this.lastCycleId,
          upper_bound: this.lastCycleId
        })

        if (proposalData && proposalData.rows.length > 0) {
          const proposalIds = proposalData.rows.map(row => row.id)

          const voteData = await this.$eos.rpc.get_table_rows({
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            key_type: 'i64',
            index_position: 4,
            lower_bound: Math.min(...proposalIds),
            upper_bound: Math.max(...proposalIds)
          })

          if (voteData && voteData.rows.length > 0) {
            voteData.rows.map((vote) => {
              if (proposalIds.includes(vote.proposal_id)) {
                this.lastCycleTotalWeight += vote.weight
                if (this.accountName && vote.voter === this.accountName) {
                  this.lastCycleUserWeight += vote.weight
                }
              }
            })
          }
        }
      }

      this.calculateFees()
    },
    calculateFees () {
      this.totalFees = Object.values(this.balances).reduce((acc, item) => {
        if (item.balance.length > 0) {
          if (item.cycle_id === this.lastCycleId) {
            this.lastCycleTotalFees = item.balance[0].value / 10000
          }
          return acc + item.balance[0].value / 10000
        }
      }, 0)
    },
    async getClaims () {
      if (this.accountName) {
        const compositeKey = this.getCompositeKey(this.accountName, this.lastCycleId)
        const claimData = await this.$eos.rpc.get_table_rows({
          code: process.env.feepoolContract,
          scope: process.env.feepoolContract,
          table: 'claim',
          index_position: 2,
          key_type: 'i128',
          lower_bound: compositeKey,
          upper_bound: compositeKey
        })

        if (claimData && claimData.rows.length > 0) {
          claimData.rows.map((claim) => {
            this.claims[claim.cycle_id] = parseFloat(claim.amounts[0].quantity.replace(` ${process.env.efxToken}`, ''))
          })
        }
      }
    },
    bytesToHex (bytes) {
      let hex = ''
      for (const b of bytes) {
        const n = Number(b).toString(16)
        hex += (n.length === 1 ? '0' : '') + n
      }
      return hex
    },
    getCompositeKey (name, cycle) {
      const buf = new Serialize.SerialBuffer()
      buf.reserve(64)
      buf.pushName(name)
      const nameHex = this.bytesToHex(buf.getUint8Array(8)).match(/../g).reverse().join('')
      const cycleHex = this.bytesToHex(Long.fromNumber(cycle).toBytes())
      return `0x${cycleHex}${nameHex}`
    },
    getUserCycleClaim (cycleId) {
      return (this.claims[cycleId]) ? this.claims[cycleId] : 0
    },
    addStakeActions (actions) {
      if (this.$wallet.efxStaked > 0) {
        actions.push({
          account: process.env.stakingContract,
          name: 'claim',
          authorization: [{
            actor: this.$wallet.wallet.auth.accountName,
            permission: this.$wallet.wallet.auth.permission
          }],
          data: {
            owner: this.$wallet.wallet.auth.accountName,
            symbol: `4,${process.env.efxToken}`
          }
        })
      } else {
        actions.push({
          account: process.env.stakingContract,
          name: 'open',
          authorization: [{
            actor: this.$wallet.wallet.auth.accountName,
            permission: this.$wallet.wallet.auth.permission
          }],
          data: {
            owner: this.$wallet.wallet.auth.accountName,
            symbol: `4,${process.env.efxToken}`,
            ram_payer: this.$wallet.wallet.auth.accountName
          }
        })
      }

      actions.push({
        account: process.env.tokenContract,
        name: 'transfer',
        authorization: [{
          actor: this.$wallet.wallet.auth.accountName,
          permission: this.$wallet.wallet.auth.permission
        }],
        data: {
          from: this.$wallet.wallet.auth.accountName,
          to: process.env.stakingContract,
          quantity: `${Number.parseFloat(this.lastCycleUserFees).toFixed(4)} ${process.env.efxToken}`,
          memo: 'stake'
        }
      })

      return actions
    },
    claimRewards (stake = false) {
      let actions = [
        {
          account: process.env.feepoolContract,
          name: 'claimreward',
          authorization: [{
            actor: this.$wallet.wallet.auth.accountName,
            permission: this.$wallet.wallet.auth.permission
          }],
          data: {
            account: this.$wallet.wallet.auth.accountName
          }
        }
      ]

      if (stake) {
        actions = this.addStakeActions(actions)
      }

      this.$wallet.handleTransaction(actions)
        .then(() => {
          this.init()
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 25px;
  padding-bottom: 2px;
}

.total-dist {
  text-align: center;
}
</style>
