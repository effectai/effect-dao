<template>
  <div>
    <div class="content">
      <h1 class="has-text-centered">
        Effect Network Hackathon Winner
      </h1>
      <img src="https://effect.network/_nuxt/img/coins.00f8b5f.png" alt="">

      <section class="section">
        <div class="container is-fullheight">
          <h1 class="title has-text-centered">Category 1:<br> Devpost Jury Winners</h1>
            <p><a href="https://effect-network-hackathon.devpost.com/">Effect Network's first hackathon</a> has finally come to a close.
              This has been an incredible hackathon! 🔥
            </p>
            <p>
              It's been an exciting hackathon and it was difficult to choose between all of the great submissions.
              We would like to thank all of the participants of the Effect Network Hackathon for their hardwork, creativity and late nights. You have helped us achieve a new mile stone with this new direction for Effect Network.
            </p>
            <p>
              The official judges from Devpost have announced the winners of Effect Network's first hackathon! We are really proud of these participants and wish them the best of luck in their future endeavors on the Effect Network platform.
            </p>
          <div class="my-6">
            <div class="columns is-multiline mt-6 is-fullheight">
              <div class="column has-special-hover is-fullheight">
                <a target="_blank" href="https://devpost.com/software/delos">
                  <div class="card has-text-centered has-gradient">
                    <div class="card-content">
                      <div class="content">
                        <div class="block">
                          <p class="has-text-weight-bold is-size-5">
                            <strong>1st 🥇</strong>
                          </p>
                        </div>
                        <div class="block">
                          <img :src="require('@/assets/img/delos.jpg')" class="is-icon-size-medium has-radius" style="height: 128px;"/>
                        </div>
                        <div class="block">
                          <span class="is-5 mt-1 has-text-weight-bold">Delos</span>
                          <p class="has-text-accent">$8,000 in USDT and $8,000 in EFX</p>
                          <div class="is-divider" />
                        </div>
                        <div class="block">
                          <p class="is-5"> Delos 💥 an Effect Network UI, specifically thought for image labeling tasks. </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div class="column has-special-hover is-large">
                <a target="_blank" href="https://devpost.com/software/catalogue-16tlek">
                  <div class="card has-text-centered has-gradient">
                    <div class="card-content">
                      <div class="content">
                        <div class="block">
                          <p class="has-text-weight-bold is-size-5">
                            <strong>2nd 🥈</strong>
                          </p>
                        </div>
                        <div class="block">
                          <img :src="require('@/assets/img/catalogue.png')" class="is-icon-size-medium has-radius" style="height: 128px;"/>
                        </div>
                        <div class="block">
                          <span class="is-5 mt-1 has-text-weight-bold">Catalogue</span>
                          <p class="has-text-accent">$5,000 in USDT and $5,000 in EFX</p>
                          <div class="is-divider" />
                        </div>
                        <div class="block">
                            <p class="is-5 is-link">Catalogue is an app built on Shopify, a platform used by 1.7M+ merchants.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div class="column has-special-hover">
                <a target="_blank" href="https://devpost.com/software/effect-notebooks">
                  <div class="card has-text-centered has-gradient">
                    <div class="card-content">
                      <div class="content">
                        <div class="block">
                          <p class="has-text-weight-bold is-size-5">
                            <strong>3rd 🥉</strong>
                          </p>
                        </div>
                        <div class="block">
                          <img :src="require('@/assets/img/effect_notebooks.jpg')" class="is-icon-size-medium has-radius" style="height: 128px;"/>
                        </div>
                        <div class="block">
                          <span class="is-5 mt-1 has-text-weight-bold">Effect Notebooks</span>
                          <p class="has-text-accent">$2,500 in USDT and $2,500</p>
                          <div class="is-divider" />
                        </div>
                        <div class="block">
                            <p class="is-5 is-link">Effect Notebooks is a campaign for workers to automate the cleaning of data. </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="content">
          <h2 class="has-text-centered">Category 2:<br>DAO Winners</h2>
          <p>
            The DAO is a corner stone of our platform and it's our great honor that we would like to present to you the judgment of the DAO.
            The votes have been tallied, and there are 7 winners that can win a prize from the DAO.
          </p>
          <p>
            First prize gets $8K in EFX, second prize gets $6K in EFX, third up to seventh get $2.5K in EFX.
            We would like to thank all of our DAO member who voted on this proposal and who are involved in seeing Effect Network continue growing in this new direction.
          </p>
          <p>
            With this hackathon announcing the new Effect Network as a truly decentralized platform for one and all.
            The voting page is availale at: <a href="/hackathon">hackathon</a>.
          </p>
          <p class="has-text-centered">
            So drumroll please! 🥁
          </p>
          <br>
        </div>
      </section>
      <div class="box">
        <h4 class="box-title subtitle">
          Catagory 2: DAO Distribution
        </h4>
        <div class="table-container">
          <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th></th>
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
                <td>{{index + 1}}</td>
                <td>
                  {{ label[1].name }}
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
        labels: this.chartLabels,
        datasets: [
          {
            name: 'Token Map',
            backgroundColor: ['#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB'],
            weight: 0.55,
            meta: hackathon.submissions,
            data: this.innerChartBalances,
            labels: this.chartLabels
          }
        ]
      }
    },
    innerChartBalances () {
      return this.sortedVotesList ? this.sortedVotesList.map(el => el['1'].voteWeight) : null
    },
    chartLabels () {
      console.log(this.sortedList)
      return this.sortedVotesList ? this.sortedVotesList.map(el => el['1'].name) : null
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
        case '13': return 'Ergasia'
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

  .column {
      display: flex;
  }
}
</style>
