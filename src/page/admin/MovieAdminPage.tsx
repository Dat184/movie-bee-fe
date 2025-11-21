import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchWithToken, tmdbAPI } from '../../config/config'

interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

interface Genre {
  id: number
  name: string
}

const MovieAdminPage = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Fetch genres only once on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await fetchWithToken(tmdbAPI.getGenres())
        if (genresData && genresData.genres) {
          setGenres(genresData.genres)
        }
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    fetchGenres()
  }, [])

  // Fetch movies when page changes
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      try {
        await fetchMovies(page)
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error)
          toast.error('Không thể tải dữ liệu')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [page])

  const fetchMovies = async (pageNumber: number) => {
    try {
      const data = await fetchWithToken(tmdbAPI.getMovieList('popular', pageNumber))
      if (data && data.results) {
        setMovies(data.results)
        setTotalPages(Math.min(data.total_pages, 500))
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    }
  }

  const getGenreNames = (genreIds: number[]) => {
    if (!genreIds || !genres.length) return '---'
    return genreIds
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa phim "${title}"?`)) {
      setMovies(movies.filter((movie) => movie.id !== id))
      toast.success('Đã xóa phim thành công')
    }
  }

  const handleEdit = (movie: Movie) => {
    navigate(`/admin/movies/${movie.id}`)
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
                  {loading ? (
                    <tr>
                      <td colSpan={6} className='text-center py-10'>
                        Đang tải...
                      </td>
                    </tr>
                  ) : (
                    movies.map((movie) => (
                      <tr key={movie.id} className='hover:bg-gray-700 transition-colors'>
                        <td className='px-6 py-4'>
                          <img
                            src={
                              movie.poster_path
                                ? movie.poster_path.startsWith('http')
                                  ? movie.poster_path
                                  : tmdbAPI.getImage(movie.poster_path, 'w154')
                                : 'https://via.placeholder.com/92x138?text=No+Image'
                            }
                            alt={movie.title}
                            className='w-12 h-18 object-cover rounded'
                          />
                        </td>
                        <td className='px-6 py-4 text-sm font-medium'>{movie.title}</td>
                        <td
                          className='px-6 py-4 text-sm text-gray-300 max-w-[200px] truncate'
                          title={getGenreNames(movie.genre_ids)}
                        >
                          {getGenreNames(movie.genre_ids)}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-300'>
                          <span
                            className={`inline-block px-2 py-1 rounded ${
                              new Date(movie.release_date) > new Date()
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-green-500/20 text-green-500'
                            }`}
                          >
                            {new Date(movie.release_date) > new Date() ? 'Sắp ra mắt' : 'Đã phát hành'}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center text-sm'>
                          <span
                            className={`inline-block px-2 py-1 rounded ${
                              movie.vote_average >= 7
                                ? 'bg-green-500/20 text-green-500'
                                : movie.vote_average >= 5
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {movie.vote_average?.toFixed(1)}
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
                              onClick={() => handleDelete(movie.id, movie.title)}
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
