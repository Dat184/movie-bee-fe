import { useNavigate } from 'react-router-dom'
import CastItem from '../../components/CastItem'
import { Plus, Search } from 'lucide-react'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllCasts } from '../../redux/api_request/cast_api'
import type { cast } from '../../types'
import Loading from '../../components/Loading'
import useDebounce from '../../hook/useDebounce'

const CastAdminPage = () => {
  const totalPages = useSelector((state: any) => state.cast.getAllCasts?.meta.pages)
  const casts = useSelector((state: any) => state.cast.getAllCasts?.casts)
  const isLoading = useSelector((state: any) => state.cast.getAllCasts?.isFetching)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState('')
  const filterDebounce = useDebounce(filter, 1000)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    getAllCasts(currentPage, 12, filterDebounce, dispatch)
  }, [currentPage, filterDebounce, dispatch])

  useEffect(() => {
    setCurrentPage(1)
  }, [filterDebounce])

  const handleCreateCast = () => {
    // navigate to create cast page
    navigate('/admin/cast/create-cast')
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <section className='w-full min-h-screen px-5 py-10 flex flex-col '>
      <div className='flex flex-row justify-between items-center mb-10'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý diễn viên</h1>
          <p className='text-gray-400'>Danh sách các diễn viên</p>
        </div>
        <div className='flex justify-center items-center'>
          <div className='bg-[rgba(255,255,255,.08)] w-[500px] h-10 flex flex-row items-center rounded-md px-3'>
            <Search />
            <input
              type='text'
              value={filter}
              className='bg-transparent border-none outline-none text-white ml-2 flex-1'
              placeholder='Nhập tên diễn viên...'
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <button
          className='bg-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
          onClick={handleCreateCast}
        >
          <Plus size={20} />
          Thêm diễn viên
        </button>
      </div>

      {casts && casts.length > 0 ? (
        <div className='flex flex-col flex-1'>
          <div className='flex-1 grid grid-cols-6 gap-5'>
            {casts.map((casts: cast) => {
              return <CastItem key={casts._id} cast={casts} />
            })}
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
      ) : (
        <div className='my-auto text-center text-gray-400'>Không có diễn viên nào.</div>
      )}

      {/* <div className='flex-1 grid grid-cols-6 gap-5'>
        {casts.map((casts: cast) => {
          return <CastItem key={casts._id} cast={casts} />
        })}
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
      </div> */}
    </section>
  )
}

export default CastAdminPage
