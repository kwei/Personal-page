import "./Project.scss"
import React, { useState } from "react"
import IMG_MD_WEB from "../../images/md-web.png"
import IMG_DC_BOT from "../../images/discord-bot.png"

const Project = () => {

    const [showMore, setShowMore] = useState({})

    const PROJECTS = Object.freeze({
        MD_WEB: 1,
        DC_BOT: 2
    })

    function handleReadMore (type) {
        setShowMore(prevState => {
            const newState = { ...prevState }
            newState[type] = !newState[type]
            return newState
        })
    }

    return (
        <div className="project-page">
            <div className="project" style={{ height: showMore[PROJECTS.MD_WEB]? "380px" : "300px" }}>
                <div className="thumbnail">
                    <img alt="" src={IMG_MD_WEB}></img>
                </div>
                <div className="info">
                    <h3>Markdown Editor ( WEB )</h3></div>
                <div className="keywords">
                    <span>markdown</span>
                    <span>editor</span>
                    <span>web</span>
                </div>
                <div className="story">
                    <span style={{ WebkitLineClamp: showMore[PROJECTS.MD_WEB]? "99" : "3" }}>
                        This project was co-worked with MJ.
                        We write a compiler for markdown syntax, and we also write some other cool functionalities.
                        A super cool chatGPT was included to be the default AI chat room.
                        Moreover, we write todo system for noting to be done.
                    </span>
                    <div className="read-more"><div onClick={() => handleReadMore(PROJECTS.MD_WEB)}>{showMore[PROJECTS.MD_WEB]? "LESS":"MORE"}</div></div>
                </div>
            </div>

            <div className="project" style={{ height: showMore[PROJECTS.DC_BOT]? "380px" : "300px" }}>
                <div className="thumbnail">
                    <img alt="" src={IMG_DC_BOT}></img>
                </div>
                <div className="info"><h3>Discord Lyric Searching Bot</h3></div>
                <div className="keywords">
                    <span>discord</span>
                    <span>bot</span>
                    <span>crawler</span>
                </div>
                <div className="story">
                    <span style={{ WebkitLineClamp: showMore[PROJECTS.DC_BOT]? "99" : "3" }}>
                        At that time, there are lots of music bots on the Discord platform.
                        However, there is just no lyric searching bots for chinese songs.
                        Therefore, I write this bot with crawler tech and Discord developer API.
                    </span>
                    <div className="read-more"><div onClick={() => handleReadMore(PROJECTS.DC_BOT)}>{showMore[PROJECTS.DC_BOT]? "LESS":"MORE"}</div></div>
                </div>
            </div>
        </div>
    )
}

export default Project