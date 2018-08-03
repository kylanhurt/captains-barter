// @flow

import { connect } from 'react-redux'
import type { Dispatch, State } from '../../../../ReduxTypes.js'
import { bns } from 'biggystring'
import {
  getCurrencyAccountFiatBalanceFromWallet,
  getCryptoBalanceInfoFromWallet,
  getFiatSymbol,
  truncateDecimals,
  secondsToHms
} from '../../../../utils.js'
import { OrderBookResultComponent } from './OrderBookResult.ui.js'
import s from '../../../../../locales/strings.js'

const WETH_DECIMAL = 18
const WETH_DECIMAL_STRING = WETH_DECIMAL.toString()
const WETH_MULTIPLIER = 1 + '0'.repeat(WETH_DECIMAL_STRING) 

export const mapStateToProps = (state: State, ownProps) => {
  const tokenInfo = state.ui.scenes.dex.tokenDirectory.find(item => ownProps.currencyCode)
  const decimal = tokenInfo.decimal
  const makerTokenAmount = ownProps.data.item.makerTokenAmount
  const tokenMultiplier = 1 + '0'.repeat(decimal)
  const makerNativeTokenAmount = bns.div(makerTokenAmount, tokenMultiplier, 12)
  const takerTokenAmount = ownProps.data.item.takerTokenAmount
  const takerNativeTokenAmount = bns.div(takerTokenAmount, WETH_MULTIPLIER, 12)
  const exchangeRate = bns.div(makerNativeTokenAmount, takerNativeTokenAmount, 8, 10)
  const currentUnixTimestamp = Date.now()
  const expirationUnixTimestampSec = parseInt(ownProps.data.item.expirationUnixTimestampSec)
  const timeDifference = expirationUnixTimestampSec / 1000 - currentUnixTimestamp / 1000
  const expiration = secondsToHms(timeDifference) || s.strings.dex_order_book_result_not_applicable
  return {
    tokenInfo,
    decimal,
    makerNativeTokenAmount,
    takerNativeTokenAmount,
    expiration,
    exchangeRate
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
 
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookResultComponent)
