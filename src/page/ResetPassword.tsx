import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Please enter your email')
})

const ResetPassword = () => {
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
      alert(`login successful: ${data.email}`)
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
            <h1 className=' text-2xl font-semibold'>Quên mật khẩu</h1>
            <p className='text-sm text-gray-400'>
              Nếu bạn đã có tài khoản,{' '}
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
                placeholder='Email'
                {...register('email')}
                id='email'
              />
              {errors?.email && <div className='text-sm text-red-500'>{errors.email.message}</div>}

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

export default ResetPassword
