import "./Nav.scss"
import React, { useContext, useEffect, useRef, useState } from "react"
import { MdOutlineMenu, MdClose, MdHome, MdContacts, MdDashboard, MdAccountCircle } from "react-icons/md"

const NAVIGATION = Object.freeze({
    HOME: 0,
    SELF_INTRO: 1,
    SIDE_PROJECT: 2,
    CONTACT: 3
})

const Nav = () => {
    // const { setModalBody } = useContext(HomePageContext)
    const [ isExtend, setIsExtend ] = useState(false)
    const navRef = useRef(null)
    const slideBarRef = useRef(null)

    function handleExtendNav () {
        setIsExtend(prevState => {
            if (!prevState && navRef.current) navRef.current.style.width = "168px"
            else if (navRef.current) navRef.current.style.width = "40px"
            return !prevState
        })
    }

    function handleNavigating (e, navType) {
        const element = e.currentTarget
        if (!element) return false
        if (!slideBarRef.current) return false
        slideBarRef.current.style.top = element.offsetTop + "px"
        switch (navType) {
            case NAVIGATION.HOME:
                break
            case NAVIGATION.SELF_INTRO:
                break
            case NAVIGATION.SIDE_PROJECT:
                break
            case NAVIGATION.CONTACT:
                break
        }
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
                <div className="self-intro" onClick={(e) => handleNavigating(e, NAVIGATION.SELF_INTRO)}>
                    <MdAccountCircle></MdAccountCircle>
                    <span>Self Introduction</span>
                </div>
                <div className="side-project" onClick={(e) => handleNavigating(e, NAVIGATION.SIDE_PROJECT)}>
                    <MdDashboard></MdDashboard>
                    <span>Side Project</span>
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