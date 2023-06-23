// import Vue from 'vue'
import {
  // RpcApi, // for rpc calls
  ExplorerApi // for api calls
} from 'atomicassets'

export default (_context, inject) => {
  const apiurl = 'http://api.eoseoul.io'
  const namespace = 'atomicassets'
  const api = new ExplorerApi(apiurl, namespace, { fetch })

  inject('atomic', api)
}
