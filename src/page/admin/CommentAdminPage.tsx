import Stack from '@mui/material/Stack'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'

interface Comment {
  id: number
  userName: string
  movieName: string
  content: string
  createdAt: string
  isViolation: boolean
}

type FilterType = 'all' | 'violation' | 'valid'

const CommentAdminPage = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      userName: 'Nguyễn Văn A',
      movieName: 'Avengers: Endgame',
      content: 'Phim hay quá, đáng xem!',
      createdAt: '2024-11-15',
      isViolation: false
    },
    {
      id: 2,
      userName: 'Trần Thị B',
      movieName: 'Spider-Man: No Way Home',
      content: 'Phim dở tệ, lãng phí tiền',
      createdAt: '2024-11-15',
      isViolation: true
    },
    {
      id: 3,
      userName: 'Lê Văn C',
      movieName: 'The Batman',
      content: 'Diễn xuất tuyệt vời, kịch bản chặt chẽ',
      createdAt: '2024-11-15',
      isViolation: false
    },
    {
      id: 4,
      userName: 'Phạm Thị D',
      movieName: 'Doctor Strange 2',
      content:
        'Hiệu ứng đẹp mắt nhưng cốt truyện hơi nhạt, Hiệu ứng đẹp mắt nhưng cốt truyện hơi nhạt, Hiệu ứng đẹp mắt nhưng cốt truyện hơi nhạt, Hiệu ứng đẹp mắt nhưng cốt truyện hơi nhạt',
      createdAt: '2024-11-15',
      isViolation: false
    },
    {
      id: 5,
      userName: 'Hoàng Văn E',
      movieName: 'Thor: Love and Thunder',
      content: 'Phim rác rưởi, không xem cũng được',
      createdAt: '2024-11-15',
      isViolation: true
    }
  ])

  const [filter, setFilter] = useState<FilterType>('all')

  const handleDelete = (id: number, userName: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa bình luận của "${userName}"?`)) {
      setComments(comments.filter((comment) => comment.id !== id))
      toast.success('Đã xóa bình luận thành công')
    }
  }

  const handleToggleViolation = (id: number) => {
    setComments(
      comments.map((comment) => (comment.id === id ? { ...comment, isViolation: !comment.isViolation } : comment))
    )
    const comment = comments.find((c) => c.id === id)
    if (comment) {
      toast.success(comment.isViolation ? 'Đã đánh dấu bình luận không vi phạm' : 'Đã đánh dấu bình luận vi phạm')
    }
  }

  // Lọc bình luận theo filter
  const filteredComments = comments.filter((comment) => {
    if (filter === 'all') return true
    if (filter === 'violation') return comment.isViolation
    if (filter === 'valid') return !comment.isViolation
    return true
  })

  return (
    <section className='w-full min-h-screen px-5 py-10 flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý bình luận</h1>
          <p className='text-gray-400'>Danh sách các bình luận</p>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className='flex gap-3 mb-6'>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setFilter('all')}
        >
          Tất cả ({comments.length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            filter === 'violation'
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setFilter('violation')}
        >
          Vi phạm ({comments.filter(c => c.isViolation).length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            filter === 'valid'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setFilter('valid')}
        >
          Hợp lệ ({comments.filter(c => !c.isViolation).length})
        </button>
      </div>

      <div className='flex-1'>
        <div className='bg-gray-800 rounded-lg overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-700'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-semibold'>User</th>
                <th className='px-6 py-4 text-left text-sm font-semibold'>Phim</th>
                <th className='px-6 py-4 text-left text-sm font-semibold'>Nội dung bình luận</th>
                <th className='px-6 py-4 text-left text-sm font-semibold'>Thời gian</th>
                <th className='px-6 py-4 text-center text-sm font-semibold'>Trạng thái</th>
                <th className='px-6 py-4 text-right text-sm font-semibold'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {filteredComments.map((comment) => (
                <tr key={comment.id} className='hover:bg-gray-700 transition-colors'>
                  <td className='px-6 py-4 text-sm font-medium'>{comment.userName}</td>
                  <td className='px-6 py-4 text-sm'>{comment.movieName}</td>
                  <td className='px-6 py-4 text-sm max-w-md'>
                    <p className='break-words'>{comment.content}</p>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>{comment.createdAt}</td>
                  <td className='px-6 py-4 text-center'>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        comment.isViolation
                          ? 'bg-red-500/20 text-red-500 border border-red-500'
                          : 'bg-green-500/20 text-green-500 border border-green-500'
                      }`}
                    >
                      {comment.isViolation ? 'Vi phạm' : 'Hợp lệ'}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <div className='flex justify-end gap-2'>
                      <button
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          comment.isViolation
                            ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                            : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                        }`}
                        onClick={() => handleToggleViolation(comment.id)}
                        title={comment.isViolation ? 'Đánh dấu hợp lệ' : 'Đánh dấu vi phạm'}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className='p-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors cursor-pointer'
                        onClick={() => handleDelete(comment.id, comment.userName)}
                        title='Xóa bình luận'
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComments.length === 0 && (
          <div className='text-center py-10 text-gray-400'>
            <p>Không có bình luận nào</p>
          </div>
        )}
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

export default CommentAdminPage