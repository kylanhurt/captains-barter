
import { connect } from 'react-redux'
import type { Dispatch, State } from '../../../../ReduxTypes.js'
import { ConfirmFillDexOrderModalComponent } from './ConfirmFillDexOrderModal.ui.js'
import { fillDEXOrder, hideConfirmFillDexOrderModal } from '../action.js'
export const mapStateToProps = (state: State, ownProps) => {
  const isConfirmFillDexOrderModalVisible = state.ui.scenes.dex.isConfirmFillDexOrderModalVisible
  const isConfirmFillDexOrderSubmitProcessing = state.ui.scenes.dex.isConfirmFillDexOrderSubmitProcessing
  const selectedDEXFormattedOrderToFill = state.ui.scenes.dex.selectedDEXFormattedOrderToFill
  return {
    isConfirmFillDexOrderModalVisible,
    isConfirmFillDexOrderSubmitProcessing,
    selectedDEXFormattedOrderToFill
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fillDEXOrder: () => dispatch(fillDEXOrder()),
  hideConfirmFillDexOrderModal: () => dispatch(hideConfirmFillDexOrderModal())
})

export const ConfirmFillDexOrderModalConnector =  connect(mapStateToProps, mapDispatchToProps)(ConfirmFillDexOrderModalComponent)