import "./Game.scss"
import React, { useEffect, useRef, useState } from "react"
import { MdArrowForward, MdBackspace, MdKeyboardReturn } from "react-icons/md"

const NUMBER_BASIS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function generateAnswer () {
    let currentIndex = NUMBER_BASIS.length
    const array = [ ...NUMBER_BASIS ]
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--
      [ array[currentIndex], array[randomIndex] ] = [ array[randomIndex], array[currentIndex] ]
    }
    console.log("generateAnswer: ", array.slice(0, 4))
    return array.slice(0, 4)
}

const Game = () => {
    const inputRef = useRef(null)
    const [ record, setRecord ] = useState([])
    const [ isWin, setIsWin ] = useState(false)
    const [ isAlert, setIsAlert ] = useState(false)
    const number = useRef([])

    useEffect(() => {
        number.current = generateAnswer()
    }, [])

    function handleNewGame () {
        setRecord([])
        number.current = generateAnswer()
        if (inputRef.current) inputRef.current.disabled = false
        setIsWin(false)
        setIsAlert(false)
    }

    function handleValidation () {
        if (!inputRef.current || inputRef.current.value.length > 4) {
            inputRef.current.value = inputRef.current.value.slice(0, 4)
            return false
        }
        const result = inputRef.current.value.match(/([0-9]+)/)
        if (!result || result[1].length !== 4) {
            if (result) inputRef.current.value = result[1]
            return false
        }
        if (new Set(inputRef.current.value.split("")).size !== 4) {
            return false
        }
        return true
    }

    function handleEnterValue (e) {
        if (e.key === "Enter" && handleValidation()) enterValue()
    }

    function enterValue () {
        if (isWin) return false
        let A = 0
        let B = 0
        const input = inputRef.current.value
        input.split("").map((value, index) => {
            if (Number(value) === number.current[index]) A++
            else if (number.current.includes(Number(value))) B++
        })
        setRecord(prevState => {
            const newState = [ ...prevState ]
            newState.push({input: input.split("").join(" "), output: `${A} A ${B} B`})
            return newState
        })
        inputRef.current.value = ""
        if (A === 4) {
            inputRef.current.disabled = true
            setIsWin(true)
            setIsAlert(true)
        }
    }

    function handleAppendNumber (number) {
        if (!inputRef.current || inputRef.current.value.length === 4) return false
        else if (isWin) return false
        inputRef.current.value += number
    }

    function handleBackspace () {
        if (!inputRef.current || inputRef.current.value.length === 0) return false
        else if (isWin) return false
        inputRef.current.value = inputRef.current.value.slice(0, inputRef.current.value.length-1)
    }

    function handleClear () {
        if (!inputRef.current || inputRef.current.value.length === 0) return false
        else if (isWin) return false
        inputRef.current.value = ""
    }

    function handleCloseAlert () {
        setIsAlert(false)
    }

    return (
        <div className="game-page">
            <div className="rule">
                <h2>RULES</h2>
                <span></span>
            </div>
            <div className="body">
                <div className="log">
                    <div className="title">
                        <span>記錄</span>
                        <span onClick={handleNewGame}>開新一局</span>
                    </div>
                    <div className="item-list">
                        { 
                            record.map((item, index) => {
                                return (
                                    <div key={`${item.input}-${index}`} className="item">
                                        <span>{item.input}</span>
                                        <MdArrowForward></MdArrowForward>
                                        <span>{item.output}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="keyboard">
                    <div className="title">輸入</div>
                    <div className="input">
                        <input ref={inputRef} onChange={handleValidation} onKeyUp={handleEnterValue} type="number" name="input" autoComplete="off" placeholder="輸入4位數"></input>
                    </div>
                    <div className="board">
                        <div className="clear" onClick={handleClear}>清除</div>
                        <div className="backspace" onClick={handleBackspace}><MdBackspace></MdBackspace></div>
                        <div className="number" onClick={() => handleAppendNumber(7)}>7</div>
                        <div className="number" onClick={() => handleAppendNumber(8)}>8</div>
                        <div className="number" onClick={() => handleAppendNumber(9)}>9</div>
                        <div className="number" onClick={() => handleAppendNumber(4)}>4</div>
                        <div className="number" onClick={() => handleAppendNumber(5)}>5</div>
                        <div className="number" onClick={() => handleAppendNumber(6)}>6</div>
                        <div className="number" onClick={() => handleAppendNumber(1)}>1</div>
                        <div className="number" onClick={() => handleAppendNumber(2)}>2</div>
                        <div className="number" onClick={() => handleAppendNumber(3)}>3</div>
                        <div className="number" onClick={() => handleAppendNumber(0)}>0</div>
                        <div className="enter" onClick={enterValue}><MdKeyboardReturn></MdKeyboardReturn></div>
                    </div>
                </div>
            </div>
            <div className="alert" style={{ display: (isAlert && isWin)? "flex":"none"}} onClick={handleCloseAlert}>
                <div className="card">WIN!</div>
            </div>
        </div>
    )
}

export default Game