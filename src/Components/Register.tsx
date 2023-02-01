import React, { useCallback, useEffect, useState } from 'react'
import OtpLayout from './OtpLayout'

function Register() {
    const [otp, setOtp] = useState(0)
    useEffect(() => {
        GenerateOTP()
    }, [])
    console.log(otp)
    const GenerateOTP = useCallback(() => {
        setOtp(Math.floor(Math.random() * 90000 + 10000));
    }, [otp]);
    console.log("OTP", otp)
    return (
        <div>
            <center>
                <h1>Register</h1>
                <OtpLayout otp={otp} method={GenerateOTP} />
            </center>
        </div>
    )
}

export default Register