import "./Contact.scss"
import React from "react"

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-card">
                <div className="contact-info">
                    <div className="name">Kai-Wei Yeh ( 葉鎧瑋 )</div>
                    <div className="email">個人用信箱: kaiweiyeh2018@gmail.com</div>
                    <div className="email">工作用信箱: kw_yeh@cyberlink.com</div>
                    <div className="work-address">公司地址: 231 新北市新店區民權路 100 號 15 樓</div>
                </div>
                <div className="email-form">
                    <div className="title"><h1>Keep in TOUCH</h1></div>
                    <div className="form">
                        <div className="name">
                            <input type="text" name="name" placeholder="輸入您的名字"></input>
                        </div>
                        <div className="email">
                            <input type="email" name="email" placeholder="輸入您的信箱"></input>
                        </div>
                        <div className="text">
                            <textarea placeholder="想對我說的話..."></textarea>
                        </div>
                    </div>
                    <div className="btn-submit"><button>SEND</button></div>
                </div>
            </div>
        </div>
    )
}

export default Contact