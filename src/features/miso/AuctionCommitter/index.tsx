import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { CurrencyAmount, ZERO } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
import { CurrencyLogo } from 'app/components/CurrencyLogo'
import NumericalInput from 'app/components/Input/Numeric'
import Typography from 'app/components/Typography'
import AuctionTimer from 'app/features/miso/AuctionTimer'
import CommitReviewModal from 'app/features/miso/CommitReviewModal'
import { Auction } from 'app/features/miso/context/Auction'
import { useAuctionPointListPoints } from 'app/features/miso/context/hooks/useAuctionPointList'
import { AuctionStatus } from 'app/features/miso/context/types'
import MisoButton from 'app/features/miso/MisoButton'
import { classNames, maxAmountSpend, tryParseAmount } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
import { useCurrencyBalance } from 'app/state/wallet/hooks'
import React, { FC, useState } from 'react'

import AuctionCommitterSkeleton from './AuctionCommitterSkeleton'

interface AuctionCommitterProps {
  auction?: Auction
}

const AuctionCommitter: FC<AuctionCommitterProps> = ({ auction }) => {
  const { i18n } = useLingui()
  const { account } = useActiveWeb3React()
  const [review, setReview] = useState(false)
  const balance = useCurrencyBalance(account ?? undefined, auction?.paymentToken)
  const [value, setValue] = useState<string>()
  const whitelistedAmount = useAuctionPointListPoints(
    auction?.pointListAddress,
    account ?? undefined,
    auction?.paymentToken
  )

  if (!auction) return <AuctionCommitterSkeleton />

  const inputAmount =
    tryParseAmount(value, auction.paymentToken) || CurrencyAmount.fromRawAmount(auction.paymentToken, '0')
  const spend = whitelistedAmount?.greaterThan(ZERO)
    ? auction.totalTokensCommitted
      ? whitelistedAmount?.subtract(auction.totalTokensCommitted)
      : whitelistedAmount
    : maxAmountSpend(balance)
  const maxSpend = spend?.greaterThan(ZERO) ? spend : CurrencyAmount.fromRawAmount(auction.paymentToken, '0')

  const whitelist = whitelistedAmount?.greaterThan(ZERO)
  const notWhitelisted = auction.auctionInfo.usePointList && !whitelist
  const overSpend =
    auction && whitelistedAmount && auction.totalTokensCommitted?.add(inputAmount).greaterThan(whitelistedAmount)
  const notEnoughBalance = balance && inputAmount && inputAmount.greaterThan(balance)
  let error

  if (inputAmount.equalTo(ZERO)) error = i18n._(t`Enter amount`)
  if (overSpend) error = i18n._(`Amount exceeds whitelist amount`)
  if (notEnoughBalance) error = i18n._(t`Not enough balance`)
  if (auction.status === AuctionStatus.UPCOMING) error = i18n._(i18n._(t`Not started`))
  if (notWhitelisted) error = i18n._(t`Not whitelisted`)

  return (
    <div className="mt-6 relative">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-baseline">
          <Typography weight={700} className="text-high-emphesis">
            {i18n._(t`Participate`)}
          </Typography>
          <Typography
            role="button"
            variant="sm"
            weight={700}
            className="text-low-emphesis"
            onClick={() => setValue(balance?.toExact())}
          >
            Balance: {balance?.toSignificant(6)} {balance?.currency.symbol}
          </Typography>
        </div>
        <div className="flex rounded bg-dark-900 px-4 py-2.5 gap-4 items-center">
          <CurrencyLogo currency={auction.paymentToken} size={42} className="rounded-full" />
          <div className="flex items-baseline gap-2 flex-grow">
            <Typography variant="lg" weight={700} className="text-high-emphesis">
              {auction.paymentToken.symbol}
            </Typography>
            <Typography variant="lg" weight={700} className="text-high-emphesis">
              <NumericalInput
                value={value || ''}
                onUserInput={(val) => setValue(val)}
                placeholder="0.00"
                className="bg-transparent text-inherit w-full"
                autoFocus
              />
            </Typography>
          </div>
          <div
            role="button"
            onClick={() => setValue(maxSpend?.toExact())}
            className="min-w-[60px] cursor-pointer flex flex-col items-center justify-center rounded-full overflow-hidden bg-gradient-to-r from-red/30 via-pink/30 to-red/30 bg-opacity-20 border border-red text-pink px-3 h-9"
          >
            <Typography>{i18n._(t`MAX`)}</Typography>
          </div>
        </div>
        <MisoButton amount={tryParseAmount(value, auction.paymentToken)} auction={auction} error={!!error}>
          <AuctionTimer auction={auction}>
            {() => (
              <Button
                onClick={() => setReview(true)}
                disabled={!!(notWhitelisted || notEnoughBalance || overSpend) || auction.status !== AuctionStatus.LIVE}
                className={classNames(
                  error ? 'pointer-events-none' : '',
                  inputAmount.equalTo(ZERO) ? '!opacity-60' : '',
                  '!border-none outline-none h-[74px] bg-gradient-to-r from-blue to-pink transition-all disabled:scale-[1] hover:scale-[1.02] !opacity-100 disabled:!opacity-40'
                )}
              >
                <div className="flex flex-col items-center gap-1">
                  <Typography className="text-white" weight={700}>
                    {error ? error : i18n._(t`Commit`)}
                  </Typography>
                  {whitelist && (
                    <div className="flex gap-1 items-baseline rounded px-2">
                      <Typography
                        variant="xs"
                        className={classNames(overSpend ? 'text-red' : 'text-white')}
                        weight={700}
                      >
                        {auction.totalTokensCommitted?.add(inputAmount).toSignificant(6)}
                      </Typography>
                      <Typography variant="xxs" weight={700} className="bottom-[1px] relative">
                        /
                      </Typography>
                      <Typography variant="sm" className="text-white" weight={700}>
                        {whitelistedAmount?.toSignificant(6)}
                      </Typography>
                      <Typography variant="xxs" className="text-high-emphesis" weight={700}>
                        {whitelistedAmount?.currency.symbol}
                      </Typography>
                    </div>
                  )}
                </div>
              </Button>
            )}
          </AuctionTimer>
          <CommitReviewModal amount={inputAmount} auction={auction} open={review} onDismiss={() => setReview(false)} />
        </MisoButton>
      </div>
    </div>
  )
}

export default AuctionCommitter
