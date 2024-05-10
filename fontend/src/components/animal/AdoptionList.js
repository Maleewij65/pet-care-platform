import React, { useEffect, useState } from 'react';
import { APP_URL } from '../../config';

const AdoptionList = ({ animalId }) => {

   const [adoptionHistory, setAdoptionHistory] = useState([]);
   const [animal, setAnimal] = useState({});

   useEffect(() => {
      fetchAnimal();
      fetchAnimalAdoptions();
   }, []);

   const fetchAnimal = async () => {
      const response = await fetch(APP_URL + `/api/animal/${animalId}`);
      const data = await response.json();
      setAnimal(data);
   }

   const fetchAnimalAdoptions = async () => {
      const response = await fetch(APP_URL + `/api/animal/${animalId}/adoption`);
      const data = await response.json();
      setAdoptionHistory(data);
   }

   return (
      <div className='p-2'>
         <img src={APP_URL + `/uploads/${animal?.image}`} alt={animal?.name} className="w-full h-64 object-cover mb-4 rounded-lg" />

         <div className='text-lg pl-2 uppercase'>Animal Details</div>
         <div className='grid grid-cols-2 bg-sky-200 p-3 rounded-lg mb-4 shadow-[2px_2px_2px_1px_#0004]'>
            <div className='text-sm'><span className='font-[600]'>Name : </span>{animal?.name}</div>
            <div className='text-sm'><span className='font-[600]'>Type : </span>{animal?.type}</div>
            <div className='text-sm'><span className='font-[600]'>Age : </span>{animal?.age}</div>
            <div className='text-sm'><span className='font-[600]'>Color : </span>{animal?.color}</div>
            <div className='text-sm'><span className='font-[600]'>Weight : </span>{animal?.weight} kg</div>
            <div className='text-sm'><span className='font-[600]'>Adoption Fee : </span>{animal?.adoptionFee}</div>
         </div>

         <div className='text-lg pl-2 uppercase'>Adoption Requests</div>
         <div className=' bg-emerald-200 p-3 rounded-lg min-h-20 max-h-24 overflow-scroll shadow-[2px_2px_2px_1px_#0004]'>
            {adoptionHistory.map((adoption, index) => (
               <div key={index} className='border-b-2 border-black pb-2'>
                  <div className='text-sm'><span className='font-[600]'>Applicant Name : </span>{adoption.applicant_name}</div>
                  <div className='text-sm'><span className='font-[600]'>Adoption State : </span>{adoption.state}</div>
               </div>
            ))}
         </div>

      </div>
   );
};

export default AdoptionList;