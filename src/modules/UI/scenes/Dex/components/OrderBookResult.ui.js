// @flow

import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import styles, { styles as stylesRaw } from '../style.js'

export class OrderBookResultComponent extends Component<Props, State> {

  render () {
    const { makerNativeTokenAmount, takerNativeTokenAmount, exchangeRate, expiration } = this.props
    return (
      <View style={[styles.singleTokenTypeWrap /*, data.item.symbol === this.state.selectedTokenType && styles.selectedItem*/]}>
        <TouchableHighlight style={[styles.singleTokenType]} underlayColor={stylesRaw.underlayColor.color}>
          <View style={styles.orderBookResultInfo}>
            <Text>{`${makerNativeTokenAmount} ${currencyCode} / ${takerNativeTokenAmount} WETH = ${exchangeRate}` }</Text>
            <Text>{expiration}</Text>
          </View>
        </TouchableHighlight>
      </View>      
    )
  }
}