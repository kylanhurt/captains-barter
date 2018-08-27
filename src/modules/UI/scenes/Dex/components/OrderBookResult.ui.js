// @flow

import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import s from '../../../../../locales/strings.js'
import { intl } from '../../../../../locales/intl'
import { getFiatSymbol } from '../../../../utils.js'
import { FormattedDexOrderInfo } from '../../../../../types.js'
import styles, { styles as stylesRaw } from '../DexStyle.js'

export type OrderBookResultOwnProps = {
  sellTokenCode: string,
  buyTokenCode: string
}

export type OrderBookResultStateProps = {
  makerNativeTokenAmount: string,
  takerNativeTokenAmount: string,
  expiration: string,
  forwardExchangeRateSyntax: string,
  reverseExchangeRateSyntax: string,
  order: Object,
  currencyConverter: any
}

export class OrderBookResultComponent extends Component<OrderBookResultOwnProps, State> {

  showConfirmFillDexOrderModal = (formattedOrder) => {
    const { order} = this.props
    this.props.showConfirmFillDexOrderModal(order, formattedOrder)
  }

  render () {
    const {
      makerNativeTokenAmount,
      takerNativeTokenAmount,
      forwardExchangeRateSyntax,
      reverseExchangeRateSyntax,
      expiration,
      sellTokenCode,
      buyTokenCode,
      order,
      currencyConverter,
      wallet
    } = this.props

    // warning, the formattedOrder variable CANNOT be submitted as the signed data to fill an order, this will NOT work
    const formattedOrder = {
      makerNativeTokenAmount,
      takerNativeTokenAmount,      
      sellTokenCode,
      buyTokenCode,
      forwardExchangeRateSyntax,
      reverseExchangeRateSyntax,
      expiration
    }

    // need to figure out buyToken decimals?
    console.log('formattedOrder is ', formattedOrder)
    const fiatSymbol = getFiatSymbol(wallet.fiatCurrencyCode)
    const makerNativeTokenAmountNumber = makerNativeTokenAmount.toNumber()
    const calculatedSellAmountInFiat = currencyConverter.convertCurrency(sellTokenCode, wallet.isoFiatCurrencyCode, makerNativeTokenAmountNumber)
    const fiatSellBalanceAmountFormatted = intl.formatNumber(calculatedSellAmountInFiat || 0, { toFixed: 2 })
    const sellFiatBalanceString = fiatSymbol ? `(${fiatSymbol} ${fiatSellBalanceAmountFormatted})` : `(${fiatSellBalanceAmountFormatted} ${wallet.fiatCurrencyCode})`
    const makerNativeTokenRoundedAmount = makerNativeTokenAmount.round(6)

    const takerNativeTokenAmountNumber = takerNativeTokenAmount.toNumber()
    const calculatedBuyAmountInFiat = currencyConverter.convertCurrency(buyTokenCode, wallet.isoFiatCurrencyCode, takerNativeTokenAmountNumber)
    const fiatBuyBalanceAmountFormatted = intl.formatNumber(calculatedBuyAmountInFiat || 0, { toFixed: 2 })
    const buyFiatBalanceString = fiatSymbol ? `(${fiatSymbol} ${fiatBuyBalanceAmountFormatted})` : `(${fiatBuyBalanceAmountFormatted} ${wallet.fiatCurrencyCode})`
    const takerNativeTokenRoundedAmount = takerNativeTokenAmount.round(6)

    return (
      <View style={[styles.singleTokenTypeWrap /*, data.item.symbol === this.state.selectedTokenType && styles.selectedItem*/]}>
        <TouchableHighlight onPress={() => this.showConfirmFillDexOrderModal(formattedOrder)} style={[styles.singleOrderResult]} underlayColor={stylesRaw.underlayColor.color}>
          <View style={styles.orderBookResultInfo}>
            <View style={styles.orderBookResultAmountsArea}>
              <Text style={styles.orderBookResultAmountsText}>{`${makerNativeTokenRoundedAmount} ${sellTokenCode} ${sellFiatBalanceString} / ${takerNativeTokenRoundedAmount} ${buyTokenCode} ${buyFiatBalanceString}`} </Text>
              <Text style={styles.orderBookResultAmountsText}>{`${forwardExchangeRateSyntax} ${sellTokenCode} / ${buyTokenCode} = ${reverseExchangeRateSyntax} ${buyTokenCode} / ${sellTokenCode}`}</Text>
              <Text style={styles.orderBookResultAmountsText}>{`${s.strings.dex_order_book_result_expiration} ${expiration}`}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>      
    )
  }
}