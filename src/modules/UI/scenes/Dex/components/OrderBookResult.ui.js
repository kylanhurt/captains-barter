// @flow

import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import s from '../../../../../locales/strings.js'
import { FormattedDexOrderInfo } from '../../../../../types.js'
import styles, { styles as stylesRaw } from '../DexStyle.js'

export type OrderBookResultOwnProps = {
  sellTokenCode: string,
  buyTokenCode: string
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
    return (
      <View style={[styles.singleTokenTypeWrap /*, data.item.symbol === this.state.selectedTokenType && styles.selectedItem*/]}>
        <TouchableHighlight onPress={() => this.showConfirmFillDexOrderModal(formattedOrder)} style={[styles.singleOrderResult]} underlayColor={stylesRaw.underlayColor.color}>
          <View style={styles.orderBookResultInfo}>
            <View style={styles.orderBookResultAmountsArea}>
              <Text style={styles.orderBookResultAmountsText}>{`${makerNativeTokenAmount} ${sellTokenCode} / ${takerNativeTokenAmount} ${buyTokenCode}`} </Text>
              <Text style={styles.orderBookResultAmountsText}>{`${forwardExchangeRateSyntax} ${sellTokenCode} / ${buyTokenCode} = ${reverseExchangeRateSyntax} ${buyTokenCode} / ${sellTokenCode}`}</Text>
              <Text style={styles.orderBookResultAmountsText}>{`${s.strings.dex_order_book_result_expiration} ${expiration}`}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>      
    )
  }
}