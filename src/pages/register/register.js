import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/users`
const config = {
    headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
    }
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username,
            password,
            fullname
        }

        axios
            .post(baseURL, data, config)
            .then((response) => {
                console.log(response.data);
                history.push("/login");
            });
    }

    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Full name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                className="btn btn-block btn-dark"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default Register;