import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import useSWR from 'swr'
import { fetchWithToken } from '../../config/config'
import BannerItem from '../BannerItem'

const Banner = () => {
  const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?language=vi-VN&page=1`, (url) =>
    fetchWithToken(url)
  )
  const movie = data?.results || []

  return (
    <section className='h-screen '>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        className='h-full w-full'
      >
        {movie.length > 0 &&
          movie.map((item: any) => (
            <SwiperSlide key={item.id}>
              <BannerItem movie={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}

export default Banner
