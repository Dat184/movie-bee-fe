import { useParams } from 'react-router-dom'
import { fetchWithToken, tmdbAPI } from '../config/config'
import useSWR from 'swr'
import DetailCard from '../components/DetailCard'
import BackdropDetail from '../components/BackdropDetail'

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>()
  const { data } = useSWR(movieId ? () => tmdbAPI.getMovieDetails(movieId) : null, fetchWithToken)
  console.log('data', data)
  return (
    <section className='flex justify-center items-center flex-col w-full h-full'>
      <BackdropDetail data={data} />
      <DetailCard data={data} />
    </section>
  )
}

export default MovieDetailPage
