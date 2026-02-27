import { useState } from 'react'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Homepage from './Homepage'
import Site from './Site'
import UpdateMatch from './Update'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute'; // ✅ import it

function App() {
  return (
    <>
     <Routes>
    
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Homepage/>
          </ProtectedRoute>
        } 
      />

      <Route path="/site" element ={<Site/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/update" element ={<UpdateMatch/>}/>
     </Routes>

     <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default App
