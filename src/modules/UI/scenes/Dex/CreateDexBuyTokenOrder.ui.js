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
import styles from './DexStyle.js'

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
  sellTokenCode: string,
  buyTokenCode: string,
  sellTokenAmount: string,
  buyTokenAmount: string
}

export class CreateDexBuyTokenOrderComponent extends Component<CreateDexBuyTokenOrderProps, CreateDexBuyTokenOrderState> {
  constructor (props: CreateDexBuyTokenOrderProps) {
    super(props)
    this.state = {
      sellTokenCode: '',
      sellTokenAmount: '0',
      buyTokenCode: '',
      buyTokenAmount: '0'
    }
  }
  componentWillMount = () => {
    this.props.getTokenList()
  }

  _onSelectSellToken = (sellTokenCode: string) => {
    this.setState({
      sellTokenCode: sellTokenCode
    }, () => {
      Actions.pop()
    })
  }

  _onPressSellTokenCodeButton = () => {
    Actions[CREATE_DEX_SELECT_TOKEN]({
      sellTokenCode: this.state.sellTokenCode,
      _onSelectToken: this._onSelectSellToken
    })
  }

  _onSelectBuyToken = (buyTokenCode: string) => {
    this.setState({
      buyTokenCode: buyTokenCode
    }, () => {
      Actions.pop()
    })
  }

  _onPressBuyTokenCodeButton = () => {
    Actions[CREATE_DEX_SELECT_TOKEN]({
      buyTokenCode: this.state.buyTokenCode,
      _onSelectToken: this._onSelectBuyToken
    })
  }

  _onChangeSellTokenAmountInput = (input: string) => {
    console.log('DEX: input is: ', input)
    if (!intl.isValidInput(input)) {
      return
    }
    const formattedTokenAmountInput = intl.formatToNativeNumber(intl.prettifyNumber(input))
    this.setState({
      sellTokenAmount: formattedTokenAmountInput
    })
  }

  _onChangeBuyTokenAmountInput = (input: string) => {
    console.log('DEX: input is: ', input)
    if (!intl.isValidInput(input)) {
      return
    }
    const formattedTokenAmountInput = intl.formatToNativeNumber(intl.prettifyNumber(input))
    this.setState({
      buyTokenAmount: formattedTokenAmountInput
    })
  }

  render () {
    const { isCreateDexBuyTokenOrderProcessing, createDexBuyTokenOrderProgress } = this.props
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
                <TertiaryButton onPress={this._onPressSellTokenCodeButton}>
                  <TertiaryButton.Text>{this.state.sellTokenCode || s.strings.dex_create_order_select_token_sell}</TertiaryButton.Text>
                </TertiaryButton>
              </View>
              <View style={[styles.textInputArea]}>
                <FormField
                  style={[styles.sellTokenAmountInput]}
                  value={this.state.sellTokenAmount}
                  keyboardType={'decimal-pad'}
                  label={s.strings.dex_buy_tokens_enter_token_amount_to_sell}
                  returnKeyType={'next'}
                  onChangeText={this._onChangeSellTokenAmountInput}
                />
              </View>
            </View>
            <View style={[styles.formArea, {marginVertical: 18}]}>
              <View style={[styles.textInputArea]}>
                <TertiaryButton onPress={this._onPressBuyTokenCodeButton}>
                  <TertiaryButton.Text>{this.state.buyTokenCode || s.strings.dex_create_order_select_token_buy}</TertiaryButton.Text>
                </TertiaryButton>
              </View>
              <View style={[styles.textInputArea]}>
                <FormField
                  style={[styles.buyTokenAmountInput]}
                  value={this.state.buyTokenAmount}
                  label={s.strings.dex_buy_tokens_enter_weth_amount_to_purchase_with}
                  returnKeyType={'done'}
                  keyboardType={'decimal-pad'}
                  onChangeText={this._onChangeBuyTokenAmountInput}
                />
              </View>
            </View>            
            <View style={[styles.buttonsArea]}>
              <PrimaryButton style={[styles.submitButton, isCreateDexBuyTokenOrderProcessing && styles.activePrimaryButton]} onPress={this._onSubmit}>
                {isCreateDexBuyTokenOrderProcessing ? (
                  <PrimaryButton.Text>
                    <ActivityIndicator style={styles.buttonActivityIndicator} size={'small'} /> {createDexBuyTokenOrderProgress}
                  </PrimaryButton.Text>  
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
    const { sellTokenCode, sellTokenAmount, buyTokenCode, buyTokenAmount } = this.state
    console.log('DEX: submission executing')
    this.props.submitDexBuyTokenOrder(sellTokenCode, sellTokenAmount, buyTokenCode, buyTokenAmount)
  }
}
