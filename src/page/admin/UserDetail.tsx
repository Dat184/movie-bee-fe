import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import type { User, UserCreate, UserUpdate } from '../../types'
import { createUser, getUserById, updateUser } from '../../redux/api_request/user_api'
import { useDispatch, useSelector } from 'react-redux'

const createSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Please enter your email'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter your password'),
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  avatar: Yup.string().url('Invalid URL format'),
  role: Yup.string(),
  isVerified: Yup.boolean()
})

const editSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Please enter your email'),
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  avatar: Yup.string().url('Invalid URL format'),
  role: Yup.string(),
  isVerified: Yup.boolean()
})

const UserDetail = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const userDetail = useSelector((state: any) => state.user.getUser?.data?.result)
  const isFeitching = useSelector((state: any) => state.user.getUser.isFetching)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(id ? editSchema : createSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      avatar: '',
      isVerified: false,
      role: 'User'
    }
  })

  // Fetch user data khi có id
  useEffect(() => {
    if (id) {
      getUserById(id, dispatch)
    } else {
      // Reset form về trạng thái mặc định khi tạo mới
      reset({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        avatar: '',
        isVerified: false,
        role: 'User'
      })
    }
  }, [id, dispatch, reset])

  // Update form khi userDetail thay đổi (chỉ khi đang edit)
  useEffect(() => {
    if (id && userDetail) {
      reset({
        email: userDetail.email || '',
        password: '',
        firstName: userDetail.firstName || '',
        lastName: userDetail.lastName || '',
        avatar: userDetail.avatar || '',
        isVerified: userDetail.isVerified || false,
        role: userDetail.role || 'User'
      })
    }
  }, [id, userDetail, reset])

  const onSubmit = async (data: any) => {
    if (isValid) {
      if (id) {
        const updateUserData: UserUpdate = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        }
        await updateUser(id, updateUserData, dispatch)
      } else {
        await createUser(data, dispatch)
      }
      reset()
    } else {
      toast.error('Vui lòng kiểm tra lại thông tin người dùng.')
    }

    navigate('/admin/users')
  }

  const handleCancel = () => {
    navigate('/admin/users')
  }

  if (isFeitching) {
    return <div>Loading...</div>
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
            {watch('avatar') && (
              <div className='flex justify-center mb-8'>
                <div className='relative'>
                  <img
                    src={watch('avatar')}
                    alt='Avatar'
                    className='w-32 h-32 rounded-full object-cover border-4 border-gray-700'
                  />
                </div>
              </div>
            )}

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
                {errors?.email && <div className='text-sm text-red-500'>{String(errors.email.message)}</div>}
              </div>

              {/* Password */}
              {!id && (
                <div>
                  <label htmlFor='password' className='block mb-2 font-medium text-sm'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary'
                    placeholder='Nhập password'
                    {...register('password')}
                  />
                  {errors?.password && <div className='text-sm text-red-500'>{String(errors.password.message)}</div>}
                </div>
              )}

              {/* Username */}

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
                {errors?.firstName && <div className='text-sm text-red-500'>{String(errors.firstName.message)}</div>}
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
                {errors?.lastName && <div className='text-sm text-red-500'>{String(errors.lastName.message)}</div>}
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
                  placeholder={watch('role')}
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
                  disabled={id ? true : false}
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
