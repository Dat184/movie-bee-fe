import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DetailCard from '../components/DetailCard'
import BackdropDetail from '../components/BackdropDetail'
import { getMovieById } from '../redux/api_request/movie_api'
import Loading from '../components/Loading'

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>()
  const movie = useSelector((state: any) => state.movie.getMovieById?.data)
  const dispatch = useDispatch()

  useEffect(() => {
    if (movieId) {
      getMovieById(movieId, dispatch)
    }
  }, [movieId, dispatch])

  if (!movie) {
    return <Loading />
  }

  return (
    <section className='flex justify-center items-center flex-col w-full h-full'>
      <BackdropDetail data={movie} />
      <DetailCard data={movie} />
    </section>
  )
}

export default MovieDetailPage
