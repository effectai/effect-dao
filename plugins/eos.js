import { Api, JsonRpc } from 'eosjs'

export default (context, inject) => {
  // TODO add proper handling of prefix protocol and postfix port
  // http & 8888 for localhost
  // https & 443 for mainnet and testnet
  // JS substring function?

  const url = process.env.eosNodeUrl.includes('127') ? `http://${process.env.eosNodeUrl}:8888` : `https://${process.env.eosNodeUrl}:443`
  const rpc = new JsonRpc(url)
  const api = new Api({ rpc })

  inject('eos', api)
}
