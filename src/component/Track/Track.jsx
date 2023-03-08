import "./Track.scss"
import React from "react"
import { useState } from "react"
import { useRef } from "react"
import { getTrack, setTrack, yyyymmdd } from "../../utils"

function checkNumber (str) {
    if (str === "") return false
    try {
        let num = Number(str)
        return true
    } catch (error) {
        return false
    }
}

const Track = () => {
    const dollarInputRef = useRef(null)
    const descriptionInputRef = useRef(null)
    const behaviorSelectRef = useRef(null)
    const typeSelectRef = useRef(null)
    const nameInputRef = useRef(null)
    const [ trackType, setTrackType ] = useState("支出")

    const behaviorSearchRef = useRef(null)
    const nameSearchRef = useRef(null)
    const rangeFromSearchRef = useRef(null)
    const rangeEndSearchRef = useRef(null)
    const [ searchResults, setSearchResults ] = useState([])

    function handleSetTrack () {
        if (!dollarInputRef.current || !descriptionInputRef.current || !behaviorSelectRef.current || !typeSelectRef.current || !nameInputRef.current) return false
        const dollars = dollarInputRef.current.value
        const description = descriptionInputRef.current.value
        const behavior = behaviorSelectRef.current.value
        const type = typeSelectRef.current.value
        const name = nameInputRef.current.value
        console.log(name, behavior, type, dollars, description)
        if (!checkNumber(dollars)) return false
        dollarInputRef.current.value = ""
        descriptionInputRef.current.value = ""
        nameInputRef.current.value = ""
        setTrack({
            "日期": yyyymmdd(new Date(), "/"),
            "名字": name,
            "行為": behavior,
            "種類": type, 
            "金額": dollars,
            "描述": description
        }).then(res => {
            console.log(res)
        })
    }

    function handleSelect (e) {
        setTrackType(e.target.value)
    }

    function handleGetTrack () {
        let behavior = "支出"
        let name = ""
        let rangeFrom = yyyymmdd(new Date(), "/")
        let rangeEnd = yyyymmdd(new Date(), "/")
        if (behaviorSearchRef.current.value && behaviorSearchRef.current.value !== "") behavior = behaviorSearchRef.current.value
        if (nameSearchRef.current.value && nameSearchRef.current.value !== "") name = nameSearchRef.current.value
        if (rangeFromSearchRef.current.value && rangeFromSearchRef.current.value !== "") rangeFrom = rangeFromSearchRef.current.value
        if (rangeEndSearchRef.current.value && rangeEndSearchRef.current.value !== "") rangeEnd = rangeEndSearchRef.current.value
        rangeFrom = rangeFrom.split("-").join("/")
        rangeEnd = rangeEnd.split("-").join("/")
        console.log(behavior, name, rangeFrom, rangeEnd)
        nameSearchRef.current.value = ""
        getTrack().then(async res => {
            setSearchResults(await res.data)
        })
    }

    function handleGetTrackByYesterday () {

    }
    function handleGetTrackByToday () {
        
    }
    function handleGetTrackByThisMonth () {
        
    }
    function handleGetTrackByThisHelfYear () {
        
    }
    function handleGetTrackByThisYear () {
        
    }

    return (
        <div className="track-page">
            <span className="section-header">記帳</span>
            <div className="input-area">
                <label className="behavior">
                    <span>行為</span>
                    <select ref={behaviorSelectRef} onChange={handleSelect}>
                        <option>支出</option>
                        <option>收入</option>
                    </select>
                </label>
                <label className="type">
                    <span>種類</span>
                    <select ref={typeSelectRef}>
                        { trackType === "支出" &&
                            <>
                            <option>飲食</option>
                            <option>日常</option>
                            <option>交通</option>
                            <option>娛樂</option>
                            <option>醫療</option>
                            <option>其他</option>
                            </>
                        }
                        { trackType === "收入" &&
                            <>
                            <option>薪資</option>
                            <option>獎金</option>
                            <option>投資</option>
                            <option>回饋</option>
                            <option>零用錢</option>
                            <option>共同基金</option>
                            <option>其他</option>
                            </>
                        }
                    </select>
                </label>
                <label className="dollars">
                    <span>金額</span>
                    <input ref={dollarInputRef} name="dollars" type="number" placeholder=""></input>
                </label>
                <label className="name">
                    <span>名字</span>
                    <input ref={nameInputRef} name="name" type="text" placeholder=""></input>
                </label>
                <label className="description">
                    <span>描述</span>
                    <input ref={descriptionInputRef} name="description" type="text" placeholder=""></input>
                </label>
                <button className="btn" onClick={handleSetTrack}>送出</button>
            </div>
            <span className="section-header">查詢</span>
            <div className="search-area">
                <div className="filter">
                    <label className="behavior">
                        <span>行為</span>
                        <select ref={behaviorSearchRef}>
                            <option>支出</option>
                            <option>收入</option>
                        </select>
                    </label>
                    <label className="name">
                        <span>名字</span>
                        <input ref={nameSearchRef} name="name-search" type="text" placeholder=""></input>
                    </label>
                    <label className="range">
                        <span>區間</span>
                        <input ref={rangeFromSearchRef} name="from" type="date" placeholder="" defaultValue={yyyymmdd(new Date(), "-")}></input>
                        <p style={{ color: "var(--text)" }}>~</p>
                        <input ref={rangeEndSearchRef} name="end" type="date" placeholder="" defaultValue={yyyymmdd(new Date(), "-")}></input>
                    </label>
                    <div className="default-range">
                        <button className="btn" onClick={handleGetTrackByYesterday}>昨天</button>
                        <button className="btn" onClick={handleGetTrackByToday}>今天</button>
                        <button className="btn" onClick={handleGetTrackByThisMonth}>本月</button>
                        <button className="btn" onClick={handleGetTrackByThisHelfYear}>半年</button>
                        <button className="btn" onClick={handleGetTrackByThisYear}>今年</button>
                    </div>
                    <button className="btn" onClick={handleGetTrack}>查詢</button>
                </div>
                <div className="results">
                    <div className="header">
                        <span>日期</span>
                        <span>名字</span>
                        <span>行為</span>
                        <span>種類</span>
                        <span>金額</span>
                        <span>描述</span>
                    </div>
                    <div className="list">
                        { searchResults.length > 0 && 
                            searchResults.map((result, index) => {
                                return <div key={`${result["日期"]}-${index}`} className="item">
                                    <span title={result["日期"]}>{result["日期"]}</span>
                                    <span title={result["名字"]}>{result["名字"]}</span>
                                    <span title={result["行為"]}>{result["行為"]}</span>
                                    <span title={result["種類"]}>{result["種類"]}</span>
                                    <span title={result["金額"]}>{result["金額"]}</span>
                                    <span title={result["描述"]}>{result["描述"]}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track