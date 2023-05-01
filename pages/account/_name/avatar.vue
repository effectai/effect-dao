<template>
  <div class="mt-5">
    <div>
      <div class="box">
        <div
          class="has-text-centered"
        >
          <div class="title">
            {{ account.name }}
          </div>
          <figure class="image has-ratio" style="margin: auto auto;">
            <Avatar :account-name="account.name" />
          </figure>
        </div>
        <hr>
        <div class="buttons is-centered">
          <a href="https://eos.atomichub.io" target="_blank" rel="noopener noreferrer" class="button is-large is-primary">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'external-link-alt']" />
            </span>
            &nbsp;
            AtomicHub
          </a>
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
              <div
                class="card is-flex-direction-column is-align-self-stretch"
                style="height: 100%; display: flex; flex-direction: column;"
              >
                <div
                  class="card-image has-background-image has-radius center-cropped"
                  style="margin: auto; background-position: center center; background-repeat: no-repeat;"
                >
                  <figure v-if="nft.data.img" class="pt-4">
                    <img
                      :src="`https://atomichub-ipfs.com/ipfs/${nft.data.img}`"
                      alt="Placeholder image"
                      class="is-centered mx-auto"
                    >
                  </figure>
                  <figure v-else-if="nft.data.video" class="pt-4">
                    <video
                      :src="`https://atomichub-ipfs.com/ipfs/${nft.data.video}`"
                      autoplay
                      loop
                      muted
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
                      <p class="title is-5">
                        {{ nft.data.name }}
                      </p>
                      <p class="subtitle is-size-7">
                        {{ nft.collection.name }}
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <p>{{ nft.data.description }}</p>
                    <p>
                      <a
                        :href="`https://eos.atomichub.io/explorer/asset/${nft.asset_id}`"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span class="icon">
                          <font-awesome-icon :icon="['fas', 'external-link-alt']" />
                        </span>
                        AtomicHub
                      </a>
                    </p>
                  </div>
                </div>
                <footer class="card-footer" style="margin-top: auto;">
                  <button class="button card-footer-item m-3" @click.prevent="setAvatarTx(nft)">
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
    },
    wallet () {
      return (this.$wallet) ? this.$wallet.wallet : null
    }
  },
  created () {
    this.getNFTs()
  },
  methods: {
    async getNFTs () {
      this.loadingNFTs = true
      try {
        const assets = await this.$atomic.getAssets({
          owner: this.account.name
        })
        // console.log('AtomicAssets', assets)

        if (assets && assets.length > 0) {
          // console.log(assets)
          // this.nfts = assets.map(asset => `https://atomichub-ipfs.com/ipfs/${asset.data.img || asset.data.video}`)
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
    async setAvatarTx (item) {
      // TODO
      // 1. Get the selected NFT
      // 2. Create a transaction to set the profile image
      // 3. Broadcast the transaction
      // 4. Update the profile image

      console.log(`Seting avatar for ${this.account.name}`, item)

      const actions = [
        {
          account: process.env.daoContract,
          name: 'setavatar',
          authorization: [{
            actor: this.account.name,
            // wallet.auth.permission
            permission: this.wallet.auth.permission
          }],
          data: {
            account: this.account.name,
            asset_id: item.asset_id
          }
        }
      ]

      console.log('Actions', actions)
      try {
        await this.$wallet.handleTransaction(actions)
        this.success = true
        this.$modal.show({
          color: 'success',
          title: 'Transaction Sent',
          persistent: true,
          text: 'Setting avatar picture! It might take a couple of minutes before your proposals shows up.',
          cancel: false,
          onConfirm: () => {
            location.reload(true)
          }
        })
      } catch (e) {
        this.$modal.show({
          color: 'danger',
          title: 'Error',
          persistent: true,
          text: e
        })
      }
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
