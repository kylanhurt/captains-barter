// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes'
import {
  fetchTokenList,
  submitDexBuyTokenOrder  
} from './action.js'
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
    isCreateDexBuyTokenOrderProcessing
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTokenList: () => dispatch(fetchTokenList()),
  submitDexBuyTokenOrder: (tokenCode: string, tokenAmount: string, ethAmount: string) => dispatch(submitDexBuyTokenOrder(tokenCode, tokenAmount, ethAmount))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateDexBuyTokenOrderComponent)
