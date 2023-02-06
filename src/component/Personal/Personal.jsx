import "./Personal.scss"
import React from "react"
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa"

const Personal = () => {
    return (
        <div className="personal-page">
            <div className="card">
                <div className="profile">
                    <img alt="" src="profile-photo.jpg"></img>
                    <div className="name">
                        <div className="last-name">YEH</div>
                        <div className="first-name">KAI-WEI</div>
                    </div>
                    <div className="divider"></div>
                    <div className="position">WEB FRONT-END ENGINEER</div>
                    <div className="social-link">
                        <a href="https://twitter.com/kaiwei64326869"><FaTwitter></FaTwitter></a>
                        <a href="https://www.facebook.com/profile.php?id=100005738350593"><FaFacebookF></FaFacebookF></a>
                        <a href="https://www.instagram.com/ykw__1031/"><FaInstagram></FaInstagram></a>
                    </div>
                </div>
                <div className="self-intro">
                    <div className="welcom">
                        <h1 className="primary">Hello</h1>
                        <div className="secondary">This is KW Yeh ( 葉鎧瑋 )</div>
                    </div>
                    <div className="nav-link">
                        <button className="primary">RESUME</button>
                        <button className="secondary">PROJECTS</button>
                    </div>
                    <div className="intro-text">
                        Hi, I'm KW. I have much patient and interest of programming.
                        In my leasure time, I like to develope some utils to enhance my working efficency, such as
                        a script for auto-clock on, a converter for transforming PPT to PDF, etc.<br/>
                        Sometimes, I will also develope some really interest projects, 
                        like a discord robot for search lyrics or a self-used markdown editor.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personal