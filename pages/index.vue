<template>
  <div class="index">
    <div class="intro">
      <h1>Welcome to the Effect Dashboard.</h1>
      <h4>Stake, vote and swap all in one place!</h4>
    </div>

    <div class="treasury block-shadow">
      <h2 class="block-title">
        Staking Overview
      </h2>
      <div class="columns">
        <div class="column">
          <div class="icon">
            🔐
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="poolBalance > 0" :end-val="poolBalance" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">EFX in staking pool</span>
          </div>
        </div>
        <div class="column">
          <div class="icon">
            💲
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="poolValue > 0" :options="{ prefix: '$' }" :end-val="poolValue" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">staking pool value</span>
          </div>
        </div>
        <div class="column">
          <div class="icon">
            😲
          </div>
          <div class="text">
            <span class="high">
              <ICountUp v-if="percentStaked > 0" :options="{ suffix: '%' }" :end-val="percentStaked" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">of circ. supply staked</span>
          </div>
        </div>
      </div>
    </div>

    <div class="treasury block-shadow mt-5">
      <h2 class="block-title">
        Effect Force Overview
      </h2>
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
      efxPrice: 0,
      poolBalance: 0,
      circSupply: 200000000
    }
  },

  computed: {
    poolValue () {
      return parseInt(this.efxPrice * this.poolBalance)
    },
    percentStaked () {
      return parseInt((this.poolBalance / this.circSupply) * 100)
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      await this.getPoolBalance()
      await this.getEFXPrice()
    },
    async getPoolBalance () {
      const res = await this.$eos.rpc.get_currency_balance('effecttokens', 'efxstakepool', 'EFX')
      this.poolBalance = parseFloat(res[0].replace(' EFX', ''))
    },
    async getEFXPrice () {
      this.efxPrice = await fetch('https://api.coingecko.com/api/v3/coins/effect-ai/tickers')
        .then(data => data.json())
        .then((data) => {
          return data.tickers[0].converted_last.usd
        })
    }
  }
}
</script>

<style lang="scss">
  .index {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;

    .intro {
      padding: 40px 0;
      text-align: center;
      h4 {
        font-weight: 400;
      }
    }

    .columns {
      margin-top: 20px;
      padding-bottom: 15px;
      margin-left: 0;
    }

    .text {
      float: left;
    }

    .icon {
      float: left;
      font-size: 32px;
      margin-top: 18px;
      margin-right: 20px;
    }

    .high {
      font-size: 22px;
      font-weight: 700;
    }

    .low {
      font-weight: 300;
    }
  }
</style>
