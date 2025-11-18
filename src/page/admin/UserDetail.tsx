import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

interface User {
  id: number
  email: string
  username: string
  avatarUrl: string
  role: 'Admin' | 'User'
  isVerified: boolean
  firstName: string
  lastName: string
}

const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Please enter your email'),
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  username: Yup.string().required('Please enter your username'),
  avatarUrl: Yup.string().url('Invalid URL format'),
  role: Yup.string().oneOf(['Admin', 'User']),
  isVerified: Yup.boolean()
})

const UserDetail = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
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
        firstName: 'Nguyễn',
        lastName: 'Văn A',
        isVerified: true
      }
      reset({
        ...mockUser
      })
    }
  }, [id])

  const onSubmit = async (data: any) => {
    if (isValid) {
      if (id) {
        toast.success(`Cập nhật người dùng thành công: ${JSON.stringify(data)}`)
      } else {
        toast.success(`Đã thêm người dùng mới thành công: ${JSON.stringify(data)}`)
      }

      reset()
    }

    navigate('/admin/users')
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Avatar Preview */}
            <div className='flex justify-center mb-8'>
              <div className='relative'>
                <img
                  src={watch('avatarUrl') || 'https://via.placeholder.com/150'}
                  alt='Avatar'
                  className='w-32 h-32 rounded-full object-cover border-4 border-gray-700'
                />
              </div>
            </div>

            <div className='space-y-6'>
              {/* Email */}
              <div>
                <label htmlFor='email' className='block mb-2 font-medium text-sm'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary'
                  placeholder='Nhập email'
                  {...register('email')}
                />
                {errors?.email && <div className='text-sm text-red-500'>{errors.email.message}</div>}
              </div>

              {/* Username */}
              <div>
                <label htmlFor='username' className='block mb-2 font-medium text-sm'>
                  Tên hiển thị
                </label>
                <input
                  type='text'
                  id='username'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary'
                  placeholder='Nhập tên người dùng'
                  {...register('username')}
                />
                {errors?.username && <div className='text-sm text-red-500'>{errors.username.message}</div>}
              </div>

              <div>
                <label htmlFor='firstName' className='block mb-2 font-medium text-sm'>
                  Họ
                </label>
                <input
                  type='text'
                  id='firstName'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary'
                  placeholder='Nhập tên người dùng'
                  {...register('firstName')}
                />
                {errors?.firstName && <div className='text-sm text-red-500'>{errors.firstName.message}</div>}
              </div>

              <div>
                <label htmlFor='lastName' className='block mb-2 font-medium text-sm'>
                  Tên
                </label>
                <input
                  type='text'
                  id='lastName'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary'
                  placeholder='Nhập tên người dùng'
                  {...register('lastName')}
                />
                {errors?.lastName && <div className='text-sm text-red-500'>{errors.lastName.message}</div>}
              </div>

              {/* Role - Chỉ xem */}
              <div>
                <label htmlFor='role' className='block mb-2 font-medium text-sm'>
                  Vai trò
                </label>
                <input
                  type='text'
                  id='role'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 cursor-not-allowed opacity-60'
                  placeholder='Vai trò'
                  {...register('role')}
                  disabled
                  readOnly
                />
              </div>

              {/* Is Verified - Có thể thay đổi */}
              <div>
                <label htmlFor='isVerified' className='block mb-2 font-medium text-sm'>
                  Trạng thái xác thực
                </label>
                <select
                  id='isVerified'
                  className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary cursor-pointer appearance-none'
                  {...register('isVerified')}
                >
                  <option value='true'>Đã xác thực</option>
                  <option value='false'>Chưa xác thực</option>
                </select>
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
