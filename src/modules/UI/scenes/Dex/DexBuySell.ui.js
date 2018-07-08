// @flow

import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import {Actions} from 'react-native-router-flux'
import s from '../../../../locales/strings.js'
import { PrimaryButton, TertiaryButton } from '../../components/Modals/components/index.js'
import Text from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import styles, { styles as rawStyle } from './style.js'

export type Props = {
  selectedWalletId: string
}

export type State = {

}

export class DexBuySell extends Component<Props, State> {
  render () {
    return (
      <SafeAreaView>
        <View style={[styles.dexScene]}>
          <Gradient style={styles.gradient} />
          <ScrollView style={styles.container}>
            <View style={[styles.buySellButtonsArea]}>
              <PrimaryButton style={styles.buyButton} onPress={this._onPressBuy}>
                <Text style={{textAlign: 'center', fontSize: 24, color: rawStyle.buyButtonText.color}}>{s.strings.dex_buy_tokens_button_title}</Text>
              </PrimaryButton>
            </View>
            <View style={[styles.buySellButtonsArea]}>
              <TertiaryButton style={styles.sellButton} onPress={this._onPressSell}>
                <Text style={{textAlign: 'center', fontSize: 24, color: rawStyle.sellButtonText.color}}>{s.strings.dex_sell_tokens_button_title}</Text>
              </TertiaryButton>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  _onPressBuy = () => {
    Actions.createDexBuyTokenOrder()
  }

  _onPressSell = () => {
    Actions.createDexSellTokenOrder({})
  }
}
