import { fetchWithToken, tmdbAPI } from '../../config/config'
import useSWR from 'swr'
import { Swiper, SwiperSlide } from 'swiper/react'
import MovieCard from '../MovieCard'
import { useEffect } from 'react'
import { getCinemaMovie } from '../../redux/api_request/collection_api'
import { useDispatch, useSelector } from 'react-redux'
import type { Movie } from '../../types'
import LoadingSkeleton from '../LoadingSkeleton'

const Popular = () => {
  const movieCinema = useSelector((state: any) => state.collection?.cinemaPlaylist?.movies)
  const isLoading = useSelector((state: any) => state.collection?.cinemaPlaylist?.isFetching)

  const dispatch = useDispatch()
  useEffect(() => {
    getCinemaMovie('692a7634ce5b27fe192c9f08', dispatch)
  }, [dispatch])
  return (
    <section className='trending h-fit px-5 mb-20'>
      <div className='flex flex-col gap-10'>
        <h2 className='text-2xl font-bold'>Phim chiếu rạp</h2>
        <div className='flex gap-5 overflow-x-auto pb-5'>
          {isLoading && (
            <Swiper grabCursor={true} spaceBetween={17} slidesPerView={'auto'}>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
            </Swiper>
          )}
          {!isLoading && movieCinema.length > 0 && (
            <Swiper
              grabCursor={true}
              spaceBetween={17}
              loop={movieCinema.length >= 3}
              breakpoints={{
                1521: {
                  slidesPerView: 7,
                  spaceBetween: 20
                },
                1600: {
                  slidesPerView: 8,
                  spaceBetween: 30
                }
              }}
            >
              {movieCinema.length > 0 &&
                movieCinema.map((item: Movie) => (
                  <SwiperSlide key={item._id}>
                    <MovieCard movie={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  )
}

export const MovieCardSkeleton = () => {
  return (
    <div className='movie-card flex flex-col rounded-lg  h-full select-none'>
      <LoadingSkeleton height='250px' width='100%' radius='8px' className='mb-5' />
      <div className='flex flex-col flex-1 text-white'></div>
      <LoadingSkeleton height='25px' width='100%' radius='6px' />
    </div>
  )
}

export default Popular
