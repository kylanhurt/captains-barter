// @flow

import { connect } from 'react-redux'

import { logoutRequest } from '../../../../Login/action'
import type { Dispatch, State } from '../../../../ReduxTypes'
import { getSelectedCurrencyCode } from '../../../../UI/selectors.js'
import Main from './Main'

const mapStateToProps = (state: State) => ({
  usersView: state.ui.scenes.controlPanel.usersView,
  currencyCode: getSelectedCurrencyCode(state)
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: (username?: string) => dispatch(logoutRequest(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
