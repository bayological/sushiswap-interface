import { PoolType } from '@sushiswap/tines'
import { ConstantProductPool, HybridPool } from '@sushiswap/trident-sdk'
import { ChipColor } from 'app/components/Chip'
import { ConstantProductPoolState } from 'app/hooks/useConstantProductPools'
import { StablePoolState } from 'app/hooks/useTridentStablePools'

// TODO add last two pool types
export type PoolUnion = ConstantProductPool | HybridPool

export const poolTypeNameMapper: Record<PoolType, string> = {
  ConstantProduct: 'Classic',
  ConcentratedLiquidity: 'Concentrated',
  Hybrid: 'Stable',
  Weighted: 'Index',
}

export const chipPoolColorMapper: Record<PoolType, ChipColor> = {
  ConstantProduct: 'purple',
  ConcentratedLiquidity: 'green',
  Hybrid: 'yellow',
  Weighted: 'blue',
}

export enum LiquidityMode {
  STANDARD = 'Standard Mode',
  ZAP = 'Zap Mode',
}

// TODO should be all
// TODO figure out if we need separate states for every pool type
export type PoolAtomType = {
  state?: ConstantProductPoolState | StablePoolState
  pool?: PoolUnion
}

export type LiquidityInput = {
  token: string
  native: boolean
  amount: string
}

export type LiquidityOutput = {
  token: string
  amount: string
}
