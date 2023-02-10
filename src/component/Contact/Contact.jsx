import "./Contact.scss"
import React, { useRef, useState, useContext } from "react"
import { validateEmail } from "../../utils"
import { NAVIGATION } from "../../utils"
import { MainPageContext } from "../../context/MainPageContext"
import { MdContentCopy, MdCheck } from "react-icons/md"
import Toast from "../Toast/Toast.jsx"

const MY_EMAIL = "a0979597291@gmail.com"

const Contact = () => {
    const { switchView } = useContext(MainPageContext)
    const nameRef = useRef(null)
    const mailRef = useRef(null)
    const msgRef = useRef(null)
    const sendRef = useRef(null)
    const toastRef = useRef(null)
    const [ errorForm, setErrorForm ] = useState({ name: false, email: false })

    function handleSendEmail () {
        if (!nameRef.current || !mailRef.current || !msgRef.current || !sendRef.current) return false
        let name = nameRef.current.value
        if (name === "") {
            nameRef.current.style.outline = "var(--danger)"
            setErrorForm(prevState => {
                const newState = { ...prevState }
                newState["name"] = true
                return newState
            })
            return false
        }
        let mail = mailRef.current.value
        if (!validateEmail(mail)) {
            nameRef.current.style.outline = "var(--danger)"
            setErrorForm(prevState => {
                const newState = { ...prevState }
                newState["mail"] = true
                return newState
            })
            return false
        }
        let msg = msgRef.current.value
        if (msg === "") msg = "as subject"
        const mailString = `mailto:${MY_EMAIL}?subject=${name}來訊&body=您好，這是${name}。%0D%0A%0D%0A訊息：${msg}%0D%0A%0D%0A請用信箱"${mail}"與我聯繫，謝謝!`
        sendRef.current.href = mailString
        sendRef.current.click()
        return false
    }

    function handleHideErrorMsg (scope) {
        setErrorForm(prevState => {
            const newState = { ...prevState }
            newState[scope] = false
            return newState
        })
        if (scope === "name") {
            if (nameRef.current) nameRef.current.style.outline = "none"
        } else if (scope === "email") {
            if (mailRef.current) mailRef.current.style.outline = "none"
        }
    }

    function handleNav2Personal () {
        switchView(NAVIGATION.PERSONAL)
    }

    function handleCopy (str) {
        navigator.clipboard.writeText(str)
        if (!toastRef.current) return false
        toastRef.current.show(3000, "已複製 \""+str+"\"")
    }

    return (
        <div className="contact-page">
            <div className="contact-card">
                <div className="contact-info">
                    <div className="name" onClick={handleNav2Personal}>Kai-Wei Yeh ( 葉鎧瑋 )</div>
                    <div className="email">
                        <span>個人用信箱</span>
                        <a href="mailto:kaiweiyeh2018@gmail.com">kaiweiyeh2018@gmail.com</a>
                        <MdContentCopy onClick={() => handleCopy("kaiweiyeh2018@gmail.com")}></MdContentCopy>
                    </div>
                    <div className="email">
                        <span>工作用信箱</span>
                        <a href="mailto:kw_yeh@cyberlink.com">kw_yeh@cyberlink.com</a>
                        <MdContentCopy onClick={() => handleCopy("kw_yeh@cyberlink.com")}></MdContentCopy>
                    </div>
                    <div className="work-address">
                        <span>公司的地址</span>
                        <a href="https://goo.gl/maps/7wGh56UtNpg7SYQL9">231 新北市新店區民權路 100 號 15 樓</a>
                        <MdContentCopy onClick={() => handleCopy("231 新北市新店區民權路 100 號 15 樓")}></MdContentCopy>
                    </div>
                </div>
                <div className="email-form">
                    <div className="title"><h1>Keep in TOUCH</h1></div>
                    <div className="form">
                        <div className="name">
                            <input onChange={() => handleHideErrorMsg("name")} ref={nameRef} type="text" name="name" placeholder="輸入您的名字" autoComplete="off"></input>
                            <div style={{ display: errorForm["name"]? "block":"none" }} className="errorMsg">請記得輸入您的名字</div>
                        </div>
                        <div className="email">
                            <input onChange={() => handleHideErrorMsg("name")} ref={mailRef} type="email" name="email" placeholder="輸入您的信箱" autoComplete="off"></input>
                            <div style={{ display: errorForm["email"]? "block":"none" }} className="errorMsg">信箱格式有誤或空缺</div>
                        </div>
                        <div className="text">
                            <textarea ref={msgRef} placeholder="想對我說的話..."></textarea>
                        </div>
                    </div>
                    <div className="btn-submit"><button onClick={handleSendEmail}>SEND</button></div>
                    <a ref={sendRef} href="" style={{ display: "none" }}></a>
                </div>
            </div>
            <Toast ref={toastRef} message="TEST" Icon={MdCheck}></Toast>
        </div>
    )
}

export default Contact