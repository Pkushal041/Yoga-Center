import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './Register';
import Login from './Login';
import Home from './Home';

const register = ReactDOM.createRoot(document.getElementById('register'));
register.render(
    <Register />
);

const login = ReactDOM.createRoot(document.getElementById('login'));
login.render(
    <Login />
);


const home= ReactDOM.createRoot(document.getElementById('home'));
home.render(
    <Home/>
);