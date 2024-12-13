import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile_seller = () => {
    const location = useLocation();
    const user = location.state.user || {};
    console.log(user)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'right', padding: '10px' }}>
            <button 
                onClick={handleLogout}
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                Logout
            </button>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '24px'
            }}>
                Hello, {user?.name || 'Seller'}!
            </div>
        </div>
    );
};

export default Profile_seller;
