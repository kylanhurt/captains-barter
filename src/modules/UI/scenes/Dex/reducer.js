// @flow

import { UPDATE_TOKEN_LIST } from './action.js'
import { combineReducers } from 'redux'

export const tokenDirectory = (state = [], action) => {
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
