<template>
  <img
    :src="atomicAssetSrc"
  >
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
      imgsrc: null
    }
  },

  computed: {
    atomicAssetSrc () {
      return this.imgsrc || this.fallbackAvatar()
    }
  },

  created () {
    this.getAtomicAssets()
  },

  methods: {
    fallbackAvatar (event) {
      // event.target.src = 'https://ui-avatars.com/api/?name=${this.accountName}&size=100'
      return `https://ui-avatars.com/api/?name=${this.accountName}&size=100`
    },
    async getAtomicAssets () {
      try {
        const assets = await this.$atomic.getAssets({
          collection_name: 'pomelo',
          owner: this.accountName
        })
        // console.log('AtomicAssets', assets)

        if (assets && assets.length > 0) {
          const [asset] = assets
          console.log(`https://gateway.pinata.cloud/ipfs/${asset.data.img}`)
          this.imgsrc = `https://gateway.pinata.cloud/ipfs/${asset.data.img}`
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
