import "./Stock.scss"
import React, { useEffect, useRef } from "react"
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import Card from "../Card/Card.jsx"
import { MdArrowDropDown, MdArrowDropUp, MdSearch } from "react-icons/md"
import { getStockExchangeData, getStockInfo, isStockUpdateInterval, str2Num, yyyymmdd } from "../../utils"
import { useState } from "react"

const Stock = () => {
    const stockNoInputRef = useRef(null)
    const [ realTimeData, setRealTimeData ] = useState({})
    const [ staticData, setStaticData ] = useState({})
    const [ searchList, setSearchList ] = useState(["2330"])
    const interval = useRef(null)

    useEffect(() => {
        searchList.map(stockNo => {
            if (!realTimeData[stockNo]) {
                fetchStockInfo(stockNo)
                fetchExchangeData(undefined, stockNo)
            }
        })
        realTimeSync(searchList)
        return () => { stopSync() }
    }, [searchList])

    useEffect(() => {
        fetchExchangeData()
        return () => { stopSync() }
    }, [])

    function fetchExchangeData (date = yyyymmdd(new Date(), '/'), code = "2330") {
        getStockExchangeData(date, code).then(res => {
            if (res.ok) {
                console.log("getStockExchangeData: ", res.data)
                setStaticData((prevState) => {
                    const newState = { ...prevState }
                    if (!newState[code]) newState[code] = []
                    res.data.data.map(data => {
                        newState[code].push({
                            date: data[0],
                            tradeVolume: data[1],
                            tradeValue: data[2],
                            openingPrice: data[3],
                            highestPrice: data[4],
                            lowestPrice: data[5],
                            closingPrice: data[6],
                            change: data[7],
                            transaction: data[8],
                        })
                    })
                    return newState
                })
            }
        })
    }

    function fetchStockInfo (code = "2330") {
        getStockInfo(code).then(res => {
            if (res.ok) {
                console.log("getStockInfo: ", res.data)
                setRealTimeData((prevState) => {
                    const newState = { ...prevState }
                    if (!newState[code]) newState[code] = []
                    newState[code].push({
                        openingPrice: res.data["o"],
                        highestPrice: res.data["h"],
                        lowestPrice: res.data["l"],
                        limitUpPrice: res.data["u"],
                        limitDownPrice: res.data["w"],
                        code: res.data["c"],
                        name: res.data["n"],
                        fullName: res.data["nf"],
                        currentTransactionPrice: res.data["z"],
                        currentTradeVolume: res.data["tv"],
                        cumulativeTradeVolume: res.data["v"],
                        bestBidPrices: res.data["b"],
                        bestBibVolumes: res.data["g"],
                        bestAskPrices: res.data["a"],
                        bestAskVolumes: res.data["f"],
                        yesterdayClosingPrice: res.data["y"],
                    })
                    console.log("setRealTimeData", newState)
                    return newState
                })
            }
        })
    }

    function realTimeSync (arr) {
        interval.current = setInterval(() => {
            if (!isStockUpdateInterval()) {
                stopSync()
                return false
            } else {
                arr.map(stockNo => {
                    fetchStockInfo(stockNo)
                })
            }
        }, 3000);
    }

    function stopSync () {
        if (interval.current) {
            clearInterval(interval.current)
            interval.current = null
        }
    }

    function handleAddSearch2List () {
        if (!stockNoInputRef.current) return false
        const sotckNo = stockNoInputRef.current.value
        if (sotckNo === "") return false
        setSearchList(prevState => {
            const newState = [ ...prevState ]
            newState.push(sotckNo)
            return newState
        })
    }

    function handleEnterStockNo (e) {
        console.log(e.key)
        if (e.key === "Enter") handleAddSearch2List()
    }

    return (
        <div className="scrollable stock-page">
            <div className="search-area">
                <input ref={stockNoInputRef} type="number" placeholder="ex: 2330" onKeyDown={handleEnterStockNo}></input>
                <MdSearch onClick={handleAddSearch2List}></MdSearch>
            </div>
            <div className="results">
                { realTimeData && staticData &&
                    Object.keys(realTimeData).map(code => {
                        const stockInfo = realTimeData[code]
                        if (!stockInfo) return <React.Fragment key={code}></React.Fragment>
                        const realTimeValue = stockInfo.map(data => str2Num(data.currentTransactionPrice))
                        const exchangeData = staticData[code]
                        if (!exchangeData) return <React.Fragment key={code}></React.Fragment>
                        if (stockInfo.length === 0 || exchangeData.length === 0 ) return <React.Fragment key={code}></React.Fragment>
                        const change = str2Num(stockInfo[stockInfo.length-1].currentTransactionPrice) - str2Num(stockInfo[stockInfo.length-1].yesterdayClosingPrice)
                        const ratio = (change / str2Num(stockInfo[stockInfo.length-1].yesterdayClosingPrice))*100
                        console.log(code, realTimeData, staticData)
                        return <div key={code} className="item">
                            <div className="short-info">
                                <span className="stockNo">{stockInfo[stockInfo.length-1].code}</span>
                                <span className="name">{stockInfo[stockInfo.length-1].name}</span>
                                <span className="graph">
                                    <Sparklines data={realTimeValue} limit={20} width={400} height={100}>
                                        <SparklinesLine style={{ stroke: "#FF0303", fill: "#f1556f" }} />
                                        <SparklinesSpots />
                                    </Sparklines>
                                </span>
                                <div className="price" style={{ color: change>0?"var(--danger)":"var(--success)" }}>
                                    <span className="value">
                                        {str2Num(stockInfo[stockInfo.length-1].currentTransactionPrice).toFixed(2)}
                                    </span>
                                    <span className="change">
                                        { change>0 && <MdArrowDropUp size={14}></MdArrowDropUp> }
                                        { change<0 && <MdArrowDropDown size={14}></MdArrowDropDown> }
                                        { change===0 && "-" }
                                        { change>0 && `${change.toFixed(2)} (+${ratio.toFixed(2)}%)` }
                                        { change<0 && `${change.toFixed(2)} (-${ratio.toFixed(2)}%)` }
                                    </span>
                                </div>
                            </div>
                            <div className="detail"></div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Stock