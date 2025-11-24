import { X } from 'lucide-react'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { updateUser, updateUserAvatar } from '../../redux/api_request/user_api'
import AvatarUpload from './AvatarUpload'

const schema = Yup.object({
  firstName: Yup.string().required('Vui lòng nhập họ của bạn'),
  lastName: Yup.string().required('Vui lòng nhập tên của bạn')
})

interface ProfileEditFormProps {
  onCancel: () => void
}

const ProfileEditForm = ({ onCancel }: ProfileEditFormProps) => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state: any) => state.auth.profile?.userInfo)

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>(userInfo?.avatar || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || ''
    }
  })

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chỉ chọn file ảnh!')
        return
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước ảnh không được vượt quá 5MB!')
        return
      }

      setAvatarFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveClick = async (data: any) => {
    if (isValid) {
      try {
        // Update firstName and lastName
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName
        }
        await updateUser(userInfo._id, userData, dispatch)

        // Update avatar if a file was selected
        if (avatarFile) {
          await updateUserAvatar(avatarFile, dispatch)
        }

        setAvatarFile(null)
        reset()
        onCancel()
      } catch (error) {
        console.error('Update profile failed:', error)
      }
    } else {
      console.log('Form validation failed:', errors)
    }
  }
  return (
    <div className='mb-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-white'>Chỉnh sửa thông tin</h2>
        <button onClick={onCancel} className='text-white/70 hover:text-white transition-colors'>
          <X className='w-6 h-6' />
        </button>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(handleSaveClick)}>
        {/* Avatar Upload */}
        <AvatarUpload
          avatarPreview={avatarPreview}
          userAvatar={userInfo.avatar}
          avatarFile={avatarFile}
          fileInputRef={fileInputRef}
          onAvatarClick={handleAvatarClick}
          onAvatarChange={handleAvatarChange}
        />

        {/* First Name Input */}
        <div>
          <label className='block text-white/70 text-sm font-medium mb-2'>Họ</label>
          <input
            type='text'
            placeholder='Nhập họ của bạn'
            {...register('firstName')}
            className='w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none   placeholder:text-white/40'
          />
          {errors?.firstName && <div className='text-sm text-red-500 mt-1'>{String(errors.firstName.message)}</div>}
        </div>

        {/* Last Name Input */}
        <div>
          <label className='block text-white/70 text-sm font-medium mb-2'>Tên</label>
          <input
            type='text'
            placeholder='Nhập tên của bạn'
            {...register('lastName')}
            className='w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none   placeholder:text-white/40'
          />
          {errors?.lastName && <div className='text-sm text-red-500 mt-1'>{String(errors.lastName.message)}</div>}
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 pt-2'>
          <button
            type='submit'
            disabled={!isValid}
            className={`flex-1 px-6 py-3 bg-primary text-white rounded-lg transition-all font-medium shadow-lg ${
              !isValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            Lưu thay đổi
          </button>
          <button
            type='button'
            onClick={onCancel}
            className='flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-medium border border-white/20'
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEditForm
