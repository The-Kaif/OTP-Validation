import React, { useContext, useEffect, useRef, useState } from 'react'
import "./OtpLayout.css"
import { otpContext } from '../App'
// Type Define
type OtpLayoutType = {
    method: any;
    attempt: number
}

function OtpLayout(props: OtpLayoutType) {
    let value: any = useContext(otpContext)
    const [input, setInput] = useState<any>([])
    const [refs, setRefs] = useState<any>([])
    // UseState for enable/disable button
    const [disable, setDisable] = useState(true)
    const regexForValidation = /^[0-9\b]+$/
    // UseState for timer
    const [timer, setTimer] = useState(10);
    const [press, setPress] = useState<any>(["1"])
    // UseState for alert message popup
    const [message, setMessage] = useState("")
    const divRef: any = useRef()
    useEffect(() => {
        let tempOtp = JSON.stringify(value.otp);
        setInput(tempOtp.split(""))
        let temp: any = []
        let res: any = []
        let length = JSON.stringify(value.otp).length
        while (length !== 0) {
            temp.push(React.createRef())
            length--
            res.push("");
        }
        if (refs.length !== 0) {
            // divRef.current.addEventListener("shown.bs.modal", function () {
            refs[0].current.focus()
            // });
        }
        // divRef.current.addEventListener('shown.bs.modal', function () {
        //     refs[0].current.focus()
        // })
        setRefs(temp)
        setPress(res)

    }, [value.otp])
    useEffect(() => {
        if (timer !== 0) {
            setTimeout(() => {
                setTimer((val) => --val)
            }, 1000)
        } else {
            setTimer(0)
            setDisable(false)
        }
        // if (JSON.stringify(input) === JSON.stringify(press)) {
        //     setMessage("OTP sent successfully")
        //     refs[refs.length - 1].current.blur()
        // }
    }, [timer])
    console.log(refs)
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
        if (regexForValidation.test(refs[index].current.value) === true) {
            if (refs[index].current.value !== "") {
                setPress(press.splice(index, 1, refs[index].current.value))
                setPress([...press])
                MatchValues(index)
                refs[index].current.nextSibling.focus()
            }
        } else {
            refs[index].current.value = ""
        }


        // if (index === refs.length) {
        //     setMessage("OTP is incorrect")
        // }
    }
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: any) => {
        const pressedKey = e.key;

        if ((pressedKey === "Backspace" || pressedKey === "Delete") && refs[index].current.value === "") {
            // refs[index].current.value = ""
            setPress(press.splice(index, 1, ""))
            setPress([...press])

            refs[index - 1].current.focus()
        } else if (pressedKey === "ArrowRight") {
            refs[index + 1].current.focus()
        } else if (pressedKey === "ArrowLeft") {
            refs[index - 1].current.focus()
        }
        MatchValues(index)
    }
    function MatchValues(index: number) {
        console.log("CHECK", input, press, index)
        console.log("JSON", JSON.stringify(press));
        console.log("CO", JSON.stringify(press).includes(''));
        // for (let i = 0; i < press.length; i++) {
        //     if (press[i] !== "") {
        //         alert("YUP")
        //     }

        // }
        if (JSON.stringify(input) === JSON.stringify(press)) {
            setMessage("OTP sent successfully")
            refs[refs.length - 1].current.blur()
        } else if ((JSON.stringify(input) !== JSON.stringify(press)) && JSON.stringify(press).includes("") === true) {
            setMessage("OTP is incorrect")
        } else {
            setMessage("")
        }
    }
    // Resend OTP handler
    const resendHandler = () => {
        if (props.attempt !== 0) {
            setTimer(10)
            setDisable(true)
            props.method()
        } else if (props.attempt === 0) {
            alert("Your resend attempts limit over !!")
            setDisable(true)
        }

    }
    // <input value={input1} onChange={input1Handler} maxLength={1} id="Input1" type={"text"} className={message === "OTP is incorrect" ? "wrongVal" : message === "" ? "" : "rightVal"} />
    return (
        <div ref={divRef} className="modal fade" id="myModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Verify Email Addres({value.otp})</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Enter Your Code Here :</p>
                        {refs.map((val: any, index: any) => <input type={"text"} id="input" onKeyUp={(e) => handleOnKeyDown(e, index)} maxLength={1} onChange={(e) => inputHandler(e, index)} ref={refs[index]} className={message === "OTP is incorrect" ? "wrongVal" : message === "" ? "" : "rightVal"} />)}
                        {/* Alert Message Content */}
                        {message !== "" ? <p className={message === "OTP is incorrect" ? "wrong" : "right"}>{message}</p> : null}
                    </div>
                    <div className="modal-footer">
                        <div className='resendBtn'>
                            {/* resend Button */}
                            <button onClick={resendHandler} disabled={disable} type="button" className="btn btn-primary">Resend OTP</button>
                        </div>
                        ({props.attempt} Attempts left)
                        {/* Timer */}
                        <p className='timer'>{timer >= 0 && timer <= 9 ? `00:0${timer}` : `00:${timer}`}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpLayout