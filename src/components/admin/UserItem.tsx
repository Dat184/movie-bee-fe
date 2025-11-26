import { Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { User } from '../../types'
import { deleteUser, getAllUsers } from '../../redux/api_request/user_api'
import { useDispatch } from 'react-redux'
import { get } from 'react-hook-form'

export const UserItem = ({ user }: { user: User }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEdit = () => {
    navigate(`/admin/users/edit-user/${user._id}`)
  }
  const handleDelete = ({ id }: { id: string }) => {
    deleteUser(id, dispatch)
  }
  return (
    <tr className='hover:bg-gray-700 transition-colors'>
      <td className='p-4 text-sm'>
        <img src={user.avatar || ''} alt='Avatar' className='w-10 h-10 rounded-full object-cover' />
      </td>
      <td className='p-4 text-sm'>{user.email}</td>
      <td className='p-4 text-sm'>{user.role}</td>
      <td className='px-6 py-4 text-center'>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            user.isVerified
              ? 'bg-green-500/20 text-green-500 border border-green-500'
              : 'bg-red-500/20 text-red-500 border border-red-500'
          }`}
        >
          {user.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
        </span>
      </td>
      <td className='px-6 py-4 text-right'>
        <div className='flex justify-end gap-2'>
          <button
            className='p-2 rounded-lg border border-gray-500 hover:bg-gray-600 transition-colors cursor-pointer'
            title='Chỉnh sửa'
            onClick={handleEdit}
          >
            <Pencil size={16} />
          </button>
          <button
            className='p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer'
            title='Xóa'
            onClick={() => handleDelete({ id: user._id })}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
