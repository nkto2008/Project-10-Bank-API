import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout } from '../auth/authSlice';


const UserPage = () => {
    const dispatch = useDispatch();
    const { user, status, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>{error}</p>;
    }

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
                    <a className="main-nav-item" href="/user">
                        <i className="fa fa-user-circle"></i>
                        {user ? user.firstName : 'User'}
                    </a>
                    <a className="main-nav-item" href="/" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </a>
                </div>
            </nav>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}` : ''}!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                {/* Render account sections here */}
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </div>
    );
};

export default UserPage;
