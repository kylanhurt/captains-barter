// @flow

import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { FormField } from '../../../../components/FormField.js'
import s from '../../../../locales/strings.js'
import { PrimaryButton } from '../../components/Buttons'
import Text from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import styles from './style.js'

export type Props = {

}

export type State = {

}

export class DexSceneComponent extends Component<Props, State> {
  render () {
    return (
      <SafeAreaView>
        <View style={[styles.dexScene]}>
          <Gradient style={styles.gradient} />
          <ScrollView style={styles.container}>
            <View style={styles.instructionalArea}>
              <Text style={styles.instructionalText}>Submit your order below</Text>
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
            </View>
            <View style={[styles.buttonsArea]}>
              <PrimaryButton
                text={s.strings.string_submit}
                style={styles.saveButton}
                onPressFunction={this._onSubmit}
              />
            </View>
            <View style={styles.bottomPaddingForKeyboard} />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  _onSubmit = () => {
    console.log('submission executing')
  }
}
