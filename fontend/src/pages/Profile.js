import React, { useEffect, useState } from 'react';
import { APP_URL } from '../config';
import { useUser } from '../contexts/UserContext';
import { HiTrash } from 'react-icons/hi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Profile() {
   const { user } = useUser();

   const [adoptions, setAdoptions] = useState([]);
   const [volunteerRequests, setVolunteerRequests] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const response = await fetch(APP_URL + '/api/user/profile/' + user.id);
      const data = await response.json();
      setAdoptions(data.adoptions);
      setVolunteerRequests(data.volunteerRequests);
   }

   const handleDelete = async (volunteerId) => {
      const response = await fetch(APP_URL + `/api/volunteerRespond/${volunteerId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
         },
         body: JSON.stringify({ userId: user.id }),
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         fetchData();
      }
   }

   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold mb-10">Manage Profile</h1>
         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white">
               {user && (
                  <div className="">
                     <h2 className="text-xl font-bold mb-4">User Details </h2>
                     <p>User ID: {user.id}</p>
                     <p>User Email: {user.email}</p>
                     <p>User Role: {user.role}</p>
                  </div>
               )}
            </div>
            <div className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white">
               <div className="mb-8">
                  <h3 className="text-lg font-bold mb-2">Adoption Requests</h3>
                  {adoptions.length > 0 ? (
                     <table className="w-full border-collapse mb-4">
                        <thead className="border-b-2 border-gray-200" >
                           <tr>
                              <th className="border py-2">Animal</th>
                              <th className="border py-2">State</th>
                           </tr>
                        </thead>
                        <tbody>
                           {adoptions.map((adoption) => (
                              <tr key={adoption._id}>
                                 <td className="border py-2">{adoption.animal}</td>
                                 <td className="border py-2">{adoption.state}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <p>No adoptions found.</p>
                  )}
               </div>
            </div>
            <div className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white">
               <div>
                  <h3 className="text-lg font-bold mb-2">Volunteer Requests</h3>
                  {volunteerRequests.length > 0 ? (
                     <table className="w-full border-collapse">
                        <thead className="border-b-2 border-gray-200" >
                           <tr>
                              <th className="border py-2">Skill</th>
                              <th className="border py-2">Location</th>
                              <th className="border py-2">Date</th>
                           </tr>
                        </thead>
                        <tbody>
                           {volunteerRequests.map((request) => (
                              <tr key={request._id}>
                                 <td className="border py-2">{request.skill}</td>
                                 <td className="border py-2">{request.district}</td>
                                 <td className="border py-2">{request.onDate} <HiTrash onClick={() => handleDelete(request._id)} size={20} className="hover:cursor-pointer" /></td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <p>No volunteer requests found.</p>
                  )}
               </div>
            </div>
         </div>
         <ToastContainer />
      </div >


   );
};

export default Profile;