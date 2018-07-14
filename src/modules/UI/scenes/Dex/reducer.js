// @flow

import { UPDATE_TOKEN_LIST } from './action.js'
import { combineReducers } from 'redux'
import type { DirectoryTokenInfo } from '../../../../types.js'
import type { Action } from '../../../ReduxTypes.js'

export const tokenDirectory = (state: Array<DirectoryTokenInfo> = [], action: Action) => {
  switch (action.type) {
    case UPDATE_TOKEN_LIST:
      return action.data
    default:
      return state
  }
}

export const dex = combineReducers({
  tokenDirectory
})
