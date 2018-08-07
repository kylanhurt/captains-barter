// @flow

import { StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz'
import { PLATFORM } from '../../../../theme/variables/platform'

export const styles = {
  usableHeight: PLATFORM.usableHeight,
  scene: {
    flex: 1,
    backgroundColor: THEME.COLORS.WHITE
  },
  gradient: {
    height: THEME.HEADER,
    width: '100%'
  },
  container: {
    position: 'relative',
    paddingHorizontal: 20,
    backgroundColor: THEME.COLORS.GRAY_4
  },  
  view: {
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 5
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
    textAlign: 'center',
    lineHeight: 28
  },
  walletInfoText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24
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
    width: '60%',
    flex: 1,
    backgroundColor: THEME.COLORS.SECONDARY,
    borderRadius: 12,
    paddingHorizontal: 48
  },
  buyButtonText: {
    color: THEME.COLORS.WHITE
  },
  browseButtonText: {
    color: THEME.COLORS.WHITE
  },
  browseOrderBookButton: {
    width: '60%',    
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 48
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
  },
  picker: {
    fontFamily: THEME.FONTS.DEFAULT,
    height: 50,
    padding: 5
  },
  singleTokenTypeWrap: {
    flexDirection: 'column',
    flex: 1
  },
  singleTokenType: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_3,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  tokenTypeInfoWrap: {
    flexDirection: 'row',
    height: 40,
    flex: 1,
    justifyContent: 'space-between'
  },
  tokenTypeLeft: {
    flexDirection: 'row'
  },
  tokenTypeLeftTextWrap: {
    justifyContent: 'center'
  },
  cryptoTypeName: {
    fontSize: 16,
    color: THEME.COLORS.GRAY_1,
    textAlignVertical: 'center'
  },
  searchContainer: {
    position: 'relative',
    backgroundColor: THEME.COLORS.TRANSPARENT,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_3,
    width: '100%'
  },
  orderBookResultsScrollView: {
  },
  orderBookResultsContainer: {
    position: 'relative',
    backgroundColor: THEME.COLORS.TRANSPARENT,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_3,
    width: '100%',
    height: 400,
  },
  orderBookResultInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  orderBookResultAmountsArea:{
    marginBottom: 6
  },
  orderBookResultAmountsText: {
    fontSize: 14
  },
  orderBookResultExpirationArea: {

  },
  orderBookResultExpirationText: {
    fontSize: 14
  },
  orderBookResultSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: THEME.COLORS.GRAY_1
  },
  confirmDexOrderInfoArea:{
    marginBottom: 6
  },
  confirmDexOrderAmountsText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24
  },
  confirmDexOrderRateText: {
    textAlign: 'center',    
    fontSize: 18,
    lineHeight: 24
  },
  confirmDexOrderExpirationText: {
    textAlign: 'center',    
    fontSize: 18,
    lineHeight: 24
  },  
  confirmFillDexOrderModalSubmitButton: {
    marginBottom: 8
  },
  confirmFillDexOrderModalSubmitButtonText: {
    color: THEME.COLORS.WHITE
  },
  underlayColor: {
    color: THEME.COLORS.GRAY_4
  },
  tokenAmountInput: {

  },
  ethAmountInput: {

  }
}

export default StyleSheet.create(styles)
