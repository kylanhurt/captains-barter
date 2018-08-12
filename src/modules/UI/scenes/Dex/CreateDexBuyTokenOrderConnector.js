// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes'
import {
  fetchTokenList,
  submitDexBuyTokenOrder  
} from './DexAction.js'
import { CreateDexBuyTokenOrderComponent } from './CreateDexBuyTokenOrder.ui.js'
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
  const isCreateDexBuyTokenOrderProcessing = state.ui.scenes.dex.isCreateDexBuyTokenOrderProcessing
  const createDexBuyTokenOrderProgress = state.ui.scenes.dex.createDexBuyTokenOrderProgress
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
    isCreateDexBuyTokenOrderProcessing,
    createDexBuyTokenOrderProgress
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTokenList: () => dispatch(fetchTokenList()),
  submitDexBuyTokenOrder: (sellTokenCode: string, sellTokenAmount: string, buyTokenCode: string, buyTokenAmount: string) => 
    dispatch(submitDexBuyTokenOrder(sellTokenCode, sellTokenAmount, buyTokenCode, buyTokenAmount))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateDexBuyTokenOrderComponent)
