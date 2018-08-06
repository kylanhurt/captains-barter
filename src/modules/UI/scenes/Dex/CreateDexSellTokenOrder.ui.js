// @flow

import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { FormField } from '../../../../components/FormField.js'
import s from '../../../../locales/strings.js'
import { PrimaryButton } from '../../components/Buttons'
import Text from '../../components/FormattedText'
import { Gradient } from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import styles from './style.js'

export type Props = {
  selectedWalletId: string
}

export type State = {

}

export class CreateDexSellTokenOrderComponent extends Component<Props, State> {
  render () {
    return (
      <SafeAreaView>
        <View style={[styles.dexScene]}>
          <Gradient style={styles.gradient} />
          <ScrollView style={styles.container}>
            <View style={styles.instructionalArea}>
              <Text style={styles.instructionalText}>{s.strings.dex_submit_order_instructions}</Text>
            </View>
            <View style={styles.formArea}>
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
    console.log('DEX: submission executing')
  }
}
