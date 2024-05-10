import React, { useEffect, useState } from 'react';
import { APP_URL } from '../config';
import { useUser } from '../contexts/UserContext';


function ProfileShelter() {
   const { user } = useUser();

   const [appointments, setAppointments] = useState([]);
   const [adoptions, setAdoptions] = useState([]);
   const [volunteerResponds, setVolunteerResponds] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const response = await fetch(APP_URL + '/api/user/shelter/' + user.id);
      const data = await response.json();
      setAppointments(data.appointments);
      setAdoptions(data.adoptions);
      setVolunteerResponds(data.volunteerResponds);
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
            <div className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white col-span-2">
               <div className="mb-8">
                  <h3 className="text-lg font-bold mb-2">Responded Vaccination Appointments</h3>
                  {appointments.length > 0 ? (
                     <table className="w-full border-collapse mb-4">
                        <thead className="border-b-2 border-gray-200" >
                           <tr>
                              <th className="border py-2">Animal</th>
                              <th className="border py-2">Date</th>
                              <th className="border py-2">Reason</th>
                              <th className="border py-2">State</th>
                           </tr>
                        </thead>
                        <tbody>
                           {appointments.map((item) => (
                              <tr key={item._id}>
                                 <td className="border py-2">{item.animal}</td>
                                 <td className="border py-2">{new Date(item.requestedDate).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                 <td className="border py-2">{item.reason}</td>
                                 <td className="border py-2">{item.state}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <p>No vaccination appointments found.</p>
                  )}
               </div>
            </div>
         </div>
         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white col-span-2">
               <div className="mb-8">
                  <h3 className="text-lg font-bold mb-2">Adoption Requests</h3>
                  {adoptions.length > 0 ? (
                     <table className="w-full border-collapse mb-4">
                        <thead className="border-b-2 border-gray-200" >
                           <tr>
                              <th className="border py-2">Animal</th>
                              <th className="border py-2">User</th>
                              <th className="border py-2">State</th>
                           </tr>
                        </thead>
                        <tbody>
                           {adoptions.map((item) => (
                              <tr key={item._id}>
                                 <td className="border py-2">{item.animal}</td>
                                 <td className="border py-2">{item.user}</td>
                                 <td className="border py-2">{item.state}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <p>No adoptions found.</p>
                  )}
               </div>
            </div>


            <div className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white col-span-2">
               <div className="mb-8">
                  <h3 className="text-lg font-bold mb-2">Volunteer Responds</h3>
                  {volunteerResponds.length > 0 ? (
                     <table className="w-full border-collapse mb-4">
                        <thead className="border-b-2 border-gray-200" >
                           <tr>
                              <th className="border py-2">User</th>
                              <th className="border py-2">Request</th>
                              <th className="border py-2">State</th>
                           </tr>
                        </thead>
                        <tbody>
                           {volunteerResponds.map((item) => (
                              <tr key={item._id}>
                                 <td className="border py-2">{item.user}</td>
                                 <td className="border py-2">{item.volunteerRequest}</td>
                                 <td className="border py-2">{item.state}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <p>No adoptions found.</p>
                  )}
               </div>
            </div>

         </div>
      </div >


   );
};

export default ProfileShelter;