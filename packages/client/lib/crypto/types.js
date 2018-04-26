// TODO: REFACTOR THIS MADNESS

const typeforce = require('typeforce')

/**
 * [UINT31_MAX description]
 * @type {Number}
 */
const UINT31_MAX = Math.pow(2, 31) - 1

/**
 * [UInt31 description]
 * @param {Number} value
 */
function UInt31 (value) {
  return typeforce.UInt32(value) && value <= UINT31_MAX
}

/**
 * [BIP32Path description]
 * @param {String} value
 */
function BIP32Path (value) {
  return typeforce.String(value) && value.match(/^(m\/)?(\d+'?\/)*\d+'?$/)
}


BIP32Path.toJSON = () => {
  return 'BIP32 derivation path'
}

/**
 * [SATOSHI_MAX description]
 * @type {Number}
 */
const SATOSHI_MAX = 21 * 1e14

function Satoshi (value) {
  return typeforce.UInt53(value) && value <= SATOSHI_MAX
}

/**
 * external dependent types
 *
 * [BigInt description]
 * @type {BigInteger}
 */
const BigInt = typeforce.quacksLike('BigInteger')

/**
 * [ECPoint description]
 * @type {Point}
 */
const ECPoint = typeforce.quacksLike('Point')

/**
 * exposed, external API
 *
 * [ECSignature description]
 * @type {Object}
 */
const ECSignature = typeforce.compile({
  r: BigInt,
  s: BigInt
})

/**
 * [Network description]
 * @type {Object}
 */
const Network = typeforce.compile({
  messagePrefix: typeforce.oneOf(typeforce.Buffer, typeforce.String),
  bip32: {
    public: typeforce.UInt32,
    private: typeforce.UInt32
  },
  pubKeyHash: typeforce.UInt8,
  wif: typeforce.UInt8
})

/**
 * extend typeforce types with ours
 *
 * [types description]
 * @type {Object}
 */
let types = {
  BigInt: BigInt,
  BIP32Path: BIP32Path,
  Buffer256bit: typeforce.BufferN(32),
  ECPoint: ECPoint,
  ECSignature: ECSignature,
  Hash160bit: typeforce.BufferN(20),
  Hash256bit: typeforce.BufferN(32),
  Network: Network,
  Satoshi: Satoshi,
  UInt31: UInt31
}

for (const typeName in typeforce) {
  types[typeName] = typeforce[typeName]
}

module.exports = types
