import { CheckCircle, Edit2 } from 'lucide-react'

interface ProfileHeaderProps {
  userInfo: any
  onEditClick: () => void
}

const ProfileHeader = ({ userInfo, onEditClick }: ProfileHeaderProps) => {
  return (
    <>
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

          {/* Edit Button */}
          <div className='mt-4'>
            <button
              onClick={onEditClick}
              className='px-6 py-2.5 bg-primary text-white rounded-lg transition-all flex items-center gap-2 mx-auto font-medium shadow-lg cursor-pointer'
            >
              <Edit2 className='w-4 h-4' />
              Chỉnh sửa thông tin
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
