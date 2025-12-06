import axiosInstance from '../../axios/axios.interceptor'
import { uploadVideoFailure, uploadVideoStart, uploadVideoSuccess } from '../slice/videoSlice'

export const uploadVideo = async (movieId: string, video: File, dispatch: any) => {
  const formData = new FormData()
  formData.append('video', video)

  dispatch(uploadVideoStart())
  try {
    await axiosInstance.post(`/video/upload/${movieId}`, formData)
    dispatch(uploadVideoSuccess())
  } catch (error) {
    console.log(error)
    dispatch(uploadVideoFailure())
  }
}
