import { Fragment } from 'react'
import Banner from '../components/home/Banner'
import Topic from '../components/home/Topic'
import Trending from '../components/home/Cartoon'
import Popular from '../components/home/Popular'

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Topic />
      <Popular />
      <Trending />
    </Fragment>
  )
}

export default Home
