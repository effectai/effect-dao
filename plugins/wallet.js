import Vue from 'vue'

export default (context, inject) => {
  const wallet = new Vue({
    data () {
      return {
        wallet: null,

        efxAvailable: 0,
        efxStaked: 0,
        nfxAvailable: 0,
        nfxStaked: 0,

        lastClaimAge: null,
        lastClaimTime: null,

        efxUnstakeAmount: 0,
        efxUnstakeTime: null,
        efxCanClaim: false
      }
    },

    computed: {
      eos () {
        return context.$eos
      },

      claimableNfx () {
        if (!this.efxStaked) {
          return 0
        }

        const lastClaimTime = new Date(`${this.lastClaimTime}Z`)
        const claimStopTime = new Date(1604188799 * 1000)
        let now = new Date()
        if (now > claimStopTime) {
          now = claimStopTime
        }
        const diffTime = now.getTime() - lastClaimTime.getTime()
        const diffSeconds = diffTime / 1000
        const age = this.lastClaimAge
        const limit = 200 * 24 * 3600
        const newAge = Math.min(limit, age + diffSeconds)
        const avgAge = ((age + newAge) / 2) * Math.min(1, 1 - ((diffSeconds - (limit - age)) / diffSeconds)) + newAge * Math.max(0, (diffSeconds - (limit - age)) / diffSeconds)
        return Math.floor(((this.efxStaked * diffSeconds * avgAge / 86400) / (1000000 * 24 * 3600)) * 10000) / 10000
      },

      stakeAge () {
        // eslint-disable-next-line
        this.refreshStakeAge
        if (!this.efxStaked) {
          return 0
        }

        // Add 'Z' for UTC time
        let lastClaimTime = new Date(`${this.lastClaimTime}Z`)
        const claimStopTime = new Date(1604188799 * 1000)
        let limit = 1000 * 24 * 3600
        let now = new Date()
        let age = this.lastClaimAge
        if (lastClaimTime < claimStopTime) {
          limit = 200 * 24 * 3600
          if (now > claimStopTime) {
            now = claimStopTime
            const diffTime = Math.abs(now.getTime() - lastClaimTime.getTime())
            const diffSeconds = diffTime / 1000
            age = Math.min(limit, this.lastClaimAge + diffSeconds)
            lastClaimTime = now
            limit = 1000 * 24 * 3600
            now = new Date()
          }
        }

        const diffTime = Math.abs(now.getTime() - lastClaimTime.getTime())
        const diffSeconds = diffTime / 1000
        return Math.min(limit, age + diffSeconds)
      },

      power () {
        return parseFloat(this.efxStaked) + parseFloat((this.stakeAge / (200 * 24 * 3600)) * this.efxStaked)
      }
    },

    methods: {
      init (wallet) {
        this.wallet = wallet
        this.getAccountBalance()
        this.getStakes()
        this.getUnstakes()
      },

      clear () {
        Object.assign(this.$data, this.$options.data.call(this))
      },

      async getAccountBalance () {
        this.efxAvailable = parseFloat((await this.eos.rpc.get_currency_balance(process.env.tokenContract, this.wallet.auth.accountName, process.env.efxToken))[0].replace(` ${process.env.efxToken}`, ''))
        this.nfxAvailable = parseFloat((await this.eos.rpc.get_currency_balance(process.env.tokenContract, this.wallet.auth.accountName, process.env.nfxToken))[0].replace(` ${process.env.nfxToken}`, ''))
      },

      async getStakes () {
        await this.eos.rpc.get_table_rows({
          code: process.env.stakingContract,
          scope: this.wallet.auth.accountName,
          table: 'stake'
        }).then((data) => {
          if (data.rows && data.rows.length > 0) {
            const row = data.rows[0]
            this.efxStaked = parseFloat(row.amount.replace(` ${process.env.efxToken}`, '').replace('.', ','))
            this.lastClaimTime = row.last_claim_time
            this.lastClaimAge = row.last_claim_age
          }
        })
      },

      async getUnstakes () {
        await this.eos.rpc.get_table_rows({
          code: process.env.stakingContract,
          scope: this.wallet.auth.accountName,
          table: 'unstake'
        }).then((data) => {
          if (data.rows && data.rows.length > 0) {
            const row = data.rows[0]
            this.efxUnstakeAmount = row.amount
            this.efxUnstakeTime = new Date(row.time)
            this.efxCanClaim = this.unstakeTime <= new Date()
          }
        })
      }
    }
  })

  inject('wallet', wallet)
}
