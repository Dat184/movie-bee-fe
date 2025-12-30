import PlayNowBtn from './ui/PlayNowBtn'
import type { Movie } from '../types'
import { useNavigate } from 'react-router-dom'

const BannerItem = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate()
  const handleClickPlaybtn = () => {
    navigate(`/movies/${movie._id}`)
  }
  return (
    <div className='h-screen w-full rounded-lg relative overflow-hidden '>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-bg-color/100 via-black/30  to-bg-color/70 rounded-lg z-10'></div>
      <img
        src={movie.backdropPath}
        alt={movie.title}
        className='absolute inset-0 w-full h-full object-cover object-center rounded-lg '
        loading='lazy'
      />
      <div className='absolute left-4 bottom-20 md:left-10 md:bottom-30 w-full text-white z-20 max-w-full md:max-w-2xl px-2 md:px-0'>
        <h2 className='font-bold text-xl md:text-3xl mb-3 drop-shadow-lg'>{movie.title}</h2>
        <p className='text-gray-200 mb-5 line-clamp-3 text-sm leading-relaxed drop-shadow-sm'>{movie.overview}</p>
        <div className='hidden md:flex flex-wrap items-center gap-2 md:gap-3 mb-8'>
          {movie.genres.map((genre: any) => (
            <span
              key={genre._id}
              className='py-1 px-2 border border-white/60 rounded-md backdrop-blur-sm bg-white/10 text-xs md:text-base'
            >
              {genre.name}
            </span>
          ))}
        </div>
        <PlayNowBtn onClick={handleClickPlaybtn} />
      </div>
    </div>
  )
}

export default BannerItem
