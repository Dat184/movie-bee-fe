import { Fragment } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <Fragment>
        <Header />
        <Outlet />
      </Fragment>
    </div>
  )
}

export default Main
