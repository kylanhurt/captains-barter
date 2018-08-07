// @flow

import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import type { GuiWallet } from '../../../../types.js'
import { intl } from '../../../../locales/intl'
import { FormField } from '../../../../components/FormField.js'
import { TertiaryButton } from '../../components/Modals/components/TertiaryButton.ui.js'
import { CREATE_DEX_SELECT_TOKEN } from '../../../../constants/SceneKeys.js'
import s from '../../../../locales/strings.js'
import { PrimaryButton } from '../../components/Modals/components/PrimaryButton.ui.js'
import Text from '../../components/FormattedText'
import { Gradient } from '../../components/Gradient/Gradient.ui.js'
import SafeAreaView from '../../components/SafeAreaView'
import styles from './style.js'

export type CreateDexBuyTokenOrderOwnProps = {
  selectedWalletId: string,
  wallet: GuiWallet,
  currencyCode: string,
  walletName: string,
  balance: null,
  fiatCurrencyCode: string,
  receiveAddress: string,
  symbol: string,
  fiatSymbol: string,
  fiatBalance: string
}

export type CreateDexBuyTokenOrderStateProps = {
  isCreateDexBuyTokenOrderProcessing: boolean  
}

export type CreateDexBuyTokenOrderDispatchProps = {
  getTokenList: () => void,
  submitDexBuyTokenOrder: () => void,
}

export type CreateDexBuyTokenOrderProps = CreateDexBuyTokenOrderOwnProps & CreateDexBuyTokenOrderDispatchProps & CreateDexBuyTokenOrderStateProps

export type CreateDexBuyTokenOrderState = {
  tokenCode: string,
  tokenAmount: string,
  ethAmount: string
}

export class CreateDexBuyTokenOrderComponent extends Component<CreateDexBuyTokenOrderProps, CreateDexBuyTokenOrderState> {
  constructor (props: CreateDexBuyTokenOrderProps) {
    super(props)
    this.state = {
      tokenCode: '',
      tokenAmount: '0',
      ethAmount: '0'
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

  _onPressTokenCodeButton = () => {
    Actions[CREATE_DEX_SELECT_TOKEN]({
      tokenCode: this.state.tokenCode,
      _onSelectToken: this._onSelectToken
    })
  }

  _onChangeTokenAmountInput = (input: string) => {
    console.log('DEX: input is: ', input)
    if (!intl.isValidInput(input)) {
      return
    }
    const formattedTokenAmountInput = intl.formatToNativeNumber(intl.prettifyNumber(input))
    this.setState({
      tokenAmount: formattedTokenAmountInput
    })
  }

  _onChangeEthAmountInput = (input: string) => {
    console.log('DEX: input is: ', input)
    if (!intl.isValidInput(input)) {
      return
    }
    const formattedEthAmountInput = intl.formatToNativeNumber(intl.prettifyNumber(input))
    this.setState({
      ethAmount: formattedEthAmountInput
    })
  }

  render () {
    const { isCreateDexBuyTokenOrderProcessing } = this.props
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
                <TertiaryButton onPress={this._onPressTokenCodeButton}>
                  <TertiaryButton.Text>{this.state.tokenCode || 'Select Token Code to Buy'}</TertiaryButton.Text>
                </TertiaryButton>
              </View>
              <View style={[styles.textInputArea]}>
                <FormField
                  style={[styles.tokenAmountInput]}
                  value={this.state.tokenAmount}
                  keyboardType={'decimal-pad'}
                  label={s.strings.dex_buy_tokens_enter_token_amount_to_buy}
                  returnKeyType={'next'}
                  onChangeText={this._onChangeTokenAmountInput}
                />
              </View>
              <View style={[styles.textInputArea]}>
                <FormField
                  style={[styles.ethAmountInput]}
                  value={this.state.ethAmount}
                  label={s.strings.dex_buy_tokens_enter_weth_amount_to_purchase_with}
                  returnKeyType={'done'}
                  keyboardType={'decimal-pad'}
                  onChangeText={this._onChangeEthAmountInput}
                />
              </View>
            </View>
            <View style={[styles.buttonsArea]}>
              <PrimaryButton style={styles.submitButton} onPress={this._onSubmit}>
                {isCreateDexBuyTokenOrderProcessing ? (
                  <ActivityIndicator size={'small'} />
                 ) : (
                 <PrimaryButton.Text>{s.strings.dex_submit_order_button_title}</PrimaryButton.Text>
                 )}
              </PrimaryButton>
            </View>
            <View style={styles.bottomPaddingForKeyboard} />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  _onSubmit = () => {
    const { tokenCode, tokenAmount, ethAmount } = this.state
    console.log('DEX: submission executing')
    this.props.submitDexBuyTokenOrder(tokenCode, tokenAmount, ethAmount)
  }
}
