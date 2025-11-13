import { MessageCircleMore, MessagesSquare, SendHorizontal } from 'lucide-react'
import CommentItem from './CommentItem'

const Comment = () => {
  return (
    <>
      <div className='flex gap-2 mt-10 text-2xl font-bold justify-start items-center'>
        <MessageCircleMore size={'32px'} /> Bình luận (20)
      </div>

      <div className='bg-[#ffffff10] h-auto w-auto mt-5 p-3 rounded-lg'>
        <textarea
          className='w-full h-32  p-3 rounded-lg  bg-bg-color resize-none'
          placeholder='Viết bình luận của bạn...'
          rows={4}
          cols={3}
          maxLength={1000}
        ></textarea>
        <div className='flex justify-end mt-2 mr-5'>
          <button className='flex items-center gap-2 cursor-pointer text-primary'>
            Gửi
            <SendHorizontal fill='currentColor' />
          </button>
        </div>
      </div>

      <div className='w-full h-56 bg-[#00000033] mt-10 rounded-xl flex flex-col justify-center items-center gap-2 text-gray-400'>
        <MessagesSquare size={60} />
        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
      </div>

      <CommentItem />
      <CommentItem />
      <CommentItem />
    </>
  )
}

export default Comment
