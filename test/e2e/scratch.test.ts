import { Dappeteer } from '@chainsafe/dappeteer'
import { Browser, Page } from 'puppeteer'

import { ADDRESSES } from './constants/Index'
import { TestHelper } from './helpers/TestHelper'
import { SwapPage } from './pages/swap/SwapPage'

let browser: Browser
let page: Page
let metamask: Dappeteer

let swapPage: SwapPage

require('dotenv').config()

let baseUrl: string = process.env.TEST_BASE_URL || 'http://localhost:3000'

jest.retryTimes(1)

describe('Swap:', () => {
  beforeAll(async () => {
    ;[metamask, browser, page] = await TestHelper.initDappeteer()
    swapPage = new SwapPage(page, metamask, baseUrl)

    await page.goto(baseUrl)
    await page.bringToFront()

    await swapPage.connectMetamaskWallet()
    await swapPage.addTokenToMetamask(ADDRESSES.WETH)
    await swapPage.addTokenToMetamask(ADDRESSES.USDC)
    await swapPage.addTokenToMetamask(ADDRESSES.BAT)
  })

  beforeEach(async () => {
    await swapPage.navigateTo()
    await swapPage.blockingWait(2, true)
  })

  afterAll(async () => {
    browser.close()
  })

  test('Should switch currencies', async () => {
    await swapPage.setInputToken('USDC')
    await swapPage.setOutputToken('WETH')

    const selectedInputTokenBefore = await swapPage.getSelectedInputToken()
    const selectedOutputTokenBefore = await swapPage.getSelectedOutputToken()

    expect(selectedInputTokenBefore).toBe('USDC')
    expect(selectedOutputTokenBefore).toBe('WETH')

    await swapPage.clickSwitchCurrenciesButton()

    const selectedInputTokenAfter = await swapPage.getSelectedInputToken()
    const selectedOutputTokenAfter = await swapPage.getSelectedOutputToken()

    expect(selectedInputTokenAfter).toBe('WETH')
    expect(selectedOutputTokenAfter).toBe('USDC')
  })
})
