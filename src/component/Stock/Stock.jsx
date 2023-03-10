import "./Stock.scss"
import React, { useEffect, useRef } from "react"
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import { MdArrowDropDown, MdArrowDropUp, MdSearch } from "react-icons/md"
import { getStockExchangeData, getStockInfo, isStockUpdateInterval, str2Arr, str2Num, yyyymmdd } from "../../utils"
import { useState } from "react"

const Stock = () => {
    const stockNoInputRef = useRef(null)
    const [ realTimeData, setRealTimeData ] = useState({})
    const [ staticData, setStaticData ] = useState({})
    const [ searchList, setSearchList ] = useState(["2330", "2454", "2317", "2603", "0050", "0056", "00878"])
    const [ showDetail, setShowDetail ] = useState({ ["2330"]: false, ["2454"]: false, ["2317"]: false, ["2603"]: false, ["0050"]: false, ["0056"]: false, ["00878"]: false })
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
        stockNoInputRef.current.value = ""
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

    function handleshowDetail (code) {
        setShowDetail(prevState => {
            const newState = { ...prevState }
            newState[code] = !newState[code]
            return newState
        })
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
                        let realTimeValue = stockInfo.map(data => {
                            const num = str2Num(data.currentTransactionPrice)
                            if (num !== 0) return num
                        })
                        if (realTimeValue.length === 0) realTimeValue = new Array(20).fill(0)
                        console.log(code, "realTimeValue", realTimeValue)
                        const exchangeData = staticData[code]
                        if (!exchangeData) return <React.Fragment key={code}></React.Fragment>
                        if (stockInfo.length === 0 || exchangeData.length === 0 ) return <React.Fragment key={code}></React.Fragment>
                        const change = str2Num(stockInfo[stockInfo.length-1].currentTransactionPrice) - str2Num(stockInfo[stockInfo.length-1].yesterdayClosingPrice)
                        const ratio = (Math.abs(change) / str2Num(stockInfo[stockInfo.length-1].yesterdayClosingPrice))*100
                        const currentPrice = str2Num(stockInfo[stockInfo.length-1].currentTransactionPrice).toFixed(2)
                        const bestBidPrices = str2Arr(stockInfo[stockInfo.length-1].bestBidPrices, "_")
                        const bestBibVolumes = str2Arr(stockInfo[stockInfo.length-1].bestBibVolumes, "_")
                        const totalBibVolume = bestBibVolumes.reduce((partialSum, a) => partialSum + a, 0)
                        const bestAskPrices = str2Arr(stockInfo[stockInfo.length-1].bestAskPrices, "_")
                        const bestAskVolumes = str2Arr(stockInfo[stockInfo.length-1].bestAskVolumes, "_")
                        const totalAskVolume = bestAskVolumes.reduce((partialSum, a) => partialSum + a, 0)
                        const bibRatio = (( totalBibVolume / (totalBibVolume+totalAskVolume) ) * 100).toFixed(1)
                        const askRatio = (( totalAskVolume / (totalBibVolume+totalAskVolume) ) * 100).toFixed(1)
                        console.log(code, "Bid", bestBidPrices, bestBibVolumes)
                        console.log(code, "Ask", bestAskPrices, bestAskVolumes)
                        return <div key={code} className="item">
                            <div className="short-info" onClick={() => handleshowDetail(code)}>
                                <span className="stockNo">{stockInfo[stockInfo.length-1].code}</span>
                                <span className="name">{stockInfo[stockInfo.length-1].name}</span>
                                <span className="graph">
                                    <Sparklines data={realTimeValue} limit={20} width={400} height={100}>
                                        <SparklinesLine style={{ stroke: "#FF0303", fill: "#f1556f" }} />
                                        <SparklinesSpots />
                                    </Sparklines>
                                </span>
                                <div className="price" style={{ color: (currentPrice === "0.00" || change===0)? "var(--text)":change>0?"var(--danger)":"var(--success)" }}>
                                    <span className="value">
                                        {currentPrice !== "0.00"? currentPrice:"暫無資訊"}
                                    </span>
                                    <span className="change">
                                        { currentPrice === "0.00" && "-"}
                                        { currentPrice !== "0.00" && change>0 && <MdArrowDropUp size={14}></MdArrowDropUp> }
                                        { currentPrice !== "0.00" && change<0 && <MdArrowDropDown size={14}></MdArrowDropDown> }
                                        { currentPrice !== "0.00" && change===0 && "-" }
                                        { currentPrice !== "0.00" && change>0 && `${change.toFixed(2)} (+${ratio.toFixed(2)}%)` }
                                        { currentPrice !== "0.00" && change<0 && `${change.toFixed(2)} (-${ratio.toFixed(2)}%)` }
                                    </span>
                                </div>
                            </div>
                            <div className="detail" style={{ 
                                height: showDetail[code]? "290px" : "0px",
                                marginTop: showDetail[code]? "1rem" : "0px",
                            }}>
                                <div className="info">
                                    <div className="item">
                                        <span>開盤</span>
                                        <span>{str2Num(stockInfo[0].openingPrice).toFixed(2)}</span>
                                    </div>
                                    <div className="item">
                                        <span>最高</span>
                                        <span>{str2Num(stockInfo[0].highestPrice).toFixed(2)}</span>
                                    </div>
                                    <div className="item">
                                        <span>最低</span>
                                        <span>{str2Num(stockInfo[0].lowestPrice).toFixed(2)}</span>
                                    </div>
                                    <div className="item">
                                        <span>跌停</span>
                                        <span>{str2Num(stockInfo[0].limitUpPrice).toFixed(2)}</span>
                                    </div>
                                    <div className="item">
                                        <span>漲停</span>
                                        <span>{str2Num(stockInfo[0].limitDownPrice).toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="best5">
                                    <div className="title"><span>五檔報價</span></div>
                                    <div className="ratio-bar">
                                        <div className="text" style={{ color: "var(--danger)" }}>
                                            <span>委買</span>
                                        </div>
                                        <div className="ratio" style={{ 
                                            color: "var(--text)", 
                                            backgroundColor: "var(--danger)" ,
                                            width: `calc((100% - 4rem) * ${bibRatio})`
                                            }}
                                        >
                                            <span>{bibRatio}%</span>
                                        </div>
                                        <div className="ratio" style={{ 
                                            color: "var(--text)", 
                                            backgroundColor: "var(--success)",
                                            width: `calc((100% - 4rem) * ${askRatio})`
                                            }}
                                        >
                                            <span>{askRatio}%</span>
                                        </div>
                                        <div className="text" style={{ color: "var(--success)" }}>
                                            <span>委賣</span>
                                        </div>
                                    </div>
                                    <div className="table">
                                        <div className="number-list">
                                            { bestBibVolumes.length > 0 && 
                                                bestBibVolumes.map(value => {
                                                    return <div key={`${code}-bib-volume-${value.toFixed(0)}`} className="number">
                                                        {value.toFixed(0)}
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="bar-list">
                                            { bestBibVolumes.length > 0 && 
                                                bestBibVolumes.map(value => {
                                                    return <div key={`${code}-bib-bar-${value.toFixed(0)}`} className="bar"
                                                            style={{ justifyContent: "flex-end" }}
                                                        >
                                                        <span style={{ 
                                                            width: `${(value / totalBibVolume)*100}%`,
                                                            backgroundColor: "var(--danger)"
                                                        }}></span>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="price-list">
                                            { bestBidPrices.length > 0 && 
                                                bestBidPrices.map(value => {
                                                    return <div key={`${code}-bib-price-${value.toFixed(2)}`} className="number" style={{ textAlign: "end" }}>
                                                        {value.toFixed(2)}
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="price-list">
                                            { bestAskPrices.length > 0 && 
                                                bestAskPrices.map(value => {
                                                    return <div key={`${code}-ask-price-${value.toFixed(2)}`} className="number">
                                                        {value.toFixed(2)}
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="bar-list">
                                            { bestAskVolumes.length > 0 && 
                                                bestAskVolumes.map(value => {
                                                    return <div key={`${code}-ask-bar-${value.toFixed(0)}`} className="bar">
                                                        <span style={{ 
                                                            width: `${(value / totalAskVolume)*100}%`,
                                                            backgroundColor: "var(--success)"
                                                        }}></span>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="number-list">
                                            { bestAskVolumes.length > 0 && 
                                                bestAskVolumes.map(value => {
                                                    return <div key={`ask-volume-${value.toFixed(0)}`} className="number" style={{ justifyContent: "flex-end" }}>
                                                        {value.toFixed(0)}
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Stock