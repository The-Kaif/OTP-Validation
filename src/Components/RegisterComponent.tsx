
import React, { useCallback, useContext, useRef, useState } from "react";
import { otpContext } from "../App";
import OtpLayout from "./OtpLayout";

function RegisterComponent() {
    const rangeRef: any = useRef(null);
    const [input, setInput] = useState("")
    let value: any = useContext(otpContext);
    const regexForRange = /^[4-7\b]+$/;


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const validateHandler = () => {
        let otp = 0;
        let number = parseInt(rangeRef.current.value);
        let max = "9";
        let min = "1";
        while (number !== 1) {
            max = max + "0";
            min = min + "0";
            number--;
        }
        otp = Math.floor(Math.random() * parseInt(max) + parseInt(min));
        value.setOtp(otp)
    };
    return (
        <div>
            <center>
                <div className="register__component">
                    <h1>Register</h1>
                    <div className="input-group mb-3">
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
            {Number(input) >= 4 && Number(input) <= 7 ? (
                <OtpLayout digit={input} method={validateHandler} />
            ) : null}
        </div>
    );
}

export default RegisterComponent;