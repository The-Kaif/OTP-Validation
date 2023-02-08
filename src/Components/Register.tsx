
import React, { useCallback, useContext, useRef, useState } from "react";
import { otpContext } from "../App";
import OtpLayout from "./OtpLayout";

function Register() {
    // Ref for input fields
    const rangeRef: any = useRef(null);
    // UseState for holds input value
    const [input, setInput] = useState("")
    // UseContext that holds OTP number in state
    let value: any = useContext(otpContext);
    // Regex For Valid Input Value
    const regexForRange = /^[4-7\b]+$/;
    //Function That Get Input Value In State
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    // Generate OTP according to user input value
    const GenerateOTP = useCallback(() => {
        let otp = 0;
        let number = parseInt(input);
        let max = "9";
        let min = "1";
        while (number !== 1) {
            max = max + "0";
            min = min + "0";
            number--;
        }
        otp = Math.floor(Math.random() * parseInt(max) + parseInt(min));
        value.setOtp(otp)
    }, [input]);
    return (
        <div>
            <center>
                <div className="register__component">
                    <h1 className="title">Pre Team Alignment Test</h1>
                    <div className="input-group mb-3 mt-4">
                        <input
                            ref={rangeRef}
                            type="text"
                            maxLength={1}
                            className="form-control"
                            placeholder="Type OTP Range Between [4-7]..."
                            onChange={inputHandler}
                        />
                        <button
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                if (regexForRange.test(input) === false) {
                                    alert("Please type range between 4-7");
                                    rangeRef.current.focus();
                                }
                            }}
                        >
                            Validate OTP
                        </button>
                    </div>
                </div>
            </center>
            {/* Call OtpLayout Component */}
            {Number(input) >= 4 && Number(input) <= 7 ? (
                <OtpLayout digit={input} method={GenerateOTP} />
            ) : null}
        </div>
    );
}

export default Register;