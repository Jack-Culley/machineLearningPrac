import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home';
import PasswordUpdate from './components/PasswordUpdate';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useSelector } from 'react-redux';


function Urls() {
    const isAuthenticated = useSelector((state) => state.auth.token !== null && typeof state.auth.token !== 'undefined');
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login/" element={
                        !isAuthenticated ? <Login /> : <Navigate to={{pathname: "/", replace: true}}/>
                    }/>
                    <Route exact path="/" element={
                        isAuthenticated ? <Home /> : <Navigate to={{pathname: "/login/", replace: true}}/>
                    }/>
                    <Route exact path="/update_password/" element={
                        localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined ? <PasswordUpdate /> : <Navigate to={{pathname: "/login/", replace: true}} />
                    }/>
                    <Route exact path="/sign-up/" element={
                        !isAuthenticated ? <Signup /> : <Navigate to={{pathname: "/", replace: true}}/>
                    }/>
                    <Route path="*" element={
                        <Navigate to={{
                            pathname: "/login/",
                        }}/>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    )
};

/**
 * A note on this file:
 * There was a bug that persisted for a while where if you were logged in and went to the url to update your password, it would redirect you to the login
 * page then homescreen(because you are authenticated) instead of rendering the update password view. Basically, isAuthenticated was always returning false
 * On the initial redirect to /update_password/ because the state was undefined. This still baffles me but if I access the localStorage object directly it works.
 */



export default Urls;