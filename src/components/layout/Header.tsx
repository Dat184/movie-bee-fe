import { NavLink, useNavigate } from 'react-router-dom'
import { UserRound, ChevronDown, User, LogOut } from 'lucide-react'
import { use, useEffect, useState } from 'react'
import logo from '../../assets/img/movie_bee_logo3.svg'
import { useSelector, useDispatch } from 'react-redux'
import useClickOutside from '../../hook/useClickOutside'
import { logout, profile } from '../../redux/api_request/auth_api'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const user = useSelector((state: any) => state.auth.profile?.userInfo)
  const { show, setShow, nodeRef } = useClickOutside('.user-dropdown-trigger')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    profile(dispatch)
  }, [dispatch])

  const handleLogout = () => {
    logout(dispatch, navigate)
    profile(dispatch)
    setShow(false)
  }

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
      <NavLink to='/' className='ml-10'>
        <img src={logo} alt='MovieBee Logo' className='w-48 h-12 object-contain' />
      </NavLink>
      <div className='flex gap-x-10'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'text-primary' : '')}>
          Trang chủ
        </NavLink>
        <NavLink to='/movies' className={({ isActive }) => (isActive ? 'text-primary' : '')}>
          Danh sách phim
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => (isActive ? 'text-primary' : '')}>
          Giới thiệu
        </NavLink>
      </div>
      {user ? (
        <div className='relative' ref={nodeRef}>
          <div
            className='user-dropdown-trigger flex gap-x-3 items-center cursor-pointer bg-white/80 text-black py-2 px-4 rounded-full hover:bg-white'
            onClick={() => setShow(!show)}
          >
            <img src={user.avatar} alt='user avatar' className='w-9 h-9 rounded-full' />
            <p className='font-medium'>
              {user.firstName} {user.lastName}
            </p>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${show ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {show && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-black z-[100] border border-gray-200'>
              <button
                onClick={() => {
                  navigate('/profile')
                  setShow(false)
                }}
                className='w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-x-2 transition-colors'
              >
                <User className='w-4 h-4' />
                <span>Trang cá nhân</span>
              </button>
              <button
                onClick={handleLogout}
                className='w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-x-2 transition-colors text-red-600'
              >
                <LogOut className='w-4 h-4' />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className='flex gap-x-3 items-center cursor-pointer bg-white/80 text-black py-2 px-4 rounded-full hover:bg-white'
          onClick={() => {
            navigate('/login')
          }}
        >
          <UserRound />
          <p className='font-medium'>Thành viên</p>
        </div>
      )}
    </header>
  )
}

export default Header
