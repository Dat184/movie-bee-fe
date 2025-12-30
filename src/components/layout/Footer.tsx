import logo from '../../assets/img/movie_bee_logo3.svg'

const Footer = () => {
  return (
    <footer className='w-full min-h-[300px] h-fit md:h-96 p-4 bg-footer-bg text-white mt-8'>
      <div className='w-full md:w-1/2 h-full flex flex-col justify-center gap-4'>
        <img
          src={logo}
          alt='MovieBee Logo'
          className='w-full max-w-[300px] md:max-w-[530px] h-auto md:h-30 object-contain'
        />
        <p className='text-sm md:text-base'>
          <strong className='text-red-500'>Web được clone</strong> từ RoPhim – Phim hay cả rổ - Trang xem phim online
          chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim
          bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại.
          Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
        </p>
        <p>© 2025 MovieBee</p>
      </div>
    </footer>
  )
}

export default Footer
