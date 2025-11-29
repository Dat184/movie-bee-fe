import Stack from '@mui/material/Stack'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'
import ModalGenre from '../../components/ModalGenre'
import useDebounce from '../../hook/useDebounce'
import type { genre } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteGenre, getAllGenres } from '../../redux/api_request/genre_api'

const GenreAdminPage = () => {
  const genres = useSelector((state: any) => state.genre.getAllGenres?.genres)
  const totalPages = useSelector((state: any) => state.genre.getAllGenres?.meta.pages)
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const filterDebounce = useDebounce(filter, 1000)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllGenres(currentPage, 10, filterDebounce, dispatch)
  }, [currentPage, filterDebounce, dispatch])

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleDelete = (_id: string, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa thể loại "${name}"?`)) {
      deleteGenre(_id, dispatch)
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleEdit = (genre: genre) => {
    setSelectedGenre(genre._id)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedGenre('')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  

  return (
    <>
      <section className='w-full min-h-screen px-5 py-10 flex flex-col'>
        <div className='flex flex-row justify-between items-center mb-10'>
          <div>
            <h1 className='text-2xl font-bold'>Quản lý thể loại</h1>
            <p className='text-gray-400'>Danh sách các thể loại phim</p>
          </div>
          <div className='flex justify-center items-center'>
            <div className='bg-[rgba(255,255,255,.08)] w-[500px] h-10 flex flex-row items-center rounded-md px-3'>
              <Search />
              <input
                type='text'
                className='bg-transparent border-none outline-none text-white ml-2 flex-1'
                placeholder='Nhập tên thể loại...'
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <button
            className='bg-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
            onClick={handleCreate}
          >
            <Plus size={20} />
            Thêm thể loại
          </button>
        </div>

        {genres.length > 0 ? (
          <>
            <div className='flex-1'>
              <div className='bg-gray-800 rounded-lg overflow-hidden'>
                <table className='w-full'>
                  <thead className='bg-gray-700'>
                    <tr>
                      <th className='px-6 py-4 text-left text-sm font-semibold'>STT</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold'>Tên thể loại</th>
                      <th className='px-6 py-4 text-right text-sm font-semibold'>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-700'>
                    {genres.map((genre: genre, index: number) => (
                      <tr key={genre._id} className='hover:bg-gray-700 transition-colors'>
                        <td className='px-6 py-4 text-sm'>{index + 1}</td>
                        <td className='px-6 py-4 text-sm font-medium'>{genre.name}</td>
                        <td className='px-6 py-4 text-right'>
                          <div className='flex justify-end gap-2'>
                            <button
                              className='p-2 rounded-lg border border-gray-500 hover:bg-gray-600 transition-colors cursor-pointer'
                              onClick={() => handleEdit(genre)}
                              title='Chỉnh sửa'
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className='p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer'
                              onClick={() => handleDelete(genre._id, genre.name)}
                              title='Xóa'
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='mt-10 flex justify-center items-center'>
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  color='primary'
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: 'white'
                    }
                  }}
                />
              </Stack>
            </div>
          </>
        ) : (
          <div className='text-center py-10 text-gray-400'>
            <p>Chưa có thể loại nào. Hãy thêm thể loại mới!</p>
          </div>
        )}
      </section>

      <ModalGenre isOpen={isModalOpen} onClose={handleCloseModal} genreId={selectedGenre}  />
    </>
  )
}

export default GenreAdminPage
