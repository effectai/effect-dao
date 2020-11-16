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
      class="notification is-primary is-outlined is-light mb-0 has-text-weight-bold notif-w-btn"
    >
      <div class="is-pulled-left">
        Sign the constitution to participate in the DAO
      </div>
      <div class="is-pulled-right notif-btn">
        <button class="button is-primary" @click="downloadConstitution(); constitutionModal = true">
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
    <rank v-if="wallet && wallet.auth && signedConstitution" class="mb-3" />
    <div class="block-shadow mb-6">
      <h2 class="block-title">
        DAO Members
      </h2>
      <div v-if="constitutionMembers" class="members columns is-multiline mt-5">
        <div v-for="member in constitutionMembers" :key="member.account" class="column is-half">
          <div class="member columns is-gapless is-mobile">
            <!--            <div v-if="member.rank && member.rank.currentRank == 0" class="tag is-primary is-light rank-name"></div>-->
            <div v-if="member.rank && member.rank.currentRank > 0" class="rank-name">
              <img width="25px" :src="'/img/guardian-icons/guardian-'+member.rank.currentRank+'.png'">
            </div>
            <div class="column is-one-fifth" style="min-width: 70px">
              <figure class="image is-64x64">
                <img :src="`https://avatar.pixeos.art/avatar/${member.account}`" @error="((evt) => fallbackAvatar(evt, member.account))">
              </figure>
              <div v-if="member.rank" class="rank">
                <div :class="['rank-color','rank-'+member.rank.currentRank]" /><span>Rank {{ member.rank.currentRank }}</span>
              </div>
            </div>
            <div class="column">
              <div class="pl-2">
                <h5>{{ member.account }}</h5>
                <div>
                  <ICountUp v-if="member.power >= 0" class="power" :options="{ prefix: 'EFX Power ', suffix: ' EP' }" :end-val="member.power" />
                  <div v-else>
                    ...
                  </div>
                  <small>Joined {{ $moment(member.registration_time).fromNow() }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 v-else class="has-text-centered">
        Loading members..
      </h4>
      <div v-if="moreMembers" class="has-text-centered">
        <button class="button" @click="loadMoreMembers">
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { sha256 } from 'eosjs-ecc'
import ICountUp from 'vue-countup-v2'
import ConnectWallet from '~/components/ConnectWallet'
import Rank from '~/components/Rank'

export default {
  components: {
    ICountUp,
    ConnectWallet,
    Rank
  },

  data () {
    return {
      loading: false,
      constitutionModal: false,

      constitution: '',
      constitutionHash: '',
      constitutionVersion: '1',
      constitutionUrl: 'https://raw.githubusercontent.com/effectai/effect-network-eos/constit/constitution/constitution.md',
      moreMembers: true,
      constitutionMembers: null
    }
  },

  computed: {
    wallet () {
      return this.$wallet.wallet
    },
    signedConstitution () {
      return this.$wallet.signedConstitution
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.loading = true

      const data = await this.$eos.rpc.get_table_rows({
        code: process.env.daoContract,
        scope: process.env.daoContract,
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
        code: process.env.daoContract,
        scope: process.env.daoContract,
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

      stakeInfo.map((row) => {
        if (row.amount.includes(process.env.efxToken)) {
          const efxStaked = parseFloat(row.amount.replace(` ${process.env.efxToken}`, '').replace('.', ','))
          const stakeAge = this.$wallet.calculateStakeAge(efxStaked, row.last_claim_time, row.last_claim_age)
          const efxPower = this.$wallet.calculateEfxPower(efxStaked, stakeAge)
          this.$set(member, 'efxStaked', efxStaked)
          this.$set(member, 'stakeAge', stakeAge)
          this.$set(member, 'power', efxPower)
        } else if (row.amount.includes(process.env.nfxToken)) {
          const nfxStaked = parseFloat(row.amount.replace(` ${process.env.nfxToken}`, '').replace('.', ','))
          this.$set(member, 'nfxStaked', nfxStaked)
        }
      })
      if (!member.power) {
        this.$set(member, 'power', 0)
      }
      this.$set(member, 'rank', this.$wallet.calculateRankProgress(member.power, member.nfxStaked))
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
        return data.rows
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

    signConstitution () {
      const actions = [
        {
          account: process.env.daoContract,
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

      this.$wallet.handleTransaction(actions)
        .then(() => {
          this.init()
          this.signedConstitution = true
          this.constitutionModal = false
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
  @keyframes moveGradient {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -200% 0%;
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
      .rank {
        padding-top:6px;
        font-size: 13px;
        span {
          padding-top:3px;
          padding-left: 10px;
        }
        .rank-color {
          width: 64px;
          border-radius: 3px;
          height: 6px;
          background: #CDD4E6;
          &.rank-1 {
            background: #71E3C0;
          }
          &.rank-2 {
            background: #F8D247;
          }
          &.rank-3 {
            background: #57C0F9;
          }
          &.rank-4 {
            background: #8026F5;
          }
          &.rank-5 {
            background: #EA36AC;
          }
          &.rank-6 {
            background: #FB2B11;
          }
          &.rank-7 {
            background: #000000;
          }
          &.rank-8 {
            background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
            background-size: 200%;
            animation: moveGradient 3s linear infinite;
          }
          &.rank-9 {
            background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
            background-size: 200%;
            animation: moveGradient 3s linear infinite;
          }
          &.rank-10 {
            background: rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) repeat scroll 0% 0% / 300% 300%;
            background-size: 200%;
            animation: moveGradient 3s linear infinite;
          }

        }
      }
      .rank-name {
        font-size: 12px;
        position: absolute;
        top: 8px;
        right: 10px;
      }
      h5 {
        margin-bottom: 4px;
        padding-bottom: 8px;
        border-bottom: 2px solid #CDD4E6;
      }
      .power {
        font-size: 14px;
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
