import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_URL } from '../config';

function SignUp() {
   const handleSignUp = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const username = e.target.username.value;

      if (!email || !password || !username) {
         toast.error("Please fill in all fields");
         return;
      }
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(email)) {
         toast.error("Please enter a valid email address");
         return;
      }

      // Validate password length
      if (password.length < 6) {
         toast.error("Password must be at least 6 characters long");
         return;
      }

      // Validate username length
      if (username.length < 3) {
         toast.error("Username must be at least 3 characters long");
         return;
      }

      fetch(APP_URL + "/api/auth/signup", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            password,
            username,
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
         <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
         <form onSubmit={handleSignUp}>
            <div className="mb-4">
               <label htmlFor="email" className="block text-gray-700">Email</label>
               <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
               <label htmlFor="username" className="block text-gray-700">Username</label>
               <input type="username" id="username" name="username" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-6">
               <label htmlFor="password" className="block text-gray-700">Password</label>
               <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-6">
               <button type="submit" className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
            </div>
         </form>
         <div className="text-center">
            <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-600">Login</a></p>
         </div>
         <ToastContainer />
      </div>
   );
}

export default SignUp;
