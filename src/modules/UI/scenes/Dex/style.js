// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz'
import { PLATFORM } from '../../../../theme/variables/platform'

export const styles = {
  gradient: {
    height: THEME.HEADER
  },
  container: {
    position: 'relative',
    height: PLATFORM.deviceHeight - 66,
    paddingHorizontal: 20,
    backgroundColor: THEME.COLORS.GRAY_4
  },
  leftArea: {
    flexDirection: 'row'
  },
  icon: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: 22,
    color: THEME.COLORS.WHITE
  },

  headerRow: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  headerText: {
    fontSize: 18,
    color: THEME.COLORS.WHITE,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    marginLeft: 16
  },
  headerIcon: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: 22
  },

  instructionalArea: {
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  instructionalText: {
    fontSize: 16,
    textAlign: 'center'
  },

  textInputArea: {
    height: 70
  },
  errorMessageArea: {
    height: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessageText: {
    color: THEME.COLORS.ACCENT_RED
  },
  buySellButtonsArea: {
    marginTop: 16,
    height: 192,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    flex: 1
  },

  buttonText: {
    color: THEME.COLORS.WHITE,
    fontSize: 18
  },
  buySellButtons: {

  },
  buyButton: {
    flex: 1,
    backgroundColor: THEME.COLORS.SECONDARY,
    borderRadius: 12,
    paddingHorizontal: 48
  },
  buyButtonText: {
    color: THEME.COLORS.WHITE
  },
  sellButton: {
    flex: 1,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 12,
    paddingHorizontal: 48
  },
  sellButtonText: {
    color: THEME.COLORS.SECONDARY
  },
  bottomPaddingForKeyboard: {
    height: 300
  }
}
export default StyleSheet.create(styles)
