
import { Component } from "react"
import { bitcoinService } from "../services/bitcoin.service"
import { BtcToUsd } from "../cmps/BtcUsdChart"
import { BlockSizeChart } from "../cmps/BlockSizeChart"

export class Charts extends Component {
  state = {
    avgBlockSizeData: null,
    avgBtcToUsd: null,
  }

  componentDidMount() {
    this.getBlockSizeData()
    this.getAvgBtcToUsd()
  }

  async getBlockSizeData() {

    const blockSizeData = await bitcoinService.getAvgBlockSize()
    this.setState({ avgBlockSizeData: blockSizeData })
  }

  async getAvgBtcToUsd() {
    const btcToUsd = await bitcoinService.getAvgBtcToUsd()
    this.setState({ avgBtcToUsd: btcToUsd })
  }

  render() {
    const { avgBlockSizeData, avgBtcToUsd } = this.state
    if (!avgBlockSizeData) return <div>Loading...</div>
    return (
      <section className="charts-container flex wrap auto-center gap-rem">
        <section className="flex column gap-rem auto-center">
          <h1>Bitcoin average block size</h1>
          <BlockSizeChart data={avgBlockSizeData} />
        </section>
        <section className="flex column gap-rem auto-center">
          <h1>Bitcoin average rate in US dollars</h1>
          <BtcToUsd data={avgBtcToUsd} />
        </section>
      </section>
    )
  }
}
