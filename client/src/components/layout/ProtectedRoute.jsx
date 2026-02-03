import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Spinner from '../common/Spinner'

export const ProtectedRoute = ({ children }) => {
    const { user, authLoading } = useAppContext()

    if (authLoading) return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/25'>
            <Spinner />
        </div>
    );

    if (!user) return <Navigate to="/login" replace />

    return children
}

export const AdminRoute = ({ children }) => {
    const { user, authLoading } = useAppContext()

    if (authLoading) return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/25'>
            <Spinner />
        </div>
    );

    if (!user || user.role !== 'admin') return <Navigate to='/' replace />

    return children
}


