import "../styles/HomePage.scss"
import React, { useContext, useEffect, useRef, useState } from "react"
import Me from "../component/Me/Me.jsx"

const HomePage = () => {
    // const { setModalBody } = useContext(HomePageContext)

    return (
        <div className="page-container">
            <div className="banner"></div>
            <div className="me"> <Me /> </div>
            <div className="about"></div>
        </div>
    )
}

export default HomePage