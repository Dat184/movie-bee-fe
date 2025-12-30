import { useSelector } from 'react-redux'
import type { Movie } from '../types'
import { MovieCardSkeleton } from './home/Cinema'
import MovieCardTopic from './MovieCardTopic'
import { Swiper, SwiperSlide } from 'swiper/react'

const MovieList = ({ title, movies }: { title: string; movies: Movie[] }) => {
  const isLoading = useSelector((state: any) => {
    if (title === 'Vũ trụ Marvel') return state.collection?.maverPlaylist?.isFetching
    if (title === 'Anime') return state.collection?.animePlaylist?.isFetching
    return state.collection?.actionPlaylist?.isFetching
  })
  return (
    <div className='w-full h-fit flex flex-col md:flex-row items-start md:items-center justify-between movie-list'>
      <div className='w-full md:w-1/6 mb-4 md:mb-0'>
        <h2
          className={
            'text-2xl md:text-3xl font-bold' +
            (title === 'Vũ trụ Marvel'
              ? ' mb-5 text-gradient-marvel'
              : title === 'Anime'
              ? ' mb-5 text-gradient-anime'
              : ' mb-5 text-gradient-usuk')
          }
        >
          {title}
        </h2>
      </div>
      <div className='flex overflow-x-auto pb-5 w-full md:w-5/6'>
        {isLoading && (
          <div className='flex flex-row gap-5 w-full h-fit'>
            <div className='w-1/3 h-full'>
              <MovieCardSkeleton></MovieCardSkeleton>
            </div>
            <div className='w-1/3 h-full'>
              <MovieCardSkeleton></MovieCardSkeleton>
            </div>
            <div className='w-1/3 h-full'>
              <MovieCardSkeleton></MovieCardSkeleton>
            </div>
          </div>
        )}

        {!isLoading && movies.length > 0 && (
          <Swiper
            grabCursor={true}
            spaceBetween={20}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 15
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              1521: {
                slidesPerView: 3,
                spaceBetween: 25
              },
              1600: {
                slidesPerView: 4,
                spaceBetween: 30
              }
            }}
          >
            {movies.length > 0 &&
              movies.map((item: Movie) => (
                <SwiperSlide key={item._id}>
                  <MovieCardTopic movie={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default MovieList
