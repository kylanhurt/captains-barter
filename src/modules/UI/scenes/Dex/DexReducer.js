// @flow

import {
  UPDATE_TOKEN_LIST,
  DEX_ORDER_BOOK_BIDS,
  DEX_ORDER_BOOK_ASKS,
  DEX_CREATE_BUY_ORDER_PROCESSING,
  DEX_CREATE_BUY_ORDER_PROGRESS,
  CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE,
  DEX_CONFIRM_FILL_ORDER_PROCESSING
} from './DexAction.js'
import s from '../../../../locales/strings.js'
import { combineReducers } from 'redux'
import type { DirectoryTokenInfo, DEXOrder, FormattedDEXOrderInfo } from '../../../../types.js'
import type { Action } from '../../../ReduxTypes.js'

export const tokenDirectory = (state: Array<DirectoryTokenInfo> = [], action: Action) => {
  switch (action.type) {
    case UPDATE_TOKEN_LIST:
      return action.data.tokenDirectory
    default:
      return state
  }
}

export const orderBookBids = (state: Array<any> = [], action: Action) => {
  switch (action.type) {
    case DEX_ORDER_BOOK_BIDS:
      return action.data.orderBookBids
    default:
      return state
  }
}

export const orderBookAsks = (state: Array<any> = [], action: Action) => {
  switch (action.type) {
    case DEX_ORDER_BOOK_ASKS:
      return action.data.orderBookAsks
    default:
      return state
  }
}

export const isCreateDexBuyTokenOrderProcessing = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case DEX_CREATE_BUY_ORDER_PROCESSING:
      return action.data.isCreateDexBuyTokenOrderProcessing
    default:
      return state
  }
}

export const createDexBuyTokenOrderProgress = (state: string = '', action: Action) => {
  switch (action.type) {
    case DEX_CREATE_BUY_ORDER_PROGRESS:
      return action.data.createDexBuyTokenOrderProgress
    case DEX_CREATE_BUY_ORDER_PROCESSING:
      if (action.data.isCreateDexBuyTokenOrderProcessing) {
        return s.strings.dex_submit_order_progress_starting
      } else {
        return ''
      }
    default:
      return state
  }
}

export const isConfirmFillDexOrderModalVisible = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE:
      return action.data.isConfirmFillDexOrderModalVisible
    default:
      return state
  }
}

export const isConfirmFillDexOrderSubmitProcessing = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case DEX_CONFIRM_FILL_ORDER_PROCESSING:
      return action.data.isConfirmFillDexOrderSubmitProcessing
    default:
      return state
  }
}

export const selectedDEXOrderToFill = (state: DEXOrder | null = null, action: Action) => {
  switch (action.type) {
    case CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE:
      return action.data.order
    default:
      return state
  }
}
export const selectedDEXFormattedOrderToFill = (state: FormattedDEXOrderInfo | null = null, action: Action) => {
  switch (action.type) {
    case CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE:
      return action.data.formattedOrderInfo
    default:
      return state
  }
}

export const dex = combineReducers({
  tokenDirectory,
  orderBookBids,
  orderBookAsks,
  isCreateDexBuyTokenOrderProcessing,
  createDexBuyTokenOrderProgress,
  isConfirmFillDexOrderModalVisible,
  isConfirmFillDexOrderSubmitProcessing,
  selectedDEXOrderToFill,
  selectedDEXFormattedOrderToFill
})
