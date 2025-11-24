import { useSelector } from 'react-redux'
import { useState } from 'react'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileEditForm from '../components/profile/ProfileEditForm'
import ProfileInfoGrid from '../components/profile/ProfileInfoGrid'

const Profile = () => {
  const userInfo = useSelector((state: any) => state.auth.profile?.userInfo)
  const isFetching = useSelector((state: any) => state.auth.profile?.isFetching)
  const isFetchingUpdate = useSelector((state: any) => state.user.updateUser?.isFetching)

  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
  }

  if (isFetching || isFetchingUpdate) {
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
          <ProfileHeader userInfo={userInfo} onEditClick={handleEditClick} />

          <div className='px-8 pb-8'>
            {/* Edit Form Modal/Section */}
            {isEditMode && <ProfileEditForm onCancel={handleCancelEdit} />}

            {/* Info Grid */}
            <ProfileInfoGrid userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
