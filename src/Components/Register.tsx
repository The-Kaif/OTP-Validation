import React, { useCallback, useEffect, useState } from 'react'
import OtpLayout from './OtpLayout'

function Register() {
    // State for OTP value
    const [otp, setOtp] = useState(0)
    useEffect(() => {
        GenerateOTP()
    }, [])
    // Method of generating OTP
    const GenerateOTP = useCallback(() => {
        setOtp(Math.floor(Math.random() * 90000 + 10000));
    }, [otp]);
    return (
        <div>
            <center>
                <h1 className='mt-4'>Register</h1>
                {/* Pass value and method as props in OtpLayout Component*/}
                <OtpLayout otp={otp} method={GenerateOTP} />
            </center>
        </div>
    )
}

export default Register