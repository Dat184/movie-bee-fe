import { toast } from 'react-toastify'
import axiosInstance from '../../axios/axios.interceptor'
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../slice/userSlice'
import type { UserUpdate } from '../../types'
import { profile } from './auth_api'

export const updateUser = async (userId: string, userData: UserUpdate, dispatch: any) => {
  dispatch(updateUserStart())
  try {
    await axiosInstance.patch(`/users/getById/${userId}`, userData)
    dispatch(updateUserSuccess())
    toast.success('Cập nhật thông tin người dùng thành công!')
    await profile(dispatch)
  } catch (error) {
    // Handle error if needed
    console.log(error)
    dispatch(updateUserFailure())
    toast.error('Cập nhật thông tin người dùng thất bại. Vui lòng thử lại.' + error)
    throw error
  }
}

export const updateProfile = async (userId: string, formData: FormData, dispatch: any) => {
  dispatch(updateUserStart())
  try {
    await axiosInstance.patch(`/users/getById/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    dispatch(updateUserSuccess())
    toast.success('Cập nhật thông tin cá nhân thành công!')
    await profile(dispatch)
  } catch (error: any) {
    console.log(error)
    dispatch(updateUserFailure())
    toast.error(error?.response?.data?.message || 'Cập nhật thông tin thất bại. Vui lòng thử lại.')
    throw error
  }
}

export const updateUserAvatar = async (avatarFile: File, dispatch: any) => {
  dispatch(updateUserStart())
  try {
    const formData = new FormData()
    formData.append('file', avatarFile)
    await axiosInstance.patch(`/users/upload-avatar`, formData)
    dispatch(updateUserSuccess())
    toast.success('Cập nhật ảnh đại diện thành công!')
    await profile(dispatch)
  } catch (error) {
    // Handle error if needed
    console.log(error)
    dispatch(updateUserFailure())
    toast.error('Cập nhật ảnh đại diện thất bại. Vui lòng thử lại.' + error)
  }
}
