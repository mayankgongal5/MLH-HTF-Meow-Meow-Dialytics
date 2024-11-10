

import React from 'react';
import './LoginPage.css';

const LoginPage = ({ loginWithRedirect }) => {
    return (
        <div className='maint'>
            <div className="lcontainer">
                <img src="l.png" alt="Teletrack Logo" className="logo" />
                <h1>Login to Dialytics Admin</h1>
                <button className="lgbtn" onClick={() => loginWithRedirect()}>Login with Auth0</button>
            </div>
        </div>
    );
};

export default LoginPage;






