import { useNavigate } from 'react-router-dom'
import type { Movie } from '../types'

const MovieCardTopic = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-3 w-full cursor-pointer group' onClick={() => navigate(`/movies/${movie._id}`)}>
      <div className='h-40 md:h-60 rounded-lg w-full relative overflow-hidden'>
        <img
          src={movie.backdropPath}
          alt={movie.title}
          className='absolute inset-0 w-full h-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-110'
          loading='lazy'
        />
      </div>
      <h1 className='w-full px-1 truncate font-medium text-sm md:text-base' title={movie.title}>
        {movie.title}
      </h1>
    </div>
  )
}
export default MovieCardTopic
