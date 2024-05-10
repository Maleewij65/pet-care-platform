import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { APP_URL } from "../../config";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Volunteer() {
   Modal.setAppElement('#root');

   const { user } = useUser();

   const [volunteerData, setVolunteerData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [selectedVolunteer, setSelectedVolunteer] = useState(null);


   useEffect(() => {
      fetchVolunteers();
   }, []);

   const fetchVolunteers = async () => {
      const response = await fetch(APP_URL + `/api/volunteer`);
      const data = await response.json();
      setVolunteerData(data);
      setFilteredData(data);
   }

   const handleViewRequest = (volunteerId) => {
      setSelectedVolunteer(volunteerData.find((item) => item.id === volunteerId));
      setIsModalOpen(true);
   }

   const handleSubmit = async () => {
      const response = await fetch(APP_URL + `/api/volunteerRespond`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify({
            volunteerRequest: selectedVolunteer._id,
            user: user.id
         })
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         setIsModalOpen(false);
      }
   }
   const handleSearch = async () => {
      let filteredData = volunteerData;

      const filterSkill = document.getElementById("filterSkill").value;
      const filterDistrict = document.getElementById("filterDistrict").value;
      const search = document.getElementById("search").value;
      if (filterSkill !== '') {
         filteredData = filteredData.filter((item) => item.skill === filterSkill);
      }
      if (filterDistrict !== '') {
         filteredData = filteredData.filter((item) => item.district === filterDistrict);
      }

      if (search !== '') {
         filteredData = filteredData.filter((item) => item.skill.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()));
      }
      setFilteredData(filteredData);
   }

   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold mb-10">Be A Volunteer</h1>
         <div className="flex justify-between space-x-10 bg-slate-100 p-3 mb-3 border border-slate-400">
            <div>
               <label htmlFor="filterSkill" className="text-sm font-medium mr-3">Filter by Required Skill:</label>
               <select id="filterSkill" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="cleaning and maintenance">Cleaning and Maintenance</option>
                  <option value="Feeding and Watering">Feeding and Watering</option>
                  <option value="Socialization and Playing">Socialization and Playing</option>
                  <option value="Basic Grooming">Basic Grooming</option>
               </select>
            </div>
            <div>
               <label htmlFor="filterDistrict" className="text-sm font-medium mr-3">Filter by District:</label>
               <select id="filterDistrict" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Matale">Matale</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Galle">Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Hambantota">Hambantota</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Mannar">Mannar</option>
                  <option value="Vavuniya">Vavuniya</option>
                  <option value="Mullaitivu">Mullaitivu</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Ampara">Ampara</option>
                  <option value="Trincomalee">Trincomalee</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Puttalam">Puttalam</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Monaragala">Monaragala</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Kegalle">Kegalle</option>
               </select>
            </div>
            <div>
               <input id="search" type="text" placeholder="Search everyware" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()} />
            </div>
         </div>
         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredData.map((item) => (
               <div key={item._id} className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white" >
                  <div className='text-lg pl-2 uppercase'>Volunteer Request Details</div>
                  <div className='grid grid-cols-1 bg-sky-200 p-3 rounded-lg'>
                     <div className='text-sm'><span className='font-[600] col-span-2'>Skill : </span>{item?.skill}</div>
                     <div className='text-sm'><span className='font-[600]'>District : </span>{item?.district}</div>
                     <div className='text-sm'><span className='font-[600]'>Max Count : </span>{item?.maxVolunteers}</div>
                     <div className='text-sm'><span className='font-[600]'>On Date : </span>{item?.onDate}</div>
                     <div className='text-sm'><span className='font-[600] col-span-2'>Description : </span>{item?.description} kg</div>
                  </div>
                  <div className='grid grid-cols-1 mt-4'>
                     {(user && user?.role === 'USER') ? (
                        <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded w-full mr-2" onClick={() => handleViewRequest(item?.id)} >Attend Request</button>
                     ) : (
                        <Link className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded w-full mr-2 text-center" to={'/login'} >Login to Attend</Link>
                     )}
                  </div>
               </div>
            ))}
         </div>
         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className="bg-sky-200 p-3 rounded-lg shadow-[2px_2px_2px_1px_#0004]">
               <h2 className="text-center text-lg font-bold mb-4">Volunteer Request Information</h2>
               <div className="mb-4">
                  <div className="text-sm"><span className="font-[600]">Location : </span> {selectedVolunteer?.district} </div>
                  <div className="text-sm"><span className="font-[600]">On Date : </span>{selectedVolunteer?.onDate} </div>
                  <div className="text-sm"><span className="font-[600]">Skill : </span> {selectedVolunteer?.skill} </div>
                  <div className="text-sm"><span className="font-[600]">Description : </span> {selectedVolunteer?.description} </div>
               </div>
               <hr />
               <h2 className="text-center text-lg font-bold mt-4">Volunteer Information</h2>
               <div className="mb-4">
                  <div className="text-sm"><span className="font-[600]">User ID : </span> {user?.id} </div>
                  <div className="text-sm"><span className="font-[600]">Email : </span> {user?.email} </div>
               </div>
               <div className="text-right">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit} >Volunteer</button>
               </div>
            </div>
         </Modal>
         <ToastContainer />
      </div>
   );
}

export default Volunteer;