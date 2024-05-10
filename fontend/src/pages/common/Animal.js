import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import AnimalDetails from "../../components/animal/AnimalDetails";
import { APP_URL } from "../../config";

function Animal() {
   Modal.setAppElement('#root');

   const [animalData, setAnimalData] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [animalId, setAnimalId] = useState(null);

   useEffect(() => {
      fetchEvents();
   }, []);

   const fetchEvents = async () => {
      const response = await fetch(APP_URL + `/api/animal/view`);
      const data = await response.json();
      setAnimalData(data);
   }

   const handleAnimalView = (animalId) => {
      setAnimalId(animalId);
      setIsModalOpen(true);

   }

   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold mb-10">Our Animals</h1>

         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {animalData.map((animal) => (
               <div key={animal._id} className="border p-4 shadow-[2px_2px_2px_1px_#0004] hover:shadow-[2px_2px_2px_1px_#0006] rounded-lg hover:cursor-pointer bg-white" onClick={() => handleAnimalView(animal._id)}>
                  <img src={APP_URL + `/uploads/${animal.image}`} alt={animal.name} className="w-full h-44 object-cover mb-2 rounded-md" />
                  <div className='text-lg pl-2 uppercase'>Animal Details</div>
                  <div className='grid grid-cols-2 bg-sky-200 p-3 rounded-lg'>
                     <div className='text-sm'><span className='font-[600]'>Name : </span>{animal?.name}</div>
                     <div className='text-sm'><span className='font-[600]'>Type : </span>{animal?.type}</div>
                     <div className='text-sm'><span className='font-[600]'>Age : </span>{animal?.age}</div>
                     <div className='text-sm'><span className='font-[600]'>Color : </span>{animal?.color}</div>
                     <div className='text-sm'><span className='font-[600]'>Weight : </span>{animal?.weight} kg</div>
                     <div className='text-sm'><span className='font-[600]'>Adoption Fee : </span>{animal?.adoptionFee}</div>
                  </div>
               </div>
            ))}
         </div>
         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <AnimalDetails animalId={animalId} />
         </Modal>
      </div>
   );
}

export default Animal;