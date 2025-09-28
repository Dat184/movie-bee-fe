import MovieCardTopic from './MovieCardTopic'

const MovieList = ({ title }: { title: string }) => {
  return (
    <div className='w-full h-fit flex flex-row  items-center justify-between'>
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
      <div className='grid grid-cols-3 gap-5'>
        {/* Movie items would go here */}
        <MovieCardTopic />
        <MovieCardTopic />
        <MovieCardTopic />
        {/* <h2>asdddddddd</h2> */}
      </div>
    </div>
  )
}

export default MovieList
