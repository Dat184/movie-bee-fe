import { toast } from 'react-toastify'
import axiosInstance from '../../axios/axios.interceptor'
import {
  createCastFailure,
  createCastStart,
  createCastSuccess,
  deleteCastFailure,
  deleteCastStart,
  deleteCastSuccess,
  getAllCastsFailure,
  getAllCastsStart,
  getAllCastsSuccess,
  getCastByIdFailure,
  getCastByIdStart,
  getCastByIdSuccess
} from '../slice/castSlice'

export const createCast = async (avatarFile: any, name: string, dispatch: any) => {
  dispatch(createCastStart())
  try {
    const formData = new FormData()
    formData.append('file', avatarFile)
    formData.append('name', name)
    await axiosInstance.post(`/cast`, formData)
    dispatch(createCastSuccess())
    // toast.success('Tạo diễn viên mới thành công!')
  } catch (error: any) {
    dispatch(createCastFailure())
    toast.error('Tạo diễn viên mới thất bại!' + error.response.data.message)
  }
}

export const getAllCasts = async (page: number, limit: number, filter: string, dispatch: any) => {
  dispatch(getAllCastsStart())
  try {
    const res = await axiosInstance.get(`/cast?current=${page}&pageSize=${limit}&name=/${filter}/i`)
    dispatch(getAllCastsSuccess(res.data.result))
  } catch (error: any) {
    dispatch(getAllCastsFailure())
    toast.error('Lấy danh sách diễn viên thất bại!' + error.response.data.message)
  }
}

export const getCastById = async (castId: string, dispatch: any) => {
  dispatch(getCastByIdStart())
  try {
    const res = await axiosInstance.get(`/cast/${castId}`)
    dispatch(getCastByIdSuccess(res.data.result))
  } catch (error: any) {
    dispatch(getCastByIdFailure())
    toast.error('Lấy thông tin diễn viên thất bại!' + error.response.data.message)
  }
}

export const deleteCast = async (id: string, dispatch: any) => {
  dispatch(deleteCastStart())
  try {
    await axiosInstance.delete(`/cast/${id}`)
    dispatch(deleteCastSuccess())
    toast.warning('Xóa diễn viên thành công!')
  } catch (error: any) {
    dispatch(deleteCastFailure())
    toast.error('Xóa diễn viên thất bại! ' + error.response.data.message)
  }
}
