const Footer = () => {
  return (
    <footer className='w-full h-96 p-4 bg-footer-bg  text-white mt-8'>
      <div className='w-1/2 h-full flex flex-col justify-center gap-4'>
        <div className='logo w-[530px] h-30 bg-[url(./src/assets/img/movie_bee_logo3.svg)] bg-size-200 bg-center bg-no-repeat'></div>
        <p>
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
