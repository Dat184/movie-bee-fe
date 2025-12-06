import { createSlice } from '@reduxjs/toolkit'

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    uploadVideo: {
      isUploading: false,
      error: false,
      success: false
    }
  },
  reducers: {
    uploadVideoStart: (state) => {
      state.uploadVideo.isUploading = true
      state.uploadVideo.error = false
      state.uploadVideo.success = false
    },
    uploadVideoSuccess: (state) => {
      state.uploadVideo.isUploading = false
      state.uploadVideo.error = false
      state.uploadVideo.success = true
    },
    uploadVideoFailure: (state) => {
      state.uploadVideo.isUploading = false
      state.uploadVideo.success = false
      state.uploadVideo.error = true
    }
  }
})

export const { uploadVideoStart, uploadVideoSuccess, uploadVideoFailure } = videoSlice.actions
export default videoSlice.reducer
