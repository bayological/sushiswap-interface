import { AddressZero } from '@ethersproject/constants'
import { Currency, CurrencyAmount } from '@sushiswap/core-sdk'
import { useUSDCValue } from 'app/hooks/useUSDCPrice'
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

// Dummy component that fetches usdcValue
const USDCValue: FC<{
  amount?: CurrencyAmount<Currency>
  update(address: string, value?: CurrencyAmount<Currency>)
}> = ({ amount, update }) => {
  const usdcValue = useUSDCValue(amount)
  const address = amount ? (amount.currency.isNative ? AddressZero : amount.currency.wrapped.address) : undefined

  useEffect(() => {
    if (!address) return

    update(address, usdcValue)
    return () => {
      update(address, undefined)
    }
  }, [address, update, usdcValue])

  return <></>
}

interface SumUSDCValuesProps {
  amounts?: (CurrencyAmount<Currency> | undefined)[]
  children: ({ amount }: { amount: CurrencyAmount<Currency> | undefined }) => ReactNode
}

const SumUSDCValues: FC<SumUSDCValuesProps> = ({ amounts, children }) => {
  const [state, setState] = useState<Record<string, CurrencyAmount<Currency> | undefined>>({})
  const update = useCallback((address, value) => {
    setState((prevState) => ({
      ...prevState,
      [address]: value,
    }))
  }, [])

  const values = useMemo(() => Object.values(state).filter(Boolean) as CurrencyAmount<Currency>[], [state])
  const amount = useMemo(() => (values.length > 0 ? values.reduce((acc, cur) => acc.add(cur)) : undefined), [values])

  return (
    <>
      {amounts?.map((el, index) => (
        <USDCValue amount={el} key={index} update={update} />
      ))}
      {children({ amount })}
    </>
  )
}

export default SumUSDCValues
