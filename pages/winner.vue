<template>
  <div>
    <div class="content">
      <h1 class="has-text-centered">
        Effect Network Hackathon Winner
      </h1>
      <img src="https://effect.network/_nuxt/img/coins.00f8b5f.png" alt="">
      <p>
        Thank you every one for your participation 🤩
        This has been an incredible hackathon!
        With this we are incredibly proud and happy with the submissions of all of the hackathon participants.
        But as stated in the rules, there are only 7 particpants that can win a prize from the DAO.
        First prize gets $8K in EFX, second prize gets $6K in EFX, third up to seventh get $2.5K in EFX.
        We would like to thank all of our DAO member who voted on this proposal and who are involved in seeing Effect Network continue growing in this new direction.
        With this hackathon announcing the new Effect Network as a truly decentralized platform for one and all.
        The voting page is availale at: <a href="/hackathon">hackathon</a>.
      </p>
      <p class="has-text-centered">
        So drumroll please! 🥁
      </p>
      <div class="box">
        <h4 class="box-title subtitle">
          Voting Distribution
        </h4>
        <div class="table-container">
          <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th class="has-text-centered">
                  VoteWeight
                </th>
                <th class="has-text-centered">
                  Prize (in EFX)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(label, index) in sortedVotesList" :key="label">
                <td>
                  <a :href="label[0].devpost">{{ label[1].name }}</a>
                </td>
                <td class="has-text-centered">
                  {{ parseInt(label[1].voteWeight) }}
                </td>
                <td v-if="index === 0" class="has-text-centered">
                  $8K
                </td>
                <td v-else-if="index === 1" class="has-text-centered">
                  $6K
                </td>
                <td v-else-if="[2,3,4,5,6].includes(index)" class="has-text-centered">
                  $2.5K
                </td>
                <td v-else class="has-text-centered">
                  0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <pie-chart v-if="innerChartBalances" :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <div class="box">
      <h4 class="box-title subtitle">
        Stats
      </h4>
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in stats" :key="stat.id">
              <td>{{ stat.name }}</td>
              <td>{{ stat.value }}</td>
              <td>{{ stat.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.js'
import hackathon from '@/static/json/hackathon.json'
console.log(hackathon)

export default {
  components: {
    PieChart
  },
  data () {
    return {
      loadingBalances: false,
      totalVoteWeight: 0,
      totalMembers: 0,
      totalHackathonVoteWeight: 0,
      totalVotes: 0,
      checkTotalVotes: 0,
      sortedVotesList: null,
      sortedVotesMap: null,
      nextCycleStartDate: '...',
      membersLowerBound: '13528614985990483600', // Hardcode lower bound from 300 members to minimize amount of fetches
      chartOptions: {
        cutoutPercentage: 10
      }
    }
  },
  computed: {
    stats () {
      return [
        {
          name: 'Total DAO Members',
          description: 'Including members with no vote-power',
          value: this.totalMembers
        },
        {
          name: 'Total DAO Voting Members',
          description: 'Members with voting power',
          value: 247
        },
        {
          name: 'Total Vote Weight',
          description: 'Sum of all vote-weight of members who participated',
          value: parseInt(this.totalHackathonVoteWeight) ?? ''
        },
        {
          name: 'Total Votes',
          description: 'Total Members who voted',
          value: this.totalVotes ?? ''
        },
        {
          name: 'Total vote per Member',
          description: '',
          value: this.checkTotalVotes ?? ''
        }

      ]
    },
    chartData () {
      return {
        // labels: ['Circulating', 'Foundation'],
        labels: hackathon.submissions.map(val => val.group_name),
        datasets: [
          {
            name: 'Token Map',
            backgroundColor: ['#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB'],
            weight: 0.55,
            meta: hackathon.submissions,
            data: this.innerChartBalances,
            labels: hackathon.submissions.map(val => val.group_name)
          }
        ]
      }
    },
    innerChartBalances () {
      return this.sortedVotesList ? this.sortedVotesList.map(el => el['1'].voteWeight).sort((a, b) => b - a) : null
    }
  },
  watch: {
    // eslint-disable-next-line
    '$dao.cycleConfig': function (value) {
      console.log('cycle config ready')
      if (value) {
        this.getTotalVoteWeight()
      }
    }
  },
  created () {
    this.calculateVotePower()
  },
  mounted () {
    this.getTotalVoteWeight()
    this.getDaoMembers()
  },
  methods: {
    async getVotes () {
      const config = {
        code: process.env.votingContract,
        scope: process.env.votingContract,
        table: 'vote',
        limit: -1
      }
      return await this.$eos.rpc.get_table_rows(config)
    },

    applyVoteWeight (element, index, voteWeight) {
      switch (index) {
        case 0: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.26) }
        case 1: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.20) }
        case 2: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.16) }
        case 3: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.13) }
        case 4: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.10) }
        case 5: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.08) }
        case 6: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.07) }
        default: return { id: element, voteweight: parseInt(Number(voteWeight) * 0.00) }
      }
    },

    applyName (element) {
      switch (element) {
        case '1': return 'Delos'
        case '3': return 'Haiku Generator'
        case '4': return 'ChessForce'
        case '5': return 'Catalogue'
        case '6': return 'Effect Notebooks'
        case '7': return 'Ask a stranger'
        case '8': return 'DStudio'
        case '9': return 'Simple UI'
        case '10': return 'Effect Research'
        case '11': return 'Vibelyze'
        case '12': return 'Gitstar'
        case '13': return 'Egrasia'
        case '14': return 'BlockSage'
        case '15': return 'EYEFX'
        case '16': return 'Authentic'
        case '17': return 'Youtube Chapters'
        case '18': return 'Effect Android Wallet'
        case '19': return 'Effect Voice'
        case '20': return 'EffectQA'
        default: return 'Not Named'
      }
    },

    async getTotalVoteWeight () {
      const cycleData = await this.$eos.rpc.get_table_rows({
        code: process.env.proposalContract,
        scope: process.env.proposalContract,
        table: 'cycle'
      })

      if (cycleData && cycleData.rows.length > 0) {
        this.totalVoteWeight = cycleData.rows[0].total_vote_weight
      }
    },

    async getDaoMembers () {
      while (this.membersLowerBound != null) {
        const members = await this.$eos.rpc.get_table_rows({
          code: process.env.daoContract,
          scope: process.env.daoContract,
          table: 'member',
          limit: -1
        })

        if (members && members.rows.length > 0) {
          this.totalMembers += members.rows.length
        }

        this.membersLowerBound = (members.next_key.length > 0) ? members.next_key : null
      }
    },

    async calculateVotePower () {
      const votes = await this.getVotes()

      const rows = votes.rows.map((vote) => {
        const appliedWeight = Array.of(...vote.comment_hash.split(','))
          .map((element, index) => this.applyVoteWeight(element, index, vote.weight))
        return appliedWeight
      })

      const flatRows = rows.flat()

      const totalVotes = rows.length
      const checkTotalVotes = flatRows.length / totalVotes
      const totalVoteWeight = flatRows.reduce((prev, current) => {
        return current.voteweight + prev
      }, 0)

      const mapRows = new Map()

      flatRows.map((element) => {
        if (!mapRows.has(element.id)) {
          mapRows.set(element.id, {
            voteWeight: element.voteweight,
            name: this.applyName(element.id)
          })
        } else {
          const tallyOldVoteWeight = mapRows.get(element.id).voteWeight
          mapRows.set(element.id, {
            voteWeight: element.voteweight += tallyOldVoteWeight,
            name: this.applyName(element.id)
          })
        }
      })

      const sortedMap = new Map([...mapRows.entries()].sort((a, b) => {
        return b[1].voteWeight - a[1].voteWeight
      }))

      const sortedList = []
      Array.from(sortedMap.entries()).forEach((val, indx) => {
        sortedList.push(val)
      })

      // const upgradedList = sortedList.map((el) => {
      //   hackathon.submissions.map((element) => {
      //     if (element[0] === el.id) {
      //       Object.assign(element, el)
      //     }
      //   })
      // })

      this.totalHackathonVoteWeight = totalVoteWeight
      this.totalVotes = totalVotes
      this.checkTotalVotes = checkTotalVotes
      this.sortedVotesMap = sortedMap
      this.sortedVotesList = sortedList
    }
  },
  head () {
    return {
      title: 'Hackathon Winners'
    }
  }
}
</script>

<style lang="scss">
table {
  font-size: 0.7em;

  .tag {
    font-size: 0.9em;
    height: inherit;
  }
}
</style>
