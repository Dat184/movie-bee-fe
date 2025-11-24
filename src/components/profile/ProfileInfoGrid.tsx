import { User, Mail, Shield, CheckCircle, XCircle } from 'lucide-react'

interface ProfileInfoGridProps {
  userInfo: any
}

const ProfileInfoGrid = ({ userInfo }: ProfileInfoGridProps) => {
  return (
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
  )
}

export default ProfileInfoGrid
