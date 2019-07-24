const mergeMiddleware = require('json-rpc-engine/src/mergeMiddleware')
const createFetchMiddleware = require('eth-json-rpc-middleware/fetch')
const createBlockRefRewriteMiddleware = require('eth-json-rpc-middleware/block-ref-rewrite')
const createBlockCacheMiddleware = require('eth-json-rpc-middleware/block-cache')
const createInflightMiddleware = require('eth-json-rpc-middleware/inflight-cache')
const createBlockTrackerInspectorMiddleware = require('eth-json-rpc-middleware/block-tracker-inspector')
const providerFromMiddleware = require('eth-json-rpc-middleware/providerFromMiddleware')
const PollingBlockTracker = require('eth-block-tracker')
// add 
const createBlockReRefMiddleware = require('eth-json-rpc-middleware/block-ref')
const createRetryOnEmptyMiddleware = require('eth-json-rpc-middleware/retryOnEmpty')

const createScaffoldMiddleware = require('json-rpc-engine/src/createScaffoldMiddleware')
//const createInfuraMiddleware = require('eth-json-rpc-infura')

module.exports = createCpxClient
//base by createJsonRpcClient
function createCpxClient ({ rpcUrl }) {
  const fetchMiddleware = createFetchMiddleware({ rpcUrl })
  const blockProvider = providerFromMiddleware(fetchMiddleware)
  const blockTracker = new PollingBlockTracker({ provider: blockProvider, pollingInterval: 1000, retryTimeout: 1000 })

  const networkMiddleware = mergeMiddleware([
    createBlockRefRewriteMiddleware({ blockTracker }),
    createBlockCacheMiddleware({ blockTracker }),
    createInflightMiddleware(),
    //createBlockReRefMiddleware({ blockTracker, provider: blockProvider }),
    //createRetryOnEmptyMiddleware({ blockTracker, provider: blockProvider }),
    createBlockTrackerInspectorMiddleware({ blockTracker }),
    fetchMiddleware,
  ])
  return { networkMiddleware, blockTracker }
}
