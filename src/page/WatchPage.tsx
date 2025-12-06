import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import Comment from '../components/Comment'
import { CircleChevronLeft } from 'lucide-react'
import VideoPLayer from '../components/VideoPLayer'

const WatchPage = () => {
  const movie = useSelector((state: any) => state.movie.getMovieById?.data)

  return (
    <section className='flex justify-center items-center mt-28'>
      <div className='w-full max-w-screen-2xl h-full px-5 flex flex-col gap-5'>
        <div className='flex mx-20 gap-2 cursor-pointer' onClick={() => window.history.back()}>
          <CircleChevronLeft />
          Quay lại
        </div>
        {/* Video Player Container */}
        <div className='w-full h-screen '>
          <VideoPLayer movie={movie}></VideoPLayer>
        </div>
        {/* meta movie */}
        <div className='flex flex-row justify-between items-center mt-10 pl-5 gap-2 w-full h-full'>
          <div className='w-1/2 h-full flex flex-row gap-5'>
            <img src={movie?.posterPath} alt='Movie Poster' className='h-auto w-1/5 rounded-xl' />
            <div>
              <h1 className='text-2xl font-bold'>{movie?.title}</h1>
              <div className='flex gap-2'>
                {movie?.genres?.map((genre: any) => (
                  <span key={genre.id} className='py-2 px-1 rounded-md bg-white/10 text-xs'>
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className='w-1/2 h-full  mr-20'>
            <p className='mt-2'> Giới thiệu:</p>
            <p className='text-sm text-gray-400 '>{movie?.overview}</p>
          </div>
        </div>
        <div className='w-full px-22'>
          <Comment movieId={movie?._id} />
        </div>
      </div>
    </section>
  )
}

export default WatchPage
