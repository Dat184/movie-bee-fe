import { fetchWithToken, tmdbAPI } from '../config/config'
import { useEffect, useState } from 'react'
import PlayNowBtn from './ui/PlayNowBtn'
import type { genre, Movie } from '../types'

const BannerItem = ({ movie }: { movie: Movie }) => {
  return (
    <div className='h-screen w-full rounded-lg relative overflow-hidden '>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-bg-color/100 via-black/30  to-bg-color/70 rounded-lg z-10'></div>
      <img
        src={movie.backdropPath}
        alt={movie.title}
        className='absolute inset-0 w-full h-full object-cover object-center rounded-lg '
        loading='lazy'
      />
      <div className='absolute left-10 bottom-30 w-full text-white z-20 max-w-2xl'>
        <h2 className='font-bold text-3xl mb-3 drop-shadow-lg'>{movie.title}</h2>
        <p className='text-gray-200 mb-5 line-clamp-3 text-sm leading-relaxed drop-shadow-sm'>{movie.overview}</p>
        <div className='flex flex-wrap items-center gap-3 mb-8'>
          {movie.genres.map((genre: any) => (
            <span key={genre._id} className='py-1 px-2 border border-white/60 rounded-md backdrop-blur-sm bg-white/10'>
              {genre.name}
            </span>
          ))}
        </div>
        <PlayNowBtn />
      </div>
    </div>
  )
}

export default BannerItem
