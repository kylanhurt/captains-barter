// @flow

import {
  UPDATE_TOKEN_LIST,
  DEX_ORDER_BOOK_BIDS,
  DEX_ORDER_BOOK_ASKS
} from './action.js'
import { combineReducers } from 'redux'
import type { DirectoryTokenInfo } from '../../../../types.js'
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

export const dex = combineReducers({
  tokenDirectory,
  orderBookBids,
  orderBookAsks
})
