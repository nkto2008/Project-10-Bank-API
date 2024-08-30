import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout, updateUserProfile } from '../auth/authSlice';
import { Link } from 'react-router-dom';

const UserPage = () => {
    const dispatch = useDispatch();
    const { user, status, error } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFirstName(user.firstName);
        setLastName(user.lastName);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateUserProfile({ firstName, lastName })).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (status === 'loading') {
        return <div className="main bg-dark">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="main bg-dark">Error: {error}</div>;
    }

    return (
        <>
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src="./img/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link to="/user" className="main-nav-item">
                        {user ? user.firstName : 'User'}
                    </Link>
                    <Link to="/" className="main-nav-item" onClick={handleLogout}>
                        Sign Out
                    </Link>
                </div>
            </nav>

            <main className="main bg-dark">
                <div className="header">
                    {isEditing ? (
                        <div>
                            <h1>Edit Name</h1>
                            <form onSubmit={handleSaveEdit}>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="button-wrapper">
                                    <button type="submit" className="edit-button">Save</button>
                                    <button onClick={handleCancelEdit} className="edit-button">Cancel</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <>
                            <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}!` : ''}</h1>
                            <button className="edit-button" onClick={handleEditClick}>
                                Edit Name
                            </button>
                        </>
                    )}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </>
    );
};

export default UserPage;