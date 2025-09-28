import { tmdbAPI } from '../config/config'

const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <section className='w-auto h-fit flex flex-col items-center justify-center'>
      <img
        src={tmdbAPI.getImage(movie.poster_path, 'w500')}
        alt={movie.title}
        className='w-full h-78 object-cover rounded-lg mb-5'
      />
      <h3 className='mt-2'>{movie.title}</h3>
    </section>
  )
}

export default MovieCard
