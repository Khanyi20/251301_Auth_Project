import React from "react";
import axios from "axios";

import ChessPattern from "../components/ChessPattern";

function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pattern, setPattern] = React.useState([]);
    
    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:5000/register", {
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
            <h2>Register</h2>

            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

            <br/>
            <br/>

            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <br/>
            <br/>

            <ChessPattern pattern={pattern} setPattern={setPattern} />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;