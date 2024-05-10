import React, { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import EventDetails from "../../components/event/EventDetails";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { APP_URL } from "../../config";


function Event() {
   Modal.setAppElement('#root');

   const { user } = useUser();

   const [eventData, setEventData] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isAttendModalOpen, setIsAttendModalOpen] = useState(false);
   const [name, setName] = useState("");
   const [mobile, setMobile] = useState("");
   const [eventId, setEventId] = useState("");

   useEffect(() => {
      fetchEvents();
   }, []);

   const fetchEvents = async () => {
      const response = await fetch(APP_URL + `/api/event/view`);
      const data = await response.json();
      console.log(data);
      setEventData(data);
   }

   const handleAttend = async (eventId) => {
      setEventId(eventId);
      setName("");
      setMobile("");
      setIsAttendModalOpen(true);
   }

   const handleViewEvent = async (eventId) => {
      setEventId(eventId);
      setIsModalOpen(true);
   }

   const handleSubmit = async () => {
      if (!name || !mobile) {
         toast.error("Please fill in all fields");
         return;
      }

      const nameRegex = /^[A-Za-z\s]+$/;
      const mobileRegex = /^[0-9]{10}$/;

      if (!nameRegex.test(name)) {
         toast.error("Invalid name");
         return;
      }

      if (!mobileRegex.test(mobile)) {
         toast.error("Invalid mobile number");
         return;
      }


      await fetch(APP_URL + `/api/eventAttend/`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            event: eventId,
            name,
            email: user.email,
            mobile,
         })
      }).then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.error) {
               toast.error(data.message);
            } else {
               toast.success("Attendee added successfully");
               setName("");
               setMobile("");
               setIsAttendModalOpen(false);
            }
         });
   }

   return (
      <div className="p-10" style={{
         backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg-1.webp)`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundAttachment: 'fixed',
         minHeight: 'calc(100vh - 64px)',
      }}>
         <h1 className="text-2xl font-bold mb-10">Our Events</h1>

         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {eventData.map((event) => (
               <div key={event._id} className="border p-4 rounded-lg bg-white shadow-[2px_2px_2px_1px_#0004]">
                  <img src={APP_URL + `/uploads/${event.image}`} alt={event.name} className="w-full h-52 rounded-lg object-cover mb-4" />
                  <div className=" p-4 mb-4 rounded-lg bg-sky-200">
                     <div className="border-b mb-2 font-bold">{event.name}</div>
                     <div className="text-sm mb-2 h-16 overflow-hidden">
                        {event.description}
                     </div>
                     <div className="grid grid-cols-3 gap-3">
                        <div className="text-sm font-bold flex items-center"> {event.date}</div>
                        <div className="text-sm font-bold flex items-center"> {event.time}</div>
                        <div className="text-sm font-bold flex items-center"><BiCurrentLocation className="mr-1 w-6" size={16} /> {event.location}</div>
                     </div>
                  </div>
                  <div className="flex">
                     {(user && user?.role === 'USER') ? (
                        <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded w-1/2 mr-2" onClick={() => handleAttend(event._id)} >Attend Request</button>
                     ) : (
                        <Link className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded w-1/2 mr-2 text-center" to={'/login'} >Login to Attend</Link>
                     )}
                     <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded w-1/2 ml-2" onClick={() => handleViewEvent(event._id)} >View Event</button>
                  </div>
               </div>
            ))}
         </div>
         <ToastContainer />

         <Modal isOpen={isAttendModalOpen} onRequestClose={() => setIsAttendModalOpen(false)} className="modal empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className=" bg-sky-200 p-3 rounded-lg shadow-[2px_2px_2px_1px_#0004]">
               <h2 className="text-center text-lg font-bold">Attendee Information</h2>
               <div className="border-2 border-gray-800 rounded-md mb-2 px-2 py-1 bg-white">
                  <input type="text" placeholder="Name" className="placeholder-slate-600  w-full outline-none" value={name} onChange={(e) => setName(e.target.value)} />
               </div>
               <div className="border-2 border-gray-800 rounded-md mb-2 px-2 py-1 bg-white">
                  <input type="email" placeholder="Email" className="placeholder-slate-600 w-full outline-none" value={user?.email} disabled />
               </div>
               <div className="border-2 border-gray-800 rounded-md mb-2 px-2 py-1 bg-white">
                  <input type="text" placeholder="Mobile" className="placeholder-slate-600 w-full outline-none" value={mobile} onChange={(e) => setMobile(e.target.value)} />
               </div>
               <div className="text-right">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
               </div>
            </div>
         </Modal>
         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <EventDetails eventId={eventId} />
         </Modal>
      </div>
   );
}

export default Event;