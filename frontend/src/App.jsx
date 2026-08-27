import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SessionPage from './pages/SessionPage'
import ProblemsPage from './pages/ProblemsPage'
import ProblemPage from './pages/ProblemPage'
import { Toaster } from "react-hot-toast";


function App() {
  const { isSignedIn ,isLoaded} = useUser()
  if(!isLoaded) return null;
  return (
    <>
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/session/:id" element={<SessionPage />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to= {"/"} />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
      </Routes>
      <Toaster toastOptions={{duration: 3000}} />
    </>
  )
}

export default App;