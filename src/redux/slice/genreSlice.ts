import { createSlice } from '@reduxjs/toolkit'
import type { genre } from '../../types'

const genreSlice = createSlice({
  name: 'genre',
  initialState: {
    createGenre: {
      isFetching: false,
      error: false,
      success: false
    },
    getAllGenres: {
      isFetching: false,
      error: false,
      success: false,
      genres: [] as genre[],
      meta: {
        current: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      }
    },
    deleteGenre: {
      isFetching: false,
      error: false,
      success: false
    },
    getGenreById: {
      isFetching: false,
      error: false,
      success: false,
      data: null as genre | null
    },
    updateGenre: {
      isFetching: false,
      error: false,
      success: false
    }
  },
  reducers: {
    createGenreStart: (state) => {
      state.createGenre.isFetching = true
      state.createGenre.error = false
      state.createGenre.success = false
    },
    createGenreSuccess: (state) => {
      state.createGenre.isFetching = false
      state.createGenre.error = false
      state.createGenre.success = true
    },
    createGenreFailure: (state) => {
      state.createGenre.isFetching = false
      state.createGenre.error = true
      state.createGenre.success = false
    },

    getAllGenresStart: (state) => {
      state.getAllGenres.isFetching = true
      state.getAllGenres.error = false
      state.getAllGenres.success = false
    },
    getAllGenresSuccess: (state, action) => {
      state.getAllGenres.isFetching = false
      state.getAllGenres.error = false
      state.getAllGenres.success = true
      state.getAllGenres.genres = action.payload.result.result
      state.getAllGenres.meta = action.payload.result.meta
    },
    getAllGenresFailure: (state) => {
      state.getAllGenres.isFetching = false
      state.getAllGenres.error = true
      state.getAllGenres.success = false
      state.getAllGenres.genres = []
    },

    deleteGenreStart: (state) => {
      state.deleteGenre.isFetching = true
      state.deleteGenre.error = false
      state.deleteGenre.success = false
    },
    deleteGenreSuccess: (state, action) => {
      state.deleteGenre.isFetching = false
      state.deleteGenre.error = false
      state.deleteGenre.success = true
      state.getAllGenres.genres = state.getAllGenres.genres.filter((genre) => genre._id !== action.payload)
    },
    deleteGenreFailure: (state) => {
      state.deleteGenre.isFetching = false
      state.deleteGenre.error = true
      state.deleteGenre.success = false
    },

    getGenreByIdStart: (state) => {
      state.getGenreById.isFetching = true
      state.getGenreById.error = false
      state.getGenreById.success = false
    },
    getGenreByIdSuccess: (state, action) => {
      state.getGenreById.isFetching = false
      state.getGenreById.error = false
      state.getGenreById.success = true
      state.getGenreById.data = action.payload
    },
    getGenreByIdFailure: (state) => {
      state.getGenreById.isFetching = false
      state.getGenreById.error = true
      state.getGenreById.success = false
    },

    updateGenreStart: (state) => {
      state.updateGenre.isFetching = true
      state.updateGenre.error = false
      state.updateGenre.success = false
    },
    updateGenreSuccess: (state) => {
      state.updateGenre.isFetching = false
      state.updateGenre.error = false
      state.updateGenre.success = true
    },
    updateGenreFailure: (state) => {
      state.updateGenre.isFetching = false
      state.updateGenre.error = true
      state.updateGenre.success = false
    },

    clearGenreData: (state) => {
      state.getGenreById.data = null
    }
  }
})

export const {
  createGenreStart,
  createGenreSuccess,
  createGenreFailure,
  getAllGenresStart,
  getAllGenresSuccess,
  getAllGenresFailure,
  deleteGenreStart,
  deleteGenreSuccess,
  deleteGenreFailure,
  getGenreByIdStart,
  getGenreByIdSuccess,
  getGenreByIdFailure,
  updateGenreStart,
  updateGenreSuccess,
  updateGenreFailure,
  clearGenreData
} = genreSlice.actions
export default genreSlice.reducer
