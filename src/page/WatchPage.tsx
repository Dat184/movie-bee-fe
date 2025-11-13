import useSWR from 'swr'
import { fetchWithToken, tmdbAPI } from '../config/config'
import { useParams } from 'react-router'
import Comment from '../components/Comment'

const WatchPage = () => {
  const { movieId } = useParams<{ movieId: string }>()
  console.log(movieId)
  const { data } = useSWR(movieId ? () => tmdbAPI.getMovieDetails(movieId) : null, fetchWithToken)
  console.log('data', data)
  return (
    <section className='flex justify-center items-center mt-28'>
      <div className='w-full max-w-screen-2xl h-full px-5 flex flex-col gap-5'>
        <div className='flex mx-20'>Quay lại</div>
        <video
          src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          controls
          className='w-full h-screen '
        ></video>
        <div className='flex flex-row justify-between items-center pl-5 gap-2 w-full h-full'>
          <div className='w-1/2 h-full flex flex-row gap-5'>
            <img
              src={tmdbAPI.getImage(data?.poster_path, 'w500')}
              alt='Movie Poster'
              className='h-auto w-1/5 rounded-xl'
            />
            <div>
              <h1 className='text-2xl font-bold'>{data?.title}</h1>
              <div className='flex gap-2'>
                {data?.genres?.map((genre: any) => (
                  <span key={genre.id} className='py-2 px-1 rounded-md bg-white/10 text-xs'>
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className='w-1/2 h-full  mr-20'>
            <p className='mt-2'> Giới thiệu:</p>
            <p className='text-sm text-gray-400 '>{data?.overview}</p>
          </div>
        </div>
        <Comment></Comment>
      </div>
    </section>
  )
}

export default WatchPage
