import { ChainId, Token } from '@sushiswap/core-sdk'

export const USDC = new Token(ChainId.AVALANCHE, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, 'USDC', 'USD Coin')
export const DAI = new Token(
  ChainId.AVALANCHE,
  '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDT = new Token(ChainId.AVALANCHE, '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', 6, 'USDT', 'Tether USD')
export const WBTC = new Token(
  ChainId.AVALANCHE,
  '0x50b7545627a5162F82A992c33b87aDc75187B218',
  8,
  'WBTC',
  'Wrapped Bitcoin'
)
export const WETH = new Token(
  ChainId.AVALANCHE,
  '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  18,
  'WETH',
  'Wrapped Ether'
)
export const ICE = new Token(ChainId.AVALANCHE, '0x4e1581f01046efdd7a1a2cdb0f82cdd7f71f2e59', 18, 'ICE', 'Ice Token')
export const MIM = new Token(
  ChainId.AVALANCHE,
  '0x130966628846BFd36ff31a822705796e8cb8C18D',
  18,
  'MIM',
  'Magic Internet Money'
)
export const SPELL = new Token(
  ChainId.AVALANCHE,
  '0xCE1bFFBD5374Dac86a2893119683F4911a2F7814',
  18,
  'SPELL',
  'Spell Token'
)
export const TIME = new Token(ChainId.AVALANCHE, '0xb54f16fB19478766A268F172C9480f8da1a7c9C3', 9, 'TIME', 'Time')
