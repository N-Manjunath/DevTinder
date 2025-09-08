import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

function App() {
 

  return (
    <>
<h2 className="text-red-500">Hi Welcome to Devtinder</h2>
<Provider store={appStore}>
<BrowserRouter basename='/'>
<Routes>
  <Route path='/' element={<Body/>}>
  <Route path='/login' element={<Login/>} />
  </Route>
</Routes>
</BrowserRouter>
</Provider>
    </>
  )
}

export default App
