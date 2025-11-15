import Stack from '@mui/material/Stack'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'
import ModalGenre from '../../components/ModalGenre'

export interface Genre {
  id: number
  name: string
}

const GenreAdminPage = () => {
  const [genres, setGenres] = useState<Genre[]>([
    { id: 1, name: 'Hành động' },
    { id: 2, name: 'Hài kịch' },
    { id: 3, name: 'Kinh dị' },
    { id: 4, name: 'Tình cảm' },
    { id: 5, name: 'Khoa học viễn tưởng' },
    { id: 6, name: 'Khoa học viễn tưởng' }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null)

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa thể loại "${name}"?`)) {
      setGenres(genres.filter((genre) => genre.id !== id))
      toast.success('Đã xóa thể loại thành công')
    }
  }

  const handleEdit = (genre: Genre) => {
    setEditingGenre(genre)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingGenre(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingGenre(null)
  }

  const handleSubmitModal = (genreName: string, genre: Genre | null) => {
    if (genre) {
      // Update existing genre
      setGenres(genres.map((g) => (g.id === genre.id ? { ...g, name: genreName } : g)))
      toast.success('Đã cập nhật thể loại thành công')
    } else {
      // Create new genre
      const newGenre: Genre = {
        id: Math.max(...genres.map((g) => g.id), 0) + 1,
        name: genreName
      }
      setGenres([...genres, newGenre])
      toast.success('Đã thêm thể loại mới thành công')
    }

    handleCloseModal()
  }

  return (
    <>
      <section className='w-full min-h-screen px-5 pt-10 flex flex-col'>
        <div className='flex flex-row justify-between items-center mb-10'>
          <div>
            <h1 className='text-2xl font-bold'>Quản lý thể loại</h1>
            <p className='text-gray-400'>Danh sách các thể loại phim</p>
          </div>
          <button
            className='bg-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
            onClick={handleCreate}
          >
            <Plus size={20} />
            Thêm thể loại
          </button>
        </div>

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
              {genres.map((genre, index) => (
                <tr key={genre.id} className='hover:bg-gray-700 transition-colors'>
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
                        onClick={() => handleDelete(genre.id, genre.name)}
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

        {genres.length === 0 && (
          <div className='text-center py-10 text-gray-400'>
            <p>Chưa có thể loại nào. Hãy thêm thể loại mới!</p>
          </div>
        )}

        <div className='mt-10 flex justify-center items-center'>
          <Stack spacing={2}>
            <Pagination
              count={10}
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

      <ModalGenre
        isOpen={isModalOpen}
        editingGenre={editingGenre}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
    </>
  )
}

export default GenreAdminPage
