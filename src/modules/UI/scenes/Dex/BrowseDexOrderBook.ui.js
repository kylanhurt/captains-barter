// @flow

import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import s from '../../../../locales/strings.js'
import { Actions } from 'react-native-router-flux'
import {
  CREATE_DEX_SELECT_TOKEN, BIDS, ASKS
} from '../../../../constants/indexConstants.js'
import SearchResults from '../../components/SearchResults'
import OrderBookResult from './components/OrderBookResultConnector.js'
import { TertiaryButton } from '../../components/Modals/components/TertiaryButton.ui.js'
import Text from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui.js'
import SafeAreaView from '../../components/SafeAreaView'
import styles from './style.js'
import { ConfirmFillDexOrderModalConnector as ConfirmFillDexOrderModal} from './components/ConfirmFillDexOrderModalConnector.js'

export type BrowseDexOrderBookOwnProps = {
  selectedWalletId: string,
  wallet: GuiWallet,
  currencyCode: string,
  walletName: string,
  balance: null,
  fiatCurrencyCode: string,
  receiveAddress: string,
  symbol: string,
  fiatSymbol: string,
  fiatBalance: string,
  fetchDexOrderBook: (type: string, tokenCode: string) => void,
  getTokenList: () => void
}

export type BrowseDexOrderBookStateProps = {}
export type BrowseDexOrderBookDispatchProps = {}

export type BrowseDexOrderBookProps = BrowseDexOrderBookOwnProps & BrowseDexOrderBookStateProps & BrowseDexOrderBookDispatchProps

export type BrowseDexOrderBookState = {
  tokenCode: string,  
}

export class BrowseDexOrderBookComponent extends Component<BrowseDexOrderBookProps, BrowseDexOrderBookState> {
  constructor (props: BrowseDexOrderBookProps) {
    super (props)
    this.state = {
      tokenCode: ''
    }
  }

  componentWillMount = () => {
    this.props.getTokenList()
  }

  _onSelectToken = (currencyCode: string) => {
    this.setState({
      tokenCode: currencyCode
    }, () => {
      Actions.pop()
      this.props.fetchDexOrderBook(BIDS, currencyCode)
    })
  }

  _onPressTokenCodeButton = () => {
    Actions[CREATE_DEX_SELECT_TOKEN]({
      tokenCode: this.state.tokenCode,
      _onSelectToken: this._onSelectToken
    })
  }

  _onSelectOrder = () => {
    console.log('DEX: order selected')
  }

  renderOrderBookResult = (data) => {
    return (
      <OrderBookResult data={data} currencyCode={this.state.tokenCode}/>
    )
  }

  renderItemSeparatorComponent = () => {
    return (
      <View style={styles.orderBookResultSeparator}></View>
    )
  }

  keyExtractor = (item: GuiWalletType, index: number): number => index  

  render () {
    const orderBookBids = this.props.orderBookBids
    return (
      <SafeAreaView>
        <View style={[styles.scene]}>
          <Gradient style={styles.gradient} />                
          <View style={styles.container}>
            <View style={styles.instructionalArea}>
              <Text style={styles.instructionalText}>{s.strings.dex_browse_order_book_instructions}</Text>
              <Text style={styles.walletInfoText}>{s.strings.dex_create_order_wallet_title} {this.props.walletName} ({this.props.currencyCode})</Text>
              <Text style={styles.walletInfoText}>{s.strings.dex_create_order_balance_title} {this.props.symbol} {this.props.balance} ({this.props.fiatSymbol} {this.props.fiatBalance})</Text>
              <Text numberOfLines={1} ellipsizeMode='middle' style={styles.walletInfoText}>{s.strings.dex_create_order_address_title} {this.props.receiveAddress}</Text>
            </View>
            <View style={styles.formArea}>
              <View style={[styles.textInputArea]}>
                <TertiaryButton onPress={this._onPressTokenCodeButton}>
                  <TertiaryButton.Text>{this.state.tokenCode || 'Find Token Code'}</TertiaryButton.Text>
                </TertiaryButton>
              </View>
            </View>
            <ScrollView style={styles.orderBookResultsScrollView}>
              <SearchResults
                renderRegularResultFxn={this.renderOrderBookResult}
                onRegularSelectFxn={this._onSelectOrder}
                regularArray={orderBookBids}
                containerStyle={[styles.orderBookResultsContainer]}
                keyExtractor={this.keyExtractor}            
              />
            </ScrollView>
            <View style={styles.bottomPaddingForKeyboard} />
          </View>
        </View>
        <ConfirmFillDexOrderModal />
      </SafeAreaView>
    )
  }
}