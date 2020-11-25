<template>
  <div>
    <div class="has-text-centered">
      <button class="button is-primary is-wide m-2">New Proposal</button>
      <button class="button is-primary is-wide m-2 is-outlined">Your Proposals</button>
    </div>
    <div class="box mt-5">
      <h4 class="box-title mb-0">Proposals</h4>
      <div class="tabs">
        <ul>
          <li class="is-active"><a>Active</a></li>
          <li><a>Pending</a></li>
          <li><a>Draft</a></li>
          <li><a>Closed</a></li>
        </ul>
      </div>
      <div v-if="proposals && proposals.length > 0" class="proposals">
        <nuxt-link :to="'/proposal?id='+proposal.id" class="box has-shadow-outside is-narrow" v-for="proposal in proposals" :key="proposal.id">
          <div class="media">
            <div class="media-left">
              <span class="tag" :class="{'is-success': proposal.status == 'ACTIVE', 'is-warning': proposal.status == 'DRAFT', 'is-link': proposal.status == 'PENDING'}">{{ proposal.status }}</span>
            </div>
            <div class="media-content">
              <b>{{proposal.title}}</b>
              <div class="has-text-weight-light"><small class="mr-3">by <b>{{proposal.account}}</b></small><small>Start 11/11/2020</small></div>
            </div>
            <div class="media-right">
              <div class="has-text-right">
                <b v-if="proposal.score > 0" class="has-text-success">+{{proposal.score}}</b>
                <b v-else-if="proposal.score < 0"  class="has-text-danger">{{proposal.score}}</b>
                <b v-else>{{proposal.score}}</b>
              </div>
              <div class="is-size-7">
                # votes: {{proposal.votes}}
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-else-if="proposals && proposals.length == 0">
        No proposals
      </div>
      <h4 v-if="loading" class="has-text-centered">
        Loading proposals..
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data () {
    return {
      loading: false,
      proposals: null
    }
  },

  computed: {
  },

  created () {
    this.getProposals()
  },

  methods: {
    async getProposals () {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.proposals = [
          {
            id: 1,
            title: 'Project Management Proposal',
            account: 'myeosaccount',
            score: 10,
            votes: 23,
            status: 'ACTIVE'
          },

          {
            id: 2,
            title: 'Change to Rebase Sell percentage',
            account: 'myeosaccount',
            score: -20,
            votes: 30,
            status: 'PENDING'
          },
          {
            id: 3,
            title: 'Change to Rebase Sell percentage',
            account: 'myeosaccount',
            votes: 0,
            score: 0,
            status: 'PENDING'
          },
          {
            id: 4,
            title: 'Change to Rebase Sell percentage',
            account: 'myeosaccount',
            status: 'DRAFT'
          }
        ]
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.proposals {
  .media-left {
    min-width: 72px;
  }
}
</style>
