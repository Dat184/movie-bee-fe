import { createSlice } from '@reduxjs/toolkit'
import { get } from 'react-hook-form'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    getUser: {
      isFetching: false,
      error: false,
      data: null
    },
    updateUser: {
      isFetching: false,
      error: false,
      success: false
    },
    getAllUsers: {
      isFetching: false,
      error: false,
      users: [],
      meta: {
        current: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      }
    },
    deleteUser: {
      isFetching: false,
      error: false,
      success: false
    }
  },
  reducers: {
    getUserStart: (state) => {
      state.getUser.isFetching = true
      state.getUser.error = false
      state.getUser.data = null
    },
    getUserSuccess: (state, action) => {
      state.getUser.isFetching = false
      state.getUser.error = false
      state.getUser.data = action.payload
    },
    getUserFailure: (state) => {
      state.getUser.isFetching = false
      state.getUser.error = true
      state.getUser.data = null
    },

    updateUserStart: (state) => {
      state.updateUser.isFetching = true
      state.updateUser.error = false
      state.updateUser.success = false
    },
    updateUserSuccess: (state) => {
      state.updateUser.isFetching = false
      state.updateUser.error = false
      state.updateUser.success = true
    },
    updateUserFailure: (state) => {
      state.updateUser.isFetching = false
      state.updateUser.error = true
      state.updateUser.success = false
    },

    getAllUsersStart: (state) => {
      state.getAllUsers.isFetching = true
      state.getAllUsers.error = false
    },
    getAllUsersSuccess: (state, action) => {
      state.getAllUsers.isFetching = false
      state.getAllUsers.error = false
      state.getAllUsers.users = action.payload.result
      state.getAllUsers.meta = action.payload.meta
    },
    getAllUsersFailure: (state) => {
      state.getAllUsers.isFetching = false
      state.getAllUsers.error = true
      state.getAllUsers.users = []
    },

    deleteUserStart: (state) => {
      state.deleteUser.isFetching = true
      state.deleteUser.error = false
      state.deleteUser.success = false
    },
    deleteUserSuccess: (state) => {
      state.deleteUser.isFetching = false
      state.deleteUser.error = false
      state.deleteUser.success = true
    },
    deleteUserFailure: (state) => {
      state.deleteUser.isFetching = false
      state.deleteUser.error = true
      state.deleteUser.success = false
    }
  }
})

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,

  updateUserStart,
  updateUserSuccess,
  updateUserFailure,

  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailure,

  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions
export default userSlice.reducer
