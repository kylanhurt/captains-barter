// @flow

import { connect } from 'react-redux'

import type { State } from '../../../ReduxTypes'
import { CreateDexSelectTokenComponent } from './CreateDexSelectToken.ui.js'
import type {CreateDexSelectTokenStateProps} from './CreateDexSelectToken.ui.js'

const mapStateToProps = (state: State): CreateDexSelectTokenStateProps => ({
  tokenDirectory: state.ui.scenes.dex.tokenDirectory,
  dimensions: state.ui.scenes.dimensions
})
const mapDispatchToProps = () => ({})
export const CreateDexSelectTokenConnector = connect(mapStateToProps, mapDispatchToProps)(CreateDexSelectTokenComponent)
