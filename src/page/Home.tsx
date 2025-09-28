import { Fragment } from 'react'
import Banner from '../components/home/Banner'
import Topic from '../components/home/Topic'
import Trending from '../components/home/Trending'
import UpComing from '../components/home/UpComing'
import Popular from '../components/home/Popular'

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Topic />
      <Popular />
      <Trending />
      <UpComing />
    </Fragment>
  )
}

export default Home
