import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import AuthPage from './components/Signup/AuthPage'
import ConfirmEmail from './components/Signup/ConfirmEmail'
import ForgetPassword from './components/Signup/ForgetPassword'
import './App.css'
import { useSelector } from 'react-redux'



const App = () => {
  const loggedIn = localStorage.getItem('token')
  const aboveLimit = useSelector(state => state.expense.total)
  const isDarkTheme = useSelector(state => state.theme.darkTheme)

  const darkClass = aboveLimit > 10000 ? 'darkTheme' : 'theme'

  return (
    <div className={darkClass}>
      <BrowserRouter>

        <Routes>
          {loggedIn && <Route path='/' element={<Home />} />}
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/confirm' element={<ConfirmEmail />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App