import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContextProvider'

const PrivateRoute = ({ children }) => {
    const { isAuth } = useContext(AuthContext);
    if (isAuth) {
        return children
    } else {
        return <Navigate to={'/login'} />
    }
}

export default PrivateRoute