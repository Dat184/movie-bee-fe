const Banner = ({ movie }: { movie: any }) => {
  return (
    <div className='h-screen w-full rounded-lg relative overflow-hidden'>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg z-10'></div>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        className='absolute inset-0 w-full h-full object-cover object-center rounded-lg'
        loading='lazy'
      />
      <div className='absolute left-5 bottom-5 w-full text-white z-20 max-w-2xl'>
        <h2 className='font-bold text-3xl mb-3 drop-shadow-lg'>{movie.title}</h2>
        <p className='text-gray-200 mb-5 line-clamp-3 text-sm leading-relaxed drop-shadow-sm'>{movie.overview}</p>
        <div className='flex items-center gap-x-3 mb-8'>
          <span className='py-2 px-4 border border-white/60 rounded-md backdrop-blur-sm bg-white/10'>Adventure</span>
          <span className='py-2 px-4 border border-white/60 rounded-md backdrop-blur-sm bg-white/10'>Adventure</span>
          <span className='py-2 px-4 border border-white/60 rounded-md backdrop-blur-sm bg-white/10'>Adventure</span>
        </div>
        <button className='bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg'>
          Watch Now
        </button>
      </div>
    </div>
  )
}

export default Banner
