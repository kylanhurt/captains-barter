// @flow

import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import Text from '../../components/FormattedText'
import SafeAreaView from '../../components/SafeAreaView'
import styles from './style.js'

export type BrowseDexOrderBookOwnProps = {}
export type BrowseDexOrderBookStateProps = {}
export type BrowseDexOrderBookDispatchProps = {}

export type BrowseDexOrderBookProps = BrowseDexOrderBookOwnProps & BrowseDexOrderBookStateProps & BrowseDexOrderBookDispatchProps

export type BrowseDexOrderBookState = {}

export class BrowseDexOrderBookComponent extends Component<BrowseDexOrderBookProps, BrowseDexOrderBookState> {
  render () {
    return (
      <SafeAreaView>
        
      </SafeAreaView>
    )
  }
}