import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const location = useLocation();

    // If not logged in, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Role-based route restrictions
    const customerRestrictedRoutes = ['/visualres']; 
    const sellerRestrictedRoutes = ['/sumresult', '/pricecomp', '/load_sum', '/load_com'];

    const currentPath = location.pathname;

    if (userRole?.toLowerCase() === 'customer' && customerRestrictedRoutes.includes(currentPath)) {
        return <Navigate to="/" replace />;
    }

    if (userRole?.toLowerCase() === 'seller' && sellerRestrictedRoutes.includes(currentPath)) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
