import { Fragment } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Main = () => {
  return (
    <div>
      <Fragment>
        <Header />
        <Outlet />
        <Footer />
      </Fragment>
    </div>
  )
}

export default Main
