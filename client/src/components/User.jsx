import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout, updateUserProfile } from '../auth/authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import argentBankLogo from '../assets/img/argentBankLogo.png'
;

const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, status, error } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const token = localStorage.getItem('token')



    useEffect(() => {
        if (!token) {
            navigate('/sign-in');
        } else {
            dispatch(getUserProfile());
        }
    }, [dispatch, navigate, token]);



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

    if (!token) {
        return <Navigate to="/sign-in" />;
    }

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
                        src={argentBankLogo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <i class="fa fa-user-circle"></i>
                    <Link to="/user" className="main-nav-item">
                        {user ? user.firstName : 'User'}
                    </Link>
                    <i class="fa fa-sign-out"></i>
                    <Link to="/" className="main-nav-item" onClick={handleLogout}>
                        Sign Out
                    </Link>
                </div>
            </nav>

            <main class="main bg-dark">
                <div class="header">
                    {isEditing ? (
                        <div>
                            <h1>Welcome Back</h1>
                            <form onSubmit={handleSaveEdit} className='form-edit-name'>
                                <div className="input-wrapper-left">
                                    <input
                                        placeholder={firstName}
                                        type="text"
                                        id="firstName"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <button type="submit" className="edit-button">Save</button>
                                </div>
                                <div className="input-wrapper-right">
                                    <input
                                        placeholder={lastName}
                                        type="text"
                                        id="lastName"
                                        
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
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
                <section class="account">
                    <div class="account-content-wrapper">
                        <h3 class="account-title">Argent Bank Checking (x8349)</h3>
                        <p class="account-amount">$2,082.79</p>
                        <p class="account-amount-description">Available Balance</p>
                    </div>
                    <div class="account-content-wrapper cta">
                        <button class="transaction-button">View transactions</button>
                    </div>
                </section>
                <section class="account">
                    <div class="account-content-wrapper">
                        <h3 class="account-title">Argent Bank Savings (x6712)</h3>
                        <p class="account-amount">$10,928.42</p>
                        <p class="account-amount-description">Available Balance</p>
                    </div>
                    <div class="account-content-wrapper cta">
                        <button class="transaction-button">View transactions</button>
                    </div>
                </section>
                <section class="account">
                    <div class="account-content-wrapper">
                        <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p class="account-amount">$184.30</p>
                        <p class="account-amount-description">Current Balance</p>
                    </div>
                    <div class="account-content-wrapper cta">
                        <button class="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>

            <footer class="footer">
                <p class="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </>
    );
};

export default UserPage;