import { useEffect, useState } from 'react'
import MovieList from '../MovieList'
import { fetchWithToken, tmdbAPI } from '../../config/config'

const Topic = () => {
  const [marvelMovies, setMarvelMovies] = useState<any[]>([])
  const [animeMovies, setAnimeMovies] = useState<any[]>([])
  const [usUkMovies, setUsUkMovies] = useState<any[]>([])

  const fetchMarvelMovies = async () => {
    const marvel = await fetchWithToken(tmdbAPI.getMovieByListId(84979))
    setMarvelMovies(marvel.items)
  }

  const fetchAnimeMovies = async () => {
    const anime = await fetchWithToken(tmdbAPI.getMovieByListId(146567))
    setAnimeMovies(anime.items)
  }

  const fetchUsUkMovies = async () => {
    const usUk = await fetchWithToken(tmdbAPI.getMovieByKeyword(322496))
    console.log('usUk', usUk)
    setUsUkMovies(usUk.results)
  }

  useEffect(() => {
    fetchMarvelMovies()
    fetchAnimeMovies()
    fetchUsUkMovies()
  }, [])

  return (
    <section className='Topic h-fit px-5 my-30'>
      <div className='bg-gradient-to-t from-[#282B3A00] to-[#282B3AFF] h-full w-full rounded-2xl p-8 space-y-10'>
        <MovieList title='Vũ trụ Marvel' movies={marvelMovies} />
        <MovieList title='Anime' movies={animeMovies} />
        <MovieList title='Hành Động' movies={usUkMovies} />
      </div>
    </section>
  )
}

export default Topic
