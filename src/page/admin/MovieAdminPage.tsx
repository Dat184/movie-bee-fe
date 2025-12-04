import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchWithToken, tmdbAPI } from '../../config/config'
import type { Movie } from '../../types'
import { get } from 'react-hook-form'
import { getAllMovies } from '../../redux/api_request/movie_api'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../hook/useDebounce'

interface Genre {
  id: number
  name: string
}

const MovieAdminPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const movies = useSelector((state: any) => state.movie.getAllMovies?.movies)
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const totalPages = useSelector((state: any) => state.movie.getAllMovies?.meta.pages)
  const [filter, setFilter] = useState('')
  const filterDebounce = useDebounce(filter, 1000)

  // Fetch genres only once on mount

  useEffect(() => {
    getAllMovies(page, 10, filterDebounce, dispatch)
  }, [dispatch, page])

  const handleDelete = (_id: string, title: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa phim "${title}"?`)) {
      toast.success('Đã xóa phim thành công')
    }
  }

  const handleEdit = (movie: Movie) => {
    navigate(`/admin/movies/${movie._id}`)
  }

  const handleCreate = () => {
    navigate('/admin/movies/new')
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <>
      <section className='w-full min-h-screen px-5 py-10 flex flex-col'>
        <div className='flex flex-row justify-between items-center mb-10'>
          <div>
            <h1 className='text-2xl font-bold'>Quản lý phim</h1>
            <p className='text-gray-400'>Danh sách các phim hiện có</p>
          </div>
          <button
            className='bg-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
            onClick={handleCreate}
          >
            <Plus size={20} />
            Thêm phim
          </button>
        </div>

        <div className='flex-1'>
          <div className='bg-gray-800 rounded-lg overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[800px]'>
                <thead className='bg-gray-700'>
                  <tr>
                    <th className='px-6 py-4 text-left text-sm font-semibold'>Poster</th>
                    <th className='px-6 py-4 text-left text-sm font-semibold'>Tên phim</th>
                    <th className='px-6 py-4 text-left text-sm font-semibold'>Thể loại</th>
                    <th className='px-6 py-4 text-left text-sm font-semibold'>Trạng thái</th>
                    <th className='px-6 py-4 text-center text-sm font-semibold'>Đánh giá</th>
                    <th className='px-6 py-4 text-right text-sm font-semibold'>Thao tác</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-700'>
                  {movies.length === 0 ? (
                    <tr>
                      <td colSpan={6} className='text-center py-10'>
                        Đang tải...
                      </td>
                    </tr>
                  ) : (
                    movies.map((movie: Movie) => (
                      <tr key={movie._id} className='hover:bg-gray-700 transition-colors'>
                        <td className='px-6 py-4'>
                          <img src={movie.posterPath} alt={movie.title} className='w-12 h-18 object-cover rounded' />
                        </td>
                        <td className='px-6 py-4 text-sm font-medium'>{movie.title}</td>
                        <td className='px-6 py-4 text-sm text-gray-300 max-w-[200px] truncate'>
                          {movie.genres.map((genre) => genre.name).join(', ')}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-300'>
                          <span
                            className={`inline-block px-2 py-1 rounded ${
                              movie.isDisplay ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                            }`}
                          >
                            {movie.isDisplay ? 'Công khai' : 'Ẩn'}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center text-sm'>
                          <span
                            className={`inline-block px-2 py-1 rounded ${
                              movie.imdbRating >= 7
                                ? 'bg-green-500/20 text-green-500'
                                : movie.imdbRating >= 5
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {movie.imdbRating}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <div className='flex justify-end gap-2'>
                            <button
                              className='p-2 rounded-lg border border-gray-500 hover:bg-gray-600 transition-colors cursor-pointer'
                              title='Chỉnh sửa'
                              onClick={() => handleEdit(movie)}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className='p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer'
                              title='Xóa'
                              onClick={() => handleDelete(movie._id, movie.title)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='mt-8 flex justify-center items-center'>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color='primary'
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white'
                }
              }}
            />
          </Stack>
        </div>
      </section>
    </>
  )
}

export default MovieAdminPage
