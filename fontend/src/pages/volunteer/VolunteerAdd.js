import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_URL } from "../../config";

function VolunteerAdd() {
   const navigate = useNavigate();

   const [skill, setSkill] = useState("");
   const [description, setDescription] = useState("");
   const [district, setDistrict] = useState("");
   const [maxVolunteers, setMaxVolunteers] = useState("");
   const [onDate, setOnDate] = useState("");

   const handleAdd = async () => {
      if (!skill || !description || !district || !maxVolunteers || !onDate) {
         toast.error("Please fill in all fields");
         return;
      }
      const skillRegex = /^[a-zA-Z\s]+$/;
      const districtRegex = /^[a-zA-Z\s]+$/;
      const maxVolunteersRegex = /^[0-9]+$/;

      if (!skillRegex.test(skill)) {
         toast.error("Invalid skill");
         return;
      }

      if (!districtRegex.test(district)) {
         toast.error("Invalid district");
         return;
      }

      if (!maxVolunteersRegex.test(maxVolunteers)) {
         toast.error("Invalid number of max volunteers");
         return;
      }

      const response = await fetch(APP_URL + `/api/volunteer`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            skill,
            description,
            district,
            maxVolunteers,
            onDate,
         }),
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         navigate("/admin/volunteer/manage");
      }
   }

   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Volunteer Request</h1>
         <button onClick={() => navigate("/admin/volunteer/manage")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiChevronLeft className="mr-2" /> Go Back</button>

         <div className="w-full shadow-md shadow-neutral-300 m-auto p-4 bg-white">
            <div className="grid grid-cols-3 gap-4">
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Skill</div>
                  <select onChange={(e) => setSkill(e.target.value)} className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" id="skill">
                     <option value="">-- Select Skill --</option>
                     <option value="cleaning and maintenance">Cleaning and Maintenance</option>
                     <option value="Feeding and Watering">Feeding and Watering</option>
                     <option value="Socialization and Playing">Socialization and Playing</option>
                     <option value="Basic Grooming">Basic Grooming</option>
                  </select>
               </div>
               <div >
                  <div className="text-sm font-semibold leading-4 mb-2">Description</div>
                  <input onChange={(e) => setDescription(e.target.value)} className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" id="description" type="text" placeholder="Description" />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">District</div>
                  <select onChange={(e) => setDistrict(e.target.value)} className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" id="district">
                     <option value="">-- Select District --</option>
                     <option value="Colombo">Colombo</option>
                     <option value="Gampaha">Gampaha</option>
                     <option value="Kalutara">Kalutara</option>
                     <option value="Kandy">Kandy</option>
                     <option value="Matale">Matale</option>
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
                  <div className="text-sm font-semibold leading-4 mb-2">Max Volunteers</div>
                  <input onChange={(e) => setMaxVolunteers(e.target.value)} className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" id="maxVolunteers" type="number" placeholder="Max Volunteers" />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">On Date</div>
                  <input onChange={(e) => setOnDate(e.target.value)} className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" id="onDate" type="date" placeholder="On Date" />
               </div>
            </div>
            <div className="flex justify-end">
               <div className="w-1/3 p-3 text-right">
                  <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Volunteer Request</button>
               </div>
            </div>
         </div>
         <ToastContainer />
      </div>
   );
}

export default VolunteerAdd;