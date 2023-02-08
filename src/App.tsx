// Import Component
import "./App.css"
import { createContext, useState } from "react";
import Register from "./Components/Register";
// Make UseContext for holds OTP value
export const otpContext = createContext({})

function App() {
  const [otp, setOtp] = useState(0)
  return (
    <div>
      <otpContext.Provider value={{ otp, setOtp }}>
        <Register />
      </otpContext.Provider>
    </div>
  );
}
export default App;
