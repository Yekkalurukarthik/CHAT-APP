import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
// import CallPage from "./pages/CallPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import SingUpPage from "./pages/SignUpPage.jsx"
import toast, { Toaster } from 'react-hot-toast'
import LoginPage from './pages/LoginPage.jsx'
// import PageLoader from "./components/PageLoader.jsx"
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from "./components/Layout.jsx"
import { useThemeStore } from './store/useThemeStore.js'
// import ProtectedRoute from './pages/ProtectedRoute.jsx'
const App = () => {

  //tanstack query 
  const { isLoading, authUser } = useAuthUser()
  const { theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  //zustand
  return (
    <div className='h-screen' data-theme={theme} >
      {/* <button onClick={()=>toast.error("Hello world")}>Craeate a Toast</button> */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                  <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />
        <Route path="/signup" element={!isAuthenticated ? <SingUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
              <ChatPage />
          </Layout>
        ) :
          (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        } />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/notifications"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationPage />
            </Layout>
          ) :
            (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />
      
        <Route
          path="/onboarding"
          element={isAuthenticated ? (!isOnboarded ? (<OnboardingPage />) : (<Navigate to="/" />)) : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App
