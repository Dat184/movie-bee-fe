function App() {
  return (
    <>
      <div className='bg-slate-50 h-screen flex flex-col items-center justify-center'>
        <div className='text-red-500'>welcome to movie bee</div>
        <div className='text-blue-500'>{import.meta.env.VITE_SOME_KEY}</div>
      </div>
    </>
  )
}

export default App
