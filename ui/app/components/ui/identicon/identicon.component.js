import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { toDataUrl } from '../../../../lib/blockies'
import contractMap from 'eth-contract-metadata'
import { checksumAddress } from '../../../helpers/utils/util'
import Jazzicon from '../jazzicon'
// add image change function 20190724 dadfkim@hanmail.net
import { CPX_MAINNET_CODE, CPX_TESTNET_CODE } from '../../../../../app/scripts/controllers/network/enums'

const getStyles = diameter => (
  {
    height: diameter,
    width: diameter,
    borderRadius: diameter / 2,
  }
)

export default class Identicon extends PureComponent {
  static propTypes = {
    addBorder: PropTypes.bool,
    address: PropTypes.string,
    className: PropTypes.string,
    diameter: PropTypes.number,
    image: PropTypes.string,
    useBlockie: PropTypes.bool,
    network: PropTypes.string,
  }

  static defaultProps = {
    diameter: 46,
  }

  renderImage () {
    const { className, diameter, image, network } = this.props

    // add image change function 20190724 dadfkim@hanmail.net
    let imagePath = image
    if ( network == CPX_MAINNET_CODE || network == CPX_TESTNET_CODE )
      imagePath = './images/cpx_logo.svg'

    return (
      <img
        className={classnames('identicon', className)}
        src={imagePath}
        style={getStyles(diameter)}
      />
    )
  }

  renderJazzicon () {
    const { address, className, diameter } = this.props

    return (
      <Jazzicon
        address={address}
        diameter={diameter}
        className={classnames('identicon', className)}
        style={getStyles(diameter)}
      />
    )
  }

  renderBlockie () {
    const { address, className, diameter } = this.props

    return (
      <div
        className={classnames('identicon', className)}
        style={getStyles(diameter)}
      >
        <img
          src={toDataUrl(address)}
          height={diameter}
          width={diameter}
        />
      </div>
    )
  }

  render () {
    const { className, address, image, diameter, useBlockie, addBorder, network } = this.props

    // add image change function 20190724 dadfkim@hanmail.net
    let imagePath = './images/eth_logo.svg'
    if ( network == CPX_MAINNET_CODE || network == CPX_TESTNET_CODE )
      imagePath = './images/cpx_logo.svg'

    if (image) {
      return this.renderImage()
    }

    if (address) {
      const checksummedAddress = checksumAddress(address)

      if (contractMap[checksummedAddress] && contractMap[checksummedAddress].logo) {
        return this.renderJazzicon()
      }

      return (
        <div className={classnames({ 'identicon__address-wrapper': addBorder })}>
          { useBlockie ? this.renderBlockie() : this.renderJazzicon() }
        </div>
      )
    }

    return (
      <img
        className={classnames('balance-icon', className)}
        src={imagePath}
        style={getStyles(diameter)}
      />
    )
  }
}
