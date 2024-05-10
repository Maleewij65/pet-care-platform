import React, { useEffect, useState } from "react";
import { APP_URL } from "../../config";

function AnimalView() {

   const [animalData, setAnimalData] = useState({});

   useEffect(() => {
      fetchAnimal();
   }, []);

   const fetchAnimal = async () => {
      const response = await fetch(APP_URL + `/api/animal/${window.location.pathname.split("/")[4]}`);
      const data = await response.json();
      setAnimalData(data);
   }

   return (
      <div className="p-10">
         <h3 className="text-2xl font-bold text-center mb-5">Animal Details - {animalData._id}</h3>
         <div className="w-[800px] shadow-md shadow-neutral-300 m-auto p-4 bg-white">
            {Object.keys(animalData).length > 0 && (
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                     <img src={APP_URL + `/uploads/${animalData.image}`} alt="Animal" className="w-1/2 mx-auto h-48 object-cover" />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Animal ID</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData._id} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Name</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData.name} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Type</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData.type} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Age</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData.age} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Color</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData.color} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Weight</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData.weight} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Adoption Fee</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData.adoptionFee} disabled />
                  </div>
                  <div>
                     <div className="text-sm font-semibold leading-4 mb-2">Vaccination Frequency</div>
                     <input type="text" className="w-full p-2 text-sm border border-slate-300 shadow-tremor-card" value={animalData.vaccinationFrequency} disabled />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default AnimalView;