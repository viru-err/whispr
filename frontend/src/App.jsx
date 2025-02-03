import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import Profilepage from './pages/Profilepage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'



function App() {
  const {authUser,checkAuth,isCheckingAuth}= useAuthStore()
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log("authUser");
  if (isCheckingAuth && authUser  ){
    return <div className="flex items-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<Homepage/>:<Navigate to="/login"/>}/>
        <Route path="/signup" element={authUser?<SignupPage/>:<Navigate to="/"></Navigate>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/settings" element={<SettingPage/>}/>
        <Route path="/profile" element={authUser?<Profilepage/>:<Navigate to="/login"></Navigate>}/>
      </Routes>
      <Toaster/>
      
    </div>
  )
}

export default App