import  { Fragment } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const AdminMain = () => {
  return (
    <div className='min-h-screen flex flex-row'>
      <Fragment>
        <Navbar />
        <main className='ml-72 flex-1 bg-footer-bg'>
          <Outlet />
        </main>
      </Fragment>
    </div>
  )
}

export default AdminMain
