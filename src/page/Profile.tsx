import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profile } from '../redux/api_request/auth_api'
import { User, Mail, Shield, CheckCircle, XCircle } from 'lucide-react'

const Profile = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state: any) => state.auth.profile?.userInfo)
  const isFetching = useSelector((state: any) => state.auth.profile?.isFetching)

  useEffect(() => {
    profile(dispatch)
  }, [dispatch])

  if (isFetching) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-bg-color'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (!userInfo) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-bg-color'>
        <div className='text-white text-xl'>Không thể tải thông tin người dùng</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-bg-color py-20 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header Card */}
        <div className='bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10'>
          {/* Cover Background */}
          <div className='h-32 bg-gradient-to-r from-secondary via-primary to-primary'></div>

          {/* Profile Content */}
          <div className='px-8 pb-8'>
            {/* Avatar */}
            <div className='flex justify-center -mt-16 mb-4'>
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1'>
                <img
                  src={userInfo.avatar}
                  alt={`${userInfo.firstName} ${userInfo.lastName}`}
                  className='w-full h-full rounded-full object-cover bg-white'
                />
              </div>
            </div>

            {/* Name */}
            <div className='text-center mb-6'>
              <h1 className='text-3xl font-bold text-white mb-2'>
                {userInfo.firstName} {userInfo.lastName}
              </h1>
              <div className='flex items-center justify-center gap-2'>
                <span className='px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium capitalize'>
                  {userInfo.role}
                </span>
                {userInfo.isVerified && (
                  <span className='px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-1'>
                    <CheckCircle className='w-4 h-4' />
                    Đã xác thực
                  </span>
                )}
              </div>
            </div>

            {/* Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
              {/* Email Card */}
              <div className='bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all'>
                <div className='flex items-center gap-3 mb-2'>
                  <div className='w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center'>
                    <Mail className='w-5 h-5 text-primary' />
                  </div>
                  <h3 className='text-white/70 text-sm font-medium'>Email</h3>
                </div>
                <p className='text-white text-lg ml-13'>{userInfo.email}</p>
              </div>

              {/* Role Card */}
              <div className='bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all'>
                <div className='flex items-center gap-3 mb-2'>
                  <div className='w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center'>
                    <Shield className='w-5 h-5 text-secondary' />
                  </div>
                  <h3 className='text-white/70 text-sm font-medium'>Vai trò</h3>
                </div>
                <p className='text-white text-lg capitalize ml-13'>{userInfo.role}</p>
              </div>

              {/* User ID Card */}
              <div className='bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all'>
                <div className='flex items-center gap-3 mb-2'>
                  <div className='w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center'>
                    <User className='w-5 h-5 text-primary' />
                  </div>
                  <h3 className='text-white/70 text-sm font-medium'>User ID</h3>
                </div>
                <p className='text-white text-sm font-mono ml-13'>{userInfo._id}</p>
              </div>

              {/* Verification Status Card */}
              <div className='bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all'>
                <div className='flex items-center gap-3 mb-2'>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      userInfo.isVerified ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}
                  >
                    {userInfo.isVerified ? (
                      <CheckCircle className='w-5 h-5 text-green-400' />
                    ) : (
                      <XCircle className='w-5 h-5 text-red-400' />
                    )}
                  </div>
                  <h3 className='text-white/70 text-sm font-medium'>Trạng thái xác thực</h3>
                </div>
                <p className={`text-lg ml-13 ${userInfo.isVerified ? 'text-green-400' : 'text-red-400'}`}>
                  {userInfo.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
