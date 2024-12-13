import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile_customer = () => {
    const location = useLocation();
    const user = location.state.user || {};
    console.log(user);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleWishlistClick = () => {
        navigate('/wishlist', { state: { user } });
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
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                fontSize: '24px',
                gap: '20px'
            }}>
                <div>Hello, {user?.name || 'Customer'}!</div>
                <button
                    onClick={handleWishlistClick}
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'black'}
                >
                    Wishlist
                </button>
            </div>
        </div>
    );
};

export default Profile_customer;
