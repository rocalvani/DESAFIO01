import {AnimatePresence} from "framer-motion"
import { Outlet, useLocation} from 'react-router-dom';
import '../App.scss';
import Header from './Header';
import {ParallaxProvider} from 'react-scroll-parallax'
import {Routes, Route} from "react-router-dom";
import Animation from "./Animation";
import MainContainer from "./MainContainer";
import ItemDetailContainer from "./ItemDetailContainer"
import ShopContainer from "./ShopContainer"
import LogIn from "./LogIn"
import SignUp from "./SignUp"
import Reset from "./Reset"
import ResetForm from "./ResetForm"
import CartContainer from "./CartContainer";

import UserProvider from "../context/UserContext";
import { CookiesProvider } from "react-cookie";

function App() {

  const location = useLocation()

  return (
    <CookiesProvider>
    <UserProvider>
    <ParallaxProvider >
      <Header />
      <AnimatePresence 
      initial={false} 
      mode="wait">
      {/* <Outlet /> */}
     <Routes location={location} key={location.pathname}>
      <Route index element={<Animation />}/>
      <Route path="home" element={<MainContainer />}/>
      <Route path="login" element={<LogIn />}/>
      <Route path="signup" element={<SignUp />}/>
      <Route path="reset" element={<Reset />}/>
      <Route path="reset/:rid" element={<ResetForm />}/>
      <Route path="shop" element={<ShopContainer />}/>
      <Route path="shop/:pid" element={<ItemDetailContainer />}/>
      <Route path="checkout/:cid" element={<CartContainer />}/>
     </Routes>
      </AnimatePresence>
      </ParallaxProvider></UserProvider></CookiesProvider>
  );
}

export default App;
