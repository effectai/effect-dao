import { Api, JsonRpc } from 'eosjs'

export default (context, inject) => {
  const rpc = new JsonRpc(`${process.env.eosNodeUrl}`)
  const api = new Api({ rpc })

  inject('eos', api)
}
