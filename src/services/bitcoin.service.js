import axios from "axios"
import { storageService } from './storage.service'
const KEY_BTC = 'bitcoinDB'
const KEY_AVG = 'avgDB'
const KEY_USD = 'usdDB'
const KEY_TIME = 'timespanDB'

export const bitcoinService = {
  getBitcoin,
  getAvgBlockSize,
  getAvgBtcToUsd,
}

async function getBitcoin(balance) {
  let dataStorage = storageService.load(KEY_BTC)

  try {
    if (!dataStorage) {
      var response = await (
        await axios.get(
          `https://blockchain.info/tobtc?currency=USD&value=${balance}`
        )
      ).data
      storageService.store(KEY_BTC, response)
    }
    else {
      response = dataStorage
    }

    return response
  } catch (error) {
    console.log(error)
  }
}


async function getAvgBlockSize(timespan = '6months') {
  const url = `https://api.blockchain.info/charts/avg-block-size?timespan=${timespan}&format=json&cors=true`
  let dataStorage = storageService.load(KEY_AVG)
  try {
    if (!dataStorage) {
      var { data } = await axios.get(url)
      storageService.store(KEY_AVG, data)
      storageService.store(KEY_TIME)
    }
    else {
      data = dataStorage
    }

    let res = []
    if (data.values.length > 100) {
      res = data.values.reduce((acc, val, idx) => {
        val = { MB: val.y, name: new Date(val.x * 1000).toLocaleDateString('en-GB') }
        acc.push(val)

        return acc
      }, [])
    }
    return res.slice(-90, -1)
  } catch (error) {

    console.log('ERROR', error)
  }
}


async function getAvgBtcToUsd(timespan = '5months') {
  const url = `https://api.blockchain.info/charts/market-price?timespan=${timespan}&format=json&cors=true`
  let dataStorage = storageService.load(KEY_USD)
  try {
    if (!dataStorage) {
      // var response = await axios.get(url)
      var { data } = await axios.get(url)
      storageService.store(KEY_USD, data)
      // storageService.store(KEY_TIME)
    }
    else {
      data = dataStorage
    }
    let res = []
    if (data.values.length > 100) {
      res = data.values.reduce((acc, val, idx) => {
        val = { USD: val.y, name: new Date(val.x * 1000).toLocaleDateString('en-GB') }
        delete val.x
        acc.push(val)

        return acc
      }, [])
    }
    return res.slice(-90, -1)
  } catch (error) {
    console.log(error)
  }
}