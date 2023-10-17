import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import classes from './Login.module.css';
import axios from 'axios';

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const history = useHistory();
    const context = useContext(AuthContext)

    localStorage.removeItem('user');

    const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/users`
    const config = {
        headers: {
            apikey: process.env.REACT_APP_SUPABASE_KEY,
        }
    };

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);

        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length > 6
        );
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
            event.target.value.trim().length > 6 && enteredEmail.includes('@')
        );
    };

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        axios
            .get(`${baseURL}?username=eq.${enteredEmail}&select=*`, config)
            .then((response) => {
                const user = [...response.data];

                if (user[0].password === enteredPassword) {
                    context.login(enteredEmail);
                    history.push('/');
                    console.log(user)
                } else {
                    alert("wrong email or password");
                }
            }).catch(e => { console.log(e) });
    };

    console.log(enteredEmail, enteredPassword)

    return (
        <div className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <button type="submit" className="btn btn-primary" disabled={!formIsValid}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
