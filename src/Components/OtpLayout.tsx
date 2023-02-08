
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import "./OtpLayout.css";
import { otpContext } from "../App";
// Type Define
type OtpLayoutType = {
    method: any;
    digit: string;
};

function OtpLayout(props: OtpLayoutType) {
    // UseContext for OTP Value
    let value: any = useContext(otpContext);
    // Input UseState that Holds OTP Type Values 
    const [input, setInput] = useState<any>([]);
    // Ref Array For Getting Input Values
    const [refs, setRefs] = useState<any>([]);
    // UseState for enable/disable button
    const [disable, setDisable] = useState(true);
    const regexForValidation = /^[0-9\b]+$/;
    // UseState for timer
    const [timer, setTimer] = useState(60);
    // Press UseState User Press Input In Otp Modal
    const [press, setPress] = useState<any>([]);
    // UseState for alert message popup
    const [message, setMessage] = useState("");
    // Div ref for first focus 
    const divref: any = useRef();
    // Attempt State
    const [attempt, setAttempt] = useState(4)
    // Loader State
    const [loader, setLoader] = useState("")

    useEffect(() => {
        let tempOtp = JSON.stringify(value.otp);
        // Store Otp value in the for of array
        setInput(tempOtp.split(""));
        let tempRef: any = [];
        let tempPress: any = [];
        let length = JSON.stringify(value.otp).length;
        while (length !== 0) {
            // Push Refs in State
            tempRef.push(React.createRef());
            // Push Blank Space in Press Array
            tempPress.push(" ");
            length--;
        }
        setRefs(tempRef);
        setPress(tempPress);
    }, [value.otp])

    useEffect(() => {
        // otp generate method call
        props.method();
    }, [props.digit]);

    useEffect(() => {
        // Countdown 
        let time = setTimeout(() => {
            setTimer((val) => --val);
        }, 1000);
        if (timer === 0) {
            clearInterval(time);
            setDisable(false);
        }
        // Focus On First Input Box When Modal is Open
        divref.current.addEventListener("shown.bs.modal", function () {
            refs[0].current.focus();
        });
    }, [timer]);
    // Onchange Input Handler Function
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
        // Check Validation
        if (regexForValidation.test(refs[index].current.value) === true) {
            if (refs[index].current.value !== "") {
                // Set Value In Press Array
                // Splice Method Use For Replace Press Array Value On Same Index Where User Press On Input Box
                setPress(press.splice(index, 1, refs[index].current.value));
                setPress([...press]);
                // Call Match Value Function
                MatchValues();
                if (index !== refs.length - 1) {
                    refs[index].current.nextSibling.focus();
                }
            }
        } else {
            refs[index].current.value = "";
        }
    };
    // OnkeyUp Handler Function
    const handleOnKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: any
    ) => {
        const pressedKey = e.key;
        if (
            (pressedKey === "Backspace" || pressedKey === "Delete") &&
            refs[index].current.value === ""
        ) {
            // Replace that index value with space
            setPress(press.splice(index, 1, " "));
            setPress([...press]);
            refs[index - 1].current.focus();
        } else if (pressedKey === "ArrowRight") {
            // On Key Press ArrowRight Focus On Right Input Box
            refs[index + 1].current.focus();
        } else if (pressedKey === "ArrowLeft") {
            // On Key Press ArrowLeftFocus On Right Input Box
            refs[index - 1].current.focus();
        }
        // Call Match Value Functions
        MatchValues();
    };
    // Match OTP Value and User Press Value Function
    function MatchValues() {
        if (JSON.stringify(input) === JSON.stringify(press)) {
            setMessage("OTP Match Successfully");
            refs[refs.length - 1].current.blur();
            // Set Value In Loader State
            setLoader("loader")
            setTimeout(function () {
                window.location.reload()
            }, 1000)
        } else if (
            JSON.stringify(input) !== JSON.stringify(press) &&
            JSON.stringify(press).includes(" ") === false
        ) {
            setMessage("OTP is incorrect");
        } else {
            setMessage("");
        }
    }
    // Resend OTP handler
    const resendHandler = () => {
        if (attempt !== 0) {
            // Set Data In UseStates
            setMessage("One-time passcode sent successfully!")
            setTimer(60);
            setDisable(true);
            setAttempt((val) => --val)
            // Make All Input Boxes Value Empty
            for (let i = 0; i < refs.length; i++) {
                refs[i].current.value = ""
            }
            // Focus On First Input Box
            refs[0].current.focus()
            // Call OTP Generate Method
            props.method();
        } else if (attempt === 0) {
            alert("Your Resend OTP Attempts Limit Over!");
            setDisable(true);
        }
    };
    return (
        <div
            ref={divref}
            className="modal fade"
            id="myModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {/* Title */}
                            Verify Email Addres({value.otp})
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Enter Your Code Here :</p>
                        {/* Input Boxes */}
                        {refs.map((val: any, index: any) => (
                            <input
                                key={index}
                                autoFocus={refs[0]}
                                type={"text"}
                                onKeyUp={(e) => handleOnKeyDown(e, index)}
                                maxLength={1}
                                onChange={(e) => inputHandler(e, index)}
                                ref={refs[index]}
                                className={
                                    message === "OTP is incorrect"
                                        ? "input wrongVal"
                                        : message === ""
                                            ? "input"
                                            : message === "One-time passcode sent successfully!"
                                                ? "input" : "input rightVal"
                                }
                            />
                        ))}
                        {/* Loader */}
                        {loader !== "" ? <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : null}

                        {/* Alert Message Content */}
                        {message !== "" ? (
                            <p className={message === "OTP is incorrect" ? "wrong" : message === "One-time passcode sent successfully!" ? "resend" : "right"}>
                                {message}
                            </p>
                        ) : null}
                    </div>
                    <div className="modal-footer">
                        <div className="resendBtn">
                            {/* resend Button */}
                            <button
                                onClick={resendHandler}
                                disabled={disable}
                                type="button"
                                className="btn btn-primary"
                            >
                                Resend OTP
                            </button>
                        </div>
                        {/* Attempts */}
                        ({attempt} Attempts left)
                        {/* Timer */}
                        <p className="timer">
                            {timer >= 0 && timer <= 9 ? `00:0${timer}` : `00:${timer}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(OtpLayout);