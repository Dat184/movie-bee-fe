import { Star } from 'lucide-react'
import PlayNowBtn from './ui/PlayNowBtn'
import { useState } from 'react'
import Comment from './Comment'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '../types'

const DetailCard = ({ data }: { data: Movie }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('trailer')

  const tabs = [
    { id: 'trailer', label: 'Trailer' },
    { id: 'cast', label: 'Diễn viên' }
  ]

  const handleClickPlaybtn = () => {
    navigate(`/watch/${data?._id}`)
  }
  console.log(data)
  return (
    <div className='w-full h-full p-5 -mt-[100px] flex flex-row z-10 '>
      <div className='w-1/3 h-full rounded-l-2xl rounded-r-[3rem] bg-bg-color'>
        <div className='p-5 flex flex-col justify-center items-start h-full gap-2'>
          <img src={data?.posterPath} alt='Movie Poster' className='h-1/2 w-1/2 rounded-xl' />
          <h1 className='text-2xl font-bold'>{data?.title}</h1>
          <div className='flex flex-wrap gap-2'>
            {data.genres.map((genre) => (
              <span key={genre._id} className='py-2 px-1 rounded-md bg-white/10 text-xs'>
                {genre.name}
              </span>
            ))}
          </div>
          <p className='mt-2'> Giới thiệu:</p>
          <p className='text-sm text-gray-400 '>{data?.overview}</p>
        </div>
      </div>
      <div className='w-2/3  rounded-r-2xl rounded-l-[3rem] bg-bg-color'>
        <div className='p-10'>
          <div className='flex flex-row gap-3 justify-between items-center'>
            <div onClick={handleClickPlaybtn}>
              <PlayNowBtn />
            </div>

            <div className='w-fit h-13 rounded-full bg-secondary gap-3 px-3 flex items-center justify-center hover:scale-110 transition-all cursor-pointer'>
              <Star fill='currentColor' /> {data?.imdbRating} <strong>Đánh giá từ IMDb</strong>
            </div>
          </div>

          <div className='mt-10 flex flex-row gap-10 '>
            {tabs.map((tab) => (
              <p
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer transition-colors pb-2 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary border-primary'
                    : 'text-white border-transparent hover:text-primary'
                }`}
              >
                {tab.label}
              </p>
            ))}
          </div>
          <div>
            {activeTab === 'trailer' && <MovieMeta type='videos' movie={data} />}
            {activeTab === 'cast' && <MovieMeta type='credits' movie={data} />}
          </div>

          <Comment movieId={data._id} />
        </div>
      </div>
    </div>
  )
}

function MovieMeta({ type = 'videos', movie }: { type: any; movie: Movie }) {
  if (type === 'credits') {
    const { casts } = movie
    if (!casts || casts.length <= 0) return null
    return (
      <div className='mt-5'>
        <h2 className='text-center text-2xl mb-10'>Casts</h2>
        <div className='grid grid-cols-5 gap-5'>
          {casts.slice(0, 8).map((item: any) => (
            <div key={item._id} className='flex flex-col items-center'>
              <img src={item.avatarPath} alt={item.name} className='w-full h-full object-cover rounded-lg mb-3' />
              <p className='text-center'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    const { trailerUrl } = movie
    if (type === 'videos') {
      return (
        <div className='mt-5'>
          <div className='flex flex-col gap-10'>
            <iframe
              width='100%'
              height='450'
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title={movie.title}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )
    }
  }
  return null
}

export default DetailCard
