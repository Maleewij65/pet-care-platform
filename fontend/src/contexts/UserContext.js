import React, { createContext, useContext, useEffect, useState } from 'react';
import { APP_URL } from '../config';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

   const login = (token) => {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
   };

   const logout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
   };

   useEffect(() => {
      if (localStorage.getItem("token") === null) return;
      fetch(APP_URL + `/api/auth/home`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.error) {
               console.log(data.message);
            } else {
               setUser(data.user);
            }
         });
   }, []);


   return (
      <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
         {children}
      </UserContext.Provider>
   );
};

export default UserContext;