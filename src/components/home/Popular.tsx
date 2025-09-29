import { fetchWithToken, tmdbAPI } from '../../config/config'
import useSWR from 'swr'
import { Swiper, SwiperSlide } from 'swiper/react'
import MovieCard from '../MovieCard'

const Popular = () => {
  const { data } = useSWR(() => tmdbAPI.getMovieList('popular'), fetchWithToken)
  const movies = data?.results || []
  return (
    <section className='trending h-fit px-5 mb-20'>
      <div className='flex flex-col gap-10'>
        <h2 className='text-2xl font-bold'>Phim đang hot</h2>
        <div className='flex gap-5 overflow-x-auto pb-5'>
          {movies.length > 0 && (
            <Swiper
              grabCursor={true}
              spaceBetween={17}
              loop={true}
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

export default Popular
