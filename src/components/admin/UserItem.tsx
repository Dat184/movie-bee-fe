import { Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UserItem = () => {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate('/admin/users/edit-user/1')
  }
  return (
    <tr className='hover:bg-gray-700 transition-colors' onClick={handleEdit}>
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
    </tr>
  )
}
