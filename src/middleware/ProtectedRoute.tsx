import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface ProtectedRouteProps {
  allowedRoles: string[] // danh sách role được phép truy cập
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = useSelector((state: any) => state.auth.login?.currentUser)
  // const isLoading = useSelector((state: any) => state.auth.profile?.isFetching)
  // const user = useSelector((state: any) => state.auth.profile?.userInfo)
  console.log('User from App:', user)
  const userRole = user?.role

  console.log('User role:', userRole)

  if (!allowedRoles.includes(userRole !== null ? userRole : '')) {
    toast.error('Bạn không có quyền truy cập trang này.')
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
