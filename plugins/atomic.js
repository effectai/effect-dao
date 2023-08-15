// import Vue from 'vue'
import {
  RpcApi // for rpc calls
  // ExplorerApi // for api calls
} from 'atomicassets'

/**
 * https://api.eosrio.io
 * https://eos.greymass.com
 */

export default (_context, inject) => {
  // const apiurl = 'https://eos.api.atomicassets.io' // This api endpoint is not working.
  const apiurl = 'https://api.eosrio.io'
  const namespace = 'atomicassets'
  const api = new RpcApi(apiurl, namespace, { fetch, rateLimit: 10 })
  // const api = new ExplorerApi(apiurl, namespace, { fetch })

  inject('atomic', api)
}
