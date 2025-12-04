import { useNavigate } from 'react-router-dom'
import type { Movie } from '../types'

const MovieCard = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate()
  return (
    <section
      className='w-auto h-fit flex flex-col items-center justify-center'
      onClick={() => navigate(`/movies/${movie._id}`)}
    >
      <img src={movie.posterPath} alt={movie.title} className='w-full h-78 object-cover rounded-lg mb-5' />
      <h3 className='mt-2'>{movie.title}</h3>
    </section>
  )
}

export default MovieCard
