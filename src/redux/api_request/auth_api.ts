import {
  confirmEmailFailure,
  confirmEmailStart,
  confirmEmailSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  profileFailure,
  profileStart,
  profileSuccess,
  registerFailure,
  registerStart,
  registerSuccess
} from '../slice/authSlice'
import axiosInstance from '../../axios/axios.interceptor'
import { toast } from 'react-toastify'
import type { UserCreate, userLogin } from '../../types'

export const login = async (user: userLogin, dispatch: any, navigate: any) => {
  dispatch(loginStart())
  try {
    const res = await axiosInstance.post('/auth/login', user)
    dispatch(loginSuccess(res.data.result.user))
    navigate('/')
    toast.success('Đăng nhập thành công!')
  } catch (error: any) {
    dispatch(loginFailure())
    toast.error(error.response.data.message)
  }
}

export const logout = async (dispatch: any) => {
  dispatch(logoutStart())
  try {
    await axiosInstance.post('/auth/logout')
    dispatch(logoutSuccess())
    toast.success('Đăng xuất thành công!')
    await profile(dispatch)
  } catch (error: any) {
    dispatch(logoutFailure())
    toast.error('Đăng xuất thất bại. Vui lòng thử lại.')
  }
}

export const profile = async (dispatch: any) => {
  dispatch(profileStart())
  try {
    const res = await axiosInstance.get('/auth/profile')
    dispatch(profileSuccess(res.data.result))
    dispatch(loginSuccess(res.data.result))
  } catch (error: any) {
    dispatch(profileFailure())
  }
}

export const signIn = async (user: UserCreate, dispatch: any, navigate: any) => {
  dispatch(registerStart())
  try {
    await axiosInstance.post('/auth/register', user)
    dispatch(registerSuccess())
    navigate('/confirm-email')
    toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.')
  } catch (error: any) {
    console.log(error)
    dispatch(registerFailure())
    toast.error(error.response.data.message)
  }
}

export const confirmEmail = async (email: string, otp: string, navigate: any, dispatch: any) => {
  dispatch(confirmEmailStart())
  try {
    await axiosInstance.post('/auth/verify-email', { email, otp })
    dispatch(confirmEmailSuccess())
    toast.success('Xác nhận email thành công! Bạn có thể đăng nhập ngay bây giờ.')
    navigate('/login')
  } catch (error: any) {
    dispatch(confirmEmailFailure())
    toast.error(error.response.data.message)
  }
}
