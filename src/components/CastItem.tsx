import { useNavigate } from 'react-router-dom'
import type { cast } from '../types'



const CastItem = ({ cast }: { cast: cast }) => {
  const navigate = useNavigate()
  return (
    <div
      className='flex flex-col items-center  cursor-pointer'
      onClick={() => navigate(`/admin/cast/edit-cast/${cast._id}`)}
    >
      <img
        src={cast.avatarPath}
        alt={`"${cast.name}"`}
        className='w-40 h-60 object-cover rounded-lg mb-3 hover:scale-105 transition-transform'
      />
      <p className='text-center'>{cast.name}</p>
    </div>
  )
}

export default CastItem
