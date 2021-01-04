<template>
  <div>
    <div class="columns stakes is-multiline mt-5">
      <div class="column is-full">
        <div class="box">
          <h3>
            Total EFX distributed:
            <ICountUp :end-val="totalFees" />
          </h3>
        </div>
      </div>

      <div class="column is-half">
        <div class="box">
          <h5 class="box-title">
            Last Cycle Fees
          </h5>
          <div class="has-text-centered">
            <h3>
              <ICountUp :end-val="totalFees" />
              <span class="symbol">EFX</span>
            </h3>
          </div>
          <h5 class="box-title mt-6">
            Last Cycle Votes
          </h5>
          <div class="has-text-centered">
            <h3>
              <ICountUp :end-val="totalVoteWeight" />
            </h3>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="box">
          <h5 class="box-title">
            Your Share
          </h5>
          <div class="has-text-centered">
            <h3>
              <ICountUp :end-val="userVoteWeight" />
              <span class="symbol">EFX</span>
            </h3>
            <h6>
              0.03% of pool
            </h6>
          </div>
          <div class="buttons">
            <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" :disabled="userClaimable === 0">
              Claim Rewards
            </button>
            <button class="button is-primary is-fullwidth" :class="{ 'is-loading': loading }" :disabled="userClaimable === 0">
              Claim & Stake Rewards
            </button>
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
      totalFees: 0,
      totalVoteWeight: 0,
      userVoteWeight: 0,
      userClaimable: 0
    }
  },

  computed: {

  },

  created () {
    this.init()
  },

  methods: {
    init () {

    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 25px;
  padding-bottom: 2px;
}
</style>
