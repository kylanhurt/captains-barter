// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../ReduxTypes'
import { CreateDexBuyTokenOrderComponent } from './CreateDexBuyTokenOrder.ui.js'

export const mapStateToProps = (state: State) => {
  const selectedWalletId = state.ui.wallets.selectedWalletId
  const wallet = state.ui.wallets.byId[selectedWalletId]
  const currencyCode = wallet.currencyCode
  const walletName = wallet.name
  const balance = wallet.nativeBalances[currencyCode]
  const fiatCurrencyCode = wallet.fiatCurrencyCode
  const receiveAddress = wallet.receiveAddress.publicAddress

  return {
    selectedWalletId,
    wallet,
    currencyCode,
    walletName,
    balance,
    fiatCurrencyCode,
    receiveAddress
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CreateDexBuyTokenOrderComponent)
