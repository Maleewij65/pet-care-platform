import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_URL } from '../../config';

function AnimalAdd() {
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [type, setType] = useState("");
   const [age, setAge] = useState("");
   const [color, setColor] = useState("");
   const [weight, setWeight] = useState("");
   const [adoptionFee, setAdoptionFee] = useState("");
   // const [vaccinationFrequency, setVaccinationFrequency] = useState("");
   const [image, setImage] = useState(null);
   const [prvImage, setPrvImage] = useState("https://via.placeholder.com/1000");

   const handleImage = (e) => {
      setImage(e.target.files[0]);
      setPrvImage(URL.createObjectURL(e.target.files[0]));
   }

   const handleAdd = async () => {

      if (!name || !type || !age || !color || !weight || !adoptionFee || !image) {
         toast.error("Please fill in all fields");
         return;
      }

      if (!/^\d+$/.test(age)) {
         toast.error("Age must be a number");
         return;
      }

      if (!/^\d+$/.test(weight)) {
         toast.error("Weight must be a number");
         return;
      }

      if (!/^\d+$/.test(adoptionFee)) {
         toast.error("Adoption fee must be a number");
         return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("age", age);
      formData.append("color", color);
      formData.append("weight", weight);
      formData.append("adoptionFee", adoptionFee);
      // formData.append("vaccinationFrequency", vaccinationFrequency);
      formData.append("state", "PENDING");
      formData.append("image", image);

      const response = await fetch(APP_URL + `/api/animal`, {
         method: "POST",
         body: formData,
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.error);
         return;
      } else {
         navigate("/admin/animal/manage");
      }
   }

   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Animal</h1>
         <button onClick={() => navigate("/admin/animal/manage")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiChevronLeft className="mr-2" /> Go Back</button>

         <div className="w-full shadow-md shadow-neutral-300 m-auto p-4 bg-white">
            <div className="grid grid-cols-3 gap-4">
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Animal Name</div>
                  <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setName(e.target.value)} />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Type</div>
                  <select className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setType(e.target.value)}>
                     <option value="">-- Select Animal Type --</option>
                     <option value="DOG">Dog</option>
                     <option value="CAT">Cat</option>
                  </select>
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Age</div>
                  <input type="number" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setAge(e.target.value)} />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Color</div>
                  <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setColor(e.target.value)} />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Weight</div>
                  <input type="number" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setWeight(e.target.value)} />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Adoption Fee</div>
                  <input type="number" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setAdoptionFee(e.target.value)} />
               </div>
               {/* <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Vaccination Frequency</div>
                  <select className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setVaccinationFrequency(e.target.value)}>
                     <option value="">-- Select Vaccination Frequency --</option>
                     <option value="ONCE_A_WEEK">Once a week</option>
                     <option value="TWICE_A_MONTH">Twice a month</option>
                     <option value="ONCE_A_MONTH">Once a month</option>
                     <option value="ONCE_A_YEAR">Once a year</option>
                     <option value="TWICE_A_YEAR">Twice a year</option>
                     <option value="THRISE_A_YEAR">Thrise a year</option>
                  </select>
               </div> */}
               <div className="col-span-3">
                  <div className="text-sm font-semibold leading-4 mb-2">Animal Image</div>
                  <img src={prvImage} alt="Animal" className="w-64 h-44 object-cover rounded-md mb-2" />
                  <input type="file" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={handleImage} />
               </div>
               <div className="col-span-3 text-right">
                  <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Animal</button>
               </div>
            </div>
         </div>
         <ToastContainer />
      </div >

   );
}

export default AnimalAdd;