import { Link, Route, Routes, useLocation } from "react-router-dom"
import Home from './pages/Home'
import Header from "./components/Header"
// import Footer from "./components/Footer"
import Plug from "./pages/Plug"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Detail from "./pages/Uploads/Detail"

function App() {
  const location = useLocation()

  return (
    <>
      {!location.pathname.includes('plug') && <Link to={'/'}><Header title="Extrapolation" pic='/extrapolation.png' /></Link>}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path='/plug/grade/:grade' element={<Plug />} />
        <Route path="/authenticate" element={<Login login={true} />} />
        <Route path="/register" element={<Login login={false} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/upload/detail/:id" element={<Detail />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
