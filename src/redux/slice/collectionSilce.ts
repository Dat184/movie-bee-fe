import { createSlice } from '@reduxjs/toolkit'
import type { Movie } from '../../types'
import { get } from 'react-hook-form'

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    banner: {
      isFetching: false,
      error: false,
      success: false,
      movies: [] as Movie[]
    },
    maverPlaylist: {
      isFetching: false,
      error: false,
      success: false,
      movies: [] as Movie[]
    },
    animePlaylist: {
      isFetching: false,
      error: false,
      success: false,
      movies: [] as Movie[]
    },
    actionPlaylist: {
      isFetching: false,
      error: false,
      success: false,
      movies: [] as Movie[]
    },
    cartoonPlaylist: {
      isFetching: false,
      error: false,
      success: false,
      movies: [] as Movie[]
    },
    cinemaPlaylist: {
      isFetching: false,
      error: false,
      success: false,
      movies: [] as Movie[]
    }
  },
  reducers: {
    // Banner
    getBannerStart: (state) => {
      state.banner.isFetching = true
      state.banner.error = false
      state.banner.success = false
    },
    getBannerSuccess: (state, action) => {
      state.banner.isFetching = false
      state.banner.success = true
      state.banner.movies = action.payload
    },
    getBannerFailure: (state) => {
      state.banner.isFetching = false
      state.banner.error = true
    },

    getMaverPlaylistStart: (state) => {
      state.maverPlaylist.isFetching = true
      state.maverPlaylist.error = false
      state.maverPlaylist.success = false
    },
    getMaverPlaylistSuccess: (state, action) => {
      state.maverPlaylist.isFetching = false
      state.maverPlaylist.success = true
      state.maverPlaylist.movies = action.payload
    },
    getMaverPlaylistFailure: (state) => {
      state.maverPlaylist.isFetching = false
      state.maverPlaylist.error = true
    },

    // Anime Playlist
    getAnimePlaylistStart: (state) => {
      state.animePlaylist.isFetching = true
      state.animePlaylist.error = false
      state.animePlaylist.success = false
    },
    getAnimePlaylistSuccess: (state, action) => {
      state.animePlaylist.isFetching = false
      state.animePlaylist.success = true
      state.animePlaylist.movies = action.payload
    },
    getAnimePlaylistFailure: (state) => {
      state.animePlaylist.isFetching = false
      state.animePlaylist.error = true
    },

    // Action Playlist
    getActionPlaylistStart: (state) => {
      state.actionPlaylist.isFetching = true
      state.actionPlaylist.error = false
      state.actionPlaylist.success = false
    },
    getActionPlaylistSuccess: (state, action) => {
      state.actionPlaylist.isFetching = false
      state.actionPlaylist.success = true
      state.actionPlaylist.movies = action.payload
    },
    getActionPlaylistFailure: (state) => {
      state.actionPlaylist.isFetching = false
      state.actionPlaylist.error = true
    },

    // Cartoon Playlist
    getCartoonPlaylistStart: (state) => {
      state.cartoonPlaylist.isFetching = true
      state.cartoonPlaylist.error = false
      state.cartoonPlaylist.success = false
    },
    getCartoonPlaylistSuccess: (state, action) => {
      state.cartoonPlaylist.isFetching = false
      state.cartoonPlaylist.success = true
      state.cartoonPlaylist.movies = action.payload
    },
    getCartoonPlaylistFailure: (state) => {
      state.cartoonPlaylist.isFetching = false
      state.cartoonPlaylist.error = true
    },

    // Cinema Playlist
    getCinemaPlaylistStart: (state) => {
      state.cinemaPlaylist.isFetching = true
      state.cinemaPlaylist.error = false
      state.cinemaPlaylist.success = false
    },
    getCinemaPlaylistSuccess: (state, action) => {
      state.cinemaPlaylist.isFetching = false
      state.cinemaPlaylist.success = true
      state.cinemaPlaylist.movies = action.payload
    },
    getCinemaPlaylistFailure: (state) => {
      state.cinemaPlaylist.isFetching = false
      state.cinemaPlaylist.error = true
    }
  }
})

export const {
  // Banner
  getBannerStart,
  getBannerSuccess,
  getBannerFailure,

  // Maver Playlist
  getMaverPlaylistStart,
  getMaverPlaylistSuccess,
  getMaverPlaylistFailure,

  // Anime Playlist
  getAnimePlaylistStart,
  getAnimePlaylistSuccess,
  getAnimePlaylistFailure,
  // Action Playlist
  getActionPlaylistStart,
  getActionPlaylistSuccess,
  getActionPlaylistFailure,

  // Cartoon Playlist
  getCartoonPlaylistStart,
  getCartoonPlaylistSuccess,
  getCartoonPlaylistFailure,
  // Cinema Playlist
  getCinemaPlaylistStart,
  getCinemaPlaylistSuccess,
  getCinemaPlaylistFailure
} = collectionSlice.actions
export default collectionSlice.reducer
