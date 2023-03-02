<template>
  <div>
    <div>
      <!-- <div class="title is-5 mt-6"></div> -->
      <!-- <div class="box-title subtitle is-4 has-text-weight-bold mb-6">
        Effect DAO Social Hub
      </div> -->
      <div>
        <div class="box container">
          <div class="box-title subtitle is-5 has-text-weight-bold">EOS Network Foundation</div>
          <p>
            <em>
              "The EOS Network Foundation coordinates financial and non-financial support to encourage
              the growth and development of the EOS Network. Harnessing the power of decentralization
              to chart a coordinated future for the EOS Network as a force for positive global change."
            </em>
          </p>
          <div class="mt-5 columns is-centered">
            <a href="https://eosnetwork.com/" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="EOS Network Foundation Website"><font-awesome-icon :icon="['fas', 'file-word']" class="icon is-medium mx-3"/> </a>
            <a href="https://eosnetwork.com/blog/" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="EOS Network Foundation Blog"><font-awesome-icon :icon="['fas', 'blog']" class="icon is-medium mx-3"/></a>
            <a href="https://discord.gg/eos-network" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="EOS Network Foundation Discord"><font-awesome-icon :icon="['fab', 'discord']" class="icon is-medium mx-3"/></a>
          </div>
          <!-- <p class="mt-5"><a href="https://eosnetwork.com/">Website: eosnetwork.com</a></p>
          <p>Blog: <a href="https://eosnetwork.com/blog/">eosnetwork.com/blog</a></p>
          <p>Discord: <a href="https://discord.gg/eos-network">discord.gg/eos-network</a></p> -->
        </div>

        <div class="box container">
          <div class="box-title subtitle is-5 has-text-weight-bold">EOS Support DAO</div>
          <p>
            <em>"EOS user support created by the community for the community. The goal
              of EOS support is to help the average user onboard into EOS without any difficulties.
              It is the concierge of the EOS Network DAO. The true meaning of a DAO (Decentralized Autonomous Organization)."</em>
            </p>
            <div class="mt-5 columns is-centered">
            <a href="https://eossupport.io/" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="EOS Support Website"><font-awesome-icon :icon="['fas', 'file-word']" class="icon is-medium mx-3"/></a>
          </div>
        </div>

        <div class="box container">
          <div class="box-title subtitle is-5 has-text-weight-bold">EOS Respect</div>
          <p>
            <em>"EOS Respect creates the opportunity for community members to pool money,
            align with those that will be voted to receive funds and allocate those funds
            for EOS support's interest."</em>
            </p>
            <!-- <p>Learn more here: <a href="https://eosrespect.io/">eosrespect.io</a></p> -->
            <!-- <p class="mt-5">Get EOS support here: <a href="https://eossupport.io/">eossupport.io</a></p> -->
            <div class="mt-5 columns is-centered">
            <a href="https://eosrespect.io/" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="EOS Respect Website"><font-awesome-icon :icon="['fas', 'file-word']" class="icon is-medium mx-3"/></a>
          </div>
        </div>
        <div class="box container">
          <div class="box-title subtitle is-5 has-text-weight-bold">EOS Powerup</div>
          <p>
            <em>
              "Eospowerup.io is an essential tool for thousands of EOS community members
              and businesses to easily handle their account resources."
            </em>
          </p>
          <!-- <p class="mt-5">PowerUp your EOS account here: <a href="https://eospowerup.io">eospowerup.io</a></p> -->
          <div class="mt-5 columns is-centered">
            <a href="https://eospowerup.io" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="EOS PowerUp Website"><font-awesome-icon :icon="['fas', 'file-word']" class="icon is-medium mx-3"/></a>
          </div>
        </div>

        <div class="box container">
          <h1 class="box-title subtitle is-5 has-text-weight-bold">Pomelo</h1>
          <p>
            <em>"The ENF endorses Pomelo, a grant dapp that allows users to vote which dapps or people to
            provide financial support with their own EOS. Their grants work through a process called quadratic funding.
            You can read more about their process on their wiki."</em>
            <!-- <a href="https://github.com/pomelo-io/pomelo-wiki/wiki/Pomelo-Grants-Wiki">github.com/pomelo-io/pomelo-wiki/wiki/Pomelo-Grants-Wiki</a> -->
          </p>
          <!-- <p class="mt-5">Pomelo Grants: <a href="https://pomelo.io/">pomelo.io</a></p>
          <p >Pomelo Telegram: <a href="https://t.me/pomelo_io">Telegram</a></p> -->
          <div class="mt-5 columns is-centered">
            <a href="https://pomelo.io/" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="Pomelo Website"><font-awesome-icon :icon="['fas', 'file-word']" class="icon is-medium mx-3"/></a>
            <a href="https://github.com/pomelo-io/pomelo-wiki/wiki/Pomelo-Grants-Wiki" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="Pomelo Github"><font-awesome-icon :icon="['fab', 'github']" class="icon is-medium mx-3"/></a>
            <a href="https://t.me/pomelo_io" target="_blank" class="has-text-grey has-tooltip-top" data-tooltip="Pomelo Telegram"><font-awesome-icon :icon="['fab', 'telegram']" class="icon is-medium mx-3"/></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Contract } from 'Web3-eth-contract'
import Web3 from 'web3'

export default {
  components: {
  },
  head () {
    return {
      title: 'Token'
    }
  },
  data () {
    return {
      loadingBalances: false,
      totalVoteWeight: 0,
      totalMembers: 300,
      nextCycleStartDate: '...',
      membersLowerBound: '13528614985990483600', // Hardcode lower bound from 300 members to minimize amount of fetches
      balances: {
        daoBalance: 0,
        liquidBalance: 0,
        liquidBalanceBsc: 0,
        liquidNFXBalance: 0,
        stakeEFXBalance: 0,
        stakeNFXBalance: 0,
        unswappedBalance: 0,
        realeffectaiBalance: 0,
        defiboxBalance: 0,
        // foundationBalance: 195375000,
        foundationBalance: 100000000,
        liquidityBalance: 0,
        communityBalance: 5000000,
        maxSupply: 650000000
      },
      contracts: [
        {
          name: 'Effect Tokens',
          description: 'Contract managing the EFX and NFX tokens',
          account: 'effecttokens',
          link: 'https://bloks.io/account/effecttokens?loadContract=true&tab=Tables&table=stat&account=effecttokens&scope=EFX&limit=100',
          source: 'https://github.com/effectai/effect-network/tree/master/contracts/token'
        },
        {
          name: 'Effect Staking Protocol',
          description: 'Implemetation of the Effect Staking Protocol 2.0',
          account: 'efxstakepool',
          link: 'https://bloks.io/account/efxstakepool?loadContract=true&tab=Tables&account=efxstakepool&scope=efxstakepool&limit=100',
          source: 'https://github.com/effectai/effect-network-eos/blob/master/contracts/stake/stake.cpp'
        },
        {
          name: 'Token Swap',
          description: 'Verifies NEO transactions with an Oracle and issues EFX tokens on EOS',
          account: 'efxtokenswap',
          link: 'https://bloks.io/account/efxtokenswap?loadContract=true&tab=ABI&account=efxtokenswap&scope=efxtokenswap&limit=100&table=nep5',
          source: 'https://github.com/effectai/effect-network-eos/blob/master/contracts/swap/swap.cpp'
        },
        {
          name: 'EffectDAO',
          description: 'Holds the registry of the members and guardians of the EffectDAO',
          account: 'theeffectdao',
          link: 'https://bloks.io/account/theeffectdao?loadContract=true&tab=Tables&account=theeffectdao&scope=theeffectdao&limit=100&table=member',
          source: 'https://github.com/effectai/effect-network/blob/master/contracts/dao/dao.cpp'
        },
        {
          name: 'Effect Proposals',
          description: 'Stores proposals and handles the voting machanism of the EffectDAO',
          account: 'daoproposals',
          link: 'https://bloks.io/account/daoproposals?loadContract=true&tab=Tables&account=daoproposals&scope=daoproposals&limit=100&table=proposal',
          source: 'https://github.com/effectai/effect-network-eos/blob/proposals/contracts/effect-proposals/effect-proposals.cpp'
        },
        {
          name: 'Effect.AI Token on BSC',
          description: 'Smart contract on the BSC blockchain',
          account: '0xC51...5aD0',
          link: 'https://bscscan.com/token/0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
          source: null
        }
      ]
    }
  },
  watch: {
    // eslint-disable-next-line
    '$dao.cycleConfig': function (value) {
      console.log('cycle config ready')
      if (value) {
        this.getTotalVoteWeight()
        this.getNextCycleDate()
      }
    }
  },
  computed: {
    lastCycleId () {
      return (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id - 1 : null
    },
    stats () {
      return [
        {
          name: 'Members',
          description: '',
          value: this.totalMembers
        },
        // {
        //   name: 'Guardians',
        //   description: '',
        //   value: 97
        // },
        {
          name: 'Total Vote Weight Last Cycle',
          description: '',
          value: this.totalVoteWeight
        },
        {
          name: 'Next Cycle',
          description: '',
          value: this.nextCycleStartDate
        },
        {
          name: 'Distribution Strategy',
          description: '',
          value: '100% reward'
        },
        {
          name: 'Recycle Strategy',
          description: '',
          value: '70% hold, 30% distribute'
        }
      ]
    },
    chartData () {
      return {
        // labels: ['Circulating', 'Foundation'],
        labels: ['Liquid Supply (EOS)', 'Liquid Supply (BSC)', 'Stake Pool', 'Liquidity & Partnerships', 'EffectDAO', 'Foundation'],
        datasets: [
          {
            name: 'Token Map',
            backgroundColor: ['#0dd925', '#499166', '#fce68d', '#394dfa', '#d6fca4', '#7aa7ff', '#A4B8BB', '#7e8a8c'],
            weight: 0.55,
            meta: [
              {
                addressName: 'effecttokens',
                link: 'https://bloks.io/tokens/EFX-eos-effecttokens',
                description: null, // 'Current supply in circulation and not locked in any staking or timelock.',
                balanceKey: 'liquidBalance',
                token: 'EFX'
              },
              {
                addressName: '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
                link: 'https://bscscan.com/token/0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
                description: null,
                balanceKey: 'liquidBalanceBsc',
                token: 'EFX'
              },
              {
                addressName: 'efxstakepool',
                locked: true,
                link: 'https://bloks.io/account/efxstakepool',
                description: 'Staked EFX.',
                balanceKey: 'stakeEFXBalance',
                token: 'EFX'
              },
              {
                addressName: 'bsc.efx',
                link: 'https://bloks.io/account/bsc.efx',
                locked: false,
                description: 'Funds allocated for providing liquidity and partnership.',
                balanceKey: 'liquidityBalance',
                token: 'EFX'
              },
              {
                addressName: 'treasury.efx',
                link: 'https://bloks.io/account/treasury.efx',
                locked: true,
                description: 'Tokens governed by the DAO, from here proposals are funded.',
                balanceKey: 'daoBalance',
                token: 'EFX'
              },
              {
                addressName: 'efx',
                link: 'https://bloks.io/account/efx',
                locked: true,
                description: null, // 'EFX locked by the foundation until 2021-09.',
                balanceKey: 'foundationBalance',
                token: 'EFX'
              },
              {
                addressName: 'efxstakepool',
                locked: true,
                link: 'https://bloks.io/account/efxstakepool',
                description: 'Staked NFX.',
                balanceKey: 'stakeNFXBalance',
                token: 'NFX'
              },
              {
                addressName: 'realeffectai',
                locked: true,
                link: 'https://bloks.io/account/realeffectai',
                description: null,
                balanceKey: 'realeffectaiBalance',
                token: 'NFX'
              },
              {
                addressName: 'swap.defi',
                locked: true,
                link: 'https://bloks.io/account/swap.defi',
                description: 'NFX in defibox.io',
                balanceKey: 'defiboxBalance',
                token: 'NFX'
              },
              {
                addressName: 'effecttokens',
                link: 'https://bloks.io/tokens/NFX-eos-effecttokens',
                description: null, // 'Current supply in circulation and not locked in any staking or timelock.',
                balanceKey: 'liquidNFXBalance',
                token: 'NFX'
              }
            ],
            data: this.innerChartBalances,
            labels: ['Liquid Supply (EOS)', 'Liquid Supply (BSC)', 'EFX Stake Pool', 'Liquidity & Partnerships', 'EffectDAO', 'Foundation', 'NFX Stake Pool', 'realeffectai', 'Defibox', 'Liquid Supply NFX']
          }
        ]
      }
    },
    chartBalances () {
      return [
        // this.balances.liquidBalance + this.balances.unswappedBalance + this.balances.feepoolBalance + this.balances.marketingBalance + this.balances.liquidityBalance + this.balances.communityBalance,
        this.balances.liquidBalance + this.balances.liquidityBalance,
        this.balances.foundationBalance + this.balances.stakeEFXBalance + this.balances.daoBalance
      ]
    },
    innerChartBalances () {
      return [
        this.balances.liquidBalance,
        this.balances.stakeEFXBalance,
        this.balances.liquidityBalance,
        this.balances.unswappedBalance,
        this.balances.daoBalance,
        this.balances.foundationBalance
      ]
    }
  },
  mounted () {
    this.getBscBalance()
    this.getBalances()
    this.getTotalVoteWeight()
    this.getNextCycleDate()
    this.getDaoMembers()
  },
  methods: {

    async getBscBalance () {
      const provider = 'https://bsc-dataseed.binance.org/'
      const efxAddress = '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0'

      const json = [{
        inputs: [],
        name: 'totalSupply',
        outputs: [{
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }],
        stateMutability: 'view',
        type: 'function'
      }]

      const w3 = new Web3(provider)
      const efxContract = new w3.eth.Contract(json, efxAddress)
      // returns an int like this: 23153044824406508517219986
      const balance = await efxContract.methods.totalSupply().call().catch(console.log)

      // https://bscscan.com/unitconverter?wei=23153044824406508517219986
      // Formatted should look like this: 23153044.824406508517219986

      const formattedBalance = w3.utils.fromWei(balance)
      // fromWei return: 23153044.824406508517219986
      console.log(formattedBalance)
      return formattedBalance
    },
    async getBalances () {
      this.loadingBalances = true
      const circNFXSupply = parseInt((await fetch('https://www.api.bloks.io/tokens/NFX-eos-effecttokens').then(data => data.json()))[0].supply.circulating)
      const circSupply = parseInt((await fetch('https://www.api.bloks.io/tokens/EFX-eos-effecttokens').then(data => data.json()))[0].supply.circulating)
      this.balances.liquidBalanceBsc = parseInt(await this.getBscBalance())
      this.balances.daoBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'treasury.efx', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.stakeEFXBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'efxstakepool', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.liquidityBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'bsc.efx', process.env.efxToken))[0].replace(' EFX', ''))
      this.balances.liquidBalance = circSupply - this.balances.daoBalance - this.balances.stakeEFXBalance - this.balances.liquidityBalance - this.balances.foundationBalance - this.balances.liquidBalanceBsc
      this.balances.unswappedBalance = 650000000 - (this.balances.liquidBalance + this.balances.stakeEFXBalance + this.balances.foundationBalance + this.balances.liquidityBalance + this.balances.daoBalance)
      this.loadingBalances = false
      this.balances.stakeNFXBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'efxstakepool', process.env.nfxToken))[0].replace(' NFX', ''))
      this.balances.realeffectaiBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'realeffectai', process.env.nfxToken))[0].replace(' NFX', ''))
      this.balances.defiboxBalance = parseInt((await this.$eos.rpc.get_currency_balance(process.env.tokenContract, 'swap.defi', process.env.nfxToken))[0].replace(' NFX', ''))
      this.balances.liquidNFXBalance = circNFXSupply - this.balances.stakeNFXBalance - this.balances.realeffectaiBalance - this.balances.defiboxBalance
    },
    async getTotalVoteWeight () {
      const cycleData = await this.$eos.rpc.get_table_rows({
        code: process.env.proposalContract,
        scope: process.env.proposalContract,
        table: 'cycle',
        lower_bound: this.lastCycleId,
        upper_bound: this.lastCycleId
      })

      if (cycleData && cycleData.rows.length > 0) {
        this.totalVoteWeight = cycleData.rows[0].total_vote_weight
      }
    },
    getNextCycleDate () {
      if (this.$dao.proposalConfig && this.$dao.cycleConfig) {
        const lengthCycleSeconds = this.$dao.proposalConfig.cycle_duration_sec
        const nextCycleStartDate = new Date(this.$dao.cycleConfig.start_time)
        nextCycleStartDate.setSeconds(nextCycleStartDate.getSeconds() + lengthCycleSeconds)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        this.nextCycleStartDate = nextCycleStartDate.toLocaleDateString('en-US', options)
      }
    },
    async getDaoMembers () {
      while (this.membersLowerBound != null) {
        const members = await this.$eos.rpc.get_table_rows({
          code: process.env.daoContract,
          scope: process.env.daoContract,
          table: 'member',
          lower_bound: this.membersLowerBound,
          limit: 100
        })

        if (members && members.rows.length > 0) {
          this.totalMembers += members.rows.length
        }

        this.membersLowerBound = (members.next_key.length > 0) ? members.next_key : null
      }
    },
    hello (x) {
      if (!x) {
        return
      }

      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
