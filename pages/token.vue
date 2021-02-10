<template>
  <div>
    <div class="box">
      <h4 class="box-title">
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
            <tr v-for="(label, index) in chartData.datasets[1].labels" :key="label">
              <td>
                {{ label }} <span v-if="chartData.datasets[1].meta[index].locked" class="tag">locked</span>
                <span class="is-pulled-right" :data-tooltip="chartData.datasets[1].meta[index].description">
                  <font-awesome-icon :icon="['fas', 'info-circle']" />
                </span>
              </td>
              <td class="has-text-right">
                {{ hello(balances[chartData.datasets[1].meta[index].balanceKey]) }} EFX
              </td>
              <td class="has-text-left">
                <a
                  :href="chartData.datasets[1].meta[index].link"
                  target="_blank"
                >{{ chartData.datasets[1].meta[index].addressName }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pie-chart v-if="!loading" :data="chartData" :options="chartOptions" />
    </div>
    <div class="box">
      <h4 class="box-title">
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
      <h4 class="box-title">
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
      <h4 class="box-title">
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
                >The Effect DAO Voting</a>
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
      balances: {
        daoBalance: 0,
        proposalBalance: 0,
        liquidBalance: 0,
        stakeBalance: 0,
        feepoolBalance: 0,
        unswappedBalance: 56459627,
        foundationBalance: 195375000,
        teamBalance: 32125000,
        maxSupply: 650000000
      },
      stats: [
        {
          name: 'Members',
          description: '',
          value: 296
        },
        {
          name: 'Guardians',
          description: '',
          value: 97
        },
        {
          name: 'Total Vote Weight',
          description: '',
          value: '443'
        },
        {
          name: 'Next Cycle',
          description: '',
          value: '29-1-2021'
        },
        {
          name: 'Distribution Strategy',
          description: '',
          value: '100% reward'
        },
        {
          name: 'Recycle Strategy',
          description: '',
          value: '100% hold'
        }
      ],
      contracts: [
        {
          name: 'Effect Tokens',
          description: 'Contract managing the EFX and NFX tokens',
          account: 'effecttokens',
          link: 'https://bloks.io/account/effecttokens?loadContract=true&tab=Tables&table=stat&account=effecttokens&scope=EFX&limit=100',
          source: 'https://github.com/effectai/effect-network-eos/tree/master/contracts/effect-token'
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
          name: 'Effect DAO',
          description: 'Holds the registry of the members and guardians of the EffectDAO',
          account: 'theeffectdao',
          link: 'https://bloks.io/account/theeffectdao?loadContract=true&tab=Tables&account=theeffectdao&scope=theeffectdao&limit=100&table=member',
          source: 'https://github.com/effectai/effect-network-eos/blob/master/contracts/effect-dao/effect-dao.cpp'
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
          source: 'https://github.com/effectai/effect-network/blob/master/contracts/java/token/src/ai/effect/token/EffectToken.java'
        }
      ],
      chartOptions: {}
    }
  },
  computed: {
    chartData () {
      return {
        labels: ['Circulating Supply', 'Locked Supply'],
        datasets: [
          {
            name: 'Token Map',
            backgroundColor: ['#41B883', '#E46651'],
            weight: 0.9,
            meta: [
              {
                addressName: 'treasury.efx',
                link: 'https://bloks.io/account/treasury.efx',
                locked: true
              },
              {
                addressName: 'effecttokens',
                link: 'https://bloks.io/tokens/EFX-eos-effecttokens'
              },
              {
                addressName: 'acbc532904b6b51b5ea6d19b803d78af70e7e6f9',
                link: 'https://neotracker.io/asset/acbc532904b6b51b5ea6d19b803d78af70e7e6f9'
              },
              {
                // addressName: 'locked.efx',
                // link: 'https://bloks.io/account/locked.efx',
                addressName: 'AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                link: 'https://neotracker.io/address/AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                locked: true
              },
              {
                addressName: 'AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                locked: true,
                link: 'https://neotracker.io/address/AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno'
              }
            ],
            data: this.chartBalances,
            labels: ['Circulating Supply', 'Locked Supply']
          },
          {
            name: 'Token Map',
            backgroundColor: ['#0dd925', '#499166', '29ab5d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#7e8a8c'],
            weight: 0.7,
            meta: [
              {
                addressName: 'effecttokens',
                link: 'https://bloks.io/tokens/EFX-eos-effecttokens',
                description: 'Current supply in circulation and not locked in any staking or timelock.',
                balanceKey: 'liquidBalance'
              },
              {
                addressName: 'acbc532904b6b51b5ea6d19b803d78af70e7e6f9',
                link: 'https://neotracker.io/asset/acbc532904b6b51b5ea6d19b803d78af70e7e6f9',
                description: 'EFX tokens that did not swap to EOS yet.',
                balanceKey: 'unswappedBalance'
              },
              {
                addressName: 'fees.efx',
                link: 'https://bloks.io/account/fees.efx',
                description: 'Collected fees, claimable by network contributors.',
                balanceKey: 'feepoolBalance'
              },
              {
                addressName: 'treasury.efx',
                link: 'https://bloks.io/account/treasury.efx',
                locked: true,
                description: 'Tokens governed by the DAO, from here proposals are funded.',
                balanceKey: 'daoBalance'
              },
              {
                addressName: 'daoproposals',
                link: 'https://bloks.io/account/daoproposals',
                locked: true,
                description: 'The funds reserved for the scheduled cycles.',
                balanceKey: 'proposalBalance'
              },
              {
                addressName: 'efxstakepool',
                locked: true,
                link: 'https://bloks.io/account/efxstakepool',
                description: 'Staked EFX.',
                balanceKey: 'stakeBalance'
              },
              {
                addressName: 'AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                locked: true,
                link: 'https://neotracker.io/address/AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                description: 'EFX locked by the team on NEO until 2021-04.',
                balanceKey: 'teamBalance'
              },
              {
                // addressName: 'locked.efx',
                // link: 'https://bloks.io/account/locked.efx',
                addressName: 'AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                link: 'https://neotracker.io/address/AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                locked: true,
                description: 'EFX locked by the foundation until 2021-09.',
                balanceKey: 'foundationBalance'
              }
            ],
            data: this.innerChartBalances,
            labels: ['Liquid Supply', 'Unswapped on NEO', 'Feepool', 'Effect DAO', 'Proposal Funds', 'Stake Pool', 'Team Tokens', 'Foundation Tokens']
          }
        ]
      }
    },
    chartBalances () {
      return [
        this.balances.liquidBalance + this.balances.unswappedBalance + this.balances.feepoolBalance,
        this.balances.foundationBalance + this.balances.teamBalance + this.balances.stakeBalance + this.balances.daoBalance + this.balances.proposalBalance
      ]
    },
    innerChartBalances () {
      return [
        this.balances.liquidBalance,
        this.balances.unswappedBalance,
        this.balances.feepoolBalance,
        this.balances.daoBalance,
        this.balances.proposalBalance,
        this.balances.stakeBalance,
        this.balances.teamBalance,
        this.balances.foundationBalance
      ]
    }
  },
  mounted () {
    this.getBalances()
  },
  methods: {
    async getBalances () {
      const circSupply = parseInt((await fetch('https://www.api.bloks.io/tokens/EFX-eos-effecttokens').then(data => data.json()))[0].supply.circulating)
      this.balances.daoBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'treasury.efx', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.proposalBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'daoproposals', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.stakeBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'efxstakepool', process.env.efxToken))[0].replace(' EFX', ''))
      // this.balances.feepoolBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'fees.efx', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.liquidBalance = circSupply - this.balances.daoBalance - this.balances.stakeBalance
      this.loading = false
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
