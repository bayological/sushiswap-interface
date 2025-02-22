import { BAD_AUCTIONS } from 'app/features/miso/context/constants'
import { AuctionStatus, RawAuction } from 'app/features/miso/context/types'
import { useMisoHelperContract } from 'app/hooks'
import { useSingleCallResult } from 'app/state/multicall/hooks'
import { useMemo } from 'react'

export const useAuctionList = (type?: AuctionStatus): RawAuction[] => {
  const contract = useMisoHelperContract()
  const { result } = useSingleCallResult(contract, 'getMarkets')

  return useMemo(() => {
    if (!result || !Array.isArray(result) || !(result.length > 0)) return []

    let filtered = result[0].filter((el) => !BAD_AUCTIONS.includes(el.addr))
    const currentTimestamp = new Date().getTime()

    if (type === AuctionStatus.LIVE) {
      return filtered.filter(
        (auction) =>
          currentTimestamp >= auction.startTime.mul('1000').toNumber() &&
          currentTimestamp < auction.endTime.mul('1000').toNumber() &&
          !auction.finalized
      )
    } else if (type === AuctionStatus.UPCOMING) {
      return filtered.filter(
        (auction) => currentTimestamp < auction.startTime.mul('1000').toNumber() && !auction.finalized
      )
    } else if (type === AuctionStatus.FINISHED) {
      return filtered.filter(
        (auction) => currentTimestamp > auction.endTime.mul('1000').toNumber() || auction.finalized
      )
    }

    return filtered
  }, [result, type])
}
