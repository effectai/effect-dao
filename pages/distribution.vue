<template>
  <div>
    <div class="columns stakes is-multiline mt-5">
      <div class="column is-half">
        <div class="box">
          <h5 class="box-title">
            Last Cycle Fees
          </h5>
          <div class="has-text-centered">
            <h3>
              <ICountUp :end-val="lastCycleFees" />
              <span class="symbol">EFX</span>
            </h3>
          </div>
          <h5 class="box-title mt-6">
            Last Cycle Votes
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
                <ICountUp :end-val="lastCycleFees * (lastCycleUserWeight / lastCycleTotalWeight)" />
                <span class="symbol">EFX</span>
              </h3>
              <h6 v-if="lastCycleUserWeight > 0">
                {{ (lastCycleUserWeight / lastCycleTotalWeight * 100).toFixed(2) }}% of pool
              </h6>
            </div>
            <div class="buttons">
              <button
                class="button is-primary is-fullwidth"
                :class="{ 'is-loading': loading }"
                :disabled="true"
              >
                Claim Rewards
              </button>
              <button
                class="button is-primary is-fullwidth"
                :class="{ 'is-loading': loading }"
                :disabled="true"
              >
                Claim & Stake Rewards
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
                      {{ balance.balance[0].value / 10000 }} EFX
                    </span>
                  </th>
                  <th>0 EFX</th>
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

export default {
  components: {
    ICountUp
  },

  data () {
    return {
      loading: false,
      balances: [],
      lastCycleTotalWeight: 0,
      lastCycleUserWeight: 0
    }
  },

  computed: {
    accountName () {
      return (this.$wallet && this.$wallet.wallet) ? this.$wallet.wallet.auth.accountName : null
    },
    totalBalance () {
      return Object.values(this.balances).reduce((acc, item) => {
        if (item.balance.length > 0) {
          return acc + item.balance[0].value / 10000
        }
      }, 0)
    },
    lastCycleFees () {
      return (this.balances.length > 0) ? this.balances[this.balances.length - 1].balance[0].value / 10000 : 0
    },
    distributionBalances () {
      const tbl = this.balances
      return tbl.reverse() // reverse the temp var instead of the original var
    }
  },

  watch: {
    accountName () {
      this.init()
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      const feeData = await this.$eos.rpc.get_table_rows({
        code: process.env.feepoolContract,
        scope: process.env.feepoolContract,
        table: 'balance'
      })

      if (feeData && feeData.rows.length > 0) {
        this.balances = feeData.rows
        // const lastCycleId = this.balances[this.balances.length - 1].cycle_id
        const lastCycleId = 1

        const proposalData = await this.$eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'proposal',
          key_type: 'i64',
          index_position: 3,
          lower_bound: lastCycleId,
          upper_bound: lastCycleId
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
