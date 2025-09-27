import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import Main from './components/layout/Main'
import Home from './page/Home'

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
            <Route path='/movies' element={<div>movies</div>}></Route>
            <Route path='/contact' element={<div>contact</div>}></Route>
            <Route path='/*' element={<div>404 Not Found</div>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  )
}

export default App
