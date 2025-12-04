import { toast } from 'react-toastify'
import axiosInstance from '../../axios/axios.interceptor'
import type { CommentCreate } from '../../types'
import {
  deleteCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  editCommentFailure,
  editCommentStart,
  editCommentSuccess,
  getAllCommentsFailure,
  getAllCommentsStart,
  getAllCommentsSuccess,
  getCommentsByMovieIdFailure,
  getCommentsByMovieIdStart,
  getCommentsByMovieIdSuccess,
  postCommentFailure,
  postCommentStart,
  postCommentSuccess
} from '../slice/commentSlice'

export const getAllComments = async (page: number, limit: number, dispatch: any) => {
  dispatch(getAllCommentsStart())
  try {
    // Giả sử bạn có một API endpoint để lấy tất cả bình luận
    const res = await axiosInstance.get(`/comments?current=${page}&pageSize=${limit}`)
    dispatch(getAllCommentsSuccess(res.data.result))
  } catch (error) {
    dispatch(getAllCommentsFailure())
    console.log(error)
  }
}

export const deleteComment = async (id: string, dispatch: any) => {
  dispatch(deleteCommentStart())
  try {
    await axiosInstance.delete(`/comments/${id}`)
    dispatch(deleteCommentSuccess())
  } catch (error) {
    dispatch(deleteCommentFailure())
    console.log(error)
  }
}

export const editComment = async (id: string, data: any, dispatch: any) => {
  dispatch(editCommentStart())
  try {
    await axiosInstance.patch(`/comments/${id}`, data)
    dispatch(editCommentSuccess())
  } catch (error) {
    dispatch(editCommentFailure())
    console.log(error)
  }
}

export const getCommentsByMovieId = async (movieId: string, current: number, pageSize: number, dispatch: any) => {
  dispatch(getCommentsByMovieIdStart())
  try {
    const res = await axiosInstance.get(`/comments/movie/${movieId}?current=${current}&pageSize=${pageSize}`)
    dispatch(getCommentsByMovieIdSuccess(res.data.result))
  } catch (error) {
    dispatch(getCommentsByMovieIdFailure())
    console.log(error)
  }
}

export const postComment = async (data: CommentCreate, current: number, dispatch: any) => {
  const { movieId, content } = data
  dispatch(postCommentStart())
  try {
    const res = await axiosInstance.post(`/comments`, {
      movieId,
      content
    })
    if (res.data.result.isSafe) {
      toast.success('Bình luận của bạn đã được gửi thành công!')
      getCommentsByMovieId(movieId, current, 10, dispatch)
    } else {
      toast.error('Bình luận của bạn chứa nội dung không phù hợp và đã bị từ chối.')
    }
    dispatch(postCommentSuccess(res.data.result))
  } catch (error) {
    console.log(error)
    dispatch(postCommentFailure())
  }
}
