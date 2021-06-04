<template>
  <div class="mt-5">
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
              Sign Constitution
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

    <div class="modal constitution-leave-modal" :class="{ 'is-active': constitutionLeaveModal }">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Unsign constitution
          </p>
          <button class="delete" aria-label="close" @click="constitutionLeaveModal = false" />
        </header>
        <div class="modal-card-body">
          Are you sure you want to leave the Effect DAO?
        </div>
        <footer class="modal-card-foot">
          <button class="button is-warning has-text-centered is-fullwidth" :disabled="loading" @click="unsignConstitution">
            Confirm
          </button>
        </footer>
      </div>
    </div>

    <div v-if="!loading && (!wallet || !wallet.auth)" class="has-text-centered is-outlined is-primary mb-0 has-text-weight-bold notif-w-btn">
      <!-- <div class="notif-btn">
        <a class="button is-secondary" @click="$wallet.loginModal = true">
          <strong>Connect Wallet</strong>
        </a>
      </div> -->
      <div class="notification is-primary is-outlined has-text-centered is-light has-text-weight-bold ">
        Connect your wallet to participate in the DAO.
      </div>
    </div>

    <div
      v-else-if="!loading && !signedConstitution"
      class="has-text-centered notification is-primary is-outlined is-light mb-0 has-text-weight-bold"
    >
      <div>
        Sign the constitution to participate in the DAO
      </div>
      <br>
      <div class="notif-btn">
        <button class="button is-secondary" @click="downloadConstitution(); constitutionModal = true">
          Become a member
        </button>
      </div>
    </div>

    <div
      v-else-if="!loading && signedConstitution && !signedLastConstitution"
      class="notification is-warning is-outlined is-light mb-0 has-text-weight-bold"
    >
      <div class="is-pulled-left">
        The constitution has been updated to V{{ constitutionVersion }}, sign it to remain a DAO member!
      </div>
      <div class="is-pulled-right notif-btn">
        <button class="button is-secondary" @click="downloadConstitution(); constitutionModal = true">
          Sign
        </button>
      </div>
    </div>

    <votes class="mt-5" />
    <div class="box mt-5">
      <h5 class="box-title subtitle">
        EffectDAO Members
      </h5>
      <div v-if="constitutionMembers" class="members columns is-multiline mt-5">
        <div v-for="member in constitutionMembers" :key="member.account" class="column is-half">
          <nuxt-link :to="'/account/'+member.account" class="box has-shadow-outside is-narrow member columns is-gapless is-mobile">
            <div class="column is-one-fifth" style="min-width: 70px">
              <figure class="image is-64x64">
                <avatar :account-name="member.account" />
              </figure>
            </div>
            <div class="column">
              <div class="pl-2">
                <h5>{{ member.account }}</h5>
                <div>
                  <ICountUp v-if="member.votes >= 0" class="power" :options="{ prefix: 'Votes: ' }" :end-val="member.votes" />
                  <div v-else>
                    ...
                  </div>
                  <small>Joined {{ $moment(member.registration_time).fromNow() }}</small>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <h4 v-else class="has-text-centered">
        Loading members..
      </h4>
      <div v-if="moreMembers" class="has-text-centered">
        <button class="button" :class="{'is-loading': loadingMembers}" @click="loadMoreMembers">
          Load More
        </button>
      </div>
    </div>
    <div v-if="signedConstitution" class="has-text-centered mt-6">
      <small><a href="#" @click="constitutionLeaveModal = true">Leave DAO</a></small>
    </div>
  </div>
</template>

<script>
import { sha256 } from 'eosjs-ecc'
import ICountUp from 'vue-countup-v2'
import Votes from '~/components/Votes'
import Avatar from '~/components/Avatar'

export default {
  components: {
    ICountUp,
    Votes,
    Avatar
  },

  data () {
    return {
      loading: false,
      loadingMembers: false,
      constitutionModal: false,
      constitutionLeaveModal: false,

      constitution: '',
      constitutionHash: '',
      constitutionUrl: 'https://raw.githubusercontent.com/effectai/effect-network-eos/9522a000cf96269912a47fdd4653c14ac26bbf61/constitution/constitution.md',
      moreMembers: true,
      nextKey: null,
      constitutionMembers: null
    }
  },

  computed: {
    wallet () {
      return this.$wallet.wallet
    },
    signedConstitution () {
      return this.$wallet.signedConstitution
    },
    lastTerms () {
      return this.$dao.lastTerms
    },
    constitutionVersion () {
      return (this.lastTerms) ? this.lastTerms.version : 0
    },
    signedLastConstitution () {
      return this.$wallet.signedConstitutionVersion === this.constitutionVersion
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.loading = true
      this.loadingMembers = true

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
      this.loadingMembers = false
    },

    async loadMoreMembers () {
      this.loadingMembers = true

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
      this.loadingMembers = false
    },

    async getMemberInfo (member) {
      member.registration_time = new Date(`${member.registration_time}Z`)
      const stakeInfo = await this.$wallet.getStake(member.account)

      stakeInfo.map((row) => {
        if (row.amount.includes(process.env.efxToken)) {
          const efxStaked = parseFloat(row.amount.replace(` ${process.env.efxToken}`, ''))
          const stakeAge = this.$wallet.calculateStakeAge(efxStaked, row.last_claim_time, row.last_claim_age)
          const efxPower = this.$wallet.calculateEfxPower(efxStaked, stakeAge)
          this.$set(member, 'efxStaked', efxStaked)
          this.$set(member, 'stakeAge', stakeAge)
          this.$set(member, 'power', efxPower)
        } else if (row.amount.includes(process.env.nfxToken)) {
          const nfxStaked = parseFloat(row.amount.replace(` ${process.env.nfxToken}`, ''))
          this.$set(member, 'nfxStaked', nfxStaked)
        }
      })
      if (!member.power) {
        this.$set(member, 'power', 0)
      }
      const votes = this.$wallet.calculateVotePower(member.power, member.nfxStaked)
      this.$set(member, 'votes', votes)
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
          this.wallet.checkIfSigned()
          this.signedConstitution = true
          this.constitutionModal = false
        })
        .finally(() => {
          this.loading = false
        })
    },

    unsignConstitution () {
      const actions = [
        {
          account: process.env.daoContract,
          name: 'memberunreg',
          authorization: [{
            actor: this.wallet.auth.accountName,
            permission: this.wallet.auth.permission
          }],
          data: {
            account: this.wallet.auth.accountName
          }
        }
      ]

      this.$wallet.handleTransaction(actions)
        .then(() => {
          this.init()
          this.signedConstitution = false
          this.constitutionLeaveModal = false
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    border-radius: 13px;
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

</style>
