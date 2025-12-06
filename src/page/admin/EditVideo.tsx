import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../../redux/api_request/movie_api'
import VideoPLayer from '../../components/VideoPLayer'
import { Upload, Film, Check, X } from 'lucide-react'
import Loading from '../../components/Loading'
import { uploadVideo } from '../../redux/api_request/video_api'

const EditVideo = () => {
  const { id } = useParams<{ id: string | undefined }>()
  const movie = useSelector((state: any) => state.movie.getMovieById?.data)
  const isLoading = useSelector((state: any) => state.video.uploadVideo?.isUploading)
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (id) {
      getMovieById(id, dispatch)
    }
  }, [id, dispatch, isLoading])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const handleUpload = () => {
    if (selectedFile && id) {
      console.log('Uploading:', selectedFile)
      // TODO: Implement upload logic
      uploadVideo(id, selectedFile, dispatch)
    }
  }

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <section className='w-full min-h-screen bg-gradient-to-b from-gray-900 to-black px-6 pt-10 pb-20'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex items-center gap-3'>
          <div>
            <h1 className='text-3xl font-bold text-white'>Chỉnh sửa Video</h1>
            <p className='text-gray-400 mt-1'>Phim: {movie?.title || 'Đang tải...'}</p>
          </div>
        </div>

        {/* Video Player */}
        <div className='bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
          <h2 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <Film className='w-5 h-5 text-purple-400' />
            Video hiện tại
          </h2>
          <div className='w-full aspect-video bg-black rounded-lg overflow-hidden'>
            {movie ? (
              <VideoPLayer movie={movie} />
            ) : (
              <div className='w-full h-full flex items-center justify-center text-gray-500'>Đang tải video...</div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className='bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
          <h2 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <Upload className='w-5 h-5 text-purple-400' />
            Tải lên video mới
          </h2>

          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
              isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 hover:border-gray-500 bg-gray-900/50'
            }`}
          >
            {!selectedFile ? (
              <>
                <input
                  type='file'
                  accept='video/*'
                  onChange={handleFileChange}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  id='video-upload'
                />
                <div className='text-center pointer-events-none'>
                  <Upload className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-300 text-lg mb-2'>Kéo thả video vào đây hoặc click để chọn</p>
                  <p className='text-gray-500 text-sm'>Hỗ trợ: MP4 (Max 5GB)</p>
                </div>
              </>
            ) : (
              <div className='text-center'>
                <Check className='w-16 h-16 text-green-500 mx-auto mb-4' />
                <p className='text-white text-lg mb-2'>{selectedFile.name}</p>
                <p className='text-gray-400 text-sm mb-4'>
                  Kích thước: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <div className='flex gap-3 justify-center relative z-10'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile()
                    }}
                    className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors'
                  >
                    <X className='w-4 h-4' />
                    Xóa
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUpload()
                    }}
                    className='flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all transform hover:scale-105'
                  >
                    <Upload className='w-4 h-4' />
                    Tải lên
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditVideo
