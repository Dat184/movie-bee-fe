import { toast } from 'react-toastify'
import axiosInstance from '../../axios/axios.interceptor'
import {
  createGenreFailure,
  createGenreStart,
  createGenreSuccess,
  deleteGenreFailure,
  deleteGenreSuccess,
  getAllGenresFailure,
  getAllGenresStart,
  getAllGenresSuccess,
  getGenreByIdFailure,
  getGenreByIdStart,
  getGenreByIdSuccess,
  updateGenreFailure,
  updateGenreStart,
  updateGenreSuccess
} from '../slice/genreSlice'
import { deleteCastFailure, deleteCastStart, deleteCastSuccess } from '../slice/castSlice'

export const createGenre = async (name: string, dispatch: any) => {
  dispatch(createGenreStart())
  try {
    await axiosInstance.post(`/genres`, { name })
    dispatch(createGenreSuccess())
    toast.success('Tạo thể loại mới thành công!')
  } catch (error: any) {
    console.log(error)
    dispatch(createGenreFailure())
    toast.error('Tạo thể loại mới thất bại. Vui lòng thử lại.' + error.response.data.message)
  }
}

export const getAllGenres = async (current: number, pageSize: number, filter: string, dispatch: any) => {
  dispatch(getAllGenresStart())
  try {
    const res = await axiosInstance.get(`/genres?current=${current}&pageSize=${pageSize}&name=/${filter}/i`)
    dispatch(getAllGenresSuccess(res.data))
  } catch (error: any) {
    console.log(error)
    dispatch(getAllGenresFailure())
    toast.error('Lấy danh sách thể loại thất bại. Vui lòng thử lại.' + error.response.data.message)
  }
}

export const getGenreById = async (genreId: string, dispatch: any) => {
  dispatch(getGenreByIdStart())
  try {
    const res = await axiosInstance.get(`/genres/${genreId}`)
    dispatch(getGenreByIdSuccess(res.data.result))
  } catch (error) {
    console.log(error)
    dispatch(getGenreByIdFailure())
  }
}

export const deleteGenre = async (_id: string, dispatch: any) => {
  dispatch(deleteCastStart())
  try {
    await axiosInstance.delete(`/genres/${_id}`)
    dispatch(deleteGenreSuccess(_id))
    toast.success('Xóa thể loại thành công!')
  } catch (error: any) {
    console.log(error)
    toast.error('Xóa thể loại thất bại. Vui lòng thử lại.' + error.response.data.message)
    dispatch(deleteGenreFailure())
  }
}

export const updateGenre = async (genreId: string, name: string, dispatch: any) => {
  dispatch(updateGenreStart())
  try {
    await axiosInstance.patch(`/genres/${genreId}`, { name })
    dispatch(updateGenreSuccess())
    toast.success('Cập nhật thể loại thành công!')
  } catch (error: any) {
    console.log(error)
    toast.error('Cập nhật thể loại thất bại. Vui lòng thử lại.' + error.response.data.message)
    dispatch(updateGenreFailure())
  }
}
