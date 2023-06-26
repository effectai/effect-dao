<template>
  <div class="mt-5">
    <div>
      <div class="box">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <Avatar :account-name="account.name" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content has-text-centered">
                <p class="title is-5">
                  {{ account.name }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr>
        <div v-if="loadingNFTs">
          Loading NFTs..
        </div>
        <div v-else>
          <!-- // generate a list of figures and img tags -->
          <div class="columns is-multiline is-centered is-vcentered">
            <div
              v-for="asset in dataAssets"
              :key="asset.id"
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
                  <figure v-if="asset && asset.data && asset.data.img" class="pt-4">
                    <img
                      :src="asset.asset_media"
                      alt="Placeholder image"
                      class="is-centered mx-auto"
                    >
                  </figure>
                  <figure v-else-if="asset && asset.data && asset.data.video" class="pt-4">
                    <video
                      :src="asset.asset_media"
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
                        {{ asset.name }}
                      </p>
                      <p class="subtitle is-size-7">
                        {{ asset.name }}
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <p>{{ asset.description }}</p>
                    <p>
                      <a
                        :href="asset.asset_link"
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
                  <button class="button card-footer-item m-3" @click.prevent="setAvatarTx(asset)">
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
      nfts: [],
      dataAssets: null,
      accountAssets: null,
      resolvedAccountAssets: null
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
        // get allowed collections
        const { rows } = await this.$eos.rpc.get_table_rows({
          code: process.env.daoContract,
          scope: process.env.daoContract,
          table: 'config',
          limit: 1
        })
        const [rowsData] = rows
        // eslint-disable-next-line camelcase, no-unused-vars
        const { allowed_collections } = rowsData
        // console.log('allowed_collections', allowed_collections)

        // get account assets
        const accountAssets = await this.$atomic.getAccountAssets(this.account.name)

        this.accountAssets = accountAssets
        // console.log('accountAssets', accountAssets)

        // get data assets
        const dataAssets = await Promise.all(accountAssets.map(async (asset) => {
          const collection = await asset.collection()
          // Check if collection is allowed
          if (allowed_collections.includes(collection.name)) {
            const data = await asset.data()
            return {
              ...asset,
              data,
              collection,
              asset_link: `https://eos.atomichub.io/explorer/asset/${asset.id}`,
              asset_media: `https://atomichub-ipfs.com/ipfs/${data?.img || data?.video}`,
              asset_type: data?.img ? 'image' : 'video'
            }
          }
        }))

        // Filter out null values
        const fileteredDataAssets = dataAssets.filter(asset => asset)
        this.dataAssets = fileteredDataAssets
        // console.log('dataAssets', this.dataAssets)
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
    async setAvatarTx (asset) {
      // TODO
      // 1. Get the selected NFT
      // 2. Create a transaction to set the profile image
      // 3. Broadcast the transaction
      // 4. Update the profile image

      // console.log(`Seting avatar for ${this.account.name}`, asset)

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
            asset_id: asset.id
          }
        }
      ]

      // console.log('Actions', actions)
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
