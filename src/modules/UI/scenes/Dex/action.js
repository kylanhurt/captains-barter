// @flow

import type { GetState, Dispatch } from '../../../ReduxTypes.js'
export const UPDATE_TOKEN_LIST = 'UPDATE_TOKEN_LIST'

export const fetchTokenList = () => (dispatch: Dispatch, getState: GetState) => {
  fetch('https://raw.githubusercontent.com/kvhnuke/etherwallet/mercury/app/scripts/tokens/ethTokens.json')
    .then((response) => {
      const tokenList = JSON.parse(response._bodyText)
      console.log('kylan testing, tokenList is: ', tokenList)
      dispatch(updateTokenList(tokenList))
    })
    .catch((error) => {
      console.log(error)
    })
}

export function updateTokenList (tokenDirectory: Array<Object>) {
  return {
    type: UPDATE_TOKEN_LIST,
    data: tokenDirectory
  }
}
