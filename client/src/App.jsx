import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.jsx";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import './index.css'; 
import SignOut from "./pages/SignOut.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import Listing from "./pages/Listing.jsx";
function App() {
 
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<SignIn/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      <Route path="/sign-out" element={<SignOut/>}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/create-listing" element={<CreateListing />}></Route>
      <Route path="/update-listing/:listingId" element={<UpdateListing />}></Route>
      </Route>
      <Route path="/listing/:listingId" element={<Listing />}></Route>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
