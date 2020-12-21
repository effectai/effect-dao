<template>
  <div>
    <div class="box">
      <h4 class="box-title">Smart Contracts</h4>
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
          <td><a :href="contract.source" target="_blank">{{ contract.source }}</a></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="box">
      <h4 class="box-title">Token Map</h4>
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
        <tr>
          <th>Name</th>
          <th>Tokens</th>
          <th>Address</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(label, index) in chartData.labels" :key="label">
          <td>{{ label }} <span class="tag" v-if="chartData.datasets[0].meta[index].locked">locked</span></td>
          <td>{{chartData.datasets[0].data[index]}} EFX</td>
          <td><a :href="chartData.datasets[0].meta[index].link" target="_blank">{{ chartData.datasets[0].meta[index].addressName }}</a></td>
        </tr>
        </tbody>
      </table>
      <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
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
          link: 'https://bloks.io/account/effecttokens',
          source: 'https://github.com/effectai'
        }
      ],
      chartOptions: {
        hoverBorderWidth: 2000
      },
      chartData: {
        labels: ['EffectDAO', 'Circulating Supply', 'Foundation Tokens', 'Team Tokens'],
        datasets: [
          {
            label: 'Token Map',
            backgroundColor: ['#E46651', '#41B883', '#A4B8BB', '#00D8FF'],
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
                addressName: 'locked.efx',
                link: 'https://bloks.io/account/locked.efx',
                locked: true
              },
              {
                addressName: 'AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno',
                locked: true,
                link: 'https://neotracker.io/address/AXRnUdHCY6W1G3mzYJ77mLj98Kv8MKqPno'
              }
            ],
            data: [170331473, 252168527, 130000000, 97500000]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
</style>
