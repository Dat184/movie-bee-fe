import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Please enter your email'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter your password')
})

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    if (isValid) {
      // Handle successful login
      alert(`login successful: ${data.email} + ${data.password}`)
      reset()
    } else {
      // Handle login errors
      console.log('Login failed:', errors)
    }
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-[800px] h-[600px] rounded-xl border-0 flex flex-row overflow-hidden'>
        <div className='flex-1 bg-[url(./src/assets/img/login.jpg)] bg-cover bg-no-repeat p-2'></div>
        <div className='flex-1 bg-[#1E2545] p-2'>
          <div className='flex flex-col justify-center items-start h-full p-12 gap-4'>
            <h1 className=' text-2xl font-semibold'>Đăng nhập</h1>
            <p className='text-sm text-gray-400'>
              Nếu bạn chưa có tài khoản,{' '}
              <a
                onClick={() => {
                  navigate('/register')
                }}
                className='text-primary cursor-pointer'
              >
                đăng ký ngay
              </a>
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type='email'
                className='border border-solid border-[#ffffff10] rounded-md p-2 mt-2 w-full'
                placeholder='Email'
                {...register('email')}
                id='email'
              />
              {errors?.email && <div className='text-sm text-red-500'>{errors.email.message}</div>}
              <input
                type='password'
                className='border border-solid border-[#ffffff10] rounded-md p-2 mt-2 w-full'
                placeholder='Mật khẩu'
                {...register('password')}
                id='password'
              />
              {errors?.password && <div className='text-sm text-red-500'>{errors.password.message}</div>}
              <button
                className={`bg-primary text-white rounded-md p-2 mt-4 w-full hover:opacity-80 transition-colors ${
                  !isValid ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type='submit'
              >
                Đăng nhập
              </button>
            </form>
            <div onClick={() => navigate('/confirm-email')} className='hover:text-primary cursor-pointer'>
              Xác thực email
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
