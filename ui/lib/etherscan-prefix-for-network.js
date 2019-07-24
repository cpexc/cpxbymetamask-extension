module.exports = function (network) {
  const net = parseInt(network)
  let prefix
  switch (net) {
    case 1: // main net
      prefix = ''
      break
    case 3: // ropsten test net
      prefix = 'ropsten.'
      break
    case 4: // rinkeby test net
      prefix = 'rinkeby.'
      break
    case 42: // kovan test net
      prefix = 'kovan.'
      break
    case 5: // goerli test net
      prefix = 'goerli.'
      break
    case 1004: // cpx main net
      prefix = ''
      break
    case 1009: // cpx test net
      prefix = ''
      break
    default:
      prefix = ''
  }
  return prefix
}
