import { useNavigate } from 'react-router-dom'
import CastItem from '../../components/CastItem'
import { toast } from 'react-toastify'
import { Plus } from 'lucide-react'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

const CastAdminPage = () => {
  const navigate = useNavigate()
  const handleCreateCast = () => {
    // navigate to create cast page
    navigate('/admin/cast/create-cast')
  }
  return (
    <section className='w-full min-h-screen px-5 py-10 flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-10'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý thể loại</h1>
          <p className='text-gray-400'>Danh sách các thể loại phim</p>
        </div>
        <button
          className='bg-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
          onClick={handleCreateCast}
        >
          <Plus size={20} />
          Thêm thể loại
        </button>
      </div>

      <div className='grid grid-cols-6 gap-5'>
        {/* xài map ở đây */}
        <div onClick={() => navigate('/admin/cast/edit-cast/1')}>
          <CastItem></CastItem>
        </div>
        <CastItem></CastItem>
        <CastItem></CastItem>
        <CastItem></CastItem>
        <CastItem></CastItem>
        <CastItem></CastItem>
        <CastItem></CastItem>
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
    </section>
  )
}

export default CastAdminPage
