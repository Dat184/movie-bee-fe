import React, { Fragment } from 'react'
import useSWR from 'swr'
import { fetchWithToken } from '../config/config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Banner from '../components/home/Banner'

const Home = () => {
  const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?language=vi-VN&page=1`, (url) =>
    fetchWithToken(url)
  )
  const movie = data?.results || []
  return (
    <Fragment>
      <section className='h-screen'>
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
                <Banner movie={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      <section className='container mx-auto my-10'>Danh sách phim</section>
    </Fragment>
  )
}

export default Home
