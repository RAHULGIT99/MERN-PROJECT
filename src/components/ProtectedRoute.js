import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Redirect to login if there's no token
        return <Navigate to="/signin" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
