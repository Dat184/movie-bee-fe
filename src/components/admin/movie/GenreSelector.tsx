import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGenres } from '../../../redux/api_request/genre_api'
import type { genre } from '../../../types'
import { useState } from 'react'
import useClickOutside from '../../../hook/useClickOutside'

interface GenreSelectorProps {
  selectedGenres: genre[]
  onGenresChange: (genres: genre[]) => void
  error?: string
}

const GenreSelector = ({ selectedGenres, onGenresChange, error }: GenreSelectorProps) => {
  const dispatch = useDispatch()
  const genres = useSelector((state: any) => state.genre.getAllGenres?.genres) as genre[]

  const [genreSearchInput, setGenreSearchInput] = useState('')
  const { show: showGenreDropdown, setShow: setShowGenreDropdown, nodeRef: genreDropdownRef } = useClickOutside('input')

  // Load all genres on mount
  useEffect(() => {
    getAllGenres(1, 100, '', dispatch)
  }, [dispatch])

  // Filter genres based on search input
  const filteredGenres = genres?.filter(
    (genre) =>
      genre.name.toLowerCase().includes(genreSearchInput.toLowerCase()) &&
      !selectedGenres.find((selected) => selected._id === genre._id)
  )

  // Handle genre selection
  const handleSelectGenre = (genre: genre) => {
    const newSelectedGenres = [...selectedGenres, genre]
    onGenresChange(newSelectedGenres)
    setGenreSearchInput('')
    setShowGenreDropdown(false)
  }

  // Handle genre removal
  const handleRemoveGenre = (genreId: string) => {
    const newSelectedGenres = selectedGenres.filter((g) => g._id !== genreId)
    onGenresChange(newSelectedGenres)
  }

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='genres' className='font-medium'>
        Thể loại <span className='text-red-500'>*</span>
      </label>
      <div className='relative' ref={genreDropdownRef}>
        <div className='border border-gray-600 bg-gray-700 rounded-lg p-2 min-h-[42px] flex flex-wrap gap-2'>
          {selectedGenres.map((genre) => (
            <div
              key={genre._id}
              className='flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-sm'
            >
              <span>{genre.name}</span>
              <button
                type='button'
                onClick={() => handleRemoveGenre(genre._id)}
                className='hover:bg-primary-dark rounded-full p-0.5'
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            type='text'
            placeholder={selectedGenres.length === 0 ? 'Tìm kiếm và chọn thể loại...' : 'Thêm thể loại...'}
            value={genreSearchInput}
            onChange={(e) => setGenreSearchInput(e.target.value)}
            onFocus={() => setShowGenreDropdown(true)}
            className='flex-1 bg-transparent focus:outline-none min-w-[200px]'
          />
        </div>

        {/* Dropdown */}
        {showGenreDropdown && filteredGenres && filteredGenres.length > 0 && (
          <div className='absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
            {filteredGenres.map((genre) => (
              <div
                key={genre._id}
                onClick={() => handleSelectGenre(genre)}
                className='px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors'
              >
                {genre.name}
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {showGenreDropdown && genreSearchInput && filteredGenres && filteredGenres.length === 0 && (
          <div className='absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg'>
            <div className='px-4 py-2 text-gray-400 text-sm'>Không tìm thấy thể loại phù hợp</div>
          </div>
        )}
      </div>
      {error && <div className='text-sm text-red-500'>{error}</div>}
    </div>
  )
}

export default GenreSelector
