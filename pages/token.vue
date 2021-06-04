<template>
  <div>
    <div class="box">
      <h4 class="box-title subtitle">
        Token Map
      </h4>
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th class="has-text-centered">
                Tokens
              </th>
              <th class="has-text-left">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(label, index) in chartData.datasets[0].labels" :key="label">
              <td>
                {{ label }} <span v-if="chartData.datasets[0].meta[index].locked" class="tag">locked</span>
                <span v-if="chartData.datasets[0].meta[index].description" class="is-pulled-right" :data-tooltip="chartData.datasets[0].meta[index].description">
                  <font-awesome-icon :icon="['fas', 'info-circle']" />
                </span>
              </td>
              <td class="has-text-right">
                {{ hello(balances[chartData.datasets[0].meta[index].balanceKey]) }} EFX
              </td>
              <td class="has-text-left">
                <a
                  :href="chartData.datasets[0].meta[index].link"
                  target="_blank"
                >{{ chartData.datasets[0].meta[index].addressName }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pie-chart v-if="!loading" :data="chartData" :options="chartOptions" />
    </div>
    <div class="box">
      <h4 class="box-title subtitle">
        Smart Contracts
      </h4>
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contract in contracts" :key="contract.account">
              <td>{{ contract.name }}</td>
              <td>{{ contract.description }}</td>
              <td><a :href="contract.link" target="_blank">{{ contract.account }}</a></td>
              <td><a :href="contract.source" target="_blank">view source</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="box">
      <h4 class="box-title subtitle">
        Stats
      </h4>
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in stats" :key="stat.id">
              <td>{{ stat.name }}</td>
              <td>{{ stat.value }}</td>
              <td>{{ stat.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="box">
      <h4 class="box-title subtitle">
        Other Resources
      </h4>
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a
                  href="https://github.com/effectai/effect-network-eos/blob/master/constitution/constitution.md"
                  target="_blank"
                >The EffectDAO Constitution</a>
              </td>
              <td>Github</td>
            </tr>
            <tr>
              <td><a href="https://docs.effect.ai/" target="_blank">The Effect Network Documentation</a></td>
              <td>Website</td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://medium.com/effect-ai/the-effect-dao-effect-staking-protocol-2-0-774dc5c2b857"
                  target="_blank"
                >Effect Staking Protocol 2.0</a>
              </td>
              <td>Blog</td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://medium.com/effect-ai/the-effect-dao-voting-adopt-to-survive-c17252a90a47"
                  target="_blank"
                >The EffectDAO Voting</a>
              </td>
              <td>Blog</td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://medium.com/effect-ai/the-effect-dao-the-guardians-of-the-galaxy-pool-cb7c671984a9"
                  target="_blank"
                >The Effect Guardians</a>
              </td>
              <td>Blog</td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://medium.com/effect-ai/effectdao-proposal-system-is-now-live-on-eos-mainnet-e05710b79d21"
                  target="_blank"
                >EffectDAO Proposal System</a>
              </td>
              <td>Blog</td>
            </tr>
            <tr>
              <td>
                <a href="https://effect.ai/download/effect_whitepaper.pdf" target="_blank">The Effect Network
                  Whitepaper</a>
              </td>
              <td>PDF</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.js'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      loading: true,
      totalVoteWeight: 0,
      totalMembers: 300,
      membersLowerBound: '13528614985990483600', // Hardcode lower bound from 300 members to minimize amount of fetches
      balances: {
        daoBalance: 0,
        liquidBalance: 0,
        stakeBalance: 0,
        unswappedBalance: 0,
        // foundationBalance: 195375000,
        foundationBalance: 100000000,
        liquidityBalance: 88447533,
        communityBalance: 5000000,
        teamBalance: 32125000,
        maxSupply: 650000000
      },
      contracts: [
        {
          name: 'Effect Tokens',
          description: 'Contract managing the EFX and NFX tokens',
          account: 'effecttokens',
          link: 'https://bloks.io/account/effecttokens?loadContract=true&tab=Tables&table=stat&account=effecttokens&scope=EFX&limit=100',
          source: 'https://github.com/effectai/effect-network/tree/master/contracts/token'
        },
        {
          name: 'Effect Staking Protocol',
          description: 'Implemetation of the Effect Staking Protocol 2.0',
          account: 'efxstakepool',
          link: 'https://bloks.io/account/efxstakepool?loadContract=true&tab=Tables&account=efxstakepool&scope=efxstakepool&limit=100',
          source: 'https://github.com/effectai/effect-network-eos/blob/master/contracts/stake/stake.cpp'
        },
        {
          name: 'Token Swap',
          description: 'Verifies NEO transactions with an Oracle and issues EFX tokens on EOS',
          account: 'efxtokenswap',
          link: 'https://bloks.io/account/efxtokenswap?loadContract=true&tab=ABI&account=efxtokenswap&scope=efxtokenswap&limit=100&table=nep5',
          source: 'https://github.com/effectai/effect-network-eos/blob/master/contracts/swap/swap.cpp'
        },
        {
          name: 'EffectDAO',
          description: 'Holds the registry of the members and guardians of the EffectDAO',
          account: 'theeffectdao',
          link: 'https://bloks.io/account/theeffectdao?loadContract=true&tab=Tables&account=theeffectdao&scope=theeffectdao&limit=100&table=member',
          source: 'https://github.com/effectai/effect-network/blob/master/contracts/dao/dao.cpp'
        },
        {
          name: 'Effect Proposals',
          description: 'Stores proposals and handles the voting machanism of the EffectDAO',
          account: 'daoproposals',
          link: 'https://bloks.io/account/daoproposals?loadContract=true&tab=Tables&account=daoproposals&scope=daoproposals&limit=100&table=proposal',
          source: 'https://github.com/effectai/effect-network-eos/blob/proposals/contracts/effect-proposals/effect-proposals.cpp'
        },
        {
          name: 'Effect.AI Token on NEO (legacy)',
          description: 'Smart Contract on the NEO blockchain for the NEP5 EFX token',
          account: 'acbc5...7e6f9',
          link: 'https://neotracker.io/asset/acbc532904b6b51b5ea6d19b803d78af70e7e6f9',
          source: 'https://github.com/effectai/effect-network-neo/blob/master/contracts/java/token/src/ai/effect/token/EffectToken.java'
        }
      ],
      chartOptions: {
        cutoutPercentage: 10
      }
    }
  },
  computed: {
    lastCycleId () {
      return (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id - 1 : null
    },
    stats () {
      return [
        {
          name: 'Members',
          description: '',
          value: this.totalMembers
        },
        // {
        //   name: 'Guardians',
        //   description: '',
        //   value: 97
        // },
        {
          name: 'Total Vote Weight',
          description: '',
          value: this.totalVoteWeight
        },
        {
          name: 'Next Cycle',
          description: '',
          value: '9-4-2021'
        },
        {
          name: 'Distribution Strategy',
          description: '',
          value: '100% reward'
        },
        {
          name: 'Recycle Strategy',
          description: '',
          value: '70% hold, 30% distribute'
        }
      ]
    },
    chartData () {
      return {
        // labels: ['Circulating', 'Foundation'],
        labels: ['Liquid Supply', 'Stake Pool', 'Liquidity & Partnerships', 'Unswapped on NEO', 'Team Tokens', 'EffectDAO', 'Foundation'],
        datasets: [
          {
            name: 'Token Map',
            backgroundColor: ['#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#7e8a8c'],
            weight: 0.55,
            meta: [
              {
                addressName: 'effecttokens',
                link: 'https://bloks.io/tokens/EFX-eos-effecttokens',
                description: null, // 'Current supply in circulation and not locked in any staking or timelock.',
                balanceKey: 'liquidBalance'
              },
              {
                addressName: 'efxstakepool',
                locked: true,
                link: 'https://bloks.io/account/efxstakepool',
                description: 'Staked EFX.',
                balanceKey: 'stakeBalance'
              },
              {
                addressName: 'bsc.efx',
                link: 'https://bloks.io/account/bsc.efx',
                locked: false,
                description: 'Funds allocated for providing liquidity and partnership.',
                balanceKey: 'liquidityBalance'
              },
              {
                addressName: 'acbc532904b6b51b5ea6d19b803d78af70e7e6f9',
                link: 'https://neotracker.io/asset/acbc532904b6b51b5ea6d19b803d78af70e7e6f9',
                description: 'EFX tokens that did not swap to EOS yet.',
                balanceKey: 'unswappedBalance'
              },
              {
                addressName: 'AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                locked: true,
                link: 'https://neotracker.io/address/AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                description: null,
                balanceKey: 'teamBalance'
              },
              {
                addressName: 'treasury.efx',
                link: 'https://bloks.io/account/treasury.efx',
                locked: true,
                description: 'Tokens governed by the DAO, from here proposals are funded.',
                balanceKey: 'daoBalance'
              },
              {
                addressName: 'efx',
                link: 'https://bloks.io/account/efx',
                locked: true,
                description: null, // 'EFX locked by the foundation until 2021-09.',
                balanceKey: 'foundationBalance'
              }
            ],
            data: this.innerChartBalances,
            labels: ['Liquid Supply', 'Stake Pool', 'Liquidity & Partnerships', 'Unswapped on NEO', 'Team Tokens', 'EffectDAO', 'Foundation']
          }
        ]
      }
    },
    chartBalances () {
      return [
        // this.balances.liquidBalance + this.balances.unswappedBalance + this.balances.feepoolBalance + this.balances.marketingBalance + this.balances.liquidityBalance + this.balances.communityBalance,
        this.balances.liquidBalance + this.balances.liquidityBalance,
        this.balances.foundationBalance + this.balances.teamBalance + this.balances.stakeBalance + this.balances.daoBalance
      ]
    },
    innerChartBalances () {
      return [
        this.balances.liquidBalance,
        this.balances.stakeBalance,
        this.balances.liquidityBalance,
        this.balances.unswappedBalance,
        this.balances.teamBalance,
        this.balances.daoBalance,
        this.balances.foundationBalance
      ]
    }
  },
  async mounted () {
    await this.getBalances()
    await this.getTotalVoteWeight()
    this.getDaoMembers()
    this.loading = false
  },
  methods: {
    async getBalances () {
      const circSupply = parseInt((await fetch('https://www.api.bloks.io/tokens/EFX-eos-effecttokens').then(data => data.json()))[0].supply.circulating)
      this.balances.daoBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'treasury.efx', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.stakeBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'efxstakepool', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.liquidBalance = circSupply - this.balances.daoBalance - this.balances.stakeBalance - this.balances.liquidityBalance - this.balances.foundationBalance
      this.balances.unswappedBalance = 650000000 - (this.balances.liquidBalance + this.balances.stakeBalance + this.balances.foundationBalance + this.balances.teamBalance + this.balances.liquidityBalance + this.balances.daoBalance)
    },

    // FIXME is this still right?
    async getTotalVoteWeight () {
      const cycleData = await this.$eos.rpc.get_table_rows({
        code: process.env.proposalContract,
        scope: process.env.proposalContract,
        table: 'cycle',
        lower_bound: this.lastCycleId,
        upper_bound: this.lastCycleId
      })

      if (cycleData && cycleData.rows.length > 0) {
        this.totalVoteWeight = cycleData.rows[0].total_vote_weight
      }
    },
    async getDaoMembers () {
      while (this.membersLowerBound != null) {
        const members = await this.$eos.rpc.get_table_rows({
          code: process.env.daoContract,
          scope: process.env.daoContract,
          table: 'member',
          lower_bound: this.membersLowerBound,
          limit: 100
        })

        if (members && members.rows.length > 0) {
          this.totalMembers += members.rows.length
        }

        this.membersLowerBound = (members.next_key.length > 0) ? members.next_key : null
      }
    },
    hello (x) {
      if (!x) {
        return
      }

      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style lang="scss">
table {
  font-size: 0.7em;

  .tag {
    font-size: 0.9em;
    height: inherit;
  }
}
</style>
