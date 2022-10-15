import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import AuthPage from './components/Signup/AuthPage'
import ConfirmEmail from './components/Signup/ConfirmEmail'
import ForgetPassword from './components/Signup/ForgetPassword'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import EditForm from './components/Home/EditForm'
import { expenseAction } from './components/store/expenses'
import axios from 'axios'



const App = () => {
  const loggedIn = localStorage.getItem('token')
  const dispatch = useDispatch()

  const isEditable = useSelector(state => state.expense.isEditable)
  const data = useSelector(state => state.expense)
  const aboveLimit = useSelector(state => state.expense.total)
  const isDarkTheme = useSelector(state => state.theme.darkTheme)

  const darkClass = aboveLimit > 10000 ? 'darkTheme' : 'theme'


  async function showDataHandler() {
    console.log('hello');

    try {
      const formData = []
      const url = 'https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/newexpenses.json'

      const resp = await axios(url)
      const data = resp.data;


      for (let item in data) {
        console.log(data[item].data.expenseCategory);


        formData.push({
          expenseId: item,
          expenseTitle: data[item].data.expenseTitle,
          expensePrice: Number(data[item].data.expensePrice),
          expenseCategory: data[item].data.expenseCategory,

        })


      }

      // console.log(typeof formData[0].expensePrice);
      dispatch(expenseAction.expensedata(formData))
      // setData(formData)

    }



    catch (error) {
      console.log(error);
    }



  }

  useEffect(() => {
    console.log('hello');
    showDataHandler()
    console.log('hello');


  }, [])



  return (
    <div className={darkClass}>
      {isEditable && <EditForm onshowData={showDataHandler} />}

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