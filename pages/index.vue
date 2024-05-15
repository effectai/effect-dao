<template>
  <div>
    <div class="has-text-centered my-6">
      <div v-if="wallet && wallet.auth">
        <h1 class="subtitle">Welcome {{wallet.auth.accountName}}!</h1>
        <!-- <div class="subtitle">Effect Network Dashboard</div> -->
        </div>
    </div>

    <div class="box has-shadow-outside">
    <div class="">
      <!-- parse date in a beautiful way -->
      Next DAO meeting: <strong>{{ nextDaoMeeting }}</strong><br><br>
    </div>
    <div class="buttons">
      <a class="button has-shadow-outside  is-light" href="https://discord.gg/C3sXe8kv" target="_blank" rel="noopener noreferrer">Join DAO Call</a>
      <a class="button has-shadow-outside  is-light" href="https://docs.google.com/spreadsheets/d/1dkPST_CZPePwpmdzvHw5WTG2HubM_FtymTKRAJEWfPs/edit" target="_blank" rel="noopener noreferrer">Upcoming Agenda</a>
      <a class="button has-shadow-outside  is-light" href="https://forms.gle/6QjEBwJYF4zV5ZJ78" target="_blank">Add topic to Agenda</a>
      <a class="button has-shadow-outside  is-light" href="https://docs.effectdao.tools/dao-archive/master" target="_blank" rel="noopener noreferrer">DAO Call Archives</a>
      <!-- It's also possible to add an iframe -->
      <!-- <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfeYTVK1aFkoIO8G7Di540-cf7bS4O98KzSfMAwjRNf_I2uvg/viewform?embedded=true"
          width="640"
          height="1417"
          frameborder="0"
          marginheight="0"
          marginwidth="0">Loading…</iframe> -->
    </div>
    </div>
    <br>

    <div class="box has-shadow-outside mb-6">
      <!-- loop through news items and display in table -->
      <div class="columns">
        <div v-for="newsItem in newsItems" :key="newsItem.id" class="column">
          <div class="subtitle">
            {{ newsItem.title }}
          </div>
          <div class="icon-text">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" class="icon is-small mx-3" />
            </span>
            <span>{{ showDate(newsItem.date) }}</span>
          </div>
          <br>
          <p>
            {{ newsItem.description }}
          </p>
        </div>
      </div>
    </div>

    <br>
    <div class="subtitle has-text-centered">
      Proposals
    </div>
    <div class="mb-6">
      <div v-if="proposals && proposals.length > 0" class="table has-shadow-outside">
        <!-- <div class="cell  has-text-weight-bold is-size-6"> -->
        <!--   Proposals now active -->
        <!-- </div> -->
        <div v-for="prop in proposals" :key="prop.id" class="cell">
          <nuxt-link :to="'/proposals/' + prop.id" class="is-flex-direction-row">
            <div class="is-size-6 has-text-primary is-flex-grow-1">
              #{{ prop.id }}: {{ prop.title }}
            </div>
            <div v-if="prop.status === 'active'" class="tag">
              Active
            </div>
            <div v-else-if="prop.status === 'processed'" class="tag">
              Processing
            </div>
            <div v-else>
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'chevron-circle-right']" class="icon has-text-primary mx-3" />
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-else>
        <div class="has-text-centered">
          No proposals in last cycle.
        </div>
      </div>
      <div class="has-text-centered">
      <a href="/proposals/new" class="button has-shadow-outside is-light">+ New proposal</a>
      </div>
    </div>
    <br>

    <!-- <h3 class="subtitle">Cycle information:</h3> -->
    <div class="subtitle has-text-centered">
      Network Stats
    </div>
    <div class="box has-shadow-outside mb-6">
      <div class="columns has-text-centered py-2">
        <div class="column">
          <div class="text">
            <span class="high is-size-3">
              <ICountUp v-if="currentCycle" :end-val="currentCycle" />
              <span v-else>..</span>
            </span> <br>
            <span class="low">Cycle</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="nfxPoolBalance > 0" class="high is-size-3">
              {{ $wallet.formatNumber(nfxPoolBalance) }}
            </span>
            <span v-else>..</span><br>
            <span class="low">NFX Pool Balance</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="efxPoolValue > 0" class="high is-size-3">
              ${{ $wallet.formatNumber(efxPoolValue) }}
            </span>
            <span v-else>..</span><br>
            <span class="low">EFX Pool Value</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="percentStaked > 0" class="high is-size-3">
              {{ percentStaked }}%
            </span>
            <span v-else>..</span><br>
            <span class="low">Staked EFX</span>
          </div>
        </div>
      </div>

      <div class="columns has-text-centered py-2">
        <div class="column">
          <div class="text">
            <span v-if="vaccount && vaccount.id" class="high is-size-3">
              {{ vaccount.id }}
            </span>
            <span v-else>..</span><br>
            <span class="low">Registered workers</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="taskSubmissions && taskSubmissions.id" class="high is-size-3">
              {{ $wallet.formatNumber(taskSubmissions.id) }}
            </span>
            <span v-else>..</span><br>
            <span class="low">Tasks done</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="forceSettings && forceSettings.fee_percentage" class="high is-size-3">
              {{ Number(forceSettings.fee_percentage).toPrecision(2) * 100 }}%
            </span>
            <span v-else>..</span><br>
            <span class="low">Fee % per task</span>
          </div>
        </div>
        <div class="splitter" />
        <div class="column">
          <div class="text">
            <span v-if="feePoolValue" class="high is-size-3">
              {{ $wallet.formatNumber(feePoolValue) }}
            </span>
            <span v-else>..</span><br>
            <span class="low">EFX fees this cycle</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'

export default {
  components: {
    ICountUp
  },
  data () {
    return {
      daoCall: {
        // starting date of the bi-weekly cycle
        startSchedule: new Date('2024-03-06T15:00:00Z'),
        startUTCHours: 15,
        startUTCMinutes: 0,
        expectedDuration: 2 // in hours
      },
      efxPrice: 0,
      efxPoolBalance: 0,
      nfxPoolBalance: 0,
      circSupply: 0,
      forceTransactions: 0,
      forceEfxPaid: 0,
      forceUsers: 0,
      proposals: [],
      vaccount: null,
      forceSettings: null,
      forcePayment: null,
      taskSubmissions: null,
      daoMembers: null,
      feePool: null,
      newsItems: [
        {
          id: 1,
          date: new Date(2023, 5, 22),
          title: 'NFT Profile Pictures',
          description: 'Since proposal 139 passed, you can now set your profile picture on the Effect Network DAO. Get started by connecting your wallet and going to your profile page.',
          link: 'https://dao.effect.network/profile'
        }
      ]
    }
  },

  computed: {
    votes () {
      return this.$wallet.calculateVotePower(this.$wallet.power, this.$wallet.nfxStaked)
    },
    efxPoolValue () {
      return parseInt(this.efxPrice * this.efxPoolBalance)
    },
    percentStaked () {
      return parseInt((this.efxPoolBalance / this.circSupply) * 100)
    },
    wallet () {
      return this.$wallet.wallet
    },
    efxAvailable () {
      return this.$wallet.efxAvailable
    },
    efxStaked () {
      return this.$wallet.efxStaked
    },
    nfxAvailable () {
      return this.$wallet.nfxAvailable
    },
    nfxStaked () {
      return this.$wallet.nfxStaked
    },
    currentCycle () {
      return this.$dao.proposalConfig ? this.$dao.proposalConfig.current_cycle : null
    },
    feePoolValue () {
      if (this.feePool && this.feePool.balance && this.feePool.balance[0] && this.feePool.balance[0].value) {
        return parseInt(this.feePool.balance[0].value * 0.0001)
      } else {
        return 0
      }
    },
    nextDaoMeeting () {
      const now = new Date()
      const nextMeeting = this.getNextBiWeeklyMeeting(now)

      // format the start time in minutes for DAO. eg 0 = 00, 1 = 01 etc.
      const formattedMinutes = this.daoCall.startUTCMinutes < 10 ? '0' + this.daoCall.startUTCMinutes : this.daoCall.startUTCMinutes

      // calc time until next meeting
      const timeUntilMeeting = nextMeeting.getTime() - now.getTime()
      const daysUntilMeeting = Math.floor(timeUntilMeeting / (1000 * 60 * 60 * 24))
      const hoursUntilMeeting = Math.floor((timeUntilMeeting % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutesUntilMeeting = Math.floor((timeUntilMeeting % (1000 * 60 * 60)) / (1000 * 60))

      const timeUntilMeetingString = daysUntilMeeting + ' days, ' + hoursUntilMeeting + ' hours, ' + minutesUntilMeeting + ' minutes'

      if (timeUntilMeeting <= 0) {
        return 'DAO meeting in progress'
      }

      return nextMeeting.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + ` at ${this.daoCall.startUTCHours}:${formattedMinutes} UTC (In ${timeUntilMeetingString})`
    }
  },

  watch: {
    currentCycle () {
      this.getProposals()
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.getVAccountStats()
      this.getForceSettings()
      this.getForcePayment()
      this.getTaskSubmissions()
      this.getFeePoolBalanceLastCycle()
      this.getDaoMembers()
      this.getCircSupply()
      this.getPoolBalance()
      this.getNFXPoolBalance()
      this.getEFXPrice()
      this.getProposals()
    },
    /**
     * Show the date of a newsItem
     */
    showDate (date) {
      const parsedDate = new Date(date)
      const options = { weekday: 'long', month: 'long', day: 'numeric' }
      return parsedDate.toLocaleDateString('en-US', options)
    },
    /**
     * Get current circluating supply of EFX
     */
    async getCircSupply () {
      const res = await this.$eos.rpc.get_table_rows({ code: process.env.tokenContract, scope: process.env.efxToken, table: 'stat' })
      if (res && res.rows && res.rows.length === 1) {
        // TODO Figure out why are these amounts subtracted?
        this.circSupply = parseFloat(res.rows[0].supply.replace(` ${process.env.efxToken}`, '')) - 170331473 - 100000000 - 88447533
      }
    },

    /**
     * Get total staked EFX
     */
    async getPoolBalance () {
      const res = await this.$eos.rpc.get_currency_balance(process.env.tokenContract, process.env.stakingContract, process.env.efxToken)
      this.efxPoolBalance = parseFloat(res[0].replace(` ${process.env.efxToken}`, ''))
    },

    /**
     * Get total staked NFX
     */
    async getNFXPoolBalance () {
      const res = await this.$eos.rpc.get_currency_balance(process.env.tokenContract, process.env.stakingContract, process.env.nfxToken)
      this.nfxPoolBalance = parseFloat(res[0].replace(` ${process.env.nfxToken}`, ''))
    },

    /**
     * Get EFX price from Coingecko
     */
    async getEFXPrice () {
      this.efxPrice = await fetch('https://api.coingecko.com/api/v3/coins/effect-network/tickers')
        .then(data => data.json())
        .then((data) => {
          return data.tickers[0].converted_last.usd
        })
    },

    async getVAccountStats () {
      const vAccountResponse = await this.$eos.rpc.get_table_rows({
        code: process.env.vaccountContract,
        scope: process.env.vaccountContract,
        table: 'account',
        limit: 1,
        reverse: true
      })
      const [vaccount] = vAccountResponse.rows
      this.vaccount = vaccount
    },

    async getForceSettings () {
      const forceSettingsResponse = await this.$eos.rpc.get_table_rows({
        code: process.env.forceContract,
        scope: process.env.forceContract,
        table: 'settings',
        limit: 1,
        reverse: true
      })
      const [forceSettings] = forceSettingsResponse.rows
      this.forceSettings = forceSettings
    },

    /**
     * Get the latest force payment
     *
     */
    async getForcePayment () {
      const forcePaymentResponse = await this.$eos.rpc.get_table_rows({
        code: process.env.forceContract,
        scope: process.env.forceContract,
        table: 'payment',
        limit: 1,
        reverse: true
      })
      const [forcePayment] = forcePaymentResponse.rows
      this.forcePayment = forcePayment
    },

    async getDaoMembers () {
      const daoMembersResponse = await this.$eos.rpc.get_table_rows({
        code: process.env.daoContract,
        scope: process.env.daoContract,
        table: 'member',
        limit: 1,
        reverse: true
      })
      this.daoMembers = daoMembersResponse.rows
    },

    async getFeePoolBalanceLastCycle () {
      const feePoolResponse = await this.$eos.rpc.get_table_rows({
        code: process.env.feepoolContract,
        scope: process.env.feepoolContract,
        table: 'balance',
        limit: 1,
        reverse: true
      })
      const [feePool] = feePoolResponse.rows
      this.feePool = feePool
    },

    async getTaskSubmissions () {
      const taskSubmissionsResponse = await this.$eos.rpc.get_table_rows({
        code: process.env.forceContract,
        scope: process.env.forceContract,
        table: 'submission',
        limit: 1,
        reverse: true
      })
      const [taskSubmission] = taskSubmissionsResponse.rows
      this.taskSubmissions = taskSubmission
    },

    async getProposals () {
      if (this.$dao.proposalConfig) {
        // Get active proposals
        const activeConfig = {
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'proposal',
          key_type: 'i64',
          index_position: 3, // 1: by proposer, 2: by cycle, 3: by id
          upper_bound: this.currentCycle,
          lower_bound: this.currentCycle,
          limit: 20
        }
        const activeData = await this.$eos.rpc.get_table_rows(activeConfig)
        const activeProposals = activeData.rows.map(proposal => ({ ...proposal, status: `cycle: ${proposal.cycle}` }))
        this.proposals.push(...activeProposals)

        // Get proposals from previous cycle
        const config = {
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'proposal',
          key_type: 'i64',
          index_position: 3, // 1: by proposer, 2: by cycle, 3: by id
          upper_bound: this.currentCycle - 1,
          lower_bound: this.currentCycle - 1,
          limit: 20
        }
        const processedData = await this.$eos.rpc.get_table_rows(config)
        const processedProposals = processedData.rows.map(proposal => ({ ...proposal, status: `cycle: ${proposal.cycle}` }))
        this.proposals.push(...processedProposals)

        // Get proposals from IPFS for each entry
        this.proposals.forEach(async (proposal) => {
          if (!proposal.title) {
            try {
              const ipfsProposal = await this.$dao.getIpfsContent(proposal.content_hash)
              this.$set(proposal, 'title', ipfsProposal.title)
            } catch (e) {
              console.error(e)
            }
          }
        })
        // console.log(data)
      } else {
        console.log('Still waiting for cycle')
      }
    },

    getNextBiWeeklyMeeting (now) {
      const startDate = this.daoCall.startSchedule
      const timeDiff = now.getTime() - startDate.getTime()
      const weeksPassed = Math.floor(timeDiff / (1000 * 3600 * 24 * 7 * 2)) // Calculate how many bi-weekly cycles have passed

      // Calculate the expected bi-weekly Wednesday based on the start date
      const expectedBiWeeklyWednesday = new Date(startDate.getTime() + ((weeksPassed * 14)) * 24 * 60 * 60 * 1000)
      expectedBiWeeklyWednesday.setUTCHours(this.daoCall.startUTCHours, this.daoCall.startUTCMinutes, 0, 0)

      // Check if the given dateTime is before the dao call.
      if (now.getUTCHours() < (this.daoCall.startUTCHours + this.daoCall.expectedDuration) && now.toDateString() === expectedBiWeeklyWednesday.toDateString()) {
        return expectedBiWeeklyWednesday
      } else {
        const nextBiWeeklyWednesday = new Date(startDate.getTime() + (weeksPassed * 14 + 14) * 24 * 60 * 60 * 1000)
        nextBiWeeklyWednesday.setUTCHours(this.daoCall.startUTCHours, this.daoCall.startUTCMinutes, 0, 0)
        return nextBiWeeklyWednesday
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.high {
  font-size: 22px;
  font-weight: 700;
}

.low {
  font-weight: 300;
  font-size: small;
}

.token-icon {
  height: 40px;
  margin-top: -11px;
  float: left;
  margin-right: -40px;

  &.nfx {
    height: 45px;
    margin-top: -13px;
  }
}

.splitter {
  border-left: 1px solid #CDD4E6;
  margin: 0.75em 0 0.75em 0;
}

@keyframes glow {
  from {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 29px -22px #d7ac00d4;
  }

  to {
    box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 40px 15px #d7ac00d4;
  }
}

.circle {
  .age-amount {
    font-size: 0.75rem;
  }
}

.value-circle {
  height: 125px;
  width: 125px;

  &.big {
    width: 175px;
    height: 175px;
  }

  margin: -9px auto 0;

  border-radius: 100%;
  box-shadow: -4px -4px 10px 0 #FFFFFF,
  4px 4px 10px 0 #CDD4E6;

  &.glow {
    animation: glow 2s infinite alternate ease-out;
    //box-shadow: -4px -4px 10px 0 #FFFFFF, 4px 4px 10px 0 #CDD4E6, 0px 0px 29px -22px #39e7bfd4;
  }

  background-color: #F0F2F7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 0;
  }
}</style>
