import { get } from 'react-hook-form'
import {
  getActionPlaylistFailure,
  getActionPlaylistStart,
  getActionPlaylistSuccess,
  getAnimePlaylistFailure,
  getAnimePlaylistStart,
  getAnimePlaylistSuccess,
  getBannerFailure,
  getBannerStart,
  getBannerSuccess,
  getCartoonPlaylistFailure,
  getCartoonPlaylistStart,
  getCartoonPlaylistSuccess,
  getCinemaPlaylistFailure,
  getCinemaPlaylistStart,
  getCinemaPlaylistSuccess,
  getMaverPlaylistFailure,
  getMaverPlaylistStart,
  getMaverPlaylistSuccess
} from '../slice/collectionSilce'
import axiosInstance from '../../axios/axios.interceptor'

export const getMaverMovie = async (id: string, dispatch: any) => {
  dispatch(getMaverPlaylistStart())
  try {
    const res = await axiosInstance.get(`/movies/playlist?genreId=${id}`)
    dispatch(getMaverPlaylistSuccess(res.data.result))
  } catch (error) {
    dispatch(getMaverPlaylistFailure())
    console.log(error)
  }
}

export const getBannerMovie = async (dispatch: any) => {
  dispatch(getBannerStart())
  try {
    const res = await axiosInstance.get(`/movies/banner`)
    dispatch(getBannerSuccess(res.data.result))
  } catch (error) {
    dispatch(getBannerFailure())
    console.log(error)
  }
}

export const getAnimeMovie = async (id: string, dispatch: any) => {
  dispatch(getAnimePlaylistStart())
  try {
    const res = await axiosInstance.get(`/movies/playlist?genreId=${id}`)
    dispatch(getAnimePlaylistSuccess(res.data.result))
  } catch (error) {
    dispatch(getAnimePlaylistFailure())
    console.log(error)
  }
}

export const getCinemaMovie = async (id: string, dispatch: any) => {
  dispatch(getCinemaPlaylistStart())
  try {
    const res = await axiosInstance.get(`/movies/playlist?genreId=${id}`)
    dispatch(getCinemaPlaylistSuccess(res.data.result))
  } catch (error) {
    dispatch(getCinemaPlaylistFailure())
    console.log(error)
  }
}

export const getActionMovie = async (id: string, dispatch: any) => {
  dispatch(getActionPlaylistStart())
  try {
    const res = await axiosInstance.get(`/movies/playlist?genreId=${id}`)
    dispatch(getActionPlaylistSuccess(res.data.result))
  } catch (error) {
    dispatch(getActionPlaylistFailure())
    console.log(error)
  }
}

export const getCartoonMovie = async (id: string, dispatch: any) => {
  dispatch(getCartoonPlaylistStart())
  try {
    const res = await axiosInstance.get(`/movies/playlist?genreId=${id}`)
    dispatch(getCartoonPlaylistSuccess(res.data.result))
  } catch (error) {
    dispatch(getCartoonPlaylistFailure())
    console.log(error)
  }
}
