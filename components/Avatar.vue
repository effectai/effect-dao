<template>
  <img :src="atomicAssetSrc" alt="Atomic Asset NFT">
</template>

<script>

export default {
  props: {
    accountName: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      imgsrc: null,
      isLoading: false
    }
  },

  computed: {
    atomicAssetSrc () {
      return this.imgsrc || `https://ui-avatars.com/api/?name=${this.accountName}&size=100`
    }
  },

  created () {
    this.getAtomicAssets()
  },

  methods: {
    fallbackAvatar (event) {
      event.target.src = `https://ui-avatars.com/api/?name=${this.accountName}&size=100`
    },
    async getAtomicAssets () {
      this.isLoading = true
      try {
        const assets = await this.$atomic.getAssets({
          collection_name: 'pomelo',
          owner: this.accountName
        })
        // console.log('AtomicAssets', assets)

        if (assets && assets.length > 0) {
          const [asset] = assets
          // eslint-disable-next-line no-console
          console.log(`https://gateway.pinata.cloud/ipfs/${asset.data.img}`)
          this.imgsrc = `https://gateway.pinata.cloud/ipfs/${asset.data.img}`
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
      this.isLoading = false
    }
  }
}
</script>
