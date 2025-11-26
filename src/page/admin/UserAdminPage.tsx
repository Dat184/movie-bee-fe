import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { UserItem } from '../../components/admin/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../redux/api_request/user_api'
import type { User } from '../../types'
import { set } from 'react-hook-form'

const UserAdminPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const listUsers = useSelector((state: any) => state.user.getAllUsers?.users)
  const totalPages = useSelector((state: any) => state.user.getAllUsers?.meta.pages)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    getAllUsers(currentPage, 6, dispatch)
  }, [dispatch, currentPage])

  const handleCreateUser = () => {
    navigate('/admin/users/create-user')
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <section className='w-full min-h-screen px-5 py-10 flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-10'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
          <p className='text-gray-400'>Danh sách các người dùng phim</p>
        </div>
        <button
          onClick={handleCreateUser}
          className='bg-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer'
        >
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      <div className='flex-1'>
        <div className=' bg-gray-800 rounded-lg overflow-hidden'>
          <table className='w-full '>
            <thead className='bg-gray-700'>
              <tr>
                <th className='text-left p-4 text-sm font-semibold'>Avatar</th>
                <th className='text-left p-4 text-sm font-semibold'>Email</th>
                <th className='text-left p-4 text-sm font-semibold'>Vai trò</th>
                <th className='text-center p-4 text-sm font-semibold'>Xác thực</th>
                <th className='text-right p-4 text-sm font-semibold'>Hành động</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {listUsers?.map((user: User) => (
                <UserItem key={user._id} user={user}></UserItem>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-8 flex justify-center items-center'>
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
    </section>
  )
}

export default UserAdminPage
