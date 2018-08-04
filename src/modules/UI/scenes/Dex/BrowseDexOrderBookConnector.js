// @flow

import { connect } from 'react-redux'
import type { Dispatch, State } from '../../../ReduxTypes.js'
import {
  BrowseDexOrderBookComponent
} from './BrowseDexOrderBook.ui.js'
import {
  fetchTokenList,
  fetchDexOrderBook
} from './action.js'

import {
  getCurrencyAccountFiatBalanceFromWallet,
  getCryptoBalanceInfoFromWallet,
  getFiatSymbol
} from '../../../utils.js'

export const mapStateToProps = (state: State) => {
  const selectedWalletId = state.ui.wallets.selectedWalletId
  const wallet = state.ui.wallets.byId[selectedWalletId]
  const currencyCode = wallet.currencyCode
  const walletName = wallet.name
  const balanceInfo = getCryptoBalanceInfoFromWallet(wallet, currencyCode, state)
  const balance = balanceInfo.formattedCryptoBalance
  const symbol = balanceInfo.symbol
  const receiveAddress = wallet.receiveAddress.publicAddress
  const fiatBalance = getCurrencyAccountFiatBalanceFromWallet(wallet, currencyCode, state)
  const settings = state.ui.settings
  const fiatSymbol = settings.defaultFiat ? getFiatSymbol(settings.defaultFiat) : ''
  const orderBookBids = state.ui.scenes.dex.orderBookBids
  const isConfirmFillDexOrderModalVisible =  state.ui.scenes.dex.isConfirmFillDexOrderModalVisible
  return {
    selectedWalletId,
    wallet,
    currencyCode,
    walletName,
    balance,
    symbol,
    receiveAddress,
    fiatBalance,
    fiatSymbol,
    orderBookBids,
    isConfirmFillDexOrderModalVisible
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTokenList: () => dispatch(fetchTokenList()),
  fetchDexOrderBook: (type: string, tokenCode: string) => dispatch(fetchDexOrderBook(type, tokenCode))
})

export default connect(mapStateToProps, mapDispatchToProps)(BrowseDexOrderBookComponent)
