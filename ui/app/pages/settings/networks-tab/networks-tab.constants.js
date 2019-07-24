const defaultNetworksData = [
  { // add network 20190715 dadfkim@hanmail.net
    labelKey: 'cpx_mainnet',
    iconColor: '#9064FF',
    border: '1px solid #6A737D',
    providerType: 'rpc',
    rpcUrl: 'http://wallet.cpexc.com:8545/',
    chainId: '1004',
    ticker: 'CPX',
    blockExplorerUrl: 'http://explorert2.cpexc.com',
  },
  {
    labelKey: 'cpx_testnet',
    iconColor: '#FF4A8D',
    border: '1px solid #6A737D',
    providerType: 'rpc',
    rpcUrl: 'http://testnet.wallet.cpexc.com:8545/',
    chainId: '1009',
    ticker: 'CPX',
    blockExplorerUrl: 'http://40.78.2.104:3000',
  },
  {
    labelKey: 'mainnet',
    iconColor: '#29B6AF',
    providerType: 'mainnet',
    rpcUrl: 'https://api.infura.io/v1/jsonrpc/mainnet',
    chainId: '1',
    ticker: 'ETH',
    blockExplorerUrl: 'https://etherscan.io',
  },
  {
    labelKey: 'ropsten',
    iconColor: '#FF4A8D',
    providerType: 'ropsten',
    rpcUrl: 'https://api.infura.io/v1/jsonrpc/ropsten',
    chainId: '3',
    ticker: 'ETH',
    blockExplorerUrl: 'https://ropsten.etherscan.io',
  },
  {
    labelKey: 'kovan',
    iconColor: '#9064FF',
    providerType: 'kovan',
    rpcUrl: 'https://api.infura.io/v1/jsonrpc/kovan',
    chainId: '4',
    ticker: 'ETH',
    blockExplorerUrl: 'https://etherscan.io',
  },
  {
    labelKey: 'rinkeby',
    iconColor: '#F6C343',
    providerType: 'rinkeby',
    rpcUrl: 'https://api.infura.io/v1/jsonrpc/rinkeby',
    chainId: '42',
    ticker: 'ETH',
    blockExplorerUrl: 'https://rinkeby.etherscan.io',
  },
  {
    labelKey: 'goerli',
    iconColor: '#3099f2',
    providerType: 'goerli',
    rpcUrl: 'https://api.infura.io/v1/jsonrpc/goerli',
    chainId: '5',
    ticker: 'ETH',
    blockExplorerUrl: 'https://goerli.etherscan.io',
  },
  {
    labelKey: 'localhost',
    iconColor: 'white',
    border: '1px solid #6A737D',
    providerType: 'localhost',
    rpcUrl: 'http://localhost:8545/',
    blockExplorerUrl: 'https://etherscan.io',
  },
]

export {
  defaultNetworksData,
}
