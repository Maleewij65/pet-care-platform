import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APP_URL } from '../../config';

const AnimalDetails = ({ animalId }) => {

   const { user } = useUser();
   const navigate = useNavigate();

   const [animal, setAnimal] = useState(null);

   useEffect(() => {
      fetchAnimal();
   }, []);

   const fetchAnimal = async () => {
      fetch(APP_URL + `/api/animal/${animalId}`)
         .then(response => response.json())
         .then(data => {
            setAnimal(data);
         })
         .catch(error => {
            console.error('Error:', error);
         });
   }

   const handleAdopt = () => {
      fetch(APP_URL + `/api/animal/${animalId}/adoption/check`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
         },
         body: JSON.stringify({ user: user.id })
      })
         .then(response => response.json())
         .then(data => {
            if (data.error) {
               toast.error(data.message);
            } else if (data.adopted) {
               toast.info("You have already send an adoption request for this animal");
            } else {
               navigate(`/animal/${animalId}/adopt`);
            }
         })
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
         {user && user.role === 'USER' ? (
            <button className='bg-blue-500 hover:bg-blue-800 text-white p-2 rounded-lg mt-4 w-full font-bold uppercase shadow-[2px_2px_2px_1px_#0004]' onClick={handleAdopt}>Adopt This Animal</button>
         ) : (
            <Link className='block text-center bg-blue-500 hover:bg-blue-800 text-white p-2 rounded-lg mt-4 w-full font-bold uppercase shadow-[2px_2px_2px_1px_#0004]' to={'/login'}>Login To Adopt</Link>
         )}
         <ToastContainer />
      </div>
   );
};

export default AnimalDetails;