import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import cookies from "js-cookies";
const secure = window.location.protocol === 'https'

const userContext = createContext()
const Provider = userContext.Provider

export const useUser = () => {
    const values = useContext(userContext)
    return values;
}

const UserProvider =({children}) =>{

    const [user, setUser] = useState()
    const [logged, setLogged] = useState(false)
    const [cartID, setCartID] = useState()
   
    const [cookies, setCookie, removeCookie] = useCookies();


    const URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/";

  useEffect(() => {
    const onlineData = cookies.onlineUser
      if (onlineData) {
        setLogged(true)
        setUser(onlineData.user)
        setCartID(onlineData.cart)
      }

  }, [logged]);

  const logIn = async (email, password) => {
    try {
      let response = await axios.post(
        URL + "api/jwt/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Login realizado con exito!");
        
        let censoredResult = await axios(URL + "users/user", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        const userLog = censoredResult.data
        
      setLogged(true)
      setUser(userLog.name);
      setCartID(response.data.cart._id)
      setCookie("onlineUser", {user: userLog.name, logged: logged, cart: response.data.cart._id}, {maxAge: 86400})
        
      } else if (response.status === 401) {
        alert("Login invalido revisa tus credenciales!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      let response = await axios(URL + "users/logout", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setUser()
        setLogged(false)
        removeCookie("onlineUser")
        window.location.replace("/");
    } catch (error) {
      console.error(error)
  };
  }


    const values = {
        user: user,
        logged:logged,
        logIn: logIn,
        logOut: logOut,
        cartID: cartID
    }

    return (
        <Provider value={values}>
            {children}
        </Provider>
    )
}

export default UserProvider