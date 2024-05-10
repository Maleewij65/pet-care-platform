import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "../../contexts/UserContext";
import { APP_URL } from '../../config';

function EventAdd() {
   const navigate = useNavigate();
   const { user } = useUser();

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [date, setDate] = useState("");
   const [time, setTime] = useState("");
   const [location, setLocation] = useState("");
   const [image, setImage] = useState(null);
   const [prvImage, setPrvImage] = useState("https://via.placeholder.com/150");

   const handleImage = (e) => {
      setImage(e.target.files[0]);
      setPrvImage(URL.createObjectURL(e.target.files[0]));
   }

   const handleAdd = async () => {

      if (!name || !description || !date || !time || !location || !image) {
         toast.error("Please fill in all fields");
         return;
      }

      const nameRegex = /^[a-zA-Z\s]+$/;
      const descriptionRegex = /^[a-zA-Z0-9\s]+$/;

      if (!nameRegex.test(name)) {
         toast.error("Invalid event name");
         return;
      }

      if (!descriptionRegex.test(description)) {
         toast.error("Invalid event description");
         return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("location", location);
      formData.append("user", user.id);
      formData.append("fundState", "NONE");
      formData.append("state", "ACTIVE");
      formData.append("image", image);

      const response = await fetch(APP_URL + `/api/event`, {
         method: "POST",
         body: formData,
      });
      const data = await response.json();
      console.log(data);
      navigate("/admin/event/manage");
   }

   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Events</h1>
         <button onClick={() => navigate("/admin/event/manage")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiChevronLeft className="mr-2" /> Go Back</button>

         <div className="w-full shadow-md shadow-neutral-300 m-auto p-4 bg-white">
            <div className="grid grid-cols-3 gap-4">
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Event Name</div>
                  <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setName(e.target.value)} />
               </div>
               <div className="col-span-2">
                  <div className="text-sm font-semibold leading-4 mb-2">Description</div>
                  <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setDescription(e.target.value)} />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Date</div>
                  <input type="date" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setDate(e.target.value)} />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Time</div>
                  <input type="time" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setTime(e.target.value)} />
               </div>
               <div>
                  <div className="text-sm font-semibold leading-4 mb-2">Location</div>
                  <select className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={(e) => setLocation(e.target.value)}>
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
               <div className="col-span-3">
                  <div className="text-sm font-semibold leading-4 mb-2">Event Image</div>
                  <img src={prvImage} alt="Event" className="w-64 h-44 object-cover rounded-md mb-2" />
                  <input type="file" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" onChange={handleImage} />
               </div>
               <div className="col-span-3 text-right">
                  <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Event</button>
               </div>
            </div>
         </div>
         <ToastContainer />
      </div >

   );
}

export default EventAdd;