<template>
  <div class="treasury block-shadow" v-if="rank">
    <div v-if="rank.currentRank > 0" :class="['rank-icon', 'rank-'+rank.currentRank]"><img width="64px" :src="'/img/guardian-icons/guardian-'+rank.currentRank+'.png'" /></div>
    <h1 :class="['rank-title', 'rank-'+rank.currentRank]">
      Rank {{rank.currentRank}}
    </h1>
    <div class="block-columns has-text-centered columns mt-3">
      <div class="next-level column is-one-third" v-if="rank.nextRank">
        <div class="treasury block-shadow-outside">
          <h1 :class="['rank-title', 'rank-'+(rank.currentRank+1), 'small']">
            Next Rank <b>{{rank.currentRank+1}}</b>
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
      <div class="column progress-bar" v-if="rank.nextRank">
        <p class="is-pulled-left">
          {{rank.currentRank}}
        </p>
        <p class="is-pulled-right" v-if="rank.currentRank < 10">
          next: <b>{{rank.currentRank + 1}}</b>
        </p>
        <progress :class="['progress', 'is-large', 'rank-'+rank.currentRank]" :value="progress" max="100">
          {{progress.toFixed(2)}}%
        </progress>
        <div :class="['progress-pointer', 'rank-'+rank.currentRank]" :style="{width: progress + '%'}">
          <small class="is-size-7">(<ICountUp :end-val="power" /> / <ICountUp :end-val="rank.nextRank.power" :options="{startVal: rank.nextRank.power}" /> EP)</small>&nbsp;&nbsp;<b>{{progress.toFixed(2)}}%</b>
        </div>
        <div class="is-size-7 has-text-left mt-4">
          Required NFX: <b>{{nfxStaked}} / <ICountUp :end-val="rank.nextRank.nfx" :options="{startVal: rank.nextRank.nfx}" /> NFX</b>
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
      if (this.rank && this.rank.currentRank === 10) {
        return 100
      }
      return ((this.power - this.rank.currentRequirements.power) / (this.rank.nextRank.power - this.rank.currentRequirements.power)) * 100
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.progress-pointer {
  height:20px;
  margin-bottom: 30px;
  border-right: 2px solid $accent;
  white-space: nowrap;
  text-align: right;
  font-size: 18px;
  margin-top:-25px;
  padding: 15px 0 0;
  &.rank-1 {
    border-color: #71E3C0;
  }
  &.rank-2 {
    border-color: #F8D247;
  }
  &.rank-3 {
    border-color: #57C0F9;
  }
  &.rank-4 {
    border-color: #8026F5;
  }
  &.rank-5 {
    border-color: #EA36AC;
  }
  &.rank-6 {
    border-color: #FB2B11;
  }
  &.rank-7 {
    border-color: #000000;
  }
  &.rank-8 {
    border-color: #F8D247;
  }
  &.rank-9 {
    border-color: #F8D247;
  }
  &.rank-10 {
    border-color: #F8D247;
  }
}
progress {
  box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #71E3C0;
  animation: glow-progress 1s infinite alternate ease-out;
  &.rank-1 {
    animation: glow-progress-1 1s infinite alternate ease-out;
  }
  &.rank-2 {
    animation: glow-progress-2 1s infinite alternate ease-out;
  }
  &.rank-3 {
    animation: glow-progress-3 1s infinite alternate ease-out;
  }
  &.rank-4 {
    animation: glow-progress-4 1s infinite alternate ease-out;
  }
  &.rank-5 {
    animation: glow-progress-5 1s infinite alternate ease-out;
  }
  &.rank-6 {
    animation: glow-progress-6 1s infinite alternate ease-out;
  }
  &.rank-7 {
    animation: glow-progress-7 1s infinite alternate ease-out;
  }
  &.rank-8 {
    animation: glow-progress-8 1s infinite alternate ease-out;
  }
  &.rank-9 {
    animation: glow-progress-9 1s infinite alternate ease-out;
  }
  &.rank-10 {
    animation: glow-progress-10 1s infinite alternate ease-out;
  }
}

progress::-webkit-progress-bar  {
  box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 20px 4px #71E3C0;
  animation: glow-progress 1s infinite alternate ease-out;
  &.rank-1 {
    animation: glow-progress-1 1s infinite alternate ease-out;
  }
  &.rank-2 {
    animation: glow-progress-2 1s infinite alternate ease-out;
  }
  &.rank-3 {
    animation: glow-progress-3 1s infinite alternate ease-out;
  }
  &.rank-4 {
    animation: glow-progress-4 1s infinite alternate ease-out;
  }
  &.rank-5 {
    animation: glow-progress-5 1s infinite alternate ease-out;
  }
  &.rank-6 {
    animation: glow-progress-6 1s infinite alternate ease-out;
  }
  &.rank-7 {
    animation: glow-progress-7 1s infinite alternate ease-out;
  }
  &.rank-8 {
    animation: glow-progress-8 1s infinite alternate ease-out;
  }
  &.rank-9 {
    animation: glow-progress-9 1s infinite alternate ease-out;
  }
  &.rank-10 {
    animation: glow-progress-10 1s infinite alternate ease-out;
  }
}

progress {
  &::-moz-progress-bar {
    background: $accent;
    height: 35px;
    border-radius: 8px 0 0 8px;
    animation: moveGradient 3s linear infinite;
    transition: width 0.8s ease;
  }
  &.rank-1::-moz-progress-bar {
    background: #71E3C0;
  }
  &.rank-2::-moz-progress-bar {
    background: #F8D247;
  }
  &.rank-3::-moz-progress-bar {
    background: #57C0F9;
  }
  &.rank-4::-moz-progress-bar {
    background: #8026F5;
  }
  &.rank-5::-moz-progress-bar {
    background: #EA36AC;
  }
  &.rank-6::-moz-progress-bar {
    background: #FB2B11;
  }
  &.rank-7::-moz-progress-bar {
    background: #000000;
  }
  &.rank-8::-moz-progress-bar {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
  }
  &.rank-9::-moz-progress-bar {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
  }
  &.rank-10::-moz-progress-bar {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
  }
}

progress {
  &::-webkit-progress-value {
    background: $accent;
    height: 35px;
    border-radius: 8px 0 0 8px;
    transition: width 0.8s ease;
  }
  &.rank-1::-webkit-progress-value {
    background: #71E3C0;
  }
  &.rank-2::-webkit-progress-value {
    background: #F8D247;
  }
  &.rank-3::-webkit-progress-value {
    background: #57C0F9;
  }
  &.rank-4::-webkit-progress-value {
    background: #8026F5;
  }
  &.rank-5::-webkit-progress-value {
    background: #EA36AC;
  }
  &.rank-6::-webkit-progress-value {
    background: #FB2B11;
  }
  &.rank-7::-webkit-progress-value {
    background: #000000;
  }
  &.rank-8::-webkit-progress-value {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
  }
  &.rank-9::-webkit-progress-value {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
  }
  &.rank-10::-webkit-progress-value {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
  }
}

@keyframes moveGradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0%;
  }
}
@keyframes glow {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #71E3C0;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #71E3C0;
  }
}
@keyframes glow-1 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #71E3C0;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #71E3C0;
  }
}
@keyframes glow-2 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #F8D247;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #F8D247;
  }
}
@keyframes glow-3 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #57C0F9;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #57C0F9;
  }
}
@keyframes glow-4 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #8026F5;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #8026F5;
  }
}
@keyframes glow-5 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #EA36AC;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #EA36AC;
  }
}
@keyframes glow-6 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #FB2B11;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #FB2B11;
  }
}
@keyframes glow-7 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #000000;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #000000;
  }
}
@keyframes glow-8 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #F8D247;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #F8D247;
  }
}
@keyframes glow-9 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #F8D247;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #F8D247;
  }
}
@keyframes glow-10 {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 25px -22px #F8D247;
  }
  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 18px #F8D247;
  }
}
@keyframes glow-progress {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #71E3C0;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #71E3C0;
  }
}
@keyframes glow-progress-1 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #71E3C0;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #71E3C0;
  }
}
@keyframes glow-progress-2 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #F8D247;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #F8D247;
  }
}
@keyframes glow-progress-3 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #57C0F9;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #57C0F9;
  }
}
@keyframes glow-progress-4 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #8026F5;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #8026F5;
  }
}
@keyframes glow-progress-5 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #EA36AC;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #EA36AC;
  }
}
@keyframes glow-progress-6 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #FB2B11;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #FB2B11;
  }
}
@keyframes glow-progress-7 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #000000;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #000000;
  }
}
@keyframes glow-progress-8 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #F8D247;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #F8D247;
  }
}
@keyframes glow-progress-9 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #F8D247;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #F8D247;
  }
}
@keyframes glow-progress-10 {
  from {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 5px -5px #F8D247;
  }
  to {
    box-shadow: inset -4px -4px 11px 0 #FFFFFF, inset 4px 4px 11px 0 #CDD4E6, 0px 0px 29px -22px rgba(57,231,191,0.83137), -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 15px 0px #F8D247;
  }
}
.rank-icon {
  position: absolute;
  right:20px;
  top:20px;
  &:before {
    position: absolute;
    top: 40%;
    left: 50%;
    display:block;
    content: "";
    animation: glow 1s infinite alternate ease-out;
  }
  &.rank-1:before {
    animation: glow-1 1s infinite alternate ease-out;
  }
  &.rank-2:before {
    animation: glow-2 1s infinite alternate ease-out;
  }
  &.rank-3:before {
    animation: glow-3 1s infinite alternate ease-out;
  }
  &.rank-4:before {
    animation: glow-4 1s infinite alternate ease-out;
  }
  &.rank-5:before {
    animation: glow-5 1s infinite alternate ease-out;
  }
  &.rank-6:before {
    animation: glow-6 1s infinite alternate ease-out;
  }
  &.rank-7:before {
    animation: glow-7 1s infinite alternate ease-out;
  }
  &.rank-8:before {
    animation: glow-8 1s infinite alternate ease-out;
  }
  &.rank-9:before {
    animation: glow-9 1s infinite alternate ease-out;
  }
  &.rank-10:before {
    animation: glow-10 1s infinite alternate ease-out;
  }
}
.rank-title {
  font-size: 25px;
  text-align: center;
  margin-top: 10px;

  &:after {
    margin-top:20px;
    height: 2px;
    display:block;
    width: 100%;
    content: "";
    background: #CDD4E6;
  }
  &.small {
    font-size:16px;
    &:after {
      height: 1px;
      margin-top: 8px;
    }
  }
  &.rank-1:after {
    background: #71E3C0;
  }
  &.rank-2:after {
    background: #F8D247;
  }
  &.rank-3:after {
    background: #57C0F9;
  }
  &.rank-4:after {
    background: #8026F5;
  }
  &.rank-5:after {
    background: #EA36AC;
  }
  &.rank-6:after {
    background: #FB2B11;
  }
  &.rank-7:after {
    background: #000000;
  }
  &.rank-8:after {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
    animation: moveGradient 3s linear infinite;
  }
  &.rank-9:after {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
    animation: moveGradient 3s linear infinite;
  }
  &.rank-10:after {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
    animation: moveGradient 3s linear infinite;
  }
}
</style>
