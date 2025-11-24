import { Camera, Upload } from 'lucide-react'
import type { RefObject } from 'react'

interface AvatarUploadProps {
  avatarPreview: string
  userAvatar: string
  avatarFile: File | null
  fileInputRef: RefObject<HTMLInputElement | null>
  onAvatarClick: () => void
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AvatarUpload = ({
  avatarPreview,
  userAvatar,
  avatarFile,
  fileInputRef,
  onAvatarClick,
  onAvatarChange
}: AvatarUploadProps) => {
  return (
    <div>
      <label className='block text-white/70 text-sm font-medium mb-3'>Ảnh đại diện</label>
      <div className='flex items-center gap-4'>
        {/* Avatar Preview */}
        <div className='relative group'>
          <div className='w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1'>
            <img
              src={avatarPreview || userAvatar}
              alt='Avatar preview'
              className='w-full h-full rounded-full object-cover bg-white'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
            <Camera className='w-6 h-6 text-white' />
          </div>
        </div>

        {/* Upload Button */}
        <div className='flex-1'>
          <button
            type='button'
            onClick={onAvatarClick}
            className='w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all flex items-center justify-center gap-2 font-medium'
          >
            <Upload className='w-5 h-5' />
            {avatarFile ? avatarFile.name : 'Chọn ảnh mới'}
          </button>
          <p className='text-white/50 text-xs mt-2'>Định dạng: JPG, PNG. Tối đa 5MB</p>
          <input ref={fileInputRef} type='file' accept='image/*' onChange={onAvatarChange} className='hidden' />
        </div>
      </div>
    </div>
  )
}

export default AvatarUpload
