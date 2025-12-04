import { MessageCircleMore, MessagesSquare, SendHorizontal } from 'lucide-react'
import CommentItem from './CommentItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsByMovieId, postComment } from '../redux/api_request/comment_api'
import { clearComments } from '../redux/slice/commentSlice'
import type { comment } from '../types'
import { toast } from 'react-toastify'

const Comment = ({ movieId }: { movieId: string }) => {
  const dispatch = useDispatch()
  const comment = useSelector((state: any) => state.comment.getCommentsByMovieId?.comments)
  const isPostingComment = useSelector((state: any) => state.comment.postComment.isFetching)
  const totalPages = useSelector((state: any) => state.comment.getCommentsByMovieId?.meta?.pages)
  const user = useSelector((state: any) => state.auth.profile?.userInfo)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [content, setContent] = useState('')

  // useEffect(() => {
  //   if (movieId) {
  //     console.log('Fetching comments for movie:', movieId)
  //     // Clear old comments first
  //     dispatch(clearComments())
  //     // Then fetch new comments
  //     getCommentsByMovieId(movieId, currentPage, 2, dispatch)
  //   }

  //   return () => {
  //     // Clear comments when component unmounts
  //     dispatch(clearComments())
  //   }
  // }, [movieId, dispatch, currentPage])

  useEffect(() => {
    if (movieId) {
      getCommentsByMovieId(movieId, currentPage, 10, dispatch)
    }
  }, [movieId, currentPage, dispatch])

  useEffect(() => {
    if (movieId) {
      dispatch(clearComments())
      setCurrentPage(1)
    }
  }, [movieId, dispatch])

  const handleCreateComment = () => {
    if (!content.trim()) {
      toast.warning('Vui lòng nhập nội dung bình luận')
      return
    }
    postComment({ movieId, content }, currentPage, dispatch)
    setContent('')
  }

  if (isPostingComment) {
    return <div>Đang gửi bình luận...</div>
  }
  return (
    <>
      <div className='flex gap-2 mt-10 text-2xl font-bold justify-start items-center'>
        <MessageCircleMore size={'32px'} /> Bình luận ({comment.length})
      </div>

      <div className='bg-[#ffffff10] h-auto w-auto mt-5 p-3 rounded-lg'>
        <textarea
          className='w-full h-32  p-3 rounded-lg  bg-bg-color resize-none'
          placeholder='Viết bình luận của bạn...'
          rows={4}
          cols={3}
          maxLength={1000}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className='flex justify-end mt-2 mr-5'>
          <button className='flex items-center gap-2 cursor-pointer text-primary' onClick={handleCreateComment}>
            Gửi
            <SendHorizontal fill='currentColor' />
          </button>
        </div>
      </div>

      {comment.length === 0 ? (
        <div className='w-full h-56 bg-[#00000033] mt-10 rounded-xl flex flex-col justify-center items-center gap-2 text-gray-400'>
          <MessagesSquare size={60} />
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </div>
      ) : (
        <>
          {comment.map((cmt: any) => (
            <CommentItem key={cmt._id} comment={cmt} />
          ))}

          <div className='mt-10 text-center'>
            <button
              className={`!w-fit  ${totalPages === currentPage ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              onClick={() => (totalPages === currentPage ? null : setCurrentPage(currentPage + 1))}
              disabled={totalPages === currentPage}
            >
              Load more
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Comment
