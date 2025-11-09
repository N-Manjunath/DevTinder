import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Requests from './components/Requests'
import Pending_req from './components/Pending_req'

function App() {
 

  return (
    <>
<Provider store={appStore}>
<BrowserRouter basename='/'>
<Routes>
  <Route path='/' element={<Body/>}>
  <Route path='/login' element={<Login/>} />
  <Route path='/' element={<Feed/>} />
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/requests' element={<Requests/>}/>
  <Route path='/connections' element={<Connections/>}/>
  <Route path='pending_req' element={<Pending_req/>}/>
  </Route>
</Routes>
</BrowserRouter>
</Provider>
    </>
  )
}

export default App
