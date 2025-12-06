import { useNavigate } from 'react-router-dom'
import type { Movie } from '../types'

const MovieCardTopic = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-3 w-94 cursor-pointer' onClick={() => navigate(`/movies/${movie._id}`)}>
      <div className='h-60 rounded-lg w-94'>
        <img
          src={movie.backdropPath}
          alt={movie.title}
          className='absolute inset-0 w-94 h-60 object-cover object-center rounded-lg '
          loading='lazy'
        />
      </div>
      <h1 className='w-full pl-10'>{movie.title}</h1>
    </div>
  )
}
export default MovieCardTopic
