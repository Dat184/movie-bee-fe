import { createSlice } from '@reduxjs/toolkit'
import { get } from 'react-hook-form'
import type { comment } from '../../types'

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    postComment: {
      isFetching: false,
      error: false,
      success: false,
      data: null as comment | null
    },
    getCommentsByMovieId: {
      isFetching: false,
      error: false,
      success: false,
      meta: {
        current: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      },
      comments: [] as comment[]
    },
    deleteComment: {
      isFetching: false,
      error: false,
      success: false
    },
    editComment: {
      isFetching: false,
      error: false,
      success: false
    },
    getAllComments: {
      isFetching: false,
      error: false,
      success: false,
      meta: {
        current: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      },
      comments: [] as comment[]
    }
  },
  reducers: {
    // Post Comment
    postCommentStart: (state) => {
      state.postComment.isFetching = true
      state.postComment.error = false
      state.postComment.success = false
    },
    postCommentSuccess: (state, action) => {
      state.postComment.isFetching = false
      state.postComment.success = true
      state.postComment.data = action.payload
    },
    postCommentFailure: (state) => {
      state.postComment.isFetching = false
      state.postComment.error = true
    },

    // Get Comments By Movie ID
    getCommentsByMovieIdStart: (state) => {
      state.getCommentsByMovieId.isFetching = true
      state.getCommentsByMovieId.error = false
      state.getCommentsByMovieId.success = false
    },
    getCommentsByMovieIdSuccess: (state, action) => {
      state.getCommentsByMovieId.isFetching = false
      state.getCommentsByMovieId.success = true
      const newComments = action.payload.result
      const currentPage = action.payload.meta.current

      if (currentPage === 1) {
        state.getCommentsByMovieId.comments = newComments
      } else {
        state.getCommentsByMovieId.comments = [...state.getCommentsByMovieId.comments, ...newComments]
      }

      state.getCommentsByMovieId.meta = action.payload.meta
    },
    getCommentsByMovieIdFailure: (state) => {
      state.getCommentsByMovieId.isFetching = false
      state.getCommentsByMovieId.error = true
    },

    // Delete Comment
    deleteCommentStart: (state) => {
      state.deleteComment.isFetching = true
      state.deleteComment.error = false
      state.deleteComment.success = false
    },
    deleteCommentSuccess: (state) => {
      state.deleteComment.isFetching = false
      state.deleteComment.success = true
    },
    deleteCommentFailure: (state) => {
      state.deleteComment.isFetching = false
      state.deleteComment.error = true
    },
    // Edit Comment
    editCommentStart: (state) => {
      state.editComment.isFetching = true
      state.editComment.error = false
      state.editComment.success = false
    },
    editCommentSuccess: (state) => {
      state.editComment.isFetching = false
      state.editComment.success = true
    },
    editCommentFailure: (state) => {
      state.editComment.isFetching = false
      state.editComment.error = true
    },
    // Get All Comments
    getAllCommentsStart: (state) => {
      state.getAllComments.isFetching = true
      state.getAllComments.error = false
      state.getAllComments.success = false
    },
    getAllCommentsSuccess: (state, action) => {
      state.getAllComments.isFetching = false
      state.getAllComments.success = true
      state.getAllComments.comments = action.payload.result
      state.getAllComments.meta = action.payload.meta
    },
    getAllCommentsFailure: (state) => {
      state.getAllComments.isFetching = false
      state.getAllComments.error = true
    },

    // Clear Comments
    clearComments: (state) => {
      state.getCommentsByMovieId.comments = []
      state.getCommentsByMovieId.success = false
      state.getCommentsByMovieId.error = false
    }
  }
})

export const {
  postCommentStart,
  postCommentSuccess,
  postCommentFailure,
  getCommentsByMovieIdStart,
  getCommentsByMovieIdSuccess,
  getCommentsByMovieIdFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  editCommentStart,
  editCommentSuccess,
  editCommentFailure,
  getAllCommentsStart,
  getAllCommentsSuccess,
  getAllCommentsFailure,
  clearComments
} = commentSlice.actions
export default commentSlice.reducer
