import React, { createContext, useReducer } from 'react';

const initialState = { user: null };

if (localStorage.getItem('user')) {
    const userData = localStorage.getItem('user');
    initialState.user = userData;
}

const AuthContext = createContext({
    user: null,
    login: (data) => { },
    logout: () => { },
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    //console.log(state.user);

    function login(userData) {
        localStorage.setItem('user', userData);
        dispatch({
            type: 'LOGIN',
            payload: userData,
        });
    }

    function logout() {
        localStorage.removeItem('user');
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };