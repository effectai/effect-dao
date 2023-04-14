// import Vue from 'vue'
import {
  // RpcApi, // for rpc calls
  ExplorerApi // for api calls
} from 'atomicassets'

export default (context, inject) => {
  const apiurl = 'https://eos.api.atomicassets.io'
  const namespace = 'atomicassets'
  const api = new ExplorerApi(apiurl, namespace, { fetch })

  inject('atomic', api)
}
