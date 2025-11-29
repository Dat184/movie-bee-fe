import { createSlice } from '@reduxjs/toolkit'
import type { cast } from '../../types'

const castSlice = createSlice({
  name: 'cast',
  initialState: {
    createCast: {
      isFetching: false,
      error: false,
      success: false
    },
    getAllCasts: {
      isFetching: false,
      error: false,
      success: false,
      casts: [] as cast[]
    },
    deleteCast: {
      isFetching: false,
      error: false,
      success: false
    },
    getCastById: {
      isFetching: false,
      error: false,
      success: false,
      data: null as cast | null
    }
  },
  reducers: {
    createCastStart: (state) => {
      state.createCast.isFetching = true
      state.createCast.error = false
      state.createCast.success = false
    },
    createCastSuccess: (state) => {
      state.createCast.isFetching = false
      state.createCast.error = false
      state.createCast.success = true
    },
    createCastFailure: (state) => {
      state.createCast.isFetching = false
      state.createCast.error = true
      state.createCast.success = false
    },
    getAllCastsStart: (state) => {
      state.getAllCasts.isFetching = true
      state.getAllCasts.error = false
      state.getAllCasts.success = false
    },
    getAllCastsSuccess: (state, action) => {
      state.getAllCasts.isFetching = false
      state.getAllCasts.error = false
      state.getAllCasts.success = true
      state.getAllCasts.casts = action.payload
    },
    getAllCastsFailure: (state) => {
      state.getAllCasts.isFetching = false
      state.getAllCasts.error = true
      state.getAllCasts.success = false
    },

    getCastByIdStart: (state) => {
      state.getCastById.isFetching = true
      state.getCastById.error = false
      state.getCastById.success = false
      state.getCastById.data = null
    },
    getCastByIdSuccess: (state, action) => {
      state.getCastById.isFetching = false
      state.getCastById.error = false
      state.getCastById.success = true
      state.getCastById.data = action.payload
    },
    getCastByIdFailure: (state) => {
      state.getCastById.isFetching = false
      state.getCastById.error = true
      state.getCastById.success = false
      state.getCastById.data = null
    },
    deleteCastStart: (state) => {
      state.deleteCast.isFetching = true
      state.deleteCast.error = false
      state.deleteCast.success = false
    },
    deleteCastSuccess: (state) => {
      state.deleteCast.isFetching = false
      state.deleteCast.error = false
      state.deleteCast.success = true
    },
    deleteCastFailure: (state) => {
      state.deleteCast.isFetching = false
      state.deleteCast.error = true
      state.deleteCast.success = false
    }
  }
})

export const {
  createCastStart,
  createCastSuccess,
  createCastFailure,
  getAllCastsStart,
  getAllCastsSuccess,
  getAllCastsFailure,
  getCastByIdStart,
  getCastByIdSuccess,
  getCastByIdFailure,
  deleteCastStart,
  deleteCastSuccess,
  deleteCastFailure
} = castSlice.actions
export default castSlice.reducer
