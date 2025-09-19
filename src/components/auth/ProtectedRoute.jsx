import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ children, user, redirect }) => {
    return user ?
        children ? children : <Outlet /> :
        <Navigate to={redirect} />
}

export default ProtectedRoute