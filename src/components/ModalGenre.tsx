import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGenre, getGenreById, updateGenre } from '../redux/api_request/genre_api'

interface ModalGenreProps {
  isOpen: boolean
  onClose: () => void
  genreId?: string
}

const ModalGenre = ({ isOpen, onClose, genreId }: ModalGenreProps) => {
  const genre = useSelector((state: any) => state.genre.getGenreById?.data)
  const [genreName, setGenreName] = useState<string>(genre?.name || '')
  const dispatch = useDispatch()

  useEffect(() => {
    if (genreId) {
      // Fetch genre details if editing
      getGenreById(genreId, dispatch)
    } else {
      setGenreName('')
    }
  }, [isOpen])

  useEffect(() => {
    if (genre) {
      setGenreName(genre.name)
    }
  }, [genre])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (genreId) {
      // Update genre logic here
      updateGenre(genreId, genreName, dispatch)
      onClose()
    } else {
      // Create genre logic here
      createGenre(genreName, dispatch)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50' onClick={onClose}>
      <div className='bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4' onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>{true ? 'Chỉnh sửa thể loại' : 'Thêm thể loại mới'}</h2>
          <button className='p-1 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer' onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='genreName' className='block mb-2 font-medium'>
              Tên thể loại
            </label>
            <input
              type='text'
              id='genreName'
              className='w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none '
              placeholder='Nhập tên thể loại'
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
              autoFocus
            />
          </div>

          <div className='flex gap-3 justify-end'>
            <button
              type='button'
              className='px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 transition-colors cursor-pointer'
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-primary rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!genreName.trim()}
            >
              {genre ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalGenre
