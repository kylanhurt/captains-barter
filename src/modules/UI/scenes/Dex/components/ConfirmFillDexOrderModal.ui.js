// @flow

import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Text from '../../../components/FormattedText'
import s from '../../../../../locales/strings.js'
import {
  QUESTION_ICON,
  FONT_AWESOME
} from '../../../../../constants/indexConstants.js'
import { styles } from '../style.js'
import { Icon } from '../../../components/Icon/Icon.ui.js'
import { InteractiveModal, PrimaryButton, SecondaryButton, TertiaryButton } from '../../../components/Modals'

export type ConfirmFillDexOrderModalOwnProps = {
  isConfirmFillDexOrderModalVisible: boolean,
  style?: Object,
  selectedDEXFormattedOrderToFill?: FormattedDexOrderInfo | null
}

export type ConfirmFillDexOrderModalStateProps = {
  fillDEXOrder: () => void
}

export type ConfirmFillDexOrderModalDispatchProps = {
  isConfirmFillDexOrderModalVisible: boolean,
  isConfirmFillDexOrderSubmitProcessing: boolean,
  selectedDEXFormattedOrderToFill: boolean
}

export type ConfirmFillDexOrderModalProps = ConfirmFillDexOrderModalOwnProps & ConfirmFillDexOrderModalStateProps & ConfirmFillDexOrderModalDispatchProps

export class ConfirmFillDexOrderModalComponent extends Component<ConfirmFillDexOrderModalProps> {
  _onSubmit = () => {
    console.log('DEX: Submit pressed')
    this.props.fillDEXOrder()
  }

  _onCancel = () => {
    console.log('DEX: Cancel pressed')
  }

  render () {
    const { isConfirmFillDexOrderModalVisible, isConfirmFillDexOrderSubmitProcessing, selectedDEXFormattedOrderToFill } = this.props

    return (
      <InteractiveModal isActive={isConfirmFillDexOrderModalVisible} onModalHide={this.reset}>
        <InteractiveModal.Icon>
          <Icon style={styles.icon} name={QUESTION_ICON} type={FONT_AWESOME} />
        </InteractiveModal.Icon>
        <InteractiveModal.Title>
          <Text>{s.strings.dex_confirm_fill_dex_order_title}</Text>
        </InteractiveModal.Title>
        <InteractiveModal.Body>
          {selectedDEXFormattedOrderToFill && (
            <View style={styles.orderBookResultInfo}>
              <View style={styles.confirmDexOrderInfoArea}>
                <Text style={styles.confirmDexOrderAmountsText}>{`${selectedDEXFormattedOrderToFill.makerNativeTokenAmount} ${selectedDEXFormattedOrderToFill.currencyCode} / ${selectedDEXFormattedOrderToFill.takerNativeTokenAmount} WETH`}</Text>
                <Text style={styles.confirmDexOrderExpirationText}>{s.strings.dex_order_book_result_expiration} {selectedDEXFormattedOrderToFill.expiration}</Text>
              </View>
            </View>            
          )}
        </InteractiveModal.Body>
        <InteractiveModal.Footer>
          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <PrimaryButton onPress={this._onSubmit} disabled={isConfirmFillDexOrderSubmitProcessing} style={styles.confirmFillDexOrderModalSubmitButton}>
                {isConfirmFillDexOrderSubmitProcessing ? <ActivityIndicator size={'small'} /> : <TertiaryButton.Text style={styles.confirmFillDexOrderModalSubmitButtonText}>{s.strings.dex_submit_confirm_dex_order}</TertiaryButton.Text>}
              </PrimaryButton>
              <SecondaryButton onPress={this._onCancel} disabled={isConfirmFillDexOrderSubmitProcessing}>
                <SecondaryButton.Text style={styles.confirmFillDexOrderPrimaryButtonText}>{s.strings.string_cancel_cap}</SecondaryButton.Text>
              </SecondaryButton>
            </InteractiveModal.Item>
            </InteractiveModal.Row>            
        </InteractiveModal.Footer>
      </InteractiveModal>
    )
  }
}