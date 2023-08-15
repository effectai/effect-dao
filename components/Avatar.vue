<template>
  <img :src="avatar_src" alt="Atomic Asset NFT">
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
    avatar_src () {
      return this.imgsrc || `https://ui-avatars.com/api/?name=${this.accountName}&size=100`
    }
  },

  created () {
    // this.getAtomicAssets()
    // this.getAvatar()
    this.getCurrentAvatar()
  },

  methods: {
    fallbackAvatar (event) {
      event.target.src = `https://ui-avatars.com/api/?name=${this.accountName}&size=100`
    },
    async getCurrentAvatar () {
      this.loading = true

      try {
        const config = {
          json: true,
          code: process.env.daoContract,
          scope: this.accountName,
          table: 'avatar',
          limit: 1
        }
        const current = await this.$eos.rpc.get_table_rows(config)
        // console.log('current', current)

        if (current.rows && current.rows.length > 0) {
          const [currentData] = current.rows
          // eslint-disable-next-line camelcase
          const { asset_id } = currentData

          const asset = await this.$atomic.getAsset(this.accountName, asset_id)
          // console.log('asset', asset)
          const assetData = await asset.data()
          // console.log('assetData', assetData)

          if (assetData) {
            if (assetData.img) {
              this.imgsrc = `https://atomichub-ipfs.com/ipfs/${assetData.img}`
            } else if (assetData.video) {
              this.imgsrc = `https://atomichub-ipfs.com/ipfs/${assetData.video}`
            } else {
              throw new Error('Asset has no image or video')
            }
          } else {
            throw new Error('Error retrieving asset')
          }
        }
      } catch (error) {
        console.error(error)
      }

      this.loading = false
    }
  }
}
</script>
