import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import Main from './components/layout/Main'
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import ConfirmEmail from './page/ConfirmEmail'
import MoviePage from './page/MoviePage'
import MovieDetailPage from './page/MovieDetailPage'
import AboutUs from './page/AboutUs'
import WatchPage from './page/WatchPage'
import Dashboard from './page/admin/DashboardPage'
import AdminMain from './components/layout/admin/AdminMain'
import MovieAdminPage from './page/admin/MovieAdminPage'
import MovieDetail from './page/admin/MovieDetail'
import CommentAdminPage from './page/admin/CommentAdminPage'
import GenreAdminPage from './page/admin/GenreAdminPage'
import UserAdminPage from './page/admin/UserAdminPage'
import CastAdminPage from './page/admin/CastAdminPage'
import CastDetaill from './page/admin/CastDetail'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import NotFound from './page/NotFound'
import UserDetail from './page/admin/UserDetail'
import Profile from './page/Profile'
import ProtectedRoute from './middleware/ProtectedRoute'
import EditVideo from './page/admin/EditVideo'
import Loading from './components/Loading'

function App() {
  return (
    <Fragment>
      <Suspense fallback={<Loading></Loading>}>
        <Routes>
          <Route element={<Main />}>
            <Route path='/' element={<Home />}></Route>
            <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
              <Route path='/profile' element={<Profile />}></Route>
            </Route>
            <Route path='/movies' element={<MoviePage />}></Route>
            <Route path='/movies/:movieId' element={<MovieDetailPage />} />
            <Route path='/watch/:movieId' element={<WatchPage />} />
            <Route path='/contact' element={<AboutUs />}></Route>
            <Route path='/*' element={<NotFound />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/confirm-email' element={<ConfirmEmail />}></Route>

          {/* admin page */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path='/admin' element={<AdminMain />}>
              <Route index element={<Navigate to='dashboard' replace />} />
              <Route path='dashboard' element={<Dashboard />}></Route>
              <Route path='movies' element={<MovieAdminPage />}></Route>
              <Route path='movies/new' element={<MovieDetail />}></Route>
              <Route path='movies/:id' element={<MovieDetail />}></Route>
              <Route path='movies/:id/edit-video' element={<EditVideo />}></Route>
              <Route path='cast' element={<CastAdminPage />}></Route>
              <Route path='cast/create-cast' element={<CastDetaill />}></Route>
              <Route path='cast/edit-cast/:id' element={<CastDetaill />}></Route>
              <Route path='users' element={<UserAdminPage />}></Route>
              <Route path='users/create-user' element={<UserDetail />}></Route>
              <Route path='users/edit-user/:id' element={<UserDetail />}></Route>
              <Route path='genres' element={<GenreAdminPage />}></Route>
              <Route path='comments' element={<CommentAdminPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </Fragment>
  )
}

export default App
