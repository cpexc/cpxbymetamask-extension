const Component = require('react').Component
const PropTypes = require('prop-types')
const h = require('react-hyperscript')
const inherits = require('util').inherits
const connect = require('react-redux').connect
const actions = require('../../../store/actions')
const { getNetworkDisplayName } = require('../../../../../app/scripts/controllers/network/util')

import Button from '../../ui/button'
// add image change function 20190724 dadfkim@hanmail.net
import { CPX_MAINNET_CODE, CPX_TESTNET_CODE, CPX_MAINNET, CPX_TESTNET } from '../../../../../app/scripts/controllers/network/enums'

let DIRECT_DEPOSIT_ROW_TITLE
let DIRECT_DEPOSIT_ROW_TEXT
let WYRE_ROW_TITLE
let WYRE_ROW_TEXT
let CPX_ROW_TITLE
let CPX_ROW_TEXT
let FAUCET_ROW_TITLE
let COINSWITCH_ROW_TITLE
let COINSWITCH_ROW_TEXT

function mapStateToProps (state) {
  return {
    network: state.metamask.network,
    address: state.metamask.selectedAddress,
  }
}

// add cpx market 20190726 dadfkim@hanmail.net
function mapDispatchToProps (dispatch) {
  return {
    toWyre: (address) => {
      dispatch(actions.buyEth({ service: 'wyre', address, amount: 0 }))
    },
    toCoinSwitch: (address) => {
      dispatch(actions.buyEth({ service: 'coinswitch', address }))
    },
    toCpx: (network) => {
      let cpxNetworkName = CPX_MAINNET
      if ( network == CPX_TESTNET_CODE )
        cpxNetworkName = CPX_TESTNET

      dispatch(actions.buyEth({ service: cpxNetworkName }))
    },
    hideModal: () => {
      dispatch(actions.hideModal())
    },
    hideWarning: () => {
      dispatch(actions.hideWarning())
    },
    showAccountDetailModal: () => {
      dispatch(actions.showModal({ name: 'ACCOUNT_DETAILS' }))
    },
    toFaucet: network => dispatch(actions.buyEth({ network })),
  }
}

inherits(DepositEtherModal, Component)
function DepositEtherModal (_, context) {
  Component.call(this)

  // need to set after i18n locale has loaded
  DIRECT_DEPOSIT_ROW_TITLE = context.t('directDepositEther')
  DIRECT_DEPOSIT_ROW_TEXT = context.t('directDepositEtherExplainer')
  WYRE_ROW_TITLE = context.t('buyWithWyre')
  WYRE_ROW_TEXT = context.t('buyWithWyreDescription')
  CPX_ROW_TITLE = context.t('buyWithCPX')
  CPX_ROW_TEXT = context.t('buyWithCPXDescription')
  FAUCET_ROW_TITLE = context.t('testFaucet')
  COINSWITCH_ROW_TITLE = context.t('buyCoinSwitch')
  COINSWITCH_ROW_TEXT = context.t('buyCoinSwitchExplainer')
}

DepositEtherModal.contextTypes = {
  t: PropTypes.func,
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(DepositEtherModal)


DepositEtherModal.prototype.facuetRowText = function (networkName) {
  return this.context.t('getEtherFromFaucet', [networkName])
}

DepositEtherModal.prototype.renderRow = function ({
  logo,
  title,
  text,
  buttonLabel,
  onButtonClick,
  hide,
  className,
  hideButton,
  hideTitle,
  onBackClick,
  showBackButton,
}) {
  if (hide) {
    return null
  }

  return h('div', {
      className: className || 'deposit-ether-modal__buy-row',
    }, [

    onBackClick && showBackButton && h('div.deposit-ether-modal__buy-row__back', {
      onClick: onBackClick,
    }, [

      h('i.fa.fa-arrow-left.cursor-pointer'),

    ]),

    h('div.deposit-ether-modal__buy-row__logo-container', [logo]),

      h('div.deposit-ether-modal__buy-row__description', [

        !hideTitle && h('div.deposit-ether-modal__buy-row__description__title', [title]),

        h('div.deposit-ether-modal__buy-row__description__text', [text]),

      ]),

      !hideButton && h('div.deposit-ether-modal__buy-row__button', [
        h(Button, {
          type: 'secondary',
          className: 'deposit-ether-modal__deposit-button',
          large: true,
          onClick: onButtonClick,
        }, [buttonLabel]),
      ]),

  ])
}

DepositEtherModal.prototype.render = function () {
  const { network, toWyre, toCoinSwitch, address, toFaucet, toCpx } = this.props

  const isTestNetwork = ['3', '4', '5', '42', '1009'].find(n => n === network)
  const networkName = getNetworkDisplayName(network)

  // add image change function 20190724 dadfkim@hanmail.net
  let imagePath = './images/deposit-eth.svg'
  let height = '60px';
  if ( network == CPX_MAINNET_CODE || network == CPX_TESTNET_CODE )
    imagePath = './images/deposit-cpx.svg', height = '120px'

  return h('div.page-container.page-container--full-width.page-container--full-height', {}, [

    h('div.page-container__header', [

      h('div.page-container__title', [this.context.t('depositEther')]),

      h('div.page-container__subtitle', [
        this.context.t('needEtherInWallet'),
      ]),

      h('div.page-container__header-close', {
        onClick: () => {
          this.props.hideWarning()
          this.props.hideModal()
        },
      }),

    ]),

    h('.page-container__content', {}, [

      h('div.deposit-ether-modal__buy-rows', [

        this.renderRow({
          logo: h('img.deposit-ether-modal__logo', {
            src: imagePath,
            height: {height},
          }),
          title: DIRECT_DEPOSIT_ROW_TITLE,
          text: DIRECT_DEPOSIT_ROW_TEXT,
          buttonLabel: this.context.t('viewAccount'),
          onButtonClick: () => this.goToAccountDetailsModal(),
        }),

        this.renderRow({
          logo: h('i.fa.fa-tint.fa-2x'),
          title: FAUCET_ROW_TITLE,
          text: this.facuetRowText(networkName),
          buttonLabel: this.context.t('getEther'),
          onButtonClick: () => toFaucet(network),
          hide: !isTestNetwork,
        }),

        this.renderRow({
          logo: h('div.deposit-ether-modal__logo', {
            style: {
              backgroundImage: 'url(\'./images/wyre.svg\')',
              height: '40px',
            },
          }),
          title: WYRE_ROW_TITLE,
          text: WYRE_ROW_TEXT,
          buttonLabel: this.context.t('continueToWyre'),
          onButtonClick: () => toWyre(address),
          hide: isTestNetwork,
        }),

        // add cpx market 20190726
        this.renderRow({
          logo: h('div.deposit-ether-modal__logo', {
            style: {
              backgroundImage: 'url(\'./images/cpx_stacked_logo.svg\')',
              height: '120px',
            },
          }),
          title: CPX_ROW_TITLE,
          text: CPX_ROW_TEXT,
          buttonLabel: this.context.t('continueToCPX'),
          onButtonClick: () => toCpx(network),
          hide: isTestNetwork,
        }),

        this.renderRow({
          logo: h('div.deposit-ether-modal__logo', {
            style: {
              backgroundImage: 'url(\'./images/coinswitch_logo.png\')',
              height: '40px',
            },
          }),
          title: COINSWITCH_ROW_TITLE,
          text: COINSWITCH_ROW_TEXT,
          buttonLabel: this.context.t('continueToCoinSwitch'),
          onButtonClick: () => toCoinSwitch(address),
          hide: isTestNetwork,
        }),

      ]),

    ]),
  ])
}

DepositEtherModal.prototype.goToAccountDetailsModal = function () {
  this.props.hideWarning()
  this.props.hideModal()
  this.props.showAccountDetailModal()
}
