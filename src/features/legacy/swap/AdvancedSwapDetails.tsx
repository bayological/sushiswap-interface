import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency, Percent, Trade as V2Trade, TradeType } from '@sushiswap/core-sdk'
import FormattedPriceImpact from 'app/components/FormattedPriceImpact'
import QuestionHelper from 'app/components/QuestionHelper'
import { RowBetween, RowFixed } from 'app/components/Row'
import { computeRealizedLPFeePercent } from 'app/functions/prices'
import React, { useMemo } from 'react'

import SwapRoute from './SwapRoute'

export interface AdvancedSwapDetailsProps {
  trade?: V2Trade<Currency, Currency, TradeType>
  allowedSlippage: Percent
}

export function AdvancedSwapDetails({ trade, allowedSlippage }: AdvancedSwapDetailsProps) {
  const { i18n } = useLingui()

  const { realizedLPFee, priceImpact } = useMemo(() => {
    if (!trade) return { realizedLPFee: undefined, priceImpact: undefined }

    const realizedLpFeePercent = computeRealizedLPFeePercent(trade)
    const realizedLPFee = trade.inputAmount.multiply(realizedLpFeePercent)

    const priceImpact = trade.priceImpact.subtract(realizedLpFeePercent)

    return { priceImpact, realizedLPFee }
  }, [trade])

  return !trade ? null : (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row items-center justify-between">
        <span className="flex items-center">
          <div className="text-sm text-secondary">{i18n._(t`Route`)}</div>
          <QuestionHelper text={i18n._(t`Routing through these tokens resulted in the best price for your trade.`)} />
        </span>
        <SwapRoute trade={trade} />
      </div>

      <RowBetween>
        <RowFixed>
          <div className="text-sm text-secondary">
            {trade.tradeType === TradeType.EXACT_INPUT ? i18n._(t`Minimum received`) : i18n._(t`Maximum sent`)}
          </div>
          <QuestionHelper
            text={i18n._(
              t`Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.`
            )}
          />
        </RowFixed>
        <RowFixed>
          <div className="text-sm font-bold text-high-emphesis">
            {trade.tradeType === TradeType.EXACT_INPUT
              ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
              : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`}
          </div>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <div className="text-sm text-secondary">{i18n._(t`Price Impact`)}</div>
          <QuestionHelper
            text={i18n._(t`The difference between the market price and estimated price due to trade size.`)}
          />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpact} />
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <div className="text-sm text-secondary">{i18n._(t`Liquidity Provider Fee`)}</div>
          <QuestionHelper
            text={i18n._(t`A portion of each trade (0.25%) goes to liquidity providers as a protocol incentive.`)}
          />
        </RowFixed>
        <div className="text-sm font-bold text-high-emphesis">
          {realizedLPFee
            ? `${realizedLPFee.divide(6).multiply(5).toSignificant(4)} ${realizedLPFee.currency.symbol}`
            : '-'}
        </div>
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <div className="text-sm text-secondary">{i18n._(t`xSUSHI Fee`)}</div>
          <QuestionHelper
            text={i18n._(t`A portion of each trade (0.05%) goes to xSUSHI holders as a protocol incentive.`)}
          />
        </RowFixed>
        <div className="text-sm font-bold text-high-emphesis">
          {realizedLPFee ? `${realizedLPFee.divide(6).toSignificant(4)} ${realizedLPFee.currency.symbol}` : '-'}
        </div>
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <div className="text-sm text-secondary">{i18n._(t`Slippage tolerance`)}</div>
          <QuestionHelper text={i18n._(t`Slippage tolerance...`)} />
        </RowFixed>
        <div className="text-sm font-bold text-high-emphesis">{allowedSlippage.toFixed(2)}%</div>
      </RowBetween>
    </div>
  )
}
