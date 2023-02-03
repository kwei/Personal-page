import "../styles/HomePage.scss"
import React, { useContext, useEffect, useRef, useState } from "react"
import Nav from "../component/Navigation/Nav.jsx"
import MainView from "../component/MainView/MainView.jsx"

const HomePage = () => {
    // const { setModalBody } = useContext(HomePageContext)

    return (
        <div className="page-container">
            <Nav></Nav>
            <MainView></MainView>
        </div>
    )
}

export default HomePage