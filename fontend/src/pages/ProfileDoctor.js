import React, { useEffect, useState } from 'react';
import { APP_URL } from '../config';
import { useUser } from '../contexts/UserContext';


function ProfileDoctor() {
   const { user } = useUser();

   const [appointments, setAppointments] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const response = await fetch(APP_URL + '/api/user/doctor/' + user.id);
      const data = await response.json();
      setAppointments(data.appointments);
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
                  <h3 className="text-lg font-bold mb-2">Pending Appointments</h3>
                  {appointments.length > 0 ? (
                     <table className="w-full border-collapse mb-4">
                        <thead className="border-b-2 border-gray-200" >
                           <tr>
                              <th className="border py-2">Animal</th>
                              <th className="border py-2">State</th>
                           </tr>
                        </thead>
                        <tbody>
                           {appointments.map((item) => (
                              <tr key={item._id}>
                                 <td className="border py-2">{item.animal}</td>
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

export default ProfileDoctor;