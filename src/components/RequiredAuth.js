import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { selectCurrentToken } from '../features/auth/authSlice'

const RequiredAuth = () => {
    const location = useLocation()
    const token = useSelector(selectCurrentToken)
    return (
        token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
    )
}

export default RequiredAuth