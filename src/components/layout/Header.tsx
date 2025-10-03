import { NavLink, useNavigate } from 'react-router-dom'
import { UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 flex justify-between items-center text-white py-4 px-10 transition-all duration-300 ${
        isScrolled ? 'bg-header-color backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <NavLink
        to='/'
        className='logo w-48 h-12 bg-[url(./src/assets/img/movie_bee_logo3.svg)] bg-size-150 bg-center bg-no-repeat ml-10'
      ></NavLink>
      <div className='flex gap-x-10'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'text-primary' : '')}>
          Trang chủ
        </NavLink>
        <NavLink to='/movies' className={({ isActive }) => (isActive ? 'text-primary' : '')}>
          Danh sách phim
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => (isActive ? 'text-primary' : '')}>
          Liên hệ
        </NavLink>
      </div>
      <div
        className='flex gap-x-3 items-center cursor-pointer bg-white/80 text-black py-2 px-4 rounded-full hover:bg-white'
        onClick={() => {
          navigate('/login')
        }}
      >
        <UserRound />
        <p className='font-medium'>Thành viên</p>
      </div>
    </header>
  )
}

export default Header
