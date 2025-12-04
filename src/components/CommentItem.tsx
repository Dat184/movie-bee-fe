import type { comment } from '../types'

const CommentItem = ({ comment }: { comment: comment }) => {
  return (
    <div className='flex mt-10'>
      <img src={comment.userId?.avatar} className='w-15 h-15 rounded-full  object-cover ' alt='User Avatar'></img>
      <div className='ml-2 gap-1 flex flex-col'>
        <p className='font-bold'>{comment.userId?.firstName + ' ' + comment.userId?.lastName}</p>
        <p className='text-sm text-gray-400'>{comment.content}</p>
      </div>
    </div>
  )
}

export default CommentItem
