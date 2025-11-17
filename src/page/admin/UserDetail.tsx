import { ArrowLeft, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface User {
  id: number
  email: string
  username: string
  avatarUrl: string
  role: 'Admin' | 'User'
  isVerified: boolean
}

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<User>({
    id: 0,
    email: '',
    username: '',
    avatarUrl: '',
    role: 'User',
    isVerified: false
  })

  useEffect(() => {
    if (id) {
      // Giả lập fetch data từ API
      const mockUser: User = {
        id: parseInt(id),
        email: 'thanhnguyendat184@gmail.com',
        username: 'Nguyễn Văn A',
        avatarUrl: 'https://avatars.githubusercontent.com/u/59419099?v=4',
        role: 'User',
        isVerified: true
      }
      setFormData(mockUser)
    }
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim() || !formData.username.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (id) {
      toast.success('Đã cập nhật người dùng thành công')
    } else {
      toast.success('Đã thêm người dùng mới thành công')
    }

    navigate('/admin/users')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleCancel = () => {
    navigate('/admin/users')
  }

  return (
    <section className='w-full min-h-screen px-5 pt-10 flex flex-col pb-10'>
      <div className='flex flex-row justify-start items-center mb-10 gap-4'>
        <button
          className='p-2 rounded-lg border border-gray-500 hover:bg-gray-700 cursor-pointer'
          onClick={handleCancel}
        >
          <ArrowLeft />
        </button>
        <div>
          <h1 className='text-2xl font-bold'>{id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h1>
          <p className='text-gray-400'>{id ? 'Cập nhật thông tin người dùng' : 'Tạo tài khoản người dùng mới'}</p>
        </div>
      </div>

      <div className='flex-1 flex items-start justify-center'>
        <div className='bg-gray-800 rounded-lg p-8 w-full max-w-2xl'>
          <form onSubmit={handleSubmit}>
            {/* Avatar Preview */}
            <div className='flex justify-center mb-8'>
              <div className='relative'>
                <img
                  src={formData.avatarUrl || 'https://via.placeholder.com/150'}
                  alt='Avatar'
                  className='w-32 h-32 rounded-full object-cover border-4 border-gray-700'
                />
              </div>
            </div>

            <div className='space-y-6'>
              {/* Email */}
              <div>
                <label htmlFor='email' className='block mb-2 font-medium text-sm'>
                  Email <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary'
                  placeholder='Nhập email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor='username' className='block mb-2 font-medium text-sm'>
                  Tên người dùng <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary'
                  placeholder='Nhập tên người dùng'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 justify-end mt-8'>
              <button
                type='button'
                className='px-6 py-2.5 rounded-lg border border-gray-500 hover:bg-gray-700 transition-colors cursor-pointer'
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                type='submit'
                className='px-6 py-2.5 bg-primary rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer'
              >
                {id ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserDetail
