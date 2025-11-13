import React from 'react'

const CommentItem = () => {
  return (
    <div className='flex mt-10'>
      <img
        src='https://images.unsplash.com/photo-1760594386929-120ea90650db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
        className='w-15 h-15 rounded-full  object-cover '
        alt='User Avatar'
      ></img>
      <div className='ml-2 gap-1 flex flex-col'>
        <p className='font-bold'>Btad</p>
        <p className='text-sm text-gray-400'>Good film</p>
      </div>
    </div>
  )
}

export default CommentItem
