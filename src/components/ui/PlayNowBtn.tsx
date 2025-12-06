import { Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PlayNowBtn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      className='w-40 h-13 rounded-full bg-primary gap-3 px-3 flex items-center justify-center hover:scale-110 transition-all cursor-pointer'
      onClick={onClick}
    >
      <Play fill='currentColor' /> Xem Ngay
    </button>
  )
}

export default PlayNowBtn
