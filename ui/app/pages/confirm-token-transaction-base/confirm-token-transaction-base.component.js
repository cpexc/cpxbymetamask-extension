import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConfirmTransactionBase from '../confirm-transaction-base'
import UserPreferencedCurrencyDisplay from '../../components/app/user-preferenced-currency-display'
import {
  formatCurrency,
  convertTokenToFiat,
  addFiat,
  roundExponential,
} from '../../helpers/utils/confirm-tx.util'
import { getWeiHexFromDecimalValue } from '../../helpers/utils/conversions.util'
import { ETH, PRIMARY } from '../../helpers/constants/common'
// add image change function 20190724 dadfkim@hanmail.net
import { CPX_MAINNET_CODE, CPX_TESTNET_CODE } from '../../../../app/scripts/controllers/network/enums'

export default class ConfirmTokenTransactionBase extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    tokenAddress: PropTypes.string,
    toAddress: PropTypes.string,
    tokenAmount: PropTypes.number,
    tokenSymbol: PropTypes.string,
    fiatTransactionTotal: PropTypes.string,
    ethTransactionTotal: PropTypes.string,
    contractExchangeRate: PropTypes.number,
    conversionRate: PropTypes.number,
    currentCurrency: PropTypes.string,
    network: PropTypes.string,
  }

  getFiatTransactionAmount () {
    const { tokenAmount, currentCurrency, conversionRate, contractExchangeRate } = this.props

    return convertTokenToFiat({
      value: tokenAmount,
      toCurrency: currentCurrency,
      conversionRate,
      contractExchangeRate,
    })
  }

  renderSubtitleComponent () {
    const { contractExchangeRate, tokenAmount } = this.props

    const decimalEthValue = (tokenAmount * contractExchangeRate) || 0
    const hexWeiValue = getWeiHexFromDecimalValue({
      value: decimalEthValue,
      fromCurrency: ETH,
      fromDenomination: ETH,
    })

    return typeof contractExchangeRate === 'undefined'
      ? (
        <span>
          { this.context.t('noConversionRateAvailable') }
        </span>
      ) : (
        <UserPreferencedCurrencyDisplay
          value={hexWeiValue}
          type={PRIMARY}
          showEthLogo
          hideLabel
        />
      )
  }

  renderPrimaryTotalTextOverride () {
    const { tokenAmount, tokenSymbol, ethTransactionTotal, network } = this.props
    const tokensText = `${tokenAmount} ${tokenSymbol}`

    // add image change function 20190724 dadfkim@hanmail.net
    let imagePath = './images/eth.svg'
    if ( network == CPX_MAINNET_CODE || network == CPX_TESTNET_CODE )
      imagePath = './images/cpx.svg'

    return (
      <div>
        <span>{ `${tokensText} + ` }</span>
        <img
          src={imagePath}
          height="18"
        />
        <span>{ ethTransactionTotal }</span>
      </div>
    )
  }

  getSecondaryTotalTextOverride () {
    const { fiatTransactionTotal, currentCurrency, contractExchangeRate } = this.props

    if (typeof contractExchangeRate === 'undefined') {
      return formatCurrency(fiatTransactionTotal, currentCurrency)
    } else {
      const fiatTransactionAmount = this.getFiatTransactionAmount()
      const fiatTotal = addFiat(fiatTransactionAmount, fiatTransactionTotal)
      const roundedFiatTotal = roundExponential(fiatTotal)
      return formatCurrency(roundedFiatTotal, currentCurrency)
    }
  }

  render () {
    const {
      toAddress,
      tokenAddress,
      tokenSymbol,
      tokenAmount,
      ...restProps
    } = this.props

    const tokensText = `${tokenAmount} ${tokenSymbol}`

    return (
      <ConfirmTransactionBase
        toAddress={toAddress}
        identiconAddress={tokenAddress}
        title={tokensText}
        subtitleComponent={this.renderSubtitleComponent()}
        primaryTotalTextOverride={this.renderPrimaryTotalTextOverride()}
        secondaryTotalTextOverride={this.getSecondaryTotalTextOverride()}
        {...restProps}
      />
    )
  }
}
