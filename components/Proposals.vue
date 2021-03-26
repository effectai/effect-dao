<template>
  <div v-if="proposals" class="proposals">
    <div v-if="proposals.length > 0">
      <nuxt-link v-for="proposal in proposals" :key="proposal.id" :to="'/proposals/'+proposal.id" class="box has-shadow-outside is-narrow">
        <div class="media">
          <div class="media-left">
            <span class="tag" :class="{'is-success': proposal.status == 'ACTIVE', 'is-warning': proposal.status == 'DRAFT', 'is-link': proposal.status == 'PENDING', 'is-dark': proposal.status == 'CLOSED'}">{{ proposal.status }}</span>
          </div>
          <div class="media-content has-text-weight-light">
            <b v-if="proposal.title">#{{ proposal.id }}: {{ proposal.title | truncate(45) }}</b>
            <b v-else>...</b>
            <div class="has-text-weight-light">
              <small class="mr-1">by <nuxt-link :to="'/account/'+proposal.author">{{ proposal.author }}</nuxt-link></small>
              <small>requesting <span v-for="(pay, index) in proposal.pay" :key="index"><span v-if="index > 0">,</span> {{ parseInt(pay.field_0.quantity) }} EFX</span></small>
            </div>
          </div>
          <div class="media-right has-text-right">
            <div class="is-size-7">
              <b>{{ categories[proposal.category] }}</b>
            </div>
            <div v-if="proposal.status =='ACTIVE'">
              <span v-for="result in proposal.vote_counts" :key="result.key" class="vote-result">
                <small><b :class="{'has-text-success': result.key === 1, 'has-text-danger': result.key === 2}">{{ voteTypes.find((vt) => vt.value == result.key).name }}: {{ result.value }}</b></small>
              </span>
            </div>
            <div v-else-if="proposal.cycle" class="is-size-7 has-text-right">
              Cycle {{ proposal.cycle }}
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <h5 v-else class="has-text-centered">
      No Proposals
    </h5>
  </div>
</template>
<script>
export default {
  filters: {
    truncate (string, value) {
      if (string.length <= value) {
        return string
      }

      return string.substring(0, value) + '…'
    }
  },
  props: ['proposals'],
  data () {
    return {
      voteTypes: [
        {
          value: 1,
          name: 'Y'
        },
        {
          value: 0,
          name: 'A'
        },
        {
          value: 2,
          name: 'N'
        }
      ],
      categories: {
        0: 'Governance Proposal',
        1: 'Marketing',
        2: 'Design',
        3: 'Technical',
        4: 'Other'
      }
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
  .vote-result {
    //margin-right: 10px;
    &:after {
      content: " - "
    }
    &:last-of-type:after {
      //margin-right:0;
      content: ""
    }
  }
  .media {
    flex-wrap: wrap;
  }
</style>
