import MovieCardTopic from './MovieCardTopic'
import { Swiper, SwiperSlide } from 'swiper/react'

const MovieList = ({ title, movies }: { title: string; movies: any[] }) => {
  return (
    <div className='w-full h-fit flex flex-row items-center justify-between movie-list'>
      <div className=''>
        <h2
          className={
            'text-3xl font-bold' +
            (title === 'Vũ trụ Marvel'
              ? ' mb-5 text-gradient-marvel'
              : title === 'Anime'
              ? ' mb-5 text-gradient-anime'
              : ' mb-5 text-gradient-usuk')
          }
        >
          {title}
        </h2>
        <p>Xem toàn bộ</p>
      </div>
      <div className='flex overflow-x-auto pb-5 w-5/6'>
        {movies.length > 0 && (
          <Swiper
            grabCursor={true}
            spaceBetween={20}
            loop={true}
            breakpoints={{
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
              movies.map((item: any) => (
                <SwiperSlide key={item.id}>
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
