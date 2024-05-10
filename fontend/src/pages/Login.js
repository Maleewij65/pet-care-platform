import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_URL } from '../config';

function Login() {
   const handleLogin = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      if (!email || !password) {
         toast.error("Please fill in all fields");
         return;
      }
      if (password.length < 6) {
         toast.error("Password must be at least 6 characters");
         return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
         toast.error("Please enter a valid email address");
         return;
      }

      fetch(APP_URL + "/api/auth/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            password,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.error) {
               toast.error(data.message);
            } else {
               toast.success(data.message);
               localStorage.setItem("token", data.token);
               window.location.href = "/";
            }
         });
   };

   return (
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg mx-auto mt-20">
         <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
         <form onSubmit={handleLogin}>
            <div className="mb-4">
               <label htmlFor="email" className="block text-gray-700">Email</label>
               <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-6">
               <label htmlFor="password" className="block text-gray-700">Password</label>
               <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-6">
               <button type="submit" className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
            </div>
         </form>
         <div className="text-center">
            <p className="text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-600">Sign up</a></p>
         </div>
         <ToastContainer />
      </div>
   );
}

export default Login;