import { Play } from 'lucide-react'
import { fetchWithToken, tmdbAPI } from '../config/config'
import { useEffect, useState } from 'react'
import PlayNowBtn from './ui/PlayNowBtn'

const BannerItem = ({ movie }: { movie: any }) => {
  const [genresList, setGenresList] = useState<string[]>([])
  const getGenres = async () => {
    const res = await fetchWithToken(tmdbAPI.getGenres())
    // console.log('res', res.genres)
    return res.genres
  }

  const mapGenres = async (ids: number[]) => {
    const genres = await getGenres()
    if (!genres) return ''
    const movieGenres = genres.filter((genre: any) => ids.includes(genre.id))
    return movieGenres.map((genre: any) => genre.name).join(', ')
  }

  useEffect(() => {
    if (movie.genre_ids && movie.genre_ids.length > 0 && genresList.length === 0) {
      mapGenres(movie.genre_ids).then((genreNames) => {
        setGenresList(genreNames.split(', '))
      })
    }
  }, [movie.genre_ids])

  return (
    <div className='h-screen w-full rounded-lg relative overflow-hidden '>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-bg-color/100 via-black/30  to-bg-color/70 rounded-lg z-10'></div>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        className='absolute inset-0 w-full h-full object-cover object-center rounded-lg '
        loading='lazy'
      />
      <div className='absolute left-10 bottom-30 w-full text-white z-20 max-w-2xl'>
        <h2 className='font-bold text-3xl mb-3 drop-shadow-lg'>
          {movie.original_language === 'en' ? movie.original_title : movie.title}
        </h2>
        <p className='text-gray-200 mb-5 line-clamp-3 text-sm leading-relaxed drop-shadow-sm'>{movie.overview}</p>
        <div className='flex items-center gap-x-3 mb-8'>
          {genresList.map((genre) => (
            <span key={genre} className='py-2 px-4 border border-white/60 rounded-md backdrop-blur-sm bg-white/10'>
              {genre}
            </span>
          ))}
        </div>
        <PlayNowBtn />
      </div>
    </div>
  )
}

export default BannerItem
