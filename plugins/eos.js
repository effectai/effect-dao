import { Api, JsonRpc } from 'eosjs'

export default (context, inject) => {
  /**
   * We use eos.js to do readonly actions on the EOS blockchain. To do transactions or execute data
   * use transit.js as this requires a authenticated account to be present.
   */
  const rpc = new JsonRpc(`https://${process.env.eosNodeUrl}:443`)
  const api = new Api({ rpc })
  inject('eos', api)
}
