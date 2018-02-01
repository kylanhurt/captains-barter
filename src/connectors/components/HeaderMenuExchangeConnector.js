// @flow
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import LinkedComponent
  from '../../modules/UI/components/MenuDropDown/MenuDropDown.ui'
import * as Styles from '../../styles/indexStyles'
import * as actions from '../../actions/indexActions'
import * as Constants from '../../constants/indexConstants'
import s from '../../locales/strings.js'
import THEME from '../../theme/variables/airbitz'
import {openHelpModal} from '../../modules/UI/components/HelpModal/actions'

export const mapStateToProps = (state: any) => {
  const data = [
    {
      label: s.strings.title_change_mining_fee, // tie into
      value: Constants.CHANGE_MINING_FEE_VALUE
    },
    {
      label: s.strings.dropdown_exchange_max_amount,
      value: Constants.EXCHANGE_MAX_AMOUNT_VALUE
    },
    {
      label: s.strings.string_help,
      value: Constants.HELP_VALUE
    }
  ]
  return {
    style: { ...Styles.MenuDropDownStyleHeader,
      icon: {...Styles.MenuDropDownStyle.icon, color: THEME.COLORS.WHITE}
    },
    exchangeRate: state.cryptoExchange.exchangeRate,
    data,
    rightSide: true
  }
}

export const mapDispatchToProps = (dispatch: any) => ({
  onSelect: (value: string) => {
    switch (value) {
      case Constants.HELP_VALUE:
        dispatch(openHelpModal())
        break
      case Constants.EXCHANGE_MAX_AMOUNT_VALUE:
        dispatch(actions.exchangeMax())
        break
      case Constants.CHANGE_MINING_FEE_VALUE:
        Actions[Constants.CHANGE_MINING_FEE_EXCHANGE]()
        break
    }
  }
  // nextScreen: () => dispatch(actions.nextScreen())
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
