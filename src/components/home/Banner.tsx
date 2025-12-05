import { useEffect } from 'react'
import { getBannerMovie } from '../../redux/api_request/collection_api'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import BannerItem from '../BannerItem'

const Banner = () => {
  const movie = useSelector((state: any) => state.collection?.banner?.movies)
  const isLoading = useSelector((state: any) => state.collection?.banner?.isFetching)
  const error = useSelector((state: any) => state.collection?.banner?.error)

  const dispatch = useDispatch()

  useEffect(() => {
    getBannerMovie(dispatch)
  }, [dispatch])

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
