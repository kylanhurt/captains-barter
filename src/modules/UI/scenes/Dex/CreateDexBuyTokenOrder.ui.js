// @flow

import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { ScrollView, View } from 'react-native'
import type { GuiWallet } from '../../../../types.js'
import { FormField } from '../../../../components/FormField.js'
import { CREATE_DEX_SELECT_TOKEN } from '../../../../constants/SceneKeys.js'
import s from '../../../../locales/strings.js'
import { PrimaryButton } from '../../components/Buttons'
import Text from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import styles from './style.js'

export type Props = {
  selectedWalletId: string,
  wallet: GuiWallet,
  currencyCode: string,
  walletName: string,
  balance: null,
  fiatCurrencyCode: string,
  receiveAddress: string,
  getTokenList: () => void,
  symbol: string,
  fiatSymbol: string,
  fiatBalance: string
}

export type State = {
  tokenCode: string
}

export class CreateDexBuyTokenOrderComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      tokenCode: ''
    }
  }
  componentWillMount = () => {
    this.props.getTokenList()
  }

  _onEnterTokenCodeTextField = () => {
    Actions[CREATE_DEX_SELECT_TOKEN]({
      tokenCode: this.state.tokenCode,
      _onSelectToken: this._onSelectToken
    })
  }

  _onSelectToken = (currencyCode: string) => {
    this.setState({
      tokenCode: currencyCode
    }, () => {
      Actions.pop()
      // this.destinationQuantity.focus()
    })
  }

  render () {
    return (
      <SafeAreaView>
        <View style={[styles.scene]}>
          <Gradient style={styles.gradient} />
          <ScrollView style={styles.container}>
            <View style={styles.instructionalArea}>
              <Text style={styles.instructionalText}>{s.strings.dex_submit_order_instructions}</Text>
              <Text style={styles.walletInfoText}>{s.strings.dex_create_order_wallet_title} {this.props.walletName} ({this.props.currencyCode})</Text>
              <Text style={styles.walletInfoText}>{s.strings.dex_create_order_balance_title} {this.props.symbol} {this.props.balance} ({this.props.fiatSymbol} {this.props.fiatBalance})</Text>
              <Text numberOfLines={1} ellipsizeMode='middle' style={styles.walletInfoText}>{s.strings.dex_create_order_address_title} {this.props.receiveAddress}</Text>
            </View>
            <View style={styles.formArea}>
              <View style={[styles.textInputArea]}>
                <FormField
                  style={[styles.currencyName]}
                  value={this.state.tokenCode}
                  autoCapitalize='words'
                  label={'Token to Purchase'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  onFocus={this._onEnterTokenCodeTextField}
                />
              </View>
              <View style={[styles.textInputArea]}>
                <FormField
                  style={[styles.currencyName]}
                  value={'howdy'}
                  autoCapitalize='words'
                  autoFocus
                  label={'Enter info here:'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  // ref={ ref => { this.destinationQuantity = ref }}
                />
              </View>
              <View style={[styles.textInputArea]}>
                <FormField
                  style={[styles.currencyName]}
                  value={'howdy'}
                  autoCapitalize='words'
                  autoFocus
                  label={'Enter info here:'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={[styles.buttonsArea]}>
              <PrimaryButton
                text={s.strings.string_next_capitalized}
                style={styles.saveButton}
                onPressFunction={this._onNext}
              />
            </View>
            <View style={styles.bottomPaddingForKeyboard} />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  _onNext = () => {
    console.log('submission executing')
  }
}
