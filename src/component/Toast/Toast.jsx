import "./Toast.scss"
import React, { forwardRef, useImperativeHandle, useState } from "react"
import { MdClose } from "react-icons/md"

const Toast = forwardRef((props, ref) => {
    const { message, Icon } = props
    const [ isShow, setIsShow ] = useState(false)
    const [ msg, setMsg ] = useState(message)

    let timeout = null

    useImperativeHandle(ref, () => ({
        show: (time, msg) => {
            setMsg(msg)
            setIsShow(true)
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                setIsShow(false)
                if (timeout) clearTimeout(timeout)
            }, time)
        }
    }));

    function handleCloseToast () {
        setIsShow(false)
        if (timeout) clearTimeout(timeout)
    }

    return (
        <div className="toast" style={{
            display: isShow? "flex":"none"
        }}>
            <div className="icon">{ Icon && <Icon></Icon>}</div>
            <div className="msg">{msg}</div>
            <div className="btn-close" onClick={handleCloseToast}><MdClose></MdClose></div>
        </div>
    )
})
Toast.displayName = "Toast"

export default Toast