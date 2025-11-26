import { createSlice } from '@reduxjs/toolkit'
import { get } from 'react-hook-form'
import type { User } from '../../types'

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
      users: [] as User[],
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
    },
    createUser: {
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
      state.getAllUsers.users = action.payload.result.result
      state.getAllUsers.meta = action.payload.result.meta
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
    deleteUserSuccess: (state, action) => {
      state.deleteUser.isFetching = false
      state.deleteUser.error = false
      state.deleteUser.success = true
      state.getAllUsers.users = state.getAllUsers.users.filter((user) => user._id !== action.payload)
    },
    deleteUserFailure: (state) => {
      state.deleteUser.isFetching = false
      state.deleteUser.error = true
      state.deleteUser.success = false
    },
    createUserStart: (state) => {
      state.createUser.isFetching = true
      state.createUser.error = false
      state.createUser.success = false
    },
    createUserSuccess: (state) => {
      state.createUser.isFetching = false
      state.createUser.error = false
      state.createUser.success = true
    },
    createUserFailure: (state) => {
      state.createUser.isFetching = false
      state.createUser.error = true
      state.createUser.success = false
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
  deleteUserFailure,

  createUserStart,
  createUserSuccess,
  createUserFailure
} = userSlice.actions
export default userSlice.reducer
