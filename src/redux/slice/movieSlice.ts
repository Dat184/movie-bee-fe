import { createSlice } from '@reduxjs/toolkit'
import type { Movie } from '../../types'

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    getAllMovies: {
      isFetching: false,
      error: false,
      success: false,
      meta: {
        current: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      },
      movies: [] as Movie[]
    },
    getMovieById: {
      isFetching: false,
      error: false,
      success: false,
      data: null as Movie | null
    },
    createMovie: {
      isFetching: false,
      error: false,
      success: false
    },
    updateMovie: {
      isFetching: false,
      error: false,
      success: false
    },
    deleteMovie: {
      isFetching: false,
      error: false,
      success: false
    }
  },
  reducers: {
    createMovieStart: (state) => {
      state.createMovie.isFetching = true
      state.createMovie.error = false
      state.createMovie.success = false
    },
    createMovieSuccess: (state) => {
      state.createMovie.isFetching = false
      state.createMovie.error = false
      state.createMovie.success = true
    },
    createMovieFailure: (state) => {
      state.createMovie.isFetching = false
      state.createMovie.error = true
      state.createMovie.success = false
    },

    getAllMoviesStart: (state) => {
      state.getAllMovies.isFetching = true
      state.getAllMovies.error = false
      state.getAllMovies.success = false
    },
    getAllMoviesSuccess: (state, action) => {
      state.getAllMovies.isFetching = false
      state.getAllMovies.error = false
      state.getAllMovies.success = true
      state.getAllMovies.movies = action.payload.result
      state.getAllMovies.meta = action.payload.meta
    },
    getAllMoviesFailure: (state) => {
      state.getAllMovies.isFetching = false
      state.getAllMovies.error = true
      state.getAllMovies.success = false
    },

    getMovieByIdStart: (state) => {
      state.getMovieById.isFetching = true
      state.getMovieById.error = false
      state.getMovieById.success = false
    },
    getMovieByIdSuccess: (state, action) => {
      state.getMovieById.isFetching = false
      state.getMovieById.error = false
      state.getMovieById.success = true
      state.getMovieById.data = action.payload.result
    },
    getMovieByIdFailure: (state) => {
      state.getMovieById.isFetching = false
      state.getMovieById.error = true
      state.getMovieById.success = false
      state.getMovieById.data = null
    },

    updateMovieStart: (state) => {
      state.updateMovie.isFetching = true
      state.updateMovie.error = false
      state.updateMovie.success = false
    },
    updateMovieSuccess: (state) => {
      state.updateMovie.isFetching = false
      state.updateMovie.error = false
      state.updateMovie.success = true
    },
    updateMovieFailure: (state) => {
      state.updateMovie.isFetching = false
      state.updateMovie.error = true
      state.updateMovie.success = false
    },
    deleteMovieStart: (state) => {
      state.deleteMovie.isFetching = true
      state.deleteMovie.error = false
      state.deleteMovie.success = false
    },
    deleteMovieSuccess: (state) => {
      state.deleteMovie.isFetching = false
      state.deleteMovie.error = false
      state.deleteMovie.success = true
    },
    deleteMovieFailure: (state) => {
      state.deleteMovie.isFetching = false
      state.deleteMovie.error = true
      state.deleteMovie.success = false
    }
  }
})

export const {
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  getAllMoviesStart,
  getAllMoviesSuccess,
  getAllMoviesFailure,
  getMovieByIdStart,
  getMovieByIdSuccess,
  getMovieByIdFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieFailure
} = movieSlice.actions
export default movieSlice.reducer
