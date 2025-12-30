import MovieCard from '../MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect } from 'react'
import { getCartoonMovie } from '../../redux/api_request/collection_api'
import { useDispatch, useSelector } from 'react-redux'
import { MovieCardSkeleton } from './Cinema'

const Trending = () => {
  const movies = useSelector((state: any) => state.collection?.cartoonPlaylist?.movies)
  const isLoading = useSelector((state: any) => state.collection?.cartoonPlaylist?.isFetching)
  const dispatch = useDispatch()

  useEffect(() => {
    getCartoonMovie('693052f52cf662d6b642cd57', dispatch)
  }, [dispatch])
  return (
    <section className='trending h-fit px-5 mb-20'>
      <div className='flex flex-col gap-10'>
        <h2 className='text-2xl font-bold'>Phim hoạt hình</h2>
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
          {!isLoading && movies.length > 0 && (
            <Swiper
              grabCursor={true}
              spaceBetween={17}
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
                  slidesPerView: 5,
                  spaceBetween: 20
                },
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
              {movies.length > 0 &&
                movies.map((item: any) => (
                  <SwiperSlide key={item.id}>
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

export default Trending
