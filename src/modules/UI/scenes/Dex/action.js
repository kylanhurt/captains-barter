// @flow

import type { GetState, Dispatch } from '../../../ReduxTypes.js'
import { Alert } from 'react-native'
import { DecodedLogEvent, ZeroEx } from '0x.js'
// import { ERC20TokenWrapper } from ''
import { BigNumber } from '@0xproject/utils'
import { bns } from 'biggystring'
import { Web3Wrapper } from '@0xproject/web3-wrapper'
import { Web3ProviderEngine, RPCSubprovider, PrivateKeyWalletSubprovider } from '@0xproject/subproviders'
import { HttpClient } from '@0xproject/connect'
import { getSelectedWallet } from '../../../UI/selectors.js'
import * as Web3 from 'web3'
import { BIDS, ASKS } from '../../../../constants/indexConstants.js'
import type { DEXOrder, FormattedDEXOrderInfo } from '../../../../types.js'
import { convertBiggystringToNativeBigNumber } from '../../../utils.js'

export const UPDATE_TOKEN_LIST = 'UPDATE_TOKEN_LIST'
export const DEX_ORDER_BOOK_BIDS = 'DEX_ORDER_BOOK_BIDS'
export const DEX_ORDER_BOOK_ASKS = 'DEX_ORDER_BOOK_ASKS'
export const CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE = 'CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE'
export const CONFIRM_FILL_DEX_ORDER_PROCESSING = 'CONFIRM_FILL_DEX_ORDER_PROCESSING'

const NETWORK_ID = 1

// Provider pointing to local TestRPC on default port 8201
const providers = {}

// Instantiate 0x.js instance
const configs = {
  networkId: NETWORK_ID,
}

const RELAYER_API_URL = 'http://localhost:3000/v0'
const ORDER_BOOK_API_URL = 'orderbook'
const relayerAddress = '0x00ac112bf28ae1d0e9569af6844298283515f4b0'
const relayerSubproviderAddress = 'http://127.0.0.1:8545'

// Number of decimals to use (for ETH and ZRX)
const DECIMALS = 18

export const startWeb3Engine = (walletId: string, state: State) => {
  const selectedWallet = getSelectedWallet(state)
  const selectedWalletId = selectedWallet.id
  const walletProviderEngine = providers[selectedWalletId]

  const ethereumKey = state.core.wallets.byId[selectedWalletId].keys.ethereumKey
  const engine = new Web3ProviderEngine()
  // add a private key subprovider
  engine.addProvider(new PrivateKeyWalletSubprovider(ethereumKey))
  // also add an RPC subprovider
  engine.addProvider(new RPCSubprovider(relayerSubproviderAddress))
  // boot it up
  engine.start()
  providers[walletId] = engine
  return providers[walletId]  
}

export const submitDexBuyTokenOrder = (tokenCode: string, tokenAmount: string, ethAmount: string) => async (dispatch: Dispatch, getState: GetState) => {
  //dispatch(isCreateDexBuyTokenOrderProcessing(true))  
  const state = getState()
  const tokenDirectory = state.ui.scenes.dex.tokenDirectory
  const selectedWallet = getSelectedWallet(state)
  const selectedWalletId = selectedWallet.id
  const ethereumKey = state.core.wallets.byId[selectedWalletId].keys.ethereumKey
  // port over our Edge wallet private key to Web3...
  // start a new provider engine
  const engine = new Web3ProviderEngine()
  // add a private key subprovider
  engine.addProvider(new PrivateKeyWalletSubprovider(ethereumKey))
  // also add an RPC subprovider
  engine.addProvider(new RPCSubprovider('http://127.0.0.1:8545'))
  // boot it up
  engine.start()
  // set reference to providers object, walletId as the property
  providers[selectedWalletId] = engine
  // 
  const zeroEx = new ZeroEx(providers[selectedWalletId], configs)
  const web3Wrapper = new Web3Wrapper(engine)
  // Addresses
  const accounts = await web3Wrapper.getAvailableAddressesAsync();
  console.log(accounts)

  const WETH_CONTRACT_ADDRESS = zeroEx.etherToken.getContractAddressIfExists() // The wrapped ETH token contract  
  const tokenInfo = tokenDirectory.find(token => token.symbol === tokenCode )
  if (!tokenInfo) console.log('DEX: Token contract address not found for ', tokenCode)
  const TOKEN_CONTRACT_ADDRESS = tokenInfo.address.toLowerCase()
  // The Exchange.sol address (0x exchange smart contract)
  // Retrieves the Ethereum address of the Exchange contract deployed on the network
  // that the user-passed web3 provider is connected to.
  // returns The Ethereum address of the Exchange contract being used.    
  const EXCHANGE_CONTRACT_ADDRESS = zeroEx.exchange.getContractAddress()  
  
  const makerAddress = selectedWallet.receiveAddress.publicAddress

  const setMakerAllowTxHash = await zeroEx.token.setUnlimitedProxyAllowanceAsync(TOKEN_CONTRACT_ADDRESS, makerAddress)
  await zeroEx.awaitTransactionMinedAsync(setMakerAllowTxHash)

  // const setTakerAllowTxHash = await zeroEx.token.setUnlimitedProxyAllowanceAsync(WETH_CONTRACT_ADDRESS, takerAddress)
  // await zeroEx.awaitTransactionMinedAsync(setTakerAllowTxHash)

  // Generate order
  const feesRequest = {
    maker: makerAddress, // Ethereum address of our Maker.
    taker: ZeroEx.NULL_ADDRESS, // Ethereum address of our Taker.
    feeRecipient: relayerAddress, // Ethereum address of our Relayer (none for now).
    makerTokenAddress: TOKEN_CONTRACT_ADDRESS, // The token address the Maker is offering.
    takerTokenAddress: WETH_CONTRACT_ADDRESS, // The token address the Maker is requesting from the Taker.
    exchangeContractAddress: EXCHANGE_CONTRACT_ADDRESS, // The exchange.sol address.
    salt: ZeroEx.generatePseudoRandomSalt(), // Random number to make the order (and therefore its hash) unique.
    makerFee: ZeroEx.toBaseUnitAmount(new BigNumber(.01), DECIMALS), // How many ZRX the Maker will pay as a fee to the Relayer.
    takerFee: ZeroEx.toBaseUnitAmount(new BigNumber(0), DECIMALS), // How many ZRX the Taker will pay as a fee to the Relayer.
    makerTokenAmount: ZeroEx.toBaseUnitAmount(new BigNumber(1), DECIMALS), // Base 18 decimals, The amount of ZRX token the Maker is offering.
    takerTokenAmount: ZeroEx.toBaseUnitAmount(new BigNumber(0.0025), DECIMALS), // Base 18 decimals, The amount of WETH token the Maker is requesting from the Taker.
    expirationUnixTimestampSec: new BigNumber(Date.now() + 28800000), // When will the order expire (in unix time), Valid for up to 8 hours
  }

    // Submit order to relayer
    const relayerClient = new HttpClient(RELAYER_API_URL)
    console.log('DEX: Relayer client set')

    // Send fees request to relayer and receive a FeesResponse instance
    const feesResponse: FeesResponse = await relayerClient.getFeesAsync(feesRequest)
    console.log('DEX: feesResponse is: ', feesResponse)
    const order: Order = {
      ...feesRequest,
      ...feesResponse,
    }
    // Create orderHash
    const orderHash = ZeroEx.getOrderHashHex(order)
    // Signing orderHash -> ecSignature
    const shouldAddPersonalMessagePrefix = false
    const ecSignature = await zeroEx.signOrderHashAsync(orderHash, makerAddress, shouldAddPersonalMessagePrefix)
    const signedOrder = {
      ...order,
      ecSignature,
    }
    await relayerClient.submitOrderAsync(signedOrder)
    console.log('DEX: orderHash is: ', orderHash)

    Alert.alert('Order Submitted', 'Your order has been submitted')
    //dispatch(isCreateDexBuyTokenOrderProcessing(false))  
    const orderbookRequest: OrderbookRequest = {
      baseTokenAddress: TOKEN_CONTRACT_ADDRESS,
      quoteTokenAddress: WETH_CONTRACT_ADDRESS,
  }
    // Send orderbook request to relayer and receive an OrderbookResponse instance
    const orderbookResponse: OrderbookResponse = await relayerClient.getOrderbookAsync(orderbookRequest)
    console.log('DEX: orderbookResponse is: ', orderbookResponse)

  return
  /*
  // Verify that order is fillable
  await zeroEx.exchange.validateOrderFillableOrThrowAsync(signedOrder)

  // Try to fill order
  const shouldThrowOnInsufficientBalanceOrAllowance = true
  // the amount of tokens (in our case WETH) the Taker wants to fill.
  const fillTakerTokenAmount = ZeroEx.toBaseUnitAmount(new BigNumber(0.05), DECIMALS)

  // Filling order
  const txHash = await zeroEx.exchange.fillOrderAsync(
    signedOrder,
    fillTakerTokenAmount,
    shouldThrowOnInsufficientBalanceOrAllowance,
    takerAddress,
  )

  // Transaction receipt
  const txReceipt = await zeroEx.awaitTransactionMinedAsync(txHash)
  console.log('DEX: FillOrder transaction receipt: ', txReceipt)
  */
}

export const fetchTokenList = () => (dispatch: Dispatch, getState: GetState) => {

  fetch('https://raw.githubusercontent.com/kvhnuke/etherwallet/mercury/app/scripts/tokens/ethTokens.json', 
   {
      headers: {
        'Method': 'GET',
        'Content-Type': 'application/json; charset=utf-8'
      }}
    )
    .then((response) => {
      const tokenList = JSON.parse(response._bodyText)
      console.log('DEX: kylan testing, tokenList is: ', tokenList)
      dispatch(updateTokenList(tokenList))
    })
    .catch((error) => {
      console.log(error)
    })
}

export function updateTokenList (tokenDirectory: Array<Object>) {
  return {
    type: UPDATE_TOKEN_LIST,
    data: { tokenDirectory }
  }
}

export const fetchDexOrderBook = (type: string, tokenCode: string) => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  
  const tokenDirectory = state.ui.scenes.dex.tokenDirectory
  const tokenInfo = tokenDirectory.find(token => token.symbol === tokenCode )
  if (!tokenInfo) console.log('DEX: Token contract address not found for ', tokenCode)
  const TOKEN_CONTRACT_ADDRESS = tokenInfo.address.toLowerCase()

  const selectedWallet = getSelectedWallet(state)
  const selectedWalletId = selectedWallet.id
  let web3Engine = providers[selectedWalletId]
  if (!web3Engine) web3Engine = startWeb3Engine(selectedWalletId, state)  
  const zeroEx = new ZeroEx(providers[selectedWalletId], configs)
  const web3Wrapper = new Web3Wrapper(web3Engine)
  // Submit order to relayer
  const relayerClient = new HttpClient(RELAYER_API_URL)
  console.log('DEX: Relayer client set')
  const WETH_CONTRACT_ADDRESS = zeroEx.etherToken.getContractAddressIfExists() // The wrapped ETH token contract  
 
  const orderBookRequest: OrderbookRequest = {
    baseTokenAddress: WETH_CONTRACT_ADDRESS,
    quoteTokenAddress: TOKEN_CONTRACT_ADDRESS
  }

  const orderBookResponse: OrderbookResponse = await relayerClient.getOrderbookAsync(orderBookRequest)
  console.log('DEX: orderBookResponse is: ', orderBookResponse)
  dispatch(updateDexOrderBookBids(orderBookResponse.bids))
}

export function updateDexOrderBookBids (orderBookBids: Array<any>) {
  return {
    type: DEX_ORDER_BOOK_BIDS,
    data: { orderBookBids }
  }
}

export const showConfirmFillDexOrderModal = (order: DEXOrder, formattedOrderInfo: FormattedDEXOrderInfo) => (dispatch: Dispatch, getState: GetState) => {
  const isConfirmFillDexOrderModalVisible = true
  const state = getState()
  dispatch({
    type: CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE,
    data: { order, formattedOrderInfo, isConfirmFillDexOrderModalVisible }
  })
}

export const hideConfirmFillDexOrderModal = () => (dispatch: Dispatch) => {
  const isConfirmFillDexOrderModalVisible = false
  dispatch({
    type: CONFIRM_FILL_DEX_ORDER_MODAL_VISIBLE,
    data: { isConfirmFillDexOrderModalVisible }
  })
}

export const fillDEXOrder = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const order = state.ui.scenes.dex.selectedDEXOrderToFill
  const selectedWallet = getSelectedWallet(state)
  const selectedWalletId = selectedWallet.id
  const takerAddress = selectedWallet.receiveAddress.publicAddress // this is the current user's address (filler)
  let web3Engine = providers[selectedWalletId]
  if (!web3Engine) web3Engine = startWeb3Engine(selectedWalletId, state)
  const zeroEx = new ZeroEx(providers[selectedWalletId], configs)
  const web3Wrapper = new Web3Wrapper(web3Engine)
  const WETH_CONTRACT_ADDRESS = zeroEx.etherToken.getContractAddressIfExists() // The wrapped ETH token contract  

  // check to see if there's enough WETH to fill the order
  const WETHBalance = selectedWallet.nativeBalances['WETH']
  const WETHBalanceBigNumber = new BigNumber(WETHBalance)
  const WETHUnitAmount = ZeroEx.toUnitAmount(WETHBalanceBigNumber, DECIMALS)
  const WETHOrderAmount = order.takerTokenAmount

  // if there isn't enough WETH balance to fund the fulfillment then do am ETH -> WETH conversion routine
  if (WETHOrderAmount.gt(WETHUnitAmount)) {
    console.log('DEX: convert ETH to WETH')
    // const WETH_DECIMAL_STRING = DECIMALS.toString()
    // const WETH_MULTIPLIER = 1 + '0'.repeat(WETH_DECIMAL_STRING)
    const WETHDeficit =  WETHOrderAmount.sub(WETHUnitAmount)
    console.log('DEX: WETHDeficit is: ', WETHDeficit)    
    const convertEthTxHash = await zeroEx.etherToken.depositAsync(WETH_CONTRACT_ADDRESS, WETHDeficit, takerAddress)
    console.log('DEX: convertEthTxHash is: ',  convertEthTxHash)    
    await zeroEx.awaitTransactionMinedAsync(convertEthTxHash)
  }

  // check WETH allowance
  const allowanceAmount = await zeroEx.token.getProxyAllowanceAsync(WETH_CONTRACT_ADDRESS, takerAddress)
  console.log('DEX: allowanceAmount is: ',  allowanceAmount)    
  if (allowanceAmount.lt(order.takerTokenAmount)) {
    console.log('DEX: WETH allowance not high enough, setting unlimited proxy allowance')
    const setMakerAllowTxHash = await zeroEx.token.setUnlimitedProxyAllowanceAsync(WETH_CONTRACT_ADDRESS, takerAddress)
    console.log('DEX: increase setMakerAllowTxHash: ', setMakerAllowTxHash)
    await zeroEx.awaitTransactionMinedAsync(setMakerAllowTxHash)    
  }
  const orderHash = ZeroEx.getOrderHashHex(order)
  console.log('DEX: orderHash is: ', orderHash)
  // Signing orderHash -> ecSignature
  const shouldAddPersonalMessagePrefix = false
  const ecSignature = await zeroEx.signOrderHashAsync(orderHash, takerAddress, shouldAddPersonalMessagePrefix)
  console.log('DEX: ecSignature is: ', ecSignature)

  const signedOrder = {
    ...order,
    ecSignature,
  }  

  // Verify that order is fillable
  await zeroEx.exchange.validateOrderFillableOrThrowAsync(signedOrder)

  // Try to fill order
  console.log('DEX: about to fill order')
  const fillTxHash = await zeroEx.exchange.fillOrderAsync(
    signedOrder,
    order.takerTokenAmount,
    true,
    takerAddress
  )
  console.log('DEX: fillTxHash is: ', fillTxHash);
  const txReceipt = await zeroEx.awaitTransactionMinedAsync(fillTxHash)
  console.log('DEX: order fulfillment transaction completed!, txReceipt is: ', txReceipt)
}