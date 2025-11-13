import React from 'react'
import MovieCard from '../components/MovieCard'
import useSWR from 'swr'
import { fetchWithToken, tmdbAPI } from '../config/config'
import { Search } from 'lucide-react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const MoviePage = () => {
  const { data } = useSWR(() => tmdbAPI.getMovieList('popular'), fetchWithToken)
  const movies = data?.results || []
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log(value)
  }
  return (
    <div>
      <div className='flex mt-52 justify-center items-center'>
        <div className='bg-[rgba(255,255,255,.08)] w-[500px] h-10 flex flex-row items-center rounded-l-md px-3'>
          <Search />
          <input
            type='text'
            className='bg-transparent border-none outline-none text-white ml-2 flex-1'
            placeholder='Tìm kiếm phim...'
            onChange={handleChange}
          />
        </div>
        <button className='bg-primary text-white rounded-r-md py-1 px-6 h-10'>Tìm</button>
      </div>
      <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-5 mt-10'>
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className='mt-10 flex justify-center items-center'>
        <Stack spacing={2}>
          <Pagination
            count={10}
            color='primary'
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white'
              }
            }}
          />
        </Stack>
      </div>
    </div>
  )
}

export default MoviePage
