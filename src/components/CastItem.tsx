const CastItem = () => {
  return (
    <div className='flex flex-col items-center  cursor-pointer'>
      <img
        src='https://images.unsplash.com/photo-1534528741775-53994a69daeb'
        alt='"Emma Watson"'
        className='w-40 h-60 object-cover rounded-lg mb-3 hover:scale-105 transition-transform'
      />
      <p className='text-center'>Emma Watson</p>
    </div>
  )
}

export default CastItem
