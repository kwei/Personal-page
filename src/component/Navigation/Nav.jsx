import "./Nav.scss"
import React, { useContext, useRef, useState } from "react"
import { MdOutlineMenu, MdClose, MdHome, MdContacts, MdDashboard, MdAccountCircle } from "react-icons/md"
import { NAVIGATION } from "../../utils"
import { MainPageContext } from "../../context/MainPageContext"

const Nav = () => {
    const { switchView } = useContext(MainPageContext)
    const [ isExtend, setIsExtend ] = useState(false)
    const navRef = useRef(null)
    const slideBarRef = useRef(null)

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
                <div className="home" onClick={(e) => handleNavigating(e, NAVIGATION.HOME)}>
                    <MdHome></MdHome>
                    <span>Home</span>
                </div>
                <div className="personal" onClick={(e) => handleNavigating(e, NAVIGATION.PERSONAL)}>
                    <MdAccountCircle></MdAccountCircle>
                    <span>Personal</span>
                </div>
                <div className="project" onClick={(e) => handleNavigating(e, NAVIGATION.PROJECT)}>
                    <MdDashboard></MdDashboard>
                    <span>Project</span>
                </div>
                <div className="contact" onClick={(e) => handleNavigating(e, NAVIGATION.CONTACT)}>
                    <MdContacts></MdContacts>
                    <span>Contact</span>
                </div>
            </div>
        </div>
    )
}

export default Nav