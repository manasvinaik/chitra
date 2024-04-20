import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import {Home, CreatePost} from './pages'

const App = () => {
  return (
    <BrowserRouter>
    <header className='w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
  <Link to="/" className='font-inter font-medium text-4xl px-4 py-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-purple-500'>❃Chitra</Link>

  <Link to="/create-post" className='font-inter font-medium bg-[#A855F7] text-white px-4 py-2 rounded-md bg-gradient-to-r from-sky-300 to-purple-700'>Create</Link>
</header>

    <main className='sm:p-8 px-4 py-8 w-full text-white bg-gradient-to-b from-black to-purple-800 min-h-[calc(100vh-73px)]'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create-post' element={<CreatePost/>}></Route>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App