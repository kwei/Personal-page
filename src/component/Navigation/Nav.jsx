import "./Nav.scss"
import React, { useContext, useRef, useState, useEffect } from "react"
import { MdOutlineMenu, MdClose, MdHome, MdContacts, MdDashboard, MdAccountCircle, MdLeaderboard } from "react-icons/md"
import { IoGameController } from "react-icons/io5"
import { NAVIGATION } from "../../utils"
import { MainPageContext } from "../../context/MainPageContext"

const Nav = () => {
    const { currentView, switchView } = useContext(MainPageContext)
    const [ isExtend, setIsExtend ] = useState(false)
    const navRef = useRef(null)
    const slideBarRef = useRef(null)
    const homeNavRef = useRef(null)
    const personalNavRef = useRef(null)
    const projectNavRef = useRef(null)
    const contactNavRef = useRef(null)
    const gameNavRef = useRef(null)
    const trackNavRef = useRef(null)

    function handleExtendNav () {
        setIsExtend(prevState => {
            if (!prevState && navRef.current) navRef.current.style.width = "128px"
            else if (navRef.current) navRef.current.style.width = "40px"
            return !prevState
        })
    }

    function handleNavigating (e, navType) {
        const element = e.currentTarget
        if (!element) return false
        if (!slideBarRef.current) return false
        slideBarRef.current.style.top = element.offsetTop + "px"
        switchView(navType)
    }

    useEffect(() => {
        if (!slideBarRef.current) return false
        if (currentView === NAVIGATION.HOME) slideBarRef.current.style.top = homeNavRef.current.offsetTop + "px"
        else if (currentView === NAVIGATION.PERSONAL) slideBarRef.current.style.top = personalNavRef.current.offsetTop + "px"
        else if (currentView === NAVIGATION.PROJECT) slideBarRef.current.style.top = projectNavRef.current.offsetTop + "px"
        else if (currentView === NAVIGATION.CONTACT) slideBarRef.current.style.top = contactNavRef.current.offsetTop + "px"
        else if (currentView === NAVIGATION.GAME) slideBarRef.current.style.top = gameNavRef.current.offsetTop + "px"
        else if (currentView === NAVIGATION.TRACK) slideBarRef.current.style.top = trackNavRef.current.offsetTop + "px"
    }, [currentView])

    return (
        <div ref={navRef} className="nav-container">
            <div className="navigator" onClick={handleExtendNav}>
                <MdOutlineMenu 
                    style={{ 
                        transform: isExtend? "rotate(180deg)":"",
                        opacity: isExtend? "0":"1"
                    }}
                ></MdOutlineMenu>
                <MdClose
                    style={{ 
                        transform: isExtend? "rotate(180deg)":"",
                        opacity: isExtend? "1":"0"
                    }}
                >
                </MdClose>
            </div>
            <div className="body">
                <span ref={slideBarRef} className="slide-bar"></span>
                <div ref={homeNavRef} className="home" onClick={(e) => handleNavigating(e, NAVIGATION.HOME)}>
                    <MdHome></MdHome>
                    <span>Home</span>
                </div>
                <div ref={personalNavRef} className="personal" onClick={(e) => handleNavigating(e, NAVIGATION.PERSONAL)}>
                    <MdAccountCircle></MdAccountCircle>
                    <span>Personal</span>
                </div>
                <div ref={projectNavRef} className="project" onClick={(e) => handleNavigating(e, NAVIGATION.PROJECT)}>
                    <MdDashboard></MdDashboard>
                    <span>Project</span>
                </div>
                <div ref={contactNavRef} className="contact" onClick={(e) => handleNavigating(e, NAVIGATION.CONTACT)}>
                    <MdContacts></MdContacts>
                    <span>Contact</span>
                </div>
                <div ref={gameNavRef} className="game" onClick={(e) => handleNavigating(e, NAVIGATION.GAME)}>
                    <IoGameController></IoGameController>
                    <span>Games</span>
                </div>
                <div ref={trackNavRef} className="track" onClick={(e) => handleNavigating(e, NAVIGATION.TRACK)}>
                    <MdLeaderboard></MdLeaderboard>
                    <span>Track</span>
                </div>
            </div>
        </div>
    )
}

export default Nav