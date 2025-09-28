import { useEffect, useState } from 'react'
import { fetchWithToken, tmdbAPI } from '../../config/config'
import { Play } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import useSWR from 'swr'
import BannerItem from '../BannerItem'

const Banner = () => {
  const [genresList, setGenresList] = useState<any[]>([])

  const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?language=vi-VN&page=1`, (url) =>
    fetchWithToken(url)
  )
  const movie = data?.results || []

  const getGenres = async () => {
    const res = await fetchWithToken(tmdbAPI.getGenres())
    return res.genres
  }

  const mapGenres = async (ids: number[]) => {
    const genres = await getGenres()
    if (!genres) return ''
    const movieGenres = genres.filter((genre: any) => ids.includes(genre.id))
    return movieGenres.map((genre: any) => genre.name).join(', ')
  }

  useEffect(() => {
    getGenres()
  }, [])

  useEffect(() => {
    if (movie.genre_ids && movie.genre_ids.length > 0) {
      mapGenres(movie.genre_ids).then((genreNames) => {
        setGenresList(genreNames.split(', '))
      })
    }
  }, [movie.genre_ids])

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
              <BannerItem movie={item} genresList={genresList} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}



export default Banner
