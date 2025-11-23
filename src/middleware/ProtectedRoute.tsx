import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface ProtectedRouteProps {
  allowedRoles: string[] // danh sách role được phép truy cập
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = useSelector((state: any) => state.auth.login?.currentUser)
  // console.log('User from App:', user)
  const userRole = user?.role

  // console.log('User role:', userRole)

  if (!allowedRoles.includes(userRole !== null ? userRole : '')) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
