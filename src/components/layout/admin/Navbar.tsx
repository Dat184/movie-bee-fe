import useClickOutside from '../../../hook/useClickOutside'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/img/movie_bee_logo3.svg'

const Navbar = () => {
  const { show, setShow, nodeRef } = useClickOutside()

  return (
    <div className='w-72 bg-gray-800 text-white p-4 flex flex-col h-screen fixed left-0 top-0'>
      {/* logo */}
      <div className='flex justify-center items-center flex-row mb-8 gap-2'>
        <img src={logo} alt='MovieBee Logo' className='w-38 h-12 object-contain' />
        <div className='text-gray-500'>ADMIN</div>
      </div>
      {/* Dashboard */}
      <div className='flex-1 overflow-y-auto flex flex-col'>
        <NavLink
          to='/admin/dashboard'
          className={({ isActive }) =>
            'mb-4 p-2 hover:bg-gray-700 rounded cursor-pointer' + (isActive ? ' bg-gray-700' : '')
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to='/admin/movies'
          className={({ isActive }) =>
            'mb-4 p-2 hover:bg-gray-700 rounded cursor-pointer' + (isActive ? ' bg-gray-700' : '')
          }
        >
          Phim
        </NavLink>
        <NavLink
          to='/admin/cast'
          className={({ isActive }) =>
            'mb-4 p-2 hover:bg-gray-700 rounded cursor-pointer' + (isActive ? ' bg-gray-700' : '')
          }
        >
          Diễn viên
        </NavLink>
        <NavLink
          to='/admin/users'
          className={({ isActive }) =>
            'mb-4 p-2 hover:bg-gray-700 rounded cursor-pointer' + (isActive ? ' bg-gray-700' : '')
          }
        >
          User
        </NavLink>
        <NavLink
          to='/admin/genres'
          className={({ isActive }) =>
            'mb-4 p-2 hover:bg-gray-700 rounded cursor-pointer' + (isActive ? ' bg-gray-700' : '')
          }
        >
          Thể loại
        </NavLink>
        <NavLink
          to='/admin/comments'
          className={({ isActive }) =>
            'mb-4 p-2 hover:bg-gray-700 rounded cursor-pointer' + (isActive ? ' bg-gray-700' : '')
          }
        >
          Bình luận
        </NavLink>
      </div>

      {/* Account info */}
      <div className='border-t border-gray-700 pt-4 mt-4 relative' ref={nodeRef}>
        <div
          className='flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer'
          onClick={() => setShow(!show)}
        >
          <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold'>
            A
          </div>
          <div className='flex flex-col'>
            <span className='font-medium text-sm'>Admin User</span>
            <span className='text-xs text-gray-400'>admin@moviebee.com</span>
          </div>
        </div>

        {/* Account Menu Popup */}
        {show && (
          <div className='absolute bottom-full left-0 right-0 mb-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden'>
            {/* User Info Header */}
            <div className='flex items-center gap-3 p-3 border-b border-gray-700'>
              <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold'>
                A
              </div>
              <div className='flex flex-col'>
                <span className='font-medium text-sm'>Admin User</span>
                <span className='text-xs text-gray-400'>admin@moviebee.com</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className='p-2'>
              <div className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700  cursor-pointer text-red-400 rounded'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
                <span className='text-sm'>Đăng xuất</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
