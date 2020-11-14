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
          <div v-else v-html="$md.render(constitution)" />
        </section>
        <footer class="modal-card-foot">
          <template v-if="$wallet.efxStaked >= 500">
            <button class="button is-success" :disabled="loading" @click="signConstitution">
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
      <h4 v-if="false">
        <span v-if="!loading">
          {{ constitutionMembers.length }}
        </span>
        <span v-else>
          ..
        </span>
        members
      </h4>
    </div>
    <div class="block-shadow">
      <h2 class="block-title">
        DAO Members
      </h2>
      <div class="members columns is-multiline mt-5" v-if="constitutionMembers">
        <div v-for="member in constitutionMembers" :key="member.account" class="column is-half">
          <div class="member columns is-gapless is-mobile">
            <div class="tag is-primary is-light rank-name">member</div>
            <div class="column is-one-fifth" style="min-width: 70px">
              <figure class="image is-64x64">
                <img :src="`https://avatar.pixeos.art/avatar/${member.account}`" @error="((evt) => fallbackAvatar(evt, member.account))">
              </figure>
            </div>
            <div class="column">
              <h4>{{ member.account }}</h4>
              <div>
                <ICountUp v-if="member.power >= 0" :options="{ prefix: 'EFX Power ', suffix: ' EP' }" :end-val="member.power" />
                <div v-else>...</div>
                <small>Joined {{ $moment(member.registration_time).fromNow()  }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="has-text-centered" v-else>Loading members..</h4>
      <div class="has-text-centered" v-if="moreMembers"><button class="button" @click="loadMoreMembers">Load More</button></div>
    </div>
  </div>
</template>

<script>
import { sha256 } from 'eosjs-ecc'
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
      constitutionHash: '',
      constitutionContract: 'thedaonkylin',
      constitutionVersion: '1',
      constitutionUrl: 'https://raw.githubusercontent.com/eosdac/eosdac-constitution/master/boilerplate_constitution.md',
      moreMembers: true,
      signedConstitution: false,
      constitutionMembers: null
    }
  },

  computed: {
    wallet () {
      return this.$wallet.wallet
    }
  },

  watch: {
    wallet () {
      this.checkIfSigned()
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.loading = true

      if (this.wallet) {
        this.checkIfSigned()
      }

      const data = await this.$eos.rpc.get_table_rows({
        code: this.constitutionContract,
        scope: this.constitutionContract,
        table: 'member',
        limit: 20
      })
      this.moreMembers = data.more
      this.nextKey = data.next_key
      const members = data.rows
      this.constitutionMembers = members
      members.forEach((member) => {
        try {
          this.getMemberInfo(member)
        } catch (e) {
          console.error(e)
        }
      })
      this.loading = false
    },

    async loadMoreMembers () {
      this.loading = true

      const data = await this.$eos.rpc.get_table_rows({
        code: this.constitutionContract,
        scope: this.constitutionContract,
        table: 'member',
        lower_bound: this.nextKey,
        limit: 20
      })
      this.moreMembers = data.more
      this.nextKey = data.next_key
      const members = data.rows
      this.constitutionMembers = this.constitutionMembers.concat(members)
      members.forEach((member) => {
        try {
          this.getMemberInfo(member)
        } catch (e) {
          console.error(e)
        }
      })
      this.loading = false
    },

    async getMemberInfo (member) {
      member.registration_time = new Date(`${member.registration_time}Z`)
      const stakeInfo = await this.getStake(member.account)

      if (stakeInfo) {
        const efxStaked = parseFloat(stakeInfo.amount.replace(` ${process.env.efxToken}`, '').replace('.', ','))
        const stakeAge = this.$wallet.calculateStakeAge(efxStaked, stakeInfo.last_claim_time, stakeInfo.last_claim_age)
        const efxPower = this.$wallet.calculateEfxPower(efxStaked, stakeAge)
        this.$set(member, 'staked', efxStaked)
        this.$set(member, 'stakeAge', stakeAge)
        this.$set(member, 'power', efxPower)
      } else {
        this.$set(member, 'power', 0)
      }
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
        return (data.rows && data.rows.length > 0) ? data.rows[0] : null
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

    async checkIfSigned () {
      await this.$eos.rpc.get_table_rows({
        code: this.constitutionContract,
        scope: this.constitutionContract,
        lower_bound: ' ' + this.wallet.auth.accountName,
        upper_bound: ' ' + this.wallet.auth.accountName,
        table: 'member',
        limit: 1
      }).then((data) => {
        this.signedConstitution = data.rows.length === 1
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
          this.init()
          this.signedConstitution = true
          this.constitutionModal = false
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dao {
  max-width: 960px;
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
    .column {
      padding: 10px 20px;
    }
    .member {
      box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6;
      border-radius: 13px;
      padding: 20px;
      position: relative;
      .rank-name {
        font-size: 12px;
        position: absolute;
        top: 8px;
        right: 10px;
      }
      h4 {
        margin-bottom: 0;
      }
      span {
        margin-bottom: 8px;
        display: block;
      }
      .image {
        img {
          border-radius: 6px;
        }
        margin: 0;
        margin-right: 10px;
      }
    }
  }
}
</style>
