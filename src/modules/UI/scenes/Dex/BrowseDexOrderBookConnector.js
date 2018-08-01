// @flow

import { connect } from 'react-redux'
import type { Dispatch, State } from '../../../ReduxTypes.js'
import { BrowseDexOrderBookComponent } from './BrowseDexOrderBook.ui.js'
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

  return {

  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BrowseDexOrderBookComponent)
