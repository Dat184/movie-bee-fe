import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import type { cast, genre } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { createMovie, getMovieById, updateMovie } from '../../redux/api_request/movie_api'
import GenreSelector from '../../components/admin/movie/GenreSelector'
import CastSelector from '../../components/admin/movie/CastSelector'
import { toast } from 'react-toastify'

const schema = Yup.object({
  title: Yup.string().required('Vui lòng nhập tên phim'),
  overview: Yup.string(),
  posterPath: Yup.mixed().nullable(),
  backdropPath: Yup.mixed().nullable(),
  trailerUrl: Yup.string(),
  imdbRating: Yup.string().matches(
    /^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/,
    'Vui lòng nhập điểm IMDB hợp lệ từ 0 đến 10'
  ),
  selectedGenres: Yup.array().of(Yup.string()),
  selectedCasts: Yup.array().of(Yup.string()),
  isDisplay: Yup.string().required('Vui lòng chọn trạng thái phim'),
  isBanner: Yup.string().required('Vui lòng chọn trạng thái banner phim')
})

const MovieDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string | undefined }>()
  const movie = useSelector((state: any) => state.movie.getMovieById?.data)
  const isLoading = useSelector((state: any) => state.movie.getMovieById?.isFetching)
  const [selectedGenres, setSelectedGenres] = useState<genre[]>([])
  const [selectedCasts, setSelectedCasts] = useState<cast[]>([])
  const [posterPreview, setPosterPreview] = useState<string>('')
  const [backdropPreview, setBackdropPreview] = useState<string>('')

  const handleGenresChange = (genres: genre[]) => {
    setSelectedGenres(genres)
    setValue(
      'selectedGenres',
      genres.map((g) => g._id)
    )
  }

  const handleCastsChange = (casts: cast[]) => {
    setSelectedCasts(casts)
    setValue(
      'selectedCasts',
      casts.map((c) => c._id)
    )
  }

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file ảnh')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước ảnh không được vượt quá 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPosterPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleBackdropUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file ảnh')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước ảnh không được vượt quá 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setBackdropPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (id) {
      getMovieById(id, dispatch)
    }
  }, [id, dispatch])

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (id && movie) {
      reset({
        title: movie?.title || '',
        overview: movie?.overview || '',
        posterPath: null,
        backdropPath: null,
        imdbRating: movie?.imdbRating || '',
        trailerUrl: movie?.trailerUrl || '',
        isDisplay: movie?.isDisplay || false,
        isBanner: movie?.isBanner || false,
        selectedGenres: movie?.genres.map((g: any) => g.genreId?._id || g._id) || [],
        selectedCasts: movie?.casts.map((c: any) => c.castId?._id || c._id) || []
      })
      setPosterPreview(movie?.posterPath || '')
      setBackdropPreview(movie?.backdropPath || '')
      // Set selected genres for display
      if (movie?.genres) {
        // Map genreId object to genre format
        const mappedGenres = movie.genres.map((g: any) => ({
          _id: g.genreId?._id || g._id,
          name: g.genreId?.name || g.name
        }))
        setSelectedGenres(mappedGenres)
      }
      // Set selected casts for display
      if (movie?.casts) {
        // Map castId object to cast format
        const mappedCasts = movie.casts.map((c: any) => ({
          _id: c.castId?._id || c._id,
          name: c.castId?.name || c.name,
          avatarPath: c.castId?.avatarPath || c.avatarPath
        }))
        setSelectedCasts(mappedCasts)
      }
    }
  }, [movie, id, reset])

  const onSubmit = (data: any) => {
    const { title, overview, imdbRating, trailerUrl, isDisplay, selectedGenres, selectedCasts, isBanner } = data
    const poster = data.posterPath?.[0] || null
    const backdrop = data.backdropPath?.[0] || null
    const formData = new FormData()
    formData.append('title', title)
    formData.append('overview', overview)
    formData.append('imdbRating', imdbRating)
    formData.append('trailerUrl', trailerUrl)
    formData.append('isDisplay', isDisplay)
    formData.append('isBanner', isBanner)
    selectedGenres.forEach((genreId: string) => formData.append('genreIds[]', genreId))
    selectedCasts.forEach((castId: string) => formData.append('castIds[]', castId))
    if (poster) {
      formData.append('poster', poster)
    }
    if (backdrop) {
      formData.append('backdrop', backdrop)
    }
    if (id !== undefined) {
      updateMovie(id, formData, dispatch, navigate)
      return
    } else {
      createMovie(formData, dispatch, navigate)
    }
  }

  if (isLoading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <p>Đang tải dữ liệu phim...</p>
      </div>
    )
  }

  return (
    <section className='w-full min-h-screen px-5 pt-10 flex flex-col space-y-6 mb-10'>
      <div className='flex flex-row justify-start items-center gap-4 mb-6 h-10 w-full'>
        <button
          className='p-2 rounded-lg border border-gray-500 hover:bg-gray-700 cursor-pointer'
          onClick={handleGoBack}
        >
          <ArrowLeft />
        </button>
        <div>
          <h1 className='text-2xl font-bold'>{id ? 'Chỉnh sửa phim' : 'Thêm phim mới'}</h1>
          <p className='text-gray-400'>{id ? 'Cập nhật thông tin phim' : 'Điền thông tin phim mới'}</p>
        </div>
      </div>

      <form className='flex flex-col gap-6 w-full max-w-4xl mx-auto' onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields will go here */}
        <div className='flex flex-col gap-6 w-full max-w-4xl mx-auto'>
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Thông tin cơ bản</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='title' className='font-medium'>
                  Tên phim
                </label>
                <input
                  type='text'
                  id='title'
                  className='border border-gray-600 bg-gray-700 rounded-lg p-2 focus:outline-none focus:border-primary'
                  placeholder='Nhập tên phim'
                  {...register('title')}
                />
                {errors?.title && <div className='text-sm text-red-500'>{errors.title.message}</div>}
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='imdbRating' className='font-medium'>
                    Điểm IMDB Rating
                  </label>
                  <input
                    type='string'
                    id='imdbRating'
                    className='border border-gray-600 bg-gray-700 rounded-lg p-2 focus:outline-none focus:border-primary'
                    placeholder='Nhập điểm IMDB Rating'
                    {...register('imdbRating')}
                    min='0'
                  />
                  {errors?.imdbRating && <div className='text-sm text-red-500'>{errors.imdbRating.message}</div>}
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='isBanner' className='font-medium'>
                    Làm Banner
                  </label>
                  <select
                    id='isBanner'
                    className='border border-gray-600 bg-gray-700 rounded-lg p-2 appearance-none focus:outline-none focus:border-primary'
                    {...register('isBanner')}
                  >
                    <option value='true'>Có</option>
                    <option value='false'>Không</option>
                  </select>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='isDisplay' className='font-medium'>
                    Trạng thái
                  </label>
                  <select
                    id='isDisplay'
                    className='border border-gray-600 bg-gray-700 rounded-lg p-2 appearance-none focus:outline-none focus:border-primary'
                    {...register('isDisplay')}
                  >
                    <option value='true'>Công khai</option>
                    <option value='false'>Ẩn</option>
                  </select>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='trailerUrl' className='font-medium'>
                  URL trailer
                </label>
                <input
                  type='text'
                  id='trailerUrl'
                  className='border border-gray-600 bg-gray-700 rounded-lg p-2 focus:outline-none focus:border-primary'
                  placeholder='Nhập URL trailer'
                  {...register('trailerUrl')}
                />
                {errors?.trailerUrl && <div className='text-sm text-red-500'>{errors.trailerUrl.message}</div>}
              </div>

              <div className='flex flex-col gap-2 mt-4'>
                <label htmlFor='overview' className='font-medium'>
                  Tóm tắt nội dung
                </label>
                <textarea
                  id='overview'
                  className='border border-gray-600 bg-gray-700 rounded-lg p-2 focus:outline-none focus:border-primary min-h-[120px]'
                  placeholder='Nhập tóm tắt nội dung phim'
                  {...register('overview')}
                />
              </div>

              {/* Genre Selection with Search */}
              <GenreSelector
                selectedGenres={selectedGenres}
                onGenresChange={handleGenresChange}
                error={errors?.selectedGenres?.message}
              />

              {/* Cast Selection with Search */}
              <CastSelector
                selectedCasts={selectedCasts}
                onCastsChange={handleCastsChange}
                error={errors?.selectedCasts?.message}
              />

              {/* Poster and Backdrop Section */}
              <div className='mt-4'>
                <h3 className='text-lg font-semibold mb-4'>Hình ảnh</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Poster */}
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='posterFile' className='font-medium'>
                        Ảnh Poster <span className='text-gray-400 text-sm font-normal'>(Tỷ lệ 2:3)</span>
                      </label>
                      <input
                        id='posterFile'
                        type='file'
                        accept='image/*'
                        {...register('posterPath')}
                        onChange={handlePosterUpload}
                        className='border border-gray-600 bg-gray-700 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:opacity-90 file:cursor-pointer'
                      />
                      <p className='text-xs text-gray-400'>Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB</p>
                    </div>
                    {posterPreview && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-400'>{id ? 'Ảnh hiện tại' : 'Xem trước'}</label>
                        <div className='relative aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-lg border-2 border-gray-600 shadow-lg'>
                          <img
                            src={posterPreview}
                            alt='Poster preview'
                            className='h-full w-full object-cover'
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/400x600?text=Poster'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Backdrop */}
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='backdropFile' className='font-medium'>
                        Ảnh Backdrop <span className='text-gray-400 text-sm font-normal'>(Tỷ lệ 16:9)</span>
                      </label>
                      <input
                        id='backdropFile'
                        type='file'
                        accept='image/*'
                        {...register('backdropPath')}
                        onChange={handleBackdropUpload}
                        className='border border-gray-600 bg-gray-700 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:opacity-90 file:cursor-pointer'
                      />
                      <p className='text-xs text-gray-400'>Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB</p>
                    </div>
                    {backdropPreview && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-400'>{id ? 'Ảnh hiện tại' : 'Xem trước'}</label>
                        <div className='relative aspect-video w-full overflow-hidden rounded-lg border-2 border-gray-600 shadow-lg'>
                          <img
                            src={backdropPreview}
                            alt='Backdrop preview'
                            className='h-full w-full object-cover'
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=Backdrop'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-4'>
          <button
            type='submit'
            className='bg-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer'
          >
            {id ? 'Cập nhật' : 'Thêm mới'}
          </button>

          <button
            type='button'
            className='px-6 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 cursor-pointer transition-colors'
            onClick={handleGoBack}
          >
            Hủy
          </button>
        </div>
      </form>
    </section>
  )
}

export default MovieDetail
