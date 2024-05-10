import React, { useEffect, useState } from "react";
import { APP_URL } from "../../config";

function EventView() {

   const [eventData, setEventData] = useState({});

   useEffect(() => {
      fetchEvent();
   }, []);

   const fetchEvent = async () => {
      const response = await fetch(APP_URL + `/api/event/${window.location.pathname.split("/")[4]}`);
      const data = await response.json();
      setEventData(data);
   }

   return (
      <div className="p-10">
         <h3 className="text-2xl font-bold text-center mb-5">Event Details - {eventData._id}</h3>
         <div className="w-[800px] shadow-md shadow-neutral-300 m-auto p-4 bg-white">
            {Object.keys(eventData).length > 0 && (
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                     <img src={APP_URL + `/uploads/${eventData.image}`} alt="Event" className="w-1/2 mx-auto h-48 object-cover" />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Event ID</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={eventData._id} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Name</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={eventData.name} disabled />
                  </div>
                  <div className="col-span-2">
                     <div className="text-sm font-semibold leading-4 mb-2">Description</div>
                     <textarea className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" rows="3" value={eventData.description} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Date</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={eventData.date} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Time</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={eventData.time} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Location</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={eventData.location} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">State</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={eventData.state} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Fund State</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={eventData.fundState} disabled />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default EventView;