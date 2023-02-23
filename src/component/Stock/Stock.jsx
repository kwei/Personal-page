import "./Stock.scss"
import React, { useEffect, useRef } from "react"
import Card from "../Card/Card.jsx"
import { useState } from "react"
import { MdKeyboardArrowDown, MdOutlineSearch } from "react-icons/md"
import Chart from 'chart.js/auto'
import { fetchStockInfo, fetchStockExchange } from '../../utils'

const SEARCH_TYPES = Object.freeze({
   STOCK_NAME: "股市名稱",
   STOCK_CODE: "股市代碼",
   DATE: "日期"
})

const quotationConfig = {
    type: 'bar',
    data: {},
    options: {
        indexAxis: 'y',
        elements: { bar: { borderWidth: 2 } },
        responsive: true,
        scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } }
        }
    }
}

const initStockInfo = {
    "openingPrice": "",
    "highestPrice": "",
    "lowestPrice": "",
    "upperBoundPrice": "",
    "lowerBoundPrice": "",
    "stockCode": "股票代碼",
    "stockName": "股票名稱",
    "stockFullName": "股票全名",
    "finalPrice": "市值",
    "currentTurnOver": "",
    "cumulativeTurnOver": "",
    "buyPriceArray": "1_2_3_4_5_",
    "buyAmountArray": "40_20_10_40_30_",
    "salePriceArray": "2_3_4_5_6_",
    "saleAmountArray": "10_20_30_20_10_",
    "yesterdayPrice": ""
}

const Stock = () => {
    const [ searchType, setSearchType ] = useState("STOCK_CODE")
    const [ showSearchTypeOption, setShowSearchTypeOption ] = useState(false)
    const searchRef = useRef(null)
    const quotationBuyRef = useRef(null)
    const quotationSaleRef = useRef(null)
    const curveRef = useRef(null)
    const quotationBuyCanvas = useRef(null)
    const quotationSaleCanvas = useRef(null)
    const curveCanvas = useRef(null)
    
    const [ stockInfo, setStockInfo ] = useState(initStockInfo)

    useEffect(() => {
        drawQuotationGraph(stockInfo)
        fetchStockExchange("20230223", "2330").then(res => {
            if (res.ok) {
                console.log(res.data)
            }
        })
    }, [stockInfo])

    function selectSearchType (e) {
        setSearchType(e.target.id)
        setShowSearchTypeOption(false)
    }

    function handleShowSearchTypeOption () {
        setShowSearchTypeOption(prevState => !prevState)
    }

    function drawQuotationGraph (info) {
        const configBuy = { ...quotationConfig }
        const configSale = { ...quotationConfig }
        const buyLabels = info.buyPriceArray.split("_")
        const buydatas = info.buyAmountArray.split("_")
        buyLabels.pop()
        buydatas.pop()
        // console.log(buyLabels, buydatas)
        configBuy.data = {
            labels: buyLabels,
            datasets: [{ label: "委買", data: buydatas, backgroundColor: "#F97474" }]
        }
        const saleLabels = info.salePriceArray.split("_")
        const saledatas = info.saleAmountArray.split("_")
        saleLabels.pop()
        saledatas.pop()
        // console.log(saleLabels, saledatas)
        configSale.data = {
            labels: saleLabels,
            datasets: [{ label: "委賣", data: saledatas, backgroundColor: "#09C6AB" }]
        }
        const canvasElement_buy = quotationBuyRef.current
        const canvasElement_sale = quotationSaleRef.current
        // console.log(quotationBuyCanvas.value, quotationBuyCanvas.value instanceof Chart)
        if (quotationBuyCanvas.value instanceof Chart) {
            // console.log("destroy quotationBuyCanvas")
            quotationBuyCanvas.value.destroy()
        }
        // console.log(quotationSaleCanvas.value, quotationSaleCanvas.value instanceof Chart)
        if (quotationSaleCanvas.value instanceof Chart) {
            // console.log("destroy quotationSaleCanvas")
            quotationSaleCanvas.value.destroy()
        }
        if (canvasElement_buy) quotationBuyCanvas.value = new Chart(canvasElement_buy.getContext("2d"), configBuy)
        if (canvasElement_sale) quotationSaleCanvas.value = new Chart(canvasElement_sale.getContext("2d"), configSale)
    }

    async function search () {
        if (!searchRef.current) return false
        const searchString = searchRef.current.value
        if (searchString === "") return false
        console.log(`Search for ${searchString} with type ${searchType}`)
        switch (searchType) {
            case "STOCK_NAME":
                break
            case "STOCK_CODE":
                const { ok, data } = await fetchStockInfo(searchString)
                console.log({ ok, data })
                if (ok) {
                    const info = {
                        openingPrice: data.o,
                        highestPrice: data.h,
                        lowestPrice: data.l,
                        upperBoundPrice: data.u,
                        lowerBoundPrice: data.w,
                        stockCode: data.c,
                        stockName: data.n,
                        stockFullName: data.nf,
                        finalPrice: data.z,
                        currentTurnOver: data.tv,
                        cumulativeTurnOver: data.v,
                        buyPriceArray: data.b,
                        buyAmountArray: data.g,
                        salePriceArray: data.a,
                        saleAmountArray: data.f,
                        yesterdayPrice: data.y,
                    }
                    setStockInfo(info)
                }
                break
            case "DATE":
                break
        }
        searchRef.current.value = ""
    }

    return (
        <div className="stock-page">
            <div className="search-section">
                <div className="searchType-selector">
                    <span onClick={handleShowSearchTypeOption}
                        style={{ 
                            borderColor: showSearchTypeOption? "var(--primary)" : "var(--text)",
                        }}
                    >
                        {SEARCH_TYPES[searchType]}<MdKeyboardArrowDown></MdKeyboardArrowDown>
                    </span>
                    <div className="searchType-options" 
                        style={{ 
                            height: showSearchTypeOption? "auto" : "0px",
                            padding: showSearchTypeOption? "2px" : "0px"
                        }}
                    >
                        { 
                            Object.keys(SEARCH_TYPES).map(type => {
                                return <span id={type} key={type} onClick={selectSearchType}>{SEARCH_TYPES[type]}</span>
                            }) 
                        }
                    </div>
                    <input ref={searchRef} type="text" defaultValue="" placeholder="EX: 0056 or 元大高股息 or 20230223"></input>
                    <div className="search" onClick={search}><MdOutlineSearch></MdOutlineSearch></div>
                </div>
            </div>
            <Card>
                <div className="result">
                    <div className="stock-info">
                        <span className="code">{stockInfo.stockCode}</span>
                        <span className="name">{stockInfo.stockName}</span>
                        <span className="finalPrice">{stockInfo.finalPrice}</span>
                    </div> 
                    <div className="graph">
                        <div className="item">
                            <canvas ref={curveRef} id="curve"></canvas>
                        </div>
                    </div>
                    <div className="graph">
                        <div className="item">
                            <canvas ref={quotationBuyRef} id="quotation-buy"></canvas>
                        </div>
                        <div className="item">
                            <canvas ref={quotationSaleRef} id="quotation-sale"></canvas>
                        </div>
                    </div>
                </div>
            </Card>
            <Card></Card>
        </div>
    )
}

export default Stock