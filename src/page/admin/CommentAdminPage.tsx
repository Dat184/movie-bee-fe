import Stack from '@mui/material/Stack'
import { Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import type { comment } from '../../types'
import { deleteComment, editComment, getAllComments } from '../../redux/api_request/comment_api'
import { set } from 'react-hook-form'

const CommentAdminPage = () => {
  const comments = useSelector((state: any) => state.comment.getAllComments?.comments) as comment[]
  const totalPages = useSelector((state: any) => state.comment.getAllComments?.meta?.pages)
  const isLoading = useSelector((state: any) => state.comment.getAllComments?.isFetching)
  const isDeleting = useSelector((state: any) => state.comment.deleteComment?.isFetching)
  const isUpdating = useSelector((state: any) => state.comment.editComment?.isFetching)
  const [call, setCall] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllComments(currentPage, 20, dispatch)
  }, [currentPage, dispatch])

  const handleDelete = (id: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa bình luận này?`)) {
      deleteComment(id, dispatch)
      setCall(true)
      toast.success('Đã xóa bình luận thành công')
    }
  }

  if (isDeleting || isUpdating) {
    if (call) {
      getAllComments(currentPage, 20, dispatch)
      setCall(false)
    }
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16'></div>
      </div>
    )
  }

  const handleUpdateComments = (id: string, isSafe: boolean) => {
    editComment(id, { isSafe: !isSafe }, dispatch)
    setCall(true)
    toast.success(`Đã đánh dấu bình luận ${!isSafe ? 'hợp lệ' : 'vi phạm'}`)
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <section className='w-full min-h-screen px-5 py-10 flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý bình luận</h1>
          <p className='text-gray-400'>Danh sách các bình luận</p>
        </div>
      </div>

      {/* Bộ lọc */}

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
              {comments.length > 0 &&
                comments.map((comment) => (
                  <tr key={comment._id} className='hover:bg-gray-700 transition-colors'>
                    <td className='px-6 py-4 text-sm font-medium'>{comment.userId?.email}</td>
                    <td className='px-6 py-4 text-sm'>{comment.movieId?.title}</td>
                    <td className='px-6 py-4 text-sm max-w-md'>
                      <p className='break-words'>{comment.content}</p>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>{comment.createdAt}</td>
                    <td className='px-6 py-4 text-center'>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          comment.isSafe
                            ? 'bg-green-500/20 text-green-500 border border-green-500'
                            : 'bg-red-500/20 text-red-500 border border-red-500'
                        }`}
                      >
                        {comment.isSafe ? 'Hợp lệ' : 'Vi phạm'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end gap-2'>
                        <button
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            comment.isSafe
                              ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                              : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                          }`}
                          onClick={() => handleUpdateComments(comment._id, comment.isSafe)}
                          title={comment.isSafe ? 'Đánh dấu hợp lệ' : 'Đánh dấu vi phạm'}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className='p-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors cursor-pointer'
                          onClick={() => handleDelete(comment._id)}
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

        {comments.length === 0 && (
          <div className='text-center py-10 text-gray-400'>
            <p>Không có bình luận nào</p>
          </div>
        )}
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
    </section>
  )
}

export default CommentAdminPage
