<template>
  <div class="stake">
    efxStaked: {{ efxStaked }} <br>
    lastClaimTime {{ lastClaimTime }} <br>
    lastClaimAge {{ lastClaimAge }} <br>
    claimableNfx {{ claimableNfx }} <br>
    stake age: {{ stakeAge * 100 }}%

    <progress class="progress is-large" :value="stakeAge" max="1" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      efxStaked: null,
      lastClaimTime: null,
      lastClaimAge: null
    }
  },

  computed: {
    wallet () {
      return (this.$transit) ? this.$transit.wallet : null
    },
    claimableNfx () {
      if (!this.efxStaked) {
        return 0
      }

      const lastClaimTime = new Date(`${this.lastClaimTime}Z`)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - lastClaimTime.getTime())
      const diffSeconds = diffTime / 1000
      const age = this.lastClaimAge
      const limit = 200 * 24 * 3600
      const newAge = Math.min(limit, age + diffSeconds)
      const avgAge = ((age + newAge) / 2) * Math.min(1, 1 - ((diffSeconds - (limit - age)) / diffSeconds)) + newAge * Math.max(0, (diffSeconds - (limit - age)) / diffSeconds)
      return Math.floor(((this.efxStaked * diffSeconds * avgAge / 86400) / (1000000 * 24 * 3600)) * 10000) / 10000
    },
    stakeAge () {
      if (!this.efxStaked) {
        return null
      }

      return this.lastClaimAge / (200 * 24 * 3600)
    }
  },

  watch: {
    wallet () {
      this.getStakingDetails()
    }
  },

  created () {
    this.getStakingDetails()
  },

  methods: {
    async getStakingDetails () {
      await this.$eos.rpc.get_table_rows({
        code: 'efxstakepool',
        scope: 'efxcounselor',
        table: 'stake'
      }).then((data) => {
        if (data.rows && data.rows.length > 0) {
          const row = data.rows[0]
          this.efxStaked = parseFloat(row.amount.replace(' EFX', '').replace('.', ','))
          this.lastClaimTime = row.last_claim_time
          this.lastClaimAge = row.last_claim_age
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .progress::-moz-progress-bar {
    background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
    background-size: 200%;
    animation: moveGradient 3s linear infinite;
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
