import React, { useEffect, useState } from 'react';
import { APP_URL } from '../../config';

const EventDetails = ({ eventId }) => {

   const [event, setEvent] = useState(null);

   useEffect(() => {
      fetchEvent();
   }, []);

   const fetchEvent = async () => {
      fetch(APP_URL + `/api/event/${eventId}`)
         .then(response => response.json())
         .then(data => {
            setEvent(data);
         })
         .catch(error => {
            console.error('Error:', error);
         });
   }

   return (
      <div className='p-2'>
         <img src={APP_URL + `/uploads/${event?.image}`} alt={event?.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
         <div className='text-lg pl-2 uppercase'>Event Details</div>
         <div className='grid grid-cols-2 bg-sky-200 p-3 rounded-lg mb-4 shadow-[2px_2px_2px_1px_#0004]'>
            <div className='text-sm'><span className='font-[600]'>Name : </span>{event?.name}</div>
            <div className='text-sm'><span className='font-[600]'>Date : </span>{event?.date}</div>
            <div className='text-sm'><span className='font-[600]'>Time : </span>{event?.time}</div>
            <div className='text-sm'><span className='font-[600]'>Location : </span>{event?.location}</div>
         </div>
         <div className='bg-sky-200 p-3 rounded-lg shadow-[2px_2px_2px_1px_#0004]'>
            <div className='text-sm'><span className='font-[600]'></span>{event?.description}</div>
         </div>
      </div>
   );
};

export default EventDetails;