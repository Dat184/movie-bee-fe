import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false
    },
    register: {
      isFetching: false,
      error: false,
      success: false
    },
    logout: {
      isFetching: false,
      error: false,
      success: false
    },
    profile: {
      userInfo: null,
      isFetching: false,
      error: false
    },
    confirmEmail: {
      isFetching: false,
      error: false,
      success: false
    }
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true
      state.login.currentUser = null
      state.login.error = false
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false
      state.login.currentUser = action.payload
      state.login.error = false
    },
    loginFailure: (state) => {
      state.login.isFetching = false
      state.login.currentUser = null
      state.login.error = true
    },

    registerStart: (state) => {
      state.register.isFetching = true
      state.register.error = false
      state.register.success = false
    },
    registerSuccess: (state) => {
      state.register.isFetching = false
      state.register.error = false
      state.register.success = true
    },
    registerFailure: (state) => {
      state.register.isFetching = false
      state.register.error = true
      state.register.success = false
    },

    logoutStart: (state) => {
      state.logout.isFetching = true
      state.logout.error = false
      state.logout.success = false
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false
      state.logout.error = false
      state.logout.success = true
      state.login.currentUser = null
    },
    logoutFailure: (state) => {
      state.logout.isFetching = false
      state.logout.error = true
      state.logout.success = false
    },

    profileStart: (state) => {
      state.profile.isFetching = true
      state.profile.error = false
    },
    profileSuccess: (state, action) => {
      state.profile.isFetching = false
      state.profile.userInfo = action.payload
      state.profile.error = false
    },
    profileFailure: (state) => {
      state.profile.isFetching = false
      state.profile.userInfo = null
      state.profile.error = true
    },

    confirmEmailStart: (state) => {
      state.confirmEmail.isFetching = true
      state.confirmEmail.error = false
      state.confirmEmail.success = false
    },
    confirmEmailSuccess: (state) => {
      state.confirmEmail.isFetching = false
      state.confirmEmail.error = false
      state.confirmEmail.success = true
    },
    confirmEmailFailure: (state) => {
      state.confirmEmail.isFetching = false
      state.confirmEmail.error = true
      state.confirmEmail.success = false
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,

  registerStart,
  registerSuccess,
  registerFailure,

  logoutStart,
  logoutSuccess,
  logoutFailure,

  profileStart,
  profileSuccess,
  profileFailure,

  confirmEmailStart,
  confirmEmailSuccess,
  confirmEmailFailure
} = authSlice.actions

export default authSlice.reducer
