import React from "react";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import LogoImage from "../assets/logo.jpg";

function Header() {
   const { user, logout } = useUser();

   const handleLogout = () => {
      logout();
      window.location.href = '/';
   };

   return (
      <nav className="bg-blue-600 p-4 fixed w-full">
         <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white font-semibold text-lg" >
               <img src={LogoImage} alt="logo" className="w-14 h-10 inline-block mr-2" />

            </Link>

            <div className="space-x-4">
               <a href="/" className="text-white hover:text-gray-300">Home</a>

               {(user?.role === 'USER' || user == null) && (
                  <>
                     <a href="/animal" className="text-white hover:text-gray-300">Animals</a>
                     <a href="/event" className="text-white hover:text-gray-300">Events</a>
                     <a href="/volunteer" className="text-white hover:text-gray-300">Volunteer</a>
                  </>
               )}

               {user && user.role === 'SHELTER_OWNER' && (
                  <>
                     <a href="/admin/animal/manage" className="text-white hover:text-gray-300">Animals</a>
                     <a href="/admin/adoption/manage" className="text-white hover:text-gray-300">Adoption</a>
                     <a href="/admin/volunteer/manage" className="text-white hover:text-gray-300">Volunteer</a>
                  </>
               )}

               {user && user.role === 'EVENT_MANAGER' && (
                  <>
                     <a href="/admin/event/manage" className="text-white hover:text-gray-300">Events</a>
                     <a href="/admin/event-fund/manage" className="text-white hover:text-gray-300">Event Funds</a>
                  </>
               )}
               {user && user.role === 'DOCTOR' && (
                  <>
                     <a href="/admin/vaccination/manage" className="text-white hover:text-gray-300">Vaccination</a>
                     <a href="/admin/appointment/manage" className="text-white hover:text-gray-300">Appointment</a>
                  </>
               )}



               {(user && user.role !== 'EVENT_MANAGER') && <a href="/profile" className="text-white hover:text-gray-300">Profile</a>}
               {user && <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>}
               {!user && <a href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100">Login</a>}
            </div>
         </div>

      </nav>
   );
}

export default Header;