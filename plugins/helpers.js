import Long from 'long'
import {
  Serialize
} from 'eosjs'

const helpers = {
  bytesToHex (bytes) {
    let hex = ''
    for (const b of bytes) {
      const n = Number(b).toString(16)
      hex += (n.length === 1 ? '0' : '') + n
    }
    return hex
  },

  getCompositeKey (name, key) {
    const buf = new Serialize.SerialBuffer()
    buf.reserve(64)
    buf.pushName(name)
    const nameHex = this.bytesToHex(buf.getUint8Array(8)).match(/../g).reverse().join('')
    const keyHex = this.bytesToHex(Long.fromNumber(key).toBytes())
    return `0x${keyHex}${nameHex}`
  }
}

export default (context, inject) => {
  inject('helpers', helpers)
}
