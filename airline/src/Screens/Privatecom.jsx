import React, { useState } from 'react';
import Login from './Login';

function ParentComponent() {
    const handleLogin = (name) => {
        // Logic to handle login, such as setting user data in state or local storage
        console.log('User logged in:', name);
    };

    return (
        <div>
            <Login handleLogin={handleLogin} />
        </div>
    );
}

export default ParentComponent;
