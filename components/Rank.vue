<template>
  <div class="treasury block-shadow">
    <h1 class="block-title">
      Rank {{rank.currentRank}}
    </h1>
    <div class="block-columns has-text-centered columns mt-3">
      <div class="next-level column is-one-third">
        <div class="treasury block-shadow-outside">
          <h1 class="block-title">
            Next level
          </h1>
          <div>
            <ICountUp :options="{decimalPlaces: 0, startVal: rank.nextRank.power}" :end-val="Math.max(0,rank.nextRank.power - power)" />
            <b class="symbol is-size-7">EP Needed</b>
          </div>
          <div>
            <ICountUp :options="{decimalPlaces: 0, startVal: rank.nextRank.nfx}" :end-val="Math.max(0, rank.nextRank.nfx - nfxStaked)" />
            <b class="symbol is-size-7">NFX Needed</b>
          </div>
        </div>
      </div>
      <div class="column progress-bar">
        <p class="is-pulled-left">
          {{rank.currentRank}}
        </p>
        <p class="is-pulled-right">
          {{rank.currentRank + 1}}
        </p>
        <progress class="progress is-large" :value="progress" max="100">
          {{progress}}%
        </progress>
        <b>{{progress}}%</b>
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
      mounted: false
    }
  },

  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.mounted = true
      }, 100)
    })
  },

  computed: {
    rank () {
      return this.$wallet.rank
    },
    power () {
      return this.$wallet.power
    },
    nfxStaked () {
      return this.$wallet.nfxStaked
    },
    progress () {
      if (!this.mounted) {
        return 0
      }
      return ((this.power - this.rank.currentRequirements.power) / (this.rank.nextRank.power - this.rank.currentRequirements.power)) * 100
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
progress::-moz-progress-bar {
  background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
  background-size: 200%;
  height: 35px;
  border-radius: 8px 0 0 8px;
  animation: moveGradient 3s linear infinite;
  transition: width 0.8s ease;
}
progress::-webkit-progress-value  {
  // background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
  background: $accent;
  background-size: 200%;
  height: 35px;
  border-radius: 8px 0 0 8px;
  animation: moveGradient 3s linear infinite;
  transition: width 0.8s ease;
}

@keyframes moveGradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0%;
  }
}
</style>
