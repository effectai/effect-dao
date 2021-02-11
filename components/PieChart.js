import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false,
      onClick: this.clickHandle,
      legend: {
        onClick: () => {}
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex]
            const index = tooltipItem.index
            return dataset.labels[index] + ': ' + dataset.data[index]
          }
        }
      }
    })
  },
  methods: {
    clickHandle (point, event) {
      const item = event[0]
      if (item) {
        window.open(this.data.datasets[item._datasetIndex].meta[item._index].link, '_blank')
      }
    }
  }
}
