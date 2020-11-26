<template>
  <div v-if="proposals && proposals.length > 0" class="proposals">
    <nuxt-link :to="'/proposals/'+proposal.id" class="box has-shadow-outside is-narrow" v-for="proposal in proposals" :key="proposal.id">
      <div class="media">
        <div class="media-left">
          <span class="tag" :class="{'is-success': proposal.status == 'ACTIVE', 'is-warning': proposal.status == 'DRAFT', 'is-link': proposal.status == 'PENDING', 'is-dark': proposal.status == 'CLOSED'}">{{ proposal.status }}</span>
        </div>
        <div class="media-content">
          <b v-if="proposal.title">{{proposal.title}}</b>
          <b v-else>...</b>
          <div class="has-text-weight-light"><small class="mr-3">by <nuxt-link :to="'/account/'+proposal.account">{{proposal.account}}</nuxt-link></small><small>created {{ $moment(proposal.created+"Z").fromNow() }}</small></div>
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
</template>
<script>
export default {
  props: ['proposals']
}
</script>
<style lang="scss" scoped>
  .proposals {
    .media-left {
      min-width: 72px;
    }
  }
</style>
