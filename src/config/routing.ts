// a list of tokens by chain
import { ChainId, SUSHI, Token, WNATIVE } from '@sushiswap/core-sdk'

import * as ARBITRUM from './tokens/arbitrum'
import * as AVALANCHE from './tokens/avalanche'
import * as BSC from './tokens/bsc'
import * as CELO from './tokens/celo'
import * as ETHEREUM from './tokens/ethereum'
import * as FANTOM from './tokens/fantom'
import * as FUSE from './tokens/fuse'
import * as HARMONY from './tokens/harmony'
import * as HECO from './tokens/heco'
import * as MATIC from './tokens/matic'
import * as MOONRIVER from './tokens/moonriver'
import * as OKEX from './tokens/okex'
import * as PALM from './tokens/palm'
import * as TELOS from './tokens/telos'
import * as XDAI from './tokens/xdai'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

// List of all mirror's assets addresses.
// Last pulled from : https://whitelist.mirror.finance/eth/tokenlists.json
// TODO: Generate this programmatically ?
const MIRROR_ADDITIONAL_BASES: { [tokenAddress: string]: Token[] } = {
  [ETHEREUM.UST.address]: [ETHEREUM.MIR],
  [ETHEREUM.MIR.address]: [ETHEREUM.UST],
  '0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84': [ETHEREUM.MIR, ETHEREUM.UST], // mAAPL
  '0x59A921Db27Dd6d4d974745B7FfC5c33932653442': [ETHEREUM.MIR, ETHEREUM.UST], // mGOOGL
  '0x21cA39943E91d704678F5D00b6616650F066fD63': [ETHEREUM.MIR, ETHEREUM.UST], // mTSLA
  '0xC8d674114bac90148d11D3C1d33C61835a0F9DCD': [ETHEREUM.MIR, ETHEREUM.UST], // mNFLX
  '0x13B02c8dE71680e71F0820c996E4bE43c2F57d15': [ETHEREUM.MIR, ETHEREUM.UST], // mQQQ
  '0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9': [ETHEREUM.MIR, ETHEREUM.UST], // mTWTR
  '0x41BbEDd7286dAab5910a1f15d12CBda839852BD7': [ETHEREUM.MIR, ETHEREUM.UST], // mMSFT
  '0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7': [ETHEREUM.MIR, ETHEREUM.UST], // mAMZN
  '0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72': [ETHEREUM.MIR, ETHEREUM.UST], // mBABA
  '0x1d350417d9787E000cc1b95d70E9536DcD91F373': [ETHEREUM.MIR, ETHEREUM.UST], // mIAU
  '0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676': [ETHEREUM.MIR, ETHEREUM.UST], // mSLV
  '0x31c63146a635EB7465e5853020b39713AC356991': [ETHEREUM.MIR, ETHEREUM.UST], // mUSO
  '0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86': [ETHEREUM.MIR, ETHEREUM.UST], // mVIXY
}

const WRAPPED_NATIVE_ONLY: ChainTokenList = {
  [ChainId.ETHEREUM]: [WNATIVE[ChainId.ETHEREUM]],
  [ChainId.ROPSTEN]: [WNATIVE[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WNATIVE[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WNATIVE[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WNATIVE[ChainId.KOVAN]],
  [ChainId.FANTOM]: [WNATIVE[ChainId.FANTOM]],
  [ChainId.FANTOM_TESTNET]: [WNATIVE[ChainId.FANTOM_TESTNET]],
  [ChainId.MATIC]: [WNATIVE[ChainId.MATIC]],
  [ChainId.MATIC_TESTNET]: [WNATIVE[ChainId.MATIC_TESTNET]],
  [ChainId.XDAI]: [WNATIVE[ChainId.XDAI]],
  [ChainId.BSC]: [WNATIVE[ChainId.BSC]],
  [ChainId.BSC_TESTNET]: [WNATIVE[ChainId.BSC_TESTNET]],
  [ChainId.ARBITRUM]: [WNATIVE[ChainId.ARBITRUM]],
  [ChainId.ARBITRUM_TESTNET]: [WNATIVE[ChainId.ARBITRUM_TESTNET]],
  [ChainId.MOONBEAM_TESTNET]: [WNATIVE[ChainId.MOONBEAM_TESTNET]],
  [ChainId.AVALANCHE]: [WNATIVE[ChainId.AVALANCHE]],
  [ChainId.AVALANCHE_TESTNET]: [WNATIVE[ChainId.AVALANCHE_TESTNET]],
  [ChainId.HECO]: [WNATIVE[ChainId.HECO]],
  [ChainId.HECO_TESTNET]: [WNATIVE[ChainId.HECO_TESTNET]],
  [ChainId.HARMONY]: [WNATIVE[ChainId.HARMONY]],
  [ChainId.HARMONY_TESTNET]: [WNATIVE[ChainId.HARMONY_TESTNET]],
  [ChainId.OKEX]: [WNATIVE[ChainId.OKEX]],
  [ChainId.OKEX_TESTNET]: [WNATIVE[ChainId.OKEX_TESTNET]],
  [ChainId.CELO]: [WNATIVE[ChainId.CELO]],
  [ChainId.MOONRIVER]: [WNATIVE[ChainId.MOONRIVER]],
  [ChainId.PALM]: [WNATIVE[ChainId.PALM]],
  [ChainId.FUSE]: [WNATIVE[ChainId.FUSE]],
  [ChainId.TELOS]: [WNATIVE[ChainId.TELOS]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.ETHEREUM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.ETHEREUM],
    ETHEREUM.DAI,
    ETHEREUM.USDC,
    ETHEREUM.USDT,
    ETHEREUM.WBTC,
    ETHEREUM.RUNE,
    ETHEREUM.NFTX,
    ETHEREUM.STETH,
    ETHEREUM.OHM_V1,
    ETHEREUM.OHM_V2,
    ETHEREUM.MIM,
    SUSHI[ChainId.ETHEREUM],
  ],
  [ChainId.MATIC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.MATIC],
    MATIC.USDC,
    MATIC.WBTC,
    MATIC.DAI,
    MATIC.WETH,
    MATIC.USDT,
    MATIC.MIM,
    MATIC.SUSHI,
  ],
  [ChainId.FANTOM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.FANTOM],
    FANTOM.DAI,
    FANTOM.USDC,
    FANTOM.WBTC,
    FANTOM.WETH,
    FANTOM.MIM,
  ],
  [ChainId.BSC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    BSC.DAI,
    BSC.USD,
    BSC.USDC,
    BSC.USDT,
    BSC.BTCB,
    BSC.WETH,
    BSC.MIM,
  ],
  [ChainId.ARBITRUM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.ARBITRUM],
    ARBITRUM.WBTC,
    ARBITRUM.USDC,
    ARBITRUM.USDT,
    ARBITRUM.MIM,
  ],
  [ChainId.XDAI]: [...WRAPPED_NATIVE_ONLY[ChainId.XDAI], XDAI.USDC, XDAI.USDT, XDAI.WBTC, XDAI.WETH],
  [ChainId.AVALANCHE]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.AVALANCHE],
    AVALANCHE.DAI,
    AVALANCHE.USDT,
    AVALANCHE.WBTC,
    AVALANCHE.WETH,
    AVALANCHE.USDC,
    AVALANCHE.MIM,
    AVALANCHE.TIME,
    SUSHI[ChainId.AVALANCHE],
  ],
  [ChainId.HARMONY]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.HARMONY],
    HARMONY.DAI,
    HARMONY.USDC,
    HARMONY.USDT,
    HARMONY.WBTC,
    HARMONY.WETH,
  ],
  [ChainId.HECO]: [...WRAPPED_NATIVE_ONLY[ChainId.HECO], HECO.DAI, HECO.USDC, HECO.USDT, HECO.WBTC, HECO.WETH],
  [ChainId.OKEX]: [...WRAPPED_NATIVE_ONLY[ChainId.OKEX], OKEX.DAI, OKEX.USDC, OKEX.USDT, OKEX.WBTC, OKEX.WETH],
  [ChainId.CELO]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.CELO],
    CELO.cETH,
    CELO.mCUSD,
    CELO.mCELO,
    CELO.mcEURO,
    CELO.cUSD,
    CELO.cEURO,
    CELO.cBTC,
    CELO.WETH,
    CELO.WBTC,
  ],
  [ChainId.MOONRIVER]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.MOONRIVER],
    MOONRIVER.USDC,
    MOONRIVER.USDT,
    MOONRIVER.WETH,
    MOONRIVER.FRAX,
    MOONRIVER.MIM,
    MOONRIVER.BTC,
    MOONRIVER.ROME,
  ],
  [ChainId.PALM]: [...WRAPPED_NATIVE_ONLY[ChainId.PALM], PALM.WETH, PALM.DAI],
  [ChainId.FUSE]: [...WRAPPED_NATIVE_ONLY[ChainId.FUSE], FUSE.USDC, FUSE.USDT, FUSE.WBTC, FUSE.WETH, FUSE.DAI],
  [ChainId.TELOS]: [...WRAPPED_NATIVE_ONLY[ChainId.TELOS], TELOS.USDC, TELOS.USDT, TELOS.WETH, TELOS.WBTC],
}

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.ETHEREUM]: {
    ...MIRROR_ADDITIONAL_BASES,
    '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETHEREUM.ETH2X_FLI],
    [ETHEREUM.FEI.address]: [ETHEREUM.DPI],
    [ETHEREUM.FRAX.address]: [ETHEREUM.FXS],
    [ETHEREUM.FXS.address]: [ETHEREUM.FRAX],
    [ETHEREUM.WBTC.address]: [ETHEREUM.RENBTC],
    [ETHEREUM.RENBTC.address]: [ETHEREUM.WBTC],
    [ETHEREUM.PONT.address]: [ETHEREUM.PWING],
    [ETHEREUM.PWING.address]: [ETHEREUM.PONT],
    [ETHEREUM.PLAY.address]: [ETHEREUM.DOUGH],
    [ETHEREUM.DOUGH.address]: [ETHEREUM.PLAY],
    [ETHEREUM.IBETH.address]: [ETHEREUM.ALPHA],
    [ETHEREUM.ALPHA.address]: [ETHEREUM.IBETH],
    [ETHEREUM.HBTC.address]: [ETHEREUM.CREAM],
    [ETHEREUM.CREAM.address]: [ETHEREUM.HBTC],
    [ETHEREUM.DUCK.address]: [ETHEREUM.USDP],
    [ETHEREUM.USDP.address]: [ETHEREUM.DUCK],
    [ETHEREUM.BAB.address]: [ETHEREUM.BAC],
    [ETHEREUM.BAC.address]: [ETHEREUM.BAB],
    [ETHEREUM.LIFT.address]: [ETHEREUM.LFBTC],
    [ETHEREUM.LFBTC.address]: [ETHEREUM.LIFT],
    [ETHEREUM.CVXCRV.address]: [ETHEREUM.CRV],
    [ETHEREUM.CRV.address]: [ETHEREUM.CVXCRV],
    [ETHEREUM.WOOFY.address]: [ETHEREUM.YFI],
    [ETHEREUM.SPANK.address]: [ETHEREUM.RAI],
    [ETHEREUM.DOLA.address]: [ETHEREUM.INV],
  },
  [ChainId.MATIC]: {
    [MATIC.FRAX.address]: [MATIC.FXS],
    [MATIC.FXS.address]: [MATIC.FRAX],
    [MATIC.DRAX.address]: [MATIC.DMAGIC],
    [MATIC.AXMATIC.address]: [MATIC.DMAGIC],
    [MATIC.BCT.address]: [MATIC.KLIMA],
    [MATIC.KLIMA.address]: [MATIC.BCT],
    //[MATIC.DMAGIC.address]: [MATIC.DRAX, MATIC.AXMATIC],
  },
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.ETHEREUM]: {
    [ETHEREUM.AMPL.address]: [ETHEREUM.DAI, WNATIVE[ChainId.ETHEREUM]],
  },
  [ChainId.MATIC]: {
    [MATIC.TEL.address]: [MATIC.SUSHI, MATIC.AAVE],
  },
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainTokenList = {
  [ChainId.ETHEREUM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.ETHEREUM],
    SUSHI[ChainId.ETHEREUM],
    ETHEREUM.WBTC,
    ETHEREUM.MIM,
    ETHEREUM.SPELL,
    ETHEREUM.ICE,
    ETHEREUM.USDC,
    ETHEREUM.USDT,
    ETHEREUM.DAI,
    ETHEREUM.OHM_V2,
  ],
  [ChainId.MATIC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.MATIC],
    SUSHI[ChainId.MATIC],
    MATIC.WETH,
    MATIC.WBTC,
    MATIC.MIM,
    MATIC.ICE,
    MATIC.USDC,
    MATIC.USDT,
    MATIC.DAI,
  ],
  [ChainId.FANTOM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.FANTOM],
    SUSHI[ChainId.FANTOM],
    FANTOM.WETH,
    FANTOM.WBTC,
    FANTOM.MIM,
    FANTOM.ICE,
    FANTOM.SPELL,
    FANTOM.USDC,
    FANTOM.DAI,
  ],
  [ChainId.BSC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    SUSHI[ChainId.BSC],
    BSC.WETH,
    BSC.BTCB,
    BSC.MIM,
    BSC.SPELL,
    BSC.ICE,
    BSC.DAI,
    BSC.USDC,
    BSC.USDT,
    BSC.USD,
  ],
  [ChainId.ARBITRUM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.ARBITRUM],
    SUSHI[ChainId.ARBITRUM],
    ARBITRUM.WBTC,
    ARBITRUM.MIM,
    ARBITRUM.SPELL,
    ARBITRUM.ICE,
    ARBITRUM.USDC,
    ARBITRUM.USDT,
  ],
  [ChainId.XDAI]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.XDAI],
    SUSHI[ChainId.XDAI],
    XDAI.WETH,
    XDAI.WBTC,
    XDAI.USDC,
    XDAI.USDT,
  ],
  [ChainId.AVALANCHE]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.AVALANCHE],
    SUSHI[ChainId.AVALANCHE],
    AVALANCHE.WBTC,
    AVALANCHE.WETH,
    AVALANCHE.ICE,
    AVALANCHE.MIM,
    AVALANCHE.SPELL,
    AVALANCHE.TIME,
    AVALANCHE.USDC,
    AVALANCHE.USDT,
    AVALANCHE.DAI,
  ],
  [ChainId.HARMONY]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.HARMONY],
    SUSHI[ChainId.HARMONY],
    HARMONY.WBTC,
    HARMONY.WETH,
    HARMONY.USDC,
    HARMONY.USDT,
    HARMONY.DAI,
  ],
  [ChainId.HECO]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.HECO],
    SUSHI[ChainId.HECO],
    HECO.WBTC,
    HECO.WETH,
    HECO.USDC,
    HECO.USDT,
    HECO.DAI,
  ],
  [ChainId.OKEX]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.OKEX],
    SUSHI[ChainId.OKEX],
    OKEX.WBTC,
    OKEX.WETH,
    OKEX.USDC,
    OKEX.USDT,
    OKEX.DAI,
  ],
  [ChainId.CELO]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.CELO],
    SUSHI[ChainId.CELO],
    CELO.WETH,
    CELO.WBTC,
    CELO.USDC,
    CELO.cUSD,
    CELO.cEURO,
  ],
  [ChainId.MOONRIVER]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.MOONRIVER],
    SUSHI[ChainId.MOONRIVER],
    MOONRIVER.WETH,
    MOONRIVER.BTC,
    MOONRIVER.MIM,
    MOONRIVER.FRAX,
    MOONRIVER.USDC,
    MOONRIVER.USDT,
    MOONRIVER.ROME,
  ],
  [ChainId.PALM]: [...WRAPPED_NATIVE_ONLY[ChainId.PALM], PALM.WETH, PALM.DAI],
  [ChainId.FUSE]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.FUSE],
    SUSHI[ChainId.FUSE],
    FUSE.WBTC,
    FUSE.WETH,
    FUSE.USDC,
    FUSE.USDT,
    FUSE.DAI,
  ],
  [ChainId.TELOS]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.TELOS],
    SUSHI[ChainId.TELOS],
    TELOS.WETH,
    TELOS.WBTC,
    TELOS.USDC,
    TELOS.USDT,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.ETHEREUM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.ETHEREUM],
    ETHEREUM.DAI,
    ETHEREUM.USDC,
    ETHEREUM.USDT,
    ETHEREUM.WBTC,
    ETHEREUM.OHM_V1,
    ETHEREUM.OHM_V2,
    ETHEREUM.MIM,
  ],
  [ChainId.MATIC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.MATIC],
    MATIC.USDC,
    MATIC.WBTC,
    MATIC.MIM,
    MATIC.DAI,
    MATIC.WETH,
    MATIC.USDT,
  ],
  [ChainId.FANTOM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.FANTOM],
    FANTOM.DAI,
    FANTOM.USDC,
    FANTOM.WBTC,
    FANTOM.WETH,
    FANTOM.MIM,
  ],
  [ChainId.BSC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    BSC.DAI,
    BSC.USD,
    BSC.USDC,
    BSC.USDT,
    BSC.BTCB,
    BSC.WETH,
    BSC.MIM,
  ],
  [ChainId.ARBITRUM]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.ARBITRUM],
    ARBITRUM.WBTC,
    ARBITRUM.USDC,
    ARBITRUM.USDT,
    ARBITRUM.MIM,
  ],
  [ChainId.XDAI]: [...WRAPPED_NATIVE_ONLY[ChainId.XDAI], XDAI.USDC, XDAI.USDT, XDAI.WBTC, XDAI.WETH],
  [ChainId.AVALANCHE]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.AVALANCHE],
    AVALANCHE.DAI,
    AVALANCHE.USDT,
    AVALANCHE.WBTC,
    AVALANCHE.WETH,
    AVALANCHE.USDC,
    AVALANCHE.MIM,
    AVALANCHE.TIME,
    SUSHI[ChainId.AVALANCHE],
  ],
  [ChainId.HARMONY]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.HARMONY],
    HARMONY.DAI,
    HARMONY.USDC,
    HARMONY.USDT,
    HARMONY.WBTC,
    HARMONY.WETH,
  ],
  [ChainId.HECO]: [...WRAPPED_NATIVE_ONLY[ChainId.HECO], HECO.DAI, HECO.USDC, HECO.USDT, HECO.WBTC, HECO.WETH],
  [ChainId.OKEX]: [...WRAPPED_NATIVE_ONLY[ChainId.OKEX], OKEX.DAI, OKEX.USDC, OKEX.USDT, OKEX.WBTC, OKEX.WETH],
  [ChainId.CELO]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.CELO],
    CELO.cETH,
    CELO.mCUSD,
    CELO.mCELO,
    CELO.mcEURO,
    CELO.cUSD,
    CELO.cEURO,
    CELO.cBTC,
  ],
  [ChainId.MOONRIVER]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.MOONRIVER],
    MOONRIVER.USDC,
    MOONRIVER.USDT,
    MOONRIVER.WETH,
    MOONRIVER.FRAX,
    MOONRIVER.MIM,
    MOONRIVER.BTC,
    MOONRIVER.ROME,
  ],
  [ChainId.PALM]: [...WRAPPED_NATIVE_ONLY[ChainId.PALM], PALM.WETH, PALM.DAI],
  [ChainId.FUSE]: [...WRAPPED_NATIVE_ONLY[ChainId.FUSE], FUSE.USDC, FUSE.USDT, FUSE.WBTC, FUSE.WETH, FUSE.DAI],
  [ChainId.TELOS]: [...WRAPPED_NATIVE_ONLY[ChainId.TELOS], TELOS.USDC, TELOS.USDT, TELOS.WETH, TELOS.WBTC],
}

export const PINNED_PAIRS: {
  readonly [chainId in ChainId]?: [Token, Token][]
} = {
  [ChainId.ETHEREUM]: [
    [SUSHI[ChainId.ETHEREUM], WNATIVE[ChainId.ETHEREUM]],
    [
      new Token(ChainId.ETHEREUM, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.ETHEREUM, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
    ],
    [ETHEREUM.USDC, ETHEREUM.USDT],
    [ETHEREUM.DAI, ETHEREUM.USDT],
  ],
}
