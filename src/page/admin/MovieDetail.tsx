import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { tmdbAPI } from '../../config/config'

interface Genre {
  id: number
  name: string
}

interface Cast {
  id: number
  name: string
}

interface MovieFormData {
  title: string
  overview: string
  posterPath: string
  backdropPath: string
  runtime: number
  trailerUrl: string
  selectedGenres: number[]
  selectedCasts: number[]
  status: string
}

const schema = Yup.object({
  title: Yup.string().required('Vui lòng nhập tên phim'),
  overview: Yup.string(),
  posterPath: Yup.string(),
  backdropPath: Yup.string(),
  trailerUrl: Yup.string().url('Vui lòng nhập URL hợp lệ'),
  runtime: Yup.number().min(0, 'Thời lượng phải lớn hơn 0'),
  selectedGenres: Yup.array().of(Yup.number()).min(1, 'Vui lòng chọn ít nhất một thể loại'),
  selectedCasts: Yup.array().of(Yup.number()),
  status: Yup.string().oneOf(['Public', 'Private'])
})

// Mock genres data
const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
]

// Mock casts data
const mockCasts: Cast[] = [
  { id: 1, name: 'Tom Hanks' },
  { id: 2, name: 'Brad Pitt' },
  { id: 3, name: 'Leonardo DiCaprio' },
  { id: 4, name: 'Scarlett Johansson' },
  { id: 5, name: 'Robert Downey Jr.' },
  { id: 6, name: 'Chris Evans' },
  { id: 7, name: 'Jennifer Lawrence' },
  { id: 8, name: 'Meryl Streep' },
  { id: 9, name: 'Denzel Washington' },
  { id: 10, name: 'Johnny Depp' },
  { id: 11, name: 'Emma Stone' },
  { id: 12, name: 'Ryan Gosling' },
  { id: 13, name: 'Anne Hathaway' },
  { id: 14, name: 'Christian Bale' },
  { id: 15, name: 'Natalie Portman' }
]

const MovieDetail = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const id = params.id
  const genres = mockGenres
  const casts = mockCasts
  const [genreSearch, setGenreSearch] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [castSearch, setCastSearch] = useState('')
  const [isCastDropdownOpen, setIsCastDropdownOpen] = useState(false)
  const castDropdownRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue
  } = useForm<MovieFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
    defaultValues: {
      title: '',
      overview: '',
      posterPath: '',
      backdropPath: '',
      runtime: 0,
      selectedGenres: [],
      selectedCasts: [],
      status: 'Released'
    }
  })

  const handleGoBack = () => {
    navigate(-1)
  }

  const filteredGenres = genres.filter((genre) => genre.name.toLowerCase().includes(genreSearch.toLowerCase()))

  const addGenre = (genreId: number) => {
    const currentGenres = watch('selectedGenres') || []
    if (!currentGenres.includes(genreId)) {
      setValue('selectedGenres', [...currentGenres, genreId], { shouldValidate: true })
    }
    setGenreSearch('')
    setIsDropdownOpen(false)
  }

  const removeGenre = (genreId: number) => {
    const currentGenres = watch('selectedGenres') || []
    setValue(
      'selectedGenres',
      currentGenres.filter((id) => id !== genreId),
      { shouldValidate: true }
    )
  }

  const getSelectedGenreNames = () => {
    const selectedIds = watch('selectedGenres') || []
    return genres.filter((g) => selectedIds.includes(g.id))
  }

  const filteredCasts = casts.filter((cast) => cast.name.toLowerCase().includes(castSearch.toLowerCase()))

  const addCast = (castId: number) => {
    const currentCasts = watch('selectedCasts') || []
    if (!currentCasts.includes(castId)) {
      setValue('selectedCasts', [...currentCasts, castId], { shouldValidate: true })
    }
    setCastSearch('')
    setIsCastDropdownOpen(false)
  }

  const removeCast = (castId: number) => {
    const currentCasts = watch('selectedCasts') || []
    setValue(
      'selectedCasts',
      currentCasts.filter((id) => id !== castId),
      { shouldValidate: true }
    )
  }

  const getSelectedCastNames = () => {
    const selectedIds = watch('selectedCasts') || []
    return casts.filter((c) => selectedIds.includes(c.id))
  }

  const onSubmit = async (data: MovieFormData) => {
    if (isValid) {
      // Here you would typically send the data to your backend API
      const movieData = {
        title: data.title,
        overview: data.overview,
        poster_path: data.posterPath,
        backdrop_path: data.backdropPath,
        runtime: data.runtime,
        genre_ids: data.selectedGenres,
        status: data.status
      }

      console.log('Movie data:', movieData)
      toast.success(id ? 'Cập nhật phim thành công' : 'Thêm phim mới thành công')
      reset()
      navigate(-1)
    }
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa phim này?')) {
      // Handle delete logic here
      toast.warning('Đã xóa phim')
      navigate(-1)
    }
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
      setValue('posterPath', reader.result as string, { shouldValidate: true })
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
      setValue('backdropPath', reader.result as string, { shouldValidate: true })
    }
    reader.readAsDataURL(file)
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

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full max-w-4xl mx-auto'>
        {/* Basic Information */}
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

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='runtime' className='font-medium'>
                  Thời lượng (phút)
                </label>
                <input
                  type='number'
                  id='runtime'
                  className='border border-gray-600 bg-gray-700 rounded-lg p-2 focus:outline-none focus:border-primary'
                  placeholder='Nhập thời lượng'
                  {...register('runtime', { valueAsNumber: true })}
                  min='0'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='status' className='font-medium'>
                  Trạng thái
                </label>
                <select
                  id='status'
                  className='border border-gray-600 bg-gray-700 rounded-lg p-2 appearance-none focus:outline-none focus:border-primary'
                  {...register('status')}
                >
                  <option value='Public'>Công khai</option>
                  <option value='Private'>Chưa công khai</option>
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
        </div>

        {/* Genres */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Thể loại</h2>

          {/* Search Box */}
          <div className='relative' ref={dropdownRef}>
            <input
              type='text'
              className='w-full border border-gray-600 bg-gray-700 rounded-lg p-2 focus:outline-none focus:border-primary'
              placeholder='Tìm kiếm thể loại...'
              value={genreSearch}
              onChange={(e) => {
                setGenreSearch(e.target.value)
                setIsDropdownOpen(true)
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />

            {/* Dropdown */}
            {isDropdownOpen && genreSearch && filteredGenres.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                {filteredGenres.map((genre) => (
                  <button
                    key={genre.id}
                    type='button'
                    className='w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors'
                    onClick={() => addGenre(genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Genres */}
          <div className='flex flex-wrap gap-2 mt-4'>
            {getSelectedGenreNames().map((genre) => (
              <div key={genre.id} className='flex items-center gap-2 px-3 py-1 bg-primary rounded-lg text-white'>
                <span>{genre.name}</span>
                <button
                  type='button'
                  onClick={() => removeGenre(genre.id)}
                  className='hover:bg-primary-dark rounded-full p-0.5 transition-colors'
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {errors?.selectedGenres && <div className='text-sm text-red-500 mt-2'>{errors.selectedGenres.message}</div>}
        </div>

        {/* Casts */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Diễn viên</h2>

          {/* Search Box */}
          <div className='relative' ref={castDropdownRef}>
            <input
              type='text'
              className='w-full border border-gray-600 bg-gray-700 rounded-lg p-2 focus:outline-none focus:border-primary'
              placeholder='Tìm kiếm diễn viên...'
              value={castSearch}
              onChange={(e) => {
                setCastSearch(e.target.value)
                setIsCastDropdownOpen(true)
              }}
              onFocus={() => setIsCastDropdownOpen(true)}
            />

            {/* Dropdown */}
            {isCastDropdownOpen && castSearch && filteredCasts.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                {filteredCasts.map((cast) => (
                  <button
                    key={cast.id}
                    type='button'
                    className='w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors'
                    onClick={() => addCast(cast.id)}
                  >
                    {cast.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Casts */}
          <div className='flex flex-wrap gap-2 mt-4'>
            {getSelectedCastNames().map((cast) => (
              <div key={cast.id} className='flex items-center gap-2 px-3 py-1 bg-primary rounded-lg text-white'>
                <span>{cast.name}</span>
                <button
                  type='button'
                  onClick={() => removeCast(cast.id)}
                  className='hover:bg-primary-dark rounded-full p-0.5 transition-colors'
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {errors?.selectedCasts && <div className='text-sm text-red-500 mt-2'>{errors.selectedCasts.message}</div>}
        </div>

        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Hình ảnh</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Poster */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='posterFile' className='font-medium'>
                Poster phim
              </label>
              <input
                id='posterFile'
                type='file'
                accept='image/*'
                onChange={handlePosterUpload}
                className='border border-gray-600 bg-gray-700 rounded-lg p-2'
              />
              <p className='text-xs text-gray-400'>Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB</p>

              {watch('posterPath') && (
                <div className='mt-2'>
                  <p className='text-sm mb-2'>{id ? 'Poster hiện tại' : 'Xem trước'}</p>
                  <div className='aspect-[2/3] max-w-[200px] overflow-hidden rounded-lg bg-gray-900'>
                    <img
                      src={
                        watch('posterPath')?.startsWith('http')
                          ? watch('posterPath')?.startsWith('data:')
                            ? watch('posterPath')
                            : tmdbAPI.getImage(watch('posterPath') || '', 'w300')
                          : watch('posterPath')
                      }
                      alt='Poster'
                      className='h-full w-full object-cover'
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/200x300?text=No+Image'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Backdrop */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='backdropFile' className='font-medium'>
                Ảnh nền (Backdrop)
              </label>
              <input
                id='backdropFile'
                type='file'
                accept='image/*'
                onChange={handleBackdropUpload}
                className='border border-gray-600 bg-gray-700 rounded-lg p-2'
              />
              <p className='text-xs text-gray-400'>Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB</p>

              {watch('backdropPath') && (
                <div className='mt-2'>
                  <p className='text-sm mb-2'>{id ? 'Backdrop hiện tại' : 'Xem trước'}</p>
                  <div className='aspect-[16/9] max-w-full overflow-hidden rounded-lg bg-gray-900'>
                    <img
                      src={
                        watch('backdropPath')?.startsWith('http')
                          ? watch('backdropPath')?.startsWith('data:')
                            ? watch('backdropPath')
                            : tmdbAPI.getImage(watch('backdropPath') || '', 'w780')
                          : watch('backdropPath')
                      }
                      alt='Backdrop'
                      className='h-full w-full object-cover'
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/780x439?text=No+Image'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className='flex gap-4'>
          <button
            type='submit'
            className='bg-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer'
          >
            {id ? 'Cập nhật' : 'Thêm mới'}
          </button>

          {id && (
            <button
              type='button'
              className='px-6 py-2 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 transition-colors'
              onClick={handleDelete}
            >
              Xóa
            </button>
          )}

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