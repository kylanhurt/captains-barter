// @flow

import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import styles, { styles as stylesRaw } from '../style.js'
import s from '../../../../../locales/strings.js'

export class OrderBookResultComponent extends Component<Props, State> {

  render () {
    const { makerNativeTokenAmount, takerNativeTokenAmount, exchangeRate, expiration, currencyCode } = this.props

    return (
      <View style={[styles.singleTokenTypeWrap /*, data.item.symbol === this.state.selectedTokenType && styles.selectedItem*/]}>
        <TouchableHighlight style={[styles.singleTokenType]} underlayColor={stylesRaw.underlayColor.color}>
          <View style={styles.orderBookResultInfo}>
            <View style={styles.orderBookResultAmountsArea}>
              <Text style={styles.orderBookResultAmountsText}>{`${makerNativeTokenAmount} ${currencyCode} / ${takerNativeTokenAmount} WETH = ${exchangeRate}`} </Text>
            </View>
            <View style={styles.orderBookResultExpirationArea}>
              <Text style={styles.orderBookResultExpirationText}>{s.strings.dex_order_book_result_expiration} {expiration}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>      
    )
  }
}