// Import Component

import RegisterComponent from "./Components/RegisterComponent";
import "./App.css"
import { createContext, useState } from "react";

export const otpContext = createContext({})

function App() {
  const [otp, setOtp] = useState(0)
  return (
    <div>
      {/* <Register /> */}
      <otpContext.Provider value={{ otp, setOtp }}>
        <RegisterComponent />
      </otpContext.Provider>

    </div>
  );
}

export default App;
