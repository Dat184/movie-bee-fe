import axiosInstance from '../../axios/axios.interceptor'
import {
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

export const getAllMovies = async (page: number, limit: number, dispatch: any) => {
  dispatch(getAllMoviesStart())
  try {
    const res = await axiosInstance.get(`/movies?current=${page}&pageSize=${limit}`)
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

export const updateMovie = async (id: string, data: FormData, dispatch: any) => {
  dispatch(updateMovieStart())
  try {
    await axiosInstance.patch(`/movies/${id}`, data)
    dispatch(updateMovieSuccess())
  } catch (error) {
    console.log(error)
    dispatch(updateMovieFailure())
  }
}
