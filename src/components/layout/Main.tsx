import { Fragment } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Main = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Fragment>
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
      </Fragment>
    </div>
  )
}

export default Main
