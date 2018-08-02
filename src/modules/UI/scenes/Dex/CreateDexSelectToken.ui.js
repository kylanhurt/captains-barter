// @flow

import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import type { DirectoryTokenInfo, TokenDirectorySearchResult } from '../../../../types.js'
import SafeAreaView from '../../components/SafeAreaView'
import { Gradient } from '../../components/Gradient/Gradient.ui'
import { FormField } from '../../../../components/FormField.js'
import SearchResults from '../../components/SearchResults'
import styles, { styles as stylesRaw } from './style.js'

export type CreateDexSelectTokenOwnProps = {
  _onSelectToken: (tokenSymbol: string) => void
}

export type CreateDexSelectTokenStateProps = {
  tokenDirectory: Array<DirectoryTokenInfo>,
  dimensions: any
}

export type CreateDexSelectTokenState = {
  searchTerm: string,
  selectedTokenType: string
}

type CreateDexSelectTokenProps = CreateDexSelectTokenOwnProps & CreateDexSelectTokenStateProps

export class CreateDexSelectTokenComponent extends Component<CreateDexSelectTokenProps, CreateDexSelectTokenState> {
  constructor (props: CreateDexSelectTokenProps) {
    super(props)
    this.state = {
      searchTerm: '',
      selectedTokenType: ''
    }
  }

  onChangeSearchInput = (input: string) => {
    this.setState({
      searchTerm: input
    })
  }

  render () {
    const { searchTerm } = this.state
    // const keyboardHeight = this.props.dimensions.keyboardHeight || 0
    // const searchResultsHeight = stylesRaw.usableHeight - keyboardHeight - 58 // substract button area height and FormField height
    const filteredTokenDirectory = this.props.tokenDirectory.filter(token => (token.symbol.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0))
    return (
      <SafeAreaView>
        <View style={styles.scene}>
          <Gradient style={styles.gradient} />
          <View style={styles.container}>
            <FormField
              autoFocus
              style={styles.picker}
              clearButtonMode={'while-editing'}
              // onFocus={this.handleOnFocus}
              // onBlur={this.handleOnBlur}
              autoCorrect={false}
              autoCapitalize={'none'}
              onChangeText={this.onChangeSearchInput}
              value={this.state.searchTerm}
              label={'Choose a token:'}
              returnKeyType={'search'}
            />
            <SearchResults
              renderRegularResultFxn={this.renderTokenTypeResult}
              onRegularSelectFxn={this.props._onSelectToken}
              regularArray={filteredTokenDirectory}
              containerStyle={[styles.searchContainer]}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  renderTokenTypeResult = (data: TokenDirectorySearchResult) => {
    return (
      <View style={[styles.singleTokenTypeWrap, data.item.symbol === this.state.selectedTokenType && styles.selectedItem]}>
        <TouchableHighlight style={[styles.singleTokenType]} onPress={() => this.props._onSelectToken(data.item.symbol)} underlayColor={stylesRaw.underlayColor.color}>
          <View style={[styles.tokenTypeInfoWrap]}>
            <View style={styles.tokenTypeLeft}>
              <View style={[styles.tokenTypeLeftTextWrap]}>
                <Text style={[styles.tokenTypeName]} ellipsizeMode={'middle'} numberOfLines={1}>
                  {data.item.symbol} - <Text>{data.item.address}</Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
