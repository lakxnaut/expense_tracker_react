import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import AuthPage from './components/Signup/AuthPage'


const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>

      </BrowserRouter>
    </Fragment>
  )
}

export default App