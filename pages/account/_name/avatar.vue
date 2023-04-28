<template>
  <div class="mt-5">
    <div>
      <div class="box">
        <!-- Generate a list nft -->
        <div class="container">
          <figure
            class="image is-128x128 is-centered"
            style="margin: 0 auto;"
          >
            <!-- TODO: Get the src of the currently set profile page image -->
            <img :src="selectedNftSource">
          </figure>
        </div>
        <hr>
        <div v-if="loadingNFTs">
          Loading NFTs..
        </div>
        <div v-else>
          <!-- // generate a list of figures and img tags -->
          <div class="columns is-multiline is-centered is-vcentered">
            <div
              v-for="nft in nfts"
              :key="nft.asset_id"
              class="column is-4 p-1 py-2 has-text-centered is-flex-direction-column is-align-self-stretch"
            >
              <div class="card is-flex-direction-column is-align-self-stretch" style="height: 100%; display: flex; flex-direction: column;">
                <div
                  class="card-image has-background-image has-radius center-cropped"
                  style="margin: auto; background-position: center center; background-repeat: no-repeat;"
                >
                  <figure v-if="nft.data.img" class="pt-4">
                    <img
                      :src="`https://gateway.pinata.cloud/ipfs/${nft.data.img}`"
                      alt="Placeholder image"
                      class="is-centered mx-auto"
                    >
                  </figure>
                  <figure v-else-if="nft.data.video" class="pt-4">
                    <video
                      :src="`https://gateway.pinata.cloud/ipfs/${nft.data.video}`"
                      autoplay
                      loop
                      playsinline="true"
                    />
                  </figure>
                  <figure v-else class="pt-4">
                    <img
                      src="https://bulma.io/images/placeholders/1280x960.png"
                      alt="Placeholder image"
                    >
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">
                        {{ nft.data.name }}
                      </p>
                      <p class="subtitle is-6">
                        {{ nft.collection.name }}
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <p>{{ nft.data.description }}</p>
                    <p>
                      <a href="https://eos.atomichub.io/" target="_blank" rel="noopener noreferrer">
                        AtomicAssets
                      </a>
                    </p>
                  </div>
                </div>
                <footer class="card-footer" style="margin-top: auto;">
                  <button class="button card-footer-item m-3">
                    <span class="icon is-small">
                      <font-awesome-icon :icon="['fas', 'edit']" />
                    </span>
                    <span>Set as Avatar</span>
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: {
        name: this.$route.params.name
      },
      selectedNftSource: null,
      loadingNFTs: true,
      nfts: []
    }
  },
  computed: {
    nft () {
      return ''
    }
  },
  created () {
    this.getNFTs()
    // TODO Get currently set profile image from the blockchain
    // this.getCurrentProfileImage()
  },
  methods: {
    fallbackAvatar (event) {
      event.target.src = `https://ui-avatars.com/api/?name=${this.account.name}&size=100`
    },
    async getCurrentProfileImage () {
      console.log('Get current profile image')
      const current = await this.$eos.rpc.get_table_rows({
        json: true,
        code: 'eosio',
        scope: this.account.name,
        table: 'profiles',
        limit: 1
      })

      // TODO Somthing like this
      this.selectedNftSource = current.rows[0].img
    },
    async getNFTs () {
      this.loadingNFTs = true
      try {
        const assets = await this.$atomic.getAssets({
          owner: this.account.name
        })
        // console.log('AtomicAssets', assets)

        if (assets && assets.length > 0) {
          console.log(assets)
          // this.nfts = assets.map(asset => `https://gateway.pinata.cloud/ipfs/${asset.data.img || asset.data.video}`)
          this.nfts = assets
        } else {
          console.log('No NFTs found')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
      this.loadingNFTs = false
    },
    setPlaceHolder (event) {
      this.selectedNftSource = `https://ui-avatars.com/api/?name=${this.account.name}&size=100`
      // event.target.src = `https://ui-avatars.com/api/?name=${this.account.name}&size=100`
    },
    async setAvatarTx () {
      // TODO
      // 1. Get the selected NFT
      // 2. Create a transaction to set the profile image
      // 3. Broadcast the transaction
      // 4. Update the profile image
    }
  }

}
</script>

<style scoped>
.center-cropped {
  width: 10rem;
  height: 10rem;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
}

/* Set the image to fill its parent and make transparent */
.center-cropped img {
  min-height: 100%;
  min-width: 100%;
  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  /* IE 5-7 */
  filter: alpha(opacity=100);
  /* modern browsers */
  opacity: 100;
}
</style>
