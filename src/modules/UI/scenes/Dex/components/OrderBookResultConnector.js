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
import {
  fillDexOrder,
  showConfirmFillDexOrderModal
} from '../action.js'
import { OrderBookResultComponent } from './OrderBookResult.ui.js'
import type { DEXOrder } from '../../../../../types.js'
import s from '../../../../../locales/strings.js'

const WETH_DECIMAL = 18
const WETH_DECIMAL_STRING = WETH_DECIMAL.toString()
const WETH_MULTIPLIER = 1 + '0'.repeat(WETH_DECIMAL_STRING) 

export const mapStateToProps = (state: State, ownProps) => {
  const tokenInfo = state.ui.scenes.dex.tokenDirectory.find(item => ownProps.currencyCode)
  const decimal = tokenInfo.decimal
  const order = ownProps.data.item
  const makerTokenAmount = order.makerTokenAmount
  const tokenMultiplier = 1 + '0'.repeat(decimal)
  const makerNativeTokenAmount = bns.div(makerTokenAmount, tokenMultiplier, 12)
  const takerTokenAmount = order.takerTokenAmount
  const takerNativeTokenAmount = bns.div(takerTokenAmount, WETH_MULTIPLIER, 12)
  const exchangeRate = bns.div(makerNativeTokenAmount, takerNativeTokenAmount, 8, 10)
  const currentUnixTimestamp = Date.now()
  const expirationUnixTimestampSec = parseInt(order.expirationUnixTimestampSec)
  const timeDifference = expirationUnixTimestampSec / 1000 - currentUnixTimestamp / 1000
  const expiration = secondsToHms(timeDifference) || s.strings.dex_order_book_result_not_applicable
  return {
    tokenInfo,
    decimal,
    makerNativeTokenAmount,
    takerNativeTokenAmount,
    expiration,
    exchangeRate,
    order
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  showConfirmFillDexOrderModal: (formattedOrderInfo: FormattedDEXOrderInfo) => dispatch(showConfirmFillDexOrderModal(formattedOrderInfo)),
  // fillDexOrder: () => dispatch(fillDexOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookResultComponent)
