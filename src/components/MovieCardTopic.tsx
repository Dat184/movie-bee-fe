import { fetchWithToken, tmdbAPI } from '../config/config'

const MovieCardTopic = ({ movie }: { movie: any }) => {
  return (
    <div className='flex flex-col gap-3 w-94'>
      <div className='h-60 rounded-lg w-94'>
        <img
          src={tmdbAPI.getImage(movie.backdrop_path, 'w500')}
          alt={movie.title}
          className='absolute inset-0 w-94 h-60 object-cover object-center rounded-lg '
          loading='lazy'
        />
      </div>
      <h1 className='w-full pl-10'>{movie.title || movie.name}</h1>
    </div>
  )
}
export default MovieCardTopic
