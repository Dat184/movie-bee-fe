import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import useSWR from 'swr'
import { fetchWithToken, tmdbAPI } from '../config/config'
import { Search } from 'lucide-react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../redux/api_request/movie_api'
import type { Movie } from '../types'
import useDebounce from '../hook/useDebounce'

const MoviePage = () => {
  const movies = useSelector((state: any) => state.movie.getAllMovies?.movies)
  const totalPages = useSelector((state: any) => state.movie.getAllMovies?.meta.pages)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState('')
  const filterDebounce = useDebounce(filter, 1000)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllMovies(currentPage, 20, filterDebounce, dispatch)
  }, [currentPage, filterDebounce, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
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
        {movies.map((movie: Movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className='mt-10 flex justify-center items-center'>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
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
