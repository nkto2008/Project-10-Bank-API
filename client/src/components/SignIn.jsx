import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const resultAction = await dispatch(login({ email, password }));
        if (login.fulfilled.match(resultAction)) {
            navigate('/user');
        }
    };

    return (
        <div>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <img
                        className="main-nav-logo-image"
                        src="path/to/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    <a className="main-nav-item" href="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </a>
                </div>
            </nav>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button" type="submit">Sign In</button>
                    </form>
                    {status === 'loading' && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </section>
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </div>
    );
};

export default SignInPage;
