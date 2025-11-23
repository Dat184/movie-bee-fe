import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import loginBg from '../assets/img/login.jpg'
import { useDispatch } from 'react-redux'
import { confirmEmail } from '../redux/api_request/auth_api'

const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Please enter your email'),
  otp: Yup.string().required('Please enter your OTP')
})

const ConfirmEmail = () => {
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
  const dispatch = useDispatch()
  const email = localStorage.getItem('registerEmail') || ''
  const onSubmit = async (data: any) => {
    if (isValid) {
      // Handle successful login
      const { otp } = data
      await confirmEmail(email, otp, navigate, dispatch)
      localStorage.removeItem('registerEmail')
      reset()
    } else {
      // Handle login errors
      console.log('Confirm email failed:', errors)
    }
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-[800px] h-[600px] rounded-xl border-0 flex flex-row overflow-hidden'>
        <div
          className='flex-1 p-2'
          style={{ backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        ></div>
        <div className='flex-1 bg-[#1E2545] p-2'>
          <div className='flex flex-col justify-center items-start h-full p-12 gap-4'>
            <h1 className=' text-2xl font-semibold'>Xác thực email của bạn</h1>
            <p className='text-sm text-gray-400'>
              Đã xác thực,{' '}
              <a
                onClick={() => {
                  navigate('/login')
                }}
                className='text-primary cursor-pointer'
              >
                đăng nhập
              </a>
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type='email'
                className='border border-solid border-[#ffffff10] rounded-md p-2 mt-2 w-full'
                placeholder='Nhập email'
                {...register('email')}
                id='email'
                defaultValue={email}
              />
              {errors?.email && <div className='text-sm text-red-500'>{errors.email.message}</div>}

              <input
                type='text'
                className='border border-solid border-[#ffffff10] rounded-md p-2 mt-2 w-full'
                placeholder='Nhập mã OTP'
                {...register('otp')}
                id='otp'
              />
              {errors?.otp && <div className='text-sm text-red-500'>{errors.otp.message}</div>}

              <button
                className={`bg-primary text-white rounded-md p-2 mt-4 w-full hover:opacity-80 transition-colors ${
                  !isValid ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type='submit'
              >
                Gửi yêu cầu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmail
