import React from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
      <Register/>
      <Login/>
    </div>
  );
}

export default App;