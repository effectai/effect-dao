<template>
  <div>
    <div class="columns stakes is-multiline mt-5">
      <div class="column is-half">
        <div class="box">
          <h5 class="subtitle box-title">
            Your Share
          </h5>
          <div v-if="accountName" class="has-text-centered">
            <div class="has-text-centered">
              <h3 class="subtitle is-3 has-text-weight-bold">
                <ICountUp v-if="isFinite(lastCycleUserFees)" :end-val="lastCycleUserFees" />
                <span v-else>...</span>
                <span class="symbol">{{ efxToken }}</span>
              </h3>
              <h6 v-if="isFinite(lastCycleUserFees)">
                {{ lastCycleUserShare }}% of pool
              </h6>
            </div>
            <div v-if="getUserCycleClaim(lastCycleId) > 0" class="claimed has-text-success">
              You successfully claimed your share for this cycle!
            </div>
            <div v-else class="buttons">
              <button
                class="button is-primary is-fullwidth rainbow-btn"
                :class="{ 'is-loading': loading }"
                :disabled="!canClaim"
                @click="claimRewards(true)"
              >
                Claim & Stake Rewards
              </button>
              <button
                class="button is-fullwidth is-text is-small mb-4"
                style="margin-top: 2px;"
                :class="{ 'is-loading': loading }"
                :disabled="!canClaim"
                @click="claimRewards(false)"
              >
                or claim without staking
              </button>
            </div>
          </div>
          <div v-else class="has-text-centered">
            <br>
            <a class="button is-secondary" @click="$wallet.loginModal = true">
              <strong>Connect Wallet</strong>
            </a>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="box">
          <h5 class="subtitle box-title">
            Cycle {{ lastCycleId }}: Total Fees
          </h5>
          <div class="has-text-centered">
            <h3 class="subtitle is-3 has-text-weight-bold">
              <ICountUp v-if="lastCycleTotalFees !== null" :end-val="lastCycleTotalFees" />
              <span v-else>...</span>
              <span class="symbol">{{ efxToken }}</span>
            </h3>
          </div>
          <h5 class="subtitle box-title mt-6">
            Cycle {{ lastCycleId }}: Total Vote Weight
          </h5>
          <div class="has-text-centered">
            <h3 class="subtitle has-text-weight-bold is-4">
              <ICountUp v-if="lastCycleTotalWeight !== null" :end-val="lastCycleTotalWeight" />
              <span v-else>...</span>
            </h3>
          </div>
        </div>
      </div>

      <div class="column is-full">
        <div class="box">
          <h5 class="subtitle box-title">
            Cycle Distribution History
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
                  <td>{{ balance.cycle_id }}</td>
                  <td>
                    <span v-if="balance.balance.length > 0">
                      {{ balance.balance[0].value / 10000 }} {{ efxToken }}
                    </span>
                  </td>
                  <td v-if="balance.cycle_id > lastCycleId">
                    Can be claimed in next cycle
                  </td>
                  <td v-else-if="getUserCycleClaim(balance.cycle_id) > 0">
                    {{ getUserCycleClaim(balance.cycle_id) }} {{ efxToken }}
                  </td>
                  <td v-else>
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h5 class="subtitle box-title">
            Other Distribution History
          </h5>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th>Distribution Type</th>
                  <th>Amount </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Effect Network Fee Distribution II</td>
                  <td>{{ genesisAirdrop.toFixed(0) }} EFX</td>
                </tr>
                <tr>
                  <td>Effect Network Fee Distribution</td>
                  <td>{{ genesisAirdrop.toFixed(0) }} EFX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <form v-if="isTestnet">
      <h4>Dev tools (override)</h4>
      <label for="cycle">LastCycleId</label>
      <input id="cycle" v-model="cycleOverride" type="number">
      <br>
      <label for="account">accountName</label>
      <input id="account" v-model="accountOverride" type="text">
      <br>
      <label for="claim">canClaim</label>
      <input id="claim" v-model="claimOverride" type="checkbox">
      <br>
      lastCycleUserWeight: {{ lastCycleUserWeight }}
    </form>
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
      loading: true,

      balances: [],
      claims: {},
      totalFees: null,
      lastCycleTotalFees: null,
      lastCycleTotalWeight: null,
      lastCycleUserWeight: null,
      efxToken: process.env.efxToken,

      // Testing/Dev
      isTestnet: process.env.eosNodeUrl.includes('kylin'),
      cycleOverride: null,
      accountOverride: null,
      claimOverride: null
    }
  },

  computed: {
    accountName () {
      return (this.accountOverride) ? this.accountOverride : (this.$wallet && this.$wallet.wallet) ? this.$wallet.wallet.auth.accountName : null
    },
    distributionBalances () {
      const tbl = this.balances
      return tbl.reverse() // reverse the temp var instead of the original var
    },
    lastCycleId () {
      return (this.cycleOverride) ? this.cycleOverride : (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id - 1 : null
    },
    lastCycleUserFees () {
      return (this.lastCycleTotalFees > 0 && this.lastCycleUserWeight > 0) ? Math.trunc((this.lastCycleTotalFees * 10000) / this.lastCycleTotalWeight) / 10000 * this.lastCycleUserWeight : 0
    },
    lastCycleUserShare () {
      return (this.lastCycleUserFees > 0) ? (this.lastCycleUserWeight / this.lastCycleTotalWeight * 100).toFixed(2) : 0
    },
    canClaim () {
      return (this.claimOverride) ? this.claimOverride : !this.claims[this.lastCycleId] && this.lastCycleUserFees > 0 && isFinite(this.lastCycleUserFees)
    },
    genesisAirdrop () {
      return this.$wallet.genesisAirdrop
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
      this.loading = true
      if (!this.lastCycleId) {
        return
      }

      const feeData = await this.$eos.rpc.get_table_rows({
        code: process.env.feepoolContract,
        scope: process.env.feepoolContract,
        table: 'balance'
      })

      if (feeData && feeData.rows.length > 0) {
        this.balances = feeData.rows
        this.getClaims(this.balances)

        const cycleData = await this.$eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'cycle',
          lower_bound: this.lastCycleId,
          upper_bound: this.lastCycleId
        })

        if (cycleData && cycleData.rows.length > 0) {
          this.lastCycleTotalWeight = cycleData.rows[0].total_vote_weight
        }

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
          this.getLastCycleUserWeight(proposalIds)
        }
      }

      this.calculateFees()
      this.loading = false
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
    getLastCycleUserWeight (proposalIds) {
      this.lastCycleUserWeight = 0

      if (this.accountName) {
        proposalIds.map(async (proposalId) => {
          const compositeKey = this.getCompositeKey(this.accountName, proposalId)
          const claimData = await this.$eos.rpc.get_table_rows({
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            index_position: 2,
            key_type: 'i128',
            lower_bound: compositeKey,
            upper_bound: compositeKey
          })

          if (claimData && claimData.rows.length > 0) {
            this.lastCycleUserWeight += claimData.rows[0].weight
          }
        })
      }
    },
    getClaims (balances) {
      if (this.accountName) {
        balances.map(async (balance) => {
          const compositeKey = this.getCompositeKey(this.accountName, balance.cycle_id)
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
        })
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
    claimRewards (andStake) {
      this.loading = true
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

      if (andStake) {
        actions = this.addStakeActions(actions)
      }

      this.$wallet.handleTransaction(actions)
        .then(() => {
          setTimeout(this.init, 3000)
        })
        .catch(() => {
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

.claimed {
  font-weight: bold;
  max-width: 200px;
  margin: 40px auto 27px;
}
.table { width: 100%; }
</style>
