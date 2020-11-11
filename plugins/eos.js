import { Api, JsonRpc } from 'eosjs'

export default (context, inject) => {
  const rpc = new JsonRpc(`https://${process.env.eosNodeUrl}:443`)
  const api = new Api({ rpc })

  inject('eos', api)
}
