import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        let mounted = true;
        
        const handleNavigation = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Clear navigation history for non-logged in users
                window.history.replaceState(null, '', window.location.pathname);
                return;
            }

            const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
            console.log('Token:', token);
            console.log('Decoded Token:', decodedToken);
            
            if (decodedToken && mounted) {
                console.log(decodedToken);
                // Clear history and navigate
                if (decodedToken.role === 'seller') {
                    window.history.replaceState(null, '', '/profile-seller');
                    navigate('/profile-seller', { state: { user: decodedToken }, replace: true });
                } else if (decodedToken.role === 'customer') {
                    window.history.replaceState(null, '', '/profile-customer');
                    navigate('/profile-customer', { state: { user: decodedToken }, replace: true });
                }
            }
        };

        handleNavigation();

        return () => {
            mounted = false;
        };
    }, [navigate]);

    const handleLoginClick = () => {
        navigate('/login', { replace: true });
    };

    const handleBackClick = () => {
        navigate('/', { replace: true }); // Directly navigate to home
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            gap: '20px'
        }}>
            <div style={{ 
                fontSize: '24px',
                textAlign: 'center',
                color: '#333'
            }}>
                Please Login
            </div>
            <div style={{
                display: 'flex',
                gap: '15px'
            }}>
                <button 
                    onClick={handleLoginClick}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Login
                </button>
                <button 
                    onClick={handleBackClick}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Profile;