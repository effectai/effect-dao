<template>
  <div>
      <div class="box container">
        <div class="columns is-centered mt-2 mb-5">
          <button @click="handleButton" class="button" :class="{'is-primary':isSwapBNB}">{{handleButtonMsg()}}</button>
        </div>
        <div class="box-title subtitle is-4 has-text-weight-bold">
          <p>{{handleTitleMsg()}}</p>
        </div>
        <iframe
          v-if="isSwapBNB"
          src="https://pancakeswap.finance/swap?outputCurrency=0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0"
          scrolling='no'
        ></iframe>
        <iframe
          v-if="isSwapNFX"
          src="https://eos.defibox.io/"
          scrolling='no'
        ></iframe>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSwapBNB: false,
      isSwapNFX: true
    }
  },
  methods: {
    handleButton () {
      this.isSwapBNB = !this.isSwapBNB
      this.isSwapNFX = !this.isSwapNFX
    },
    handleButtonMsg () {
      if (this.isSwapBNB) {
        return 'Swap EFX/NFX'
      } else {
        return 'Swap EFX/BNB'
      }
    },
    handleTitleMsg () {
      if (this.isSwapBNB) {
        return 'EFX/BNB (Pancake Swap)(BSC)'
      } else {
        return 'EFX/NFX (DefiBox)(EOS)'
      }
    }
  }
}

</script>

<style lang="scss">
iframe{
  width: 90%;
  height: 820px;
  border-radius: 10px;
  margin: 0 auto;
  display: block;
}
@media all and (max-width: 570px) {
  iframe {
    width: 155%;
    height: 1500px;
    zoom: 0.65;
    -moz-transform: scale(0.65);
    -moz-transform-origin: 0 0;
    -o-transform: scale(0.65);
    -o-transform-origin: 0 0;
    -webkit-transform: scale(0.65);
    -webkit-transform-origin: 0 0;
  }
}
.columns:not(.is-desktop) {
  display: flex;
}

</style>
