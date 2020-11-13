<template>
<div class="dao">
  <div class="modal constitution-modal" :class="{ 'is-active': constitutionModal }">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Effect DAO constitution
        </p>
        <button class="delete" aria-label="close" @click="constitutionModal = false" />
      </header>
      <section class="modal-card-body">
        <span v-if="loading">Loading constitution..</span>
        <div v-else v-html="$md.render(constitution)"></div>
      </section>
      <footer class="modal-card-foot">
        <template v-if="this.$wallet.efxStaked >= 5000000000">
          <button class="button is-success" @click="signConstitution" :disabled="loading">
            Sign constitution
          </button>
          <div class="small">
            version {{ constitutionVersion }} | hash {{ constitutionHash }}
          </div>
        </template>
        <div v-else class="container max-width has-text-centered">
          <div class="block is-size-5">
            You must stake at least <b>500 EFX</b> before you can join the DAO
          </div>
          <button class="button is-warning has-text-centered" :disabled="loading">
            <nuxt-link to="/stake">
              Go to staking page
            </nuxt-link>
          </button>
        </div>
      </footer>
    </div>
  </div>

  <div v-if="!loading && (!wallet || !wallet.auth)" class="notification is-warning is-light mb-0 has-text-weight-bold notif-w-btn">
      <div class="is-pulled-left">
        Connect your wallet to participate in the DAO
      </div>
      <div class="is-pulled-right notif-btn">
        <ConnectWallet />
      </div>
    </div>

    <div
      v-else-if="!loading && !signedConstitution"
      class="notification is-warning is-light mb-0 has-text-weight-bold notif-w-btn"
    >
      <div class="is-pulled-left">
        Sign the constitution to participate in the DAO
      </div>
      <div class="is-pulled-right notif-btn">
        <button class="button is-success" @click="downloadConstitution(); constitutionModal = true">
          Become a member
        </button>
      </div>
    </div>

    <div
      v-else-if="!loading && signedConstitution"
      class="notification is-success is-light mb-0 has-text-weight-bold notif-w-btn"
    >
      You signed the constitution and are participating in the DAO!
    </div>

    <div class="intro">
      <h1>Effect DAO</h1>
      <h4>
        <span v-if="!loading">
          {{ constitutionMembers.length }}
        </span>
        <span v-else>
          ..
        </span>
        members
      </h4>
    </div>

    <div class="columns members">
      <div v-for="member in constitutionMembers" :key="member.account" class="column is-half">
        <div class="block-shadow member">
          <figure class="image is-64x64 is-pulled-left">
            <img class="is-rounded" :src="`https://avatar.pixeos.art/avatar/${member.account}`" @error="((evt) => fallbackAvatar(evt, member.account))">
          </figure>

          <h4>{{ member.account }}</h4>
          <div>
            <ICountUp :options="{ prefix: 'Staking ', suffix: ' EFX' }" :end-val="member.staked" />
            Joined {{ member.registration_time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sha256 from 'eosjs-ecc'
import ICountUp from 'vue-countup-v2'
import ConnectWallet from '../components/ConnectWallet'

export default {
  components: {
    ICountUp,
    ConnectWallet
  },

  data () {
    return {
      loading: false,
      constitutionModal: false,

      constitution: '',
      constitutionContract: 'thedaonkylin',
      constitutionVersion: '1',
      constitutionHash: '1e1fe1b13e6e43d8f9cb3263817b24d7dcf8070a8fcaba3e8ced94ea263dd450',
      constitutionUrl: 'https://raw.githubusercontent.com/eosdac/eosdac-constitution/master/boilerplate_constitution.md',

      signedConstitution: false,
      constitutionMembers: []
    }
  },

  computed: {
    wallet () {
      return this.$wallet.wallet
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.loading = true

      const data = await this.$eos.rpc.get_table_rows({
        code: this.constitutionContract,
        scope: this.constitutionContract,
        table: 'member',
        limit: 1000
      })

      const members = await Promise.all(data.rows.map(async (row) => {
        if (this.wallet && this.wallet.auth && row.account === this.wallet.auth.accountName) {
          this.signedConstitution = true
        }

        row.registration_time = new Date(row.registration_time).toLocaleDateString()
        row.staked = await this.getStake(row.account)
        return row
      }))

      this.constitutionMembers = members.sort((a, b) => a.staked > b.staked)
      this.loading = false
    },

    fallbackAvatar (event, accountName) {
      event.target.src = `https://ui-avatars.com/api/?name=${accountName}&size=100`
    },

    async getStake (accountName) {
      return await this.$eos.rpc.get_table_rows({
        code: process.env.stakingContract,
        scope: accountName,
        table: 'stake'
      }).then((data) => {
        return (data.rows && data.rows.length > 0) ? parseFloat(data.rows[0].amount.replace(` ${process.env.efxToken}`, '').replace('.', ',')) : 0
      })
    },

    async downloadConstitution () {
      this.loading = true
      await fetch(this.constitutionUrl)
        .then(data => data.text())
        .then((data) => {
          this.constitution = data
          this.constitutionHash = sha256(data)
        })
        .finally(() => {
          this.loading = false
        })
    },

    async signConstitution () {
      await this.wallet.eosApi.transact({
        actions: [
          {
            account: this.constitutionContract,
            name: 'memberreg',
            authorization: [{
              actor: this.wallet.auth.accountName,
              permission: this.wallet.auth.permission
            }],
            data: {
              account: this.wallet.auth.accountName,
              agreedterms: this.constitutionHash
            }
          }
        ]
      }, {
        blocksBehind: 3,
        expireSeconds: 60
      })
        .then((transaction) => {
          console.log(transaction)
          this.signedConstitution = true
          this.constitutionModal = false
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => {
          this.loading = false
          this.init()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dao {
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;

  .notif-w-btn {
    height: 66px;

    .notif-btn {
      margin-top: -8px;
      margin-right: -12px;
    }
  }

  .intro {
    margin-top: 22px;
  }

  .constitution-modal {
    .modal-card {
      max-width: 800px;
      width: 90%;
    }
  }

  .members {
    .member {
      padding: 0.75rem;
      h4 {
        margin-top: 10px;
        margin-bottom: 0;
      }
      span {
        margin-bottom: 8px;
        display: block;
      }
      .image {
        margin: 0;
        margin-right: 10px;
      }
    }
  }
}
</style>
