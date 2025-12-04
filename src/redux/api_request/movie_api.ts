import { toast } from 'react-toastify'
import axiosInstance from '../../axios/axios.interceptor'
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  getAllMoviesFailure,
  getAllMoviesStart,
  getAllMoviesSuccess,
  getMovieByIdFailure,
  getMovieByIdStart,
  getMovieByIdSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess
} from '../slice/movieSlice'

export const getAllMovies = async (page: number, limit: number, filter: string, dispatch: any) => {
  dispatch(getAllMoviesStart())
  try {
    const res = await axiosInstance.get(`/movies?current=${page}&pageSize=${limit}&title=/${filter}/i`)
    dispatch(getAllMoviesSuccess(res.data.result))
  } catch (error) {
    console.log(error)
    dispatch(getAllMoviesFailure())
  }
}

export const getMovieById = async (id: string, dispatch: any) => {
  dispatch(getMovieByIdStart())
  try {
    const res = await axiosInstance.get(`/movies/${id}`)
    dispatch(getMovieByIdSuccess(res.data))
  } catch (error) {
    console.log(error)
    dispatch(getMovieByIdFailure())
  }
}

export const updateMovie = async (id: string, data: FormData, dispatch: any, navigate: any) => {
  dispatch(updateMovieStart())
  try {
    await axiosInstance.patch(`/movies/${id}`, data)
    dispatch(updateMovieSuccess())
    navigate(-1)
  } catch (error) {
    console.log(error)
    dispatch(updateMovieFailure())
  }
}

export const createMovie = async (data: FormData, dispatch: any, navigate: any) => {
  dispatch(createMovieStart())
  try {
    await axiosInstance.post('/movies', data)
    dispatch(createMovieSuccess())
    navigate(-1)

    toast.success('Tạo phim thành công!')
  } catch (error) {
    console.log(error)
    dispatch(createMovieFailure())
    toast.error('Tạo phim thất bại. Vui lòng thử lại.')
  }
}
