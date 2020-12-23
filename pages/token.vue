<template>
  <div>
    <div class="box">
      <h4 class="box-title">Token Map</h4>
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th>Name</th>
            <th class="has-text-centered">Tokens</th>
            <th class="has-text-left">Address</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(label, index) in chartData.datasets[1].labels" :key="label">
            <td>{{ label }} <span class="tag" v-if="chartData.datasets[1].meta[index].locked">locked</span></td>
            <td class="has-text-right">{{hello(chartData.datasets[1].data[index])}} EFX</td>
            <td class="has-text-left"><a :href="chartData.datasets[1].meta[index].link" target="_blank">{{ chartData.datasets[1].meta[index].addressName }}</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
    </div>
    <div class="box">
      <h4 class="box-title">Smart Contracts</h4>
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
      <h4 class="box-title">Other Resources</h4>
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
            <td><a href="https://github.com/effectai/effect-network-eos/blob/master/constitution/constitution.md" target="_blank">The EffectDAO Constitution</a></td>
            <td>Github</td>
          </tr>
          <tr>
            <td><a href="https://docs.effect.ai/" target="_blank">The Effect Network Documentation</a></td>
            <td>Website</td>
          </tr>
          <tr>
            <td><a href="https://medium.com/effect-ai/the-effect-dao-effect-staking-protocol-2-0-774dc5c2b857" target="_blank">Effect Staking Protocol 2.0</a></td>
            <td>Blog</td>
          </tr>
          <tr>
            <td><a href="https://medium.com/effect-ai/the-effect-dao-voting-adopt-to-survive-c17252a90a47" target="_blank">The Effect DAO Voting</a></td>
            <td>Blog</td>
          </tr>
          <tr>
            <td><a href="https://medium.com/effect-ai/the-effect-dao-the-guardians-of-the-galaxy-pool-cb7c671984a9" target="_blank">The Effect Guardians</a></td>
            <td>Blog</td>
          </tr>
          <tr>
            <td><a href="https://medium.com/effect-ai/effectdao-proposal-system-is-now-live-on-eos-mainnet-e05710b79d21" target="_blank">EffectDAO Proposal System</a></td>
            <td>Blog</td>
          </tr>
          <tr>
            <td><a href="https://effect.ai/download/effect_whitepaper.pdf" target="_blank">The Effect Network Whitepaper</a></td>
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
        }
      ],
      chartOptions: {
      },
      chartData: {
        labels: ['EffectDAO', 'Circulating Supply', 'Future Funding', 'Team Tokens'],
        datasets: [
          {
            name: 'Token Map',
            backgroundColor: ['#E46651', '#41B883', '#A4B8BB', '#00D8FF', '#00D8FF'],
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
            data: [170331473 + 500, 195708900 + 650000000 - (170331473 + 500 + 195708900 + 130000000 + 97500000), 130000000, 97500000],
            labels: ['EffectDAO', 'Circulating Supply', 'Future Funding', 'Team Tokens']
          },
          {
            name: 'Token Map',
            backgroundColor: ['#e4744c', '#e44707', '#0dd925', '#499166', '#376d4c', '#A4B8BB', '#00D8FF'],
            meta: [
              {
                addressName: 'treasury.efx',
                link: 'https://bloks.io/account/treasury.efx',
                locked: true
              },
              {
                addressName: 'daoproposals',
                link: 'https://bloks.io/account/daoproposals',
                locked: true
              },
              {
                addressName: 'effecttokens',
                link: 'https://bloks.io/tokens/EFX-eos-effecttokens'
              },
              {
                addressName: 'efxstakepool',
                link: 'https://bloks.io/account/efxstakepool'
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
            data: [170331473, 500, (366040373 - 170331473 - 107956552), 107956552, 650000000 - (170331473 + 500 + 195708900 + 130000000 + 97500000), 130000000, 97500000],
            labels: ['EffectDAO', 'Proposal Funds', 'Liquid Supply', 'Stake Pool', 'Unswapped on NEO', 'Future Funding', 'Team Tokens']
          }
        ]
      }
    }
  },
  methods: {
    hello (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style lang="scss">
  table {
    font-size: 0.7em;
    .tag { font-size: 0.9em; height: inherit; }
  }
</style>
