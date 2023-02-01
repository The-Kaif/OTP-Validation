import React, { useEffect, useRef, useState } from 'react'
import "./OtpLayout.css"
type OtpLayoutType = {
    otp: number
    method: any
}

function OtpLayout(props: OtpLayoutType) {

    const [value, setValue] = useState("")

    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [input4, setInput4] = useState("")
    const [input5, setInput5] = useState("")

    const [count, setCount] = useState(5)

    const [alert, setAlert] = useState("")

    const [disable, setDisable] = useState(true)

    const [timer, setTimer] = useState(10);
    useEffect(() => {
        if (input1 === "") {
            document.getElementById("Input1")?.focus()
        }
        let temp = JSON.stringify(props.otp)
        setValue(temp)
        let time = setTimeout(function () {
            setTimer((val) => --val)
        }, 1000)
        if (timer === 0) {
            clearInterval(time)
            setDisable(false)
        }

    }, [timer, disable, value])
    const input1Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 1) {
            setInput1(e.target.value)
            console.log(e.target.value)
        } if (e.target.value.length >= 1) {
            document.getElementById("Input2")?.focus()
        }
    }
    const input2Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 1) {
            setInput2(e.target.value)
        } if (e.target.value.length >= 1) {
            document.getElementById("Input3")?.focus()
        } else if (e.target.value.length === 0) {
            document.getElementById("Input1")?.focus()
        }
    }
    const input3Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 1) {
            setInput3(e.target.value)
        } if (e.target.value.length >= 1) {
            document.getElementById("Input4")?.focus()
        } else if (e.target.value.length === 0) {
            document.getElementById("Input2")?.focus()
        }
    }
    const input4Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 1) {
            setInput4(e.target.value)
        } if (e.target.value.length >= 1) {
            document.getElementById("Input5")?.focus()
        } else if (e.target.value.length === 0) {
            document.getElementById("Input3")?.focus()
        }
    }
    const input5Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 1) {
            setInput5(e.target.value)
            let tempVal = input1 + input2 + input3 + input4 + e.target.value
            if (tempVal === value) {
                setAlert("OTP sent successfully")
            } else {
                setCount((val) => --val)
                setAlert("OTP is incorrect")
            }
        } else if (e.target.value.length === 0) {
            document.getElementById("Input4")?.focus()
        }

    }
    const resendHandler = () => {
        props.method()
        setValue(JSON.stringify(props.otp))
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
        setInput5("");
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Validate OTP
            </button>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Verify Email Addres ({value})</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Enter Your Code Here : </p>
                            <div className='inputDiv'>
                                <input onChange={input1Handler} autoFocus id="Input1" type={"number"} />
                                <input onChange={input2Handler} id="Input2" type={"number"} />
                                <input onChange={input3Handler} id="Input3" type={"number"} />
                                <input onChange={input4Handler} id="Input4" type={"number"} />
                                <input onChange={input5Handler} id="Input5" type={"number"} />
                            </div>
                            {alert !== "" ? <p className={alert === "OTP is incorrect" ? "wrong" : "right"}>{alert}</p> : null}
                        </div>
                        <div className="modal-footer">
                            <div className='resendBtn'>
                                <button onClick={resendHandler} disabled={disable} type="button" className="btn btn-primary">Resend OTP</button>
                            </div>
                            ({count} Attempts left)
                            <p className='timer'>{timer >= 0 && timer <= 9 ? `00:0${timer}` : `00:${timer}`}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OtpLayout