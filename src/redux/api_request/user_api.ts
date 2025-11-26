import { toast } from 'react-toastify'
import axiosInstance from '../../axios/axios.interceptor'
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  getAllUsersFailure,
  getAllUsersStart,
  getAllUsersSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from '../slice/userSlice'
import type { UserCreate, UserUpdate } from '../../types'
import { profile } from './auth_api'

export const updateUser = async (userId: string, userData: UserUpdate, dispatch: any) => {
  dispatch(updateUserStart())
  try {
    await axiosInstance.patch(`/users/getById/${userId}`, userData)
    dispatch(updateUserSuccess())
    toast.success('Cập nhật thông tin người dùng thành công!')
    await profile(dispatch)
  } catch (error: any) {
    // Handle error if needed
    console.log(error)
    dispatch(updateUserFailure())
    toast.error('Cập nhật thông tin người dùng thất bại. Vui lòng thử lại.' + error.response.data.message)
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
  } catch (error: any) {
    // Handle error if needed
    console.log(error)
    dispatch(updateUserFailure())
    toast.error('Cập nhật ảnh đại diện thất bại. Vui lòng thử lại.' + error.response.data.message)
  }
}

export const getAllUsers = async (current: number, pageSize: number, dispatch: any) => {
  dispatch(getAllUsersStart())
  try {
    const res = await axiosInstance.get(`/users?current=${current}&pageSize=${pageSize}`)
    dispatch(getAllUsersSuccess(res.data))
    // toast.success('Lấy danh sách người dùng thành công!')
  } catch (error: any) {
    // Handle error if needed
    console.log(error)
    dispatch(getAllUsersFailure())
    toast.error('Lấy danh sách người dùng thất bại. Vui lòng thử lại.' + error)
  }
}

export const createUser = async (userData: UserCreate, dispatch: any) => {
  dispatch(createUserStart())
  try {
    await axiosInstance.post(`/users/create`, userData)
    dispatch(createUserSuccess())
    toast.success('Tạo người dùng mới thành công!')
  } catch (error: any) {
    console.log(error)
    dispatch(createUserFailure())
    toast.error('Tạo người dùng mới thất bại. Vui lòng thử lại.' + error.response.data.message)
  }
}

export const getUserById = async (userId: string, dispatch: any) => {
  dispatch(getUserStart())
  try {
    const res = await axiosInstance.get(`/users/${userId}`)
    dispatch(getUserSuccess(res.data))
  } catch (error) {
    console.log(error)
    dispatch(getUserFailure())
  }
}

export const deleteUser = async (userId: string, dispatch: any) => {
  // Implementation for deleting a user can be added here
  dispatch(deleteUserStart())
  try {
    await axiosInstance.delete(`/users/${userId}`)
    dispatch(deleteUserSuccess(userId))
    toast.success('Xóa người dùng thành công!')
  } catch (error: any) {
    console.log(error)
    dispatch(getUserFailure())
    toast.error('Xóa người dùng thất bại. Vui lòng thử lại.' + error.response.data.message)
  }
}
