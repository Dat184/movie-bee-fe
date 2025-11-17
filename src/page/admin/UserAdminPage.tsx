import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { UserItem } from '../../components/admin/UserItem'

const UserAdminPage = () => {
  const navigate = useNavigate()
  const handleCreateUser = () => {
    navigate('/admin/users/create-user')
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
        <div className='flex-1 bg-gray-800 rounded-lg overflow-hidden'>
          <table className='w-full'>
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
              {/* <tr className='hover:bg-gray-700 transition-colors'>
              <td className='p-4 text-sm'>
                <img
                  src='https://avatars.githubusercontent.com/u/59419099?v=4'
                  alt='Avatar'
                  className='w-10 h-10 rounded-full object-cover'
                />
              </td>
              <td className='p-4 text-sm'>thanhnguyendat184@gmail.com</td>
              <td className='p-4 text-sm'>User</td>
              <td className='px-6 py-4 text-center'>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    false
                      ? 'bg-red-500/20 text-red-500 border border-red-500'
                      : 'bg-green-500/20 text-green-500 border border-green-500'
                  }`}
                >
                  {false ? 'Vi phạm' : 'Hợp lệ'}
                </span>
              </td>
              <td className='px-6 py-4 text-right'>
                <div className='flex justify-end gap-2'>
                  <button
                    className='p-2 rounded-lg border border-gray-500 hover:bg-gray-600 transition-colors cursor-pointer'
                    title='Chỉnh sửa'
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className='p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer'
                    title='Xóa'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr> */}
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
              <UserItem></UserItem>
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-8 flex justify-center items-center'>
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

export default UserAdminPage
