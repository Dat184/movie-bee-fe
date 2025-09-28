import MovieList from '../MovieList'

const Topic = () => {
  return (
    <section className='Topic h-fit px-5 mb-20'>
      <div className='bg-gradient-to-t from-[#282B3A00] to-[#282B3AFF] h-full w-full rounded-2xl p-8 space-y-10'>
        <MovieList title='Vũ trụ Marvel' />
        <MovieList title='Anime' />
        <MovieList title='Phim US-UK' />
      </div>
    </section>
  )
}

export default Topic
