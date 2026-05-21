import React from "react";
import axios from "axios";

import ChessPattern from "../components/ChessPattern";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pattern, setPattern] = React.useState([]);
    
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/login", {
                email,
                password,
                chessPattern: pattern
            });
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

            <br/>
            <br/>

            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <br/>
            <br/>

            <ChessPattern pattern={pattern} setPattern={setPattern} />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;