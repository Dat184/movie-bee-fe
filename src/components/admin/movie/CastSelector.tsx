import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCasts } from '../../../redux/api_request/cast_api'
import type { cast } from '../../../types'
import useClickOutside from '../../../hook/useClickOutside'

interface CastSelectorProps {
  selectedCasts: cast[]
  onCastsChange: (casts: cast[]) => void
  error?: string
}

const CastSelector = ({ selectedCasts, onCastsChange, error }: CastSelectorProps) => {
  const dispatch = useDispatch()
  const casts = useSelector((state: any) => state.cast.getAllCasts?.casts) as cast[]

  const [castSearchInput, setCastSearchInput] = useState('')
  const { show: showCastDropdown, setShow: setShowCastDropdown, nodeRef: castDropdownRef } = useClickOutside('input')

  // Load all casts on mount
  useEffect(() => {
    getAllCasts(1, 100, '', dispatch)
  }, [dispatch])

  // Filter casts based on search input
  const filteredCasts = casts?.filter(
    (cast) =>
      cast.name.toLowerCase().includes(castSearchInput.toLowerCase()) &&
      !selectedCasts.find((selected) => selected._id === cast._id)
  )

  // Handle cast selection
  const handleSelectCast = (cast: cast) => {
    const newSelectedCasts = [...selectedCasts, cast]
    onCastsChange(newSelectedCasts)
    setCastSearchInput('')
    setShowCastDropdown(false)
  }

  // Handle cast removal
  const handleRemoveCast = (castId: string) => {
    const newSelectedCasts = selectedCasts.filter((c) => c._id !== castId)
    onCastsChange(newSelectedCasts)
  }

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='casts' className='font-medium'>
        Diễn viên
      </label>
      <div className='relative' ref={castDropdownRef}>
        <div className='border border-gray-600 bg-gray-700 rounded-lg p-2 min-h-[42px] flex flex-wrap gap-2'>
          {selectedCasts.map((cast) => (
            <div
              key={cast._id}
              className='flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-sm'
            >
              <span>{cast.name}</span>
              <button
                type='button'
                onClick={() => handleRemoveCast(cast._id)}
                className='hover:bg-primary-dark rounded-full p-0.5'
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            type='text'
            placeholder={selectedCasts.length === 0 ? 'Tìm kiếm và chọn diễn viên...' : 'Thêm diễn viên...'}
            value={castSearchInput}
            onChange={(e) => setCastSearchInput(e.target.value)}
            onFocus={() => setShowCastDropdown(true)}
            className='flex-1 bg-transparent focus:outline-none min-w-[200px]'
          />
        </div>

        {/* Dropdown */}
        {showCastDropdown && filteredCasts && filteredCasts.length > 0 && (
          <div className='absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
            {filteredCasts.map((cast) => (
              <div
                key={cast._id}
                onClick={() => handleSelectCast(cast)}
                className='px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-3'
              >
                {cast.avatarPath && (
                  <img src={cast.avatarPath} alt={cast.name} className='w-8 h-8 rounded-full object-cover' />
                )}
                <span>{cast.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {showCastDropdown && castSearchInput && filteredCasts && filteredCasts.length === 0 && (
          <div className='absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg'>
            <div className='px-4 py-2 text-gray-400 text-sm'>Không tìm thấy diễn viên phù hợp</div>
          </div>
        )}
      </div>
      {error && <div className='text-sm text-red-500'>{error}</div>}
    </div>
  )
}

export default CastSelector
