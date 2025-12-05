import type { Movie } from '../types'

const BackdropDetail = ({ data }: { data: Movie }) => {
  return (
    <div className='h-full max-h-[600px] w-full overflow-hidden'>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-bg-color/100 via-black/30  to-bg-color/70 '></div>
      <img src={data?.backdropPath} alt='Movie Detail' className='h-full w-full object-cover object-[center_70%]' />
    </div>
  )
}

export default BackdropDetail
