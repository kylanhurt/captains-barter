// @flow

import { connect } from 'react-redux'
import type { Dispatch, State } from '../../../../ReduxTypes.js'
import { bns } from 'biggystring'
import { ZeroEx } from '0x.js'
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
import type { DEXOrder, FormattedDEXOrderInfo } from '../../../../../types.js'
import s from '../../../../../locales/strings.js'

export const mapStateToProps = (state: State, ownProps) => {
  const tokenInfo = state.ui.scenes.dex.tokenDirectory.find(item => ownProps.currencyCode)
  const order = ownProps.data.item
  const makerNativeTokenAmount = ZeroEx.toUnitAmount(order.makerTokenAmount, 18)
  const takerNativeTokenAmount = ZeroEx.toUnitAmount(order.takerTokenAmount, 18)
  const exchangeRate = makerNativeTokenAmount.div(takerNativeTokenAmount)
  const exchangeRateSyntax = exchangeRate.round(6).toString()
  const currentUnixTimestamp = Date.now()
  const expirationUnixTimestampSec = parseInt(order.expirationUnixTimestampSec)
  const timeDifference = expirationUnixTimestampSec / 1000 - currentUnixTimestamp / 1000
  const expiration = secondsToHms(timeDifference) || s.strings.dex_order_book_result_not_applicable
  return {
    tokenInfo,
    makerNativeTokenAmount,
    takerNativeTokenAmount,
    expiration,
    exchangeRateSyntax,
    order
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showConfirmFillDexOrderModal: (order: DEXOrder, formattedOrderInfo: FormattedDEXOrderInfo) => dispatch(showConfirmFillDexOrderModal(order, formattedOrderInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookResultComponent)
