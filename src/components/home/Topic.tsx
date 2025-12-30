import { useEffect } from 'react'
import MovieList from '../MovieList'
import { getActionMovie, getAnimeMovie, getMaverMovie } from '../../redux/api_request/collection_api'
import { useDispatch, useSelector } from 'react-redux'

const Topic = () => {
  const movieMaver = useSelector((state: any) => state.collection?.maverPlaylist?.movies)
  const movieAnime = useSelector((state: any) => state.collection?.animePlaylist?.movies)
  const movieAction = useSelector((state: any) => state.collection?.actionPlaylist?.movies)
  const dispatch = useDispatch()

  useEffect(() => {
    getActionMovie('6909b493faf209dc1dda35ea', dispatch)
    getMaverMovie('692a7643ce5b27fe192c9f0e', dispatch)
    getAnimeMovie('69284e1613245d19fd0595a3', dispatch)
  }, [dispatch])
  return (
    <section className='Topic h-fit px-2 md:px-5 my-10 md:my-30'>
      <div className='bg-gradient-to-t from-[#282B3A00] to-[#282B3AFF] h-full w-full rounded-2xl p-8 space-y-10'>
        <MovieList title='Vũ trụ Marvel' movies={movieMaver} />
        <MovieList title='Anime' movies={movieAnime} />
        <MovieList title='Hành Động' movies={movieAction} />
      </div>
    </section>
  )
}

export default Topic
