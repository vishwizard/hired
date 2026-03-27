import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProblemsPage from './pages/ProblemsPage.jsx'
import { Toaster } from 'react-hot-toast';

function App() {
  const {isSignedIn} = useUser();
  return (
    <>
      <h1 className='bg-red-500 text-4xl'> My App</h1>
      <button className='btn btn-primary'>Hit me Daddy</button>
      
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/about' element={<AboutPage/>}> </Route>
        <Route path='/problems' element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"}/>}></Route>
      </Routes>
      <Toaster toastOptions={{duration:3000}}/>
    </>
  )
}

export default App
