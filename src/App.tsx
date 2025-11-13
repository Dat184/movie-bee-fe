import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import Main from './components/layout/Main'
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import ResetPassword from './page/ResetPassword'
import MoviePage from './page/MoviePage'
import MovieDetailPage from './page/MovieDetailPage'
import ContactPage from './page/ContactPage'
import WatchPage from './page/WatchPage'
import Dashboard from './page/admin/DashboardPage'
import AdminMain from './components/layout/admin/AdminMain'
import MovieAdminPage from './page/admin/MovieAdminPage'
import CommentAdminPage from './page/admin/CommentAdminPage'
import GenreAdminPage from './page/admin/GenreAdminPage'
import UserAdminPage from './page/admin/UserAdminPage'
import CastAdminPage from './page/admin/CastAdminPage'

function App() {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className='w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin mx-auto my-96 mar'></div>
        }
      >
        <Routes>
          <Route element={<Main />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/movies' element={<MoviePage />}></Route>
            <Route path='/movies/:movieId' element={<MovieDetailPage />} />
            <Route path='/watch/:movieId' element={<WatchPage />} />
            <Route path='/contact' element={<ContactPage />}></Route>
            <Route path='/*' element={<div>404 Not Found</div>}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgot-password' element={<ResetPassword />}></Route>

          {/* admin page */}
          <Route element={<AdminMain />}>
            <Route path='/admin/dashboard' element={<Dashboard />}></Route>
            <Route path='/admin/movies' element={<MovieAdminPage />}></Route>
            <Route path='/admin/casts' element={<CastAdminPage />}></Route>
            <Route path='/admin/users' element={<UserAdminPage />}></Route>
            <Route path='/admin/genres' element={<GenreAdminPage />}></Route>
            <Route path='/admin/comments' element={<CommentAdminPage />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  )
}

export default App
