// @flow

import { connect } from 'react-redux'
import type { Dispatch, State } from '../../../../ReduxTypes.js'
import { bns } from 'biggystring'
import { ZeroEx } from '0x.js'
import { getCurrencyConverter } from '../../../../Core/selectors.js'
import { getSelectedWallet } from '../../../selectors.js'
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
} from '../DexAction.js'
import { OrderBookResultComponent } from './OrderBookResult.ui.js'
import type { DEXOrder, FormattedDEXOrderInfo } from '../../../../../types.js'
import s from '../../../../../locales/strings.js'

export const mapStateToProps = (state: State, ownProps) => {
  const sellTokenInfo = state.ui.scenes.dex.tokenDirectory.find(item => ownProps.sellTokenCode)
  const buyTokenInfo = state.ui.scenes.dex.tokenDirectory.find(item => ownProps.buyTokenCode)
  const wallet = getSelectedWallet(state)
  const order = ownProps.data.item
  const makerNativeTokenAmount = ZeroEx.toUnitAmount(order.makerTokenAmount, sellTokenInfo.decimal)
  const takerNativeTokenAmount = ZeroEx.toUnitAmount(order.takerTokenAmount, buyTokenInfo.decimal)
  const forwardExchangeRate = makerNativeTokenAmount.div(takerNativeTokenAmount)
  const forwardExchangeRateSyntax = forwardExchangeRate.round(6).toString()
  const reverseExchangeRate = takerNativeTokenAmount.div(makerNativeTokenAmount)
  const reverseExchangeRateSyntax = reverseExchangeRate.round(6).toString()
  const currentUnixTimestamp = Date.now()
  const expirationUnixTimestampSec = parseInt(order.expirationUnixTimestampSec)
  const timeDifference = expirationUnixTimestampSec - currentUnixTimestamp / 1000
  const expiration = secondsToHms(timeDifference) || s.strings.dex_order_book_result_not_applicable
  const currencyConverter = getCurrencyConverter(state)
  return {
    makerNativeTokenAmount,
    takerNativeTokenAmount,
    expiration,
    forwardExchangeRateSyntax,
    reverseExchangeRateSyntax,
    order,
    currencyConverter,
    wallet
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showConfirmFillDexOrderModal: (order: DEXOrder, formattedOrderInfo: FormattedDEXOrderInfo) => dispatch(showConfirmFillDexOrderModal(order, formattedOrderInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookResultComponent)
