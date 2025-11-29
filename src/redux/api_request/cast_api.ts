import { toast } from 'react-toastify'
import axiosInstance from '../../axios/axios.interceptor'
import { createCastFailure, createCastStart, createCastSuccess } from '../slice/castSlice'

export const createCast = async (avatarFile: any, name: string, dispatch: any) => {
  dispatch(createCastStart())
  try {
    const formData = new FormData()
    formData.append('file', avatarFile)
    formData.append('name', name)
    await axiosInstance.post(`/casts`, formData)
    dispatch(createCastSuccess())
    toast.success('Tạo diễn viên mới thành công!')
  } catch (error: any) {
    dispatch(createCastFailure())
    toast.error('Tạo diễn viên mới thất bại!' + error.response.data.message)
  }
}
