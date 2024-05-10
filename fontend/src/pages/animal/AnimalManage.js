import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiTrash, HiPencilAlt, HiPlus } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import { TbListDetails } from "react-icons/tb";
import { BiInjection } from "react-icons/bi";
import Modal from "react-modal";
import { APP_URL } from "../../config";

function AnimalManage() {
   Modal.setAppElement('#root');

   const navigate = useNavigate();
   const [animalData, setAnimalData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAnimalId, setSelectedAnimalId] = useState("");
   const [selectedDate, setSelectedDate] = useState("");

   useEffect(() => {
      fetchAnimals();
   }, []);

   const fetchAnimals = async () => {
      const response = await fetch(APP_URL + `/api/animal`);
      const data = await response.json();
      setAnimalData(data);
      setFilteredData(data);
   }

   const handleEdit = (animalId) => {
      navigate(`/admin/animal/edit/${animalId}`);
   }

   const handleDelete = async (animalId) => {
      const response = await fetch(APP_URL + `/api/animal/${animalId}`, {
         method: "DELETE",
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         fetchAnimals();
      }
   }

   const handleView = (animalId) => {
      navigate(`/admin/animal/view/${animalId}`);
   }

   const handleDownloadPDF = async () => {
      const doc = new jsPDF({
         orientation: 'landscape',
         unit: 'mm',
         format: 'a4'
      });

      const headers = [
         { title: "No", dataKey: "no" },
         { title: "Animal ID", dataKey: "_id" },
         { title: "Animal Type", dataKey: "type" },
         { title: "Age", dataKey: "age" },
         { title: "Color", dataKey: "color" },
         { title: "Weight", dataKey: "weight" },
         { title: "Adoption Fee", dataKey: "adoptionFee" },
         { title: "Vaccination Period", dataKey: "vaccinationFrequency" },
      ];

      let data = [];
      filteredData.forEach((event) => {
         const row = [];
         headers.forEach((header) => {
            if (header.dataKey === "no") {
               row.push(filteredData.indexOf(event) + 1);
            } else {
               row.push(event[header.dataKey]);
            }
         });
         data.push(row);
      });

      doc.setFontSize(16)
      const topText16 = "Stray Animal Adoption and Care Platform - Animal Report";
      doc.text(topText16, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

      doc.setFontSize(12)
      const topText14 = "Report Generated: " + new Date().toLocaleString();
      doc.text(topText14, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      doc.autoTable({
         head: [headers],
         margin: { top: 30 },
         body: data,
      });

      doc.save("animal_table.pdf");
   }

   const handleSearch = async () => {
      let filteredData = animalData;
      const filterType = document.getElementById("filterType").value;
      const filterVaccination = document.getElementById("filterVaccination").value;
      const filterSearch = document.getElementById("search").value;

      if (filterType !== '') {
         filteredData = filteredData.filter((animal) => animal.type === filterType);
      }

      if (filterVaccination !== '') {
         filteredData = filteredData.filter((animal) => animal.vaccinationFrequency === filterVaccination);
      }

      if (filterSearch !== '') {
         filteredData = filteredData.filter((animal) => animal._id.includes(filterSearch) || animal.type.includes(filterSearch) || animal.age.toString().includes(filterSearch) || animal.color.includes(filterSearch) || animal.weight.toString().includes(filterSearch) || animal.adoptionFee.toString().includes(filterSearch) || animal.vaccinationFrequency.includes(filterSearch));
      }

      setFilteredData(filteredData);
   }

   const handleAppointmentAdd = (animalId) => {
      setSelectedAnimalId(animalId);
      setIsModalOpen(true);
   }


   const handleCreateAppointment = async () => {
      if (selectedDate === "") {
         toast.error("Please select a date for vaccination");
         return;
      }

      const response = await fetch(APP_URL + `/api/appointment`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            animal: selectedAnimalId,
            requestedDate: selectedDate,
         }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         setIsModalOpen(false);
      }
   }

   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Animals</h1>
         <div className="flex space-x-3">
            <button onClick={() => navigate("/admin/animal/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Add Animal</button>
            <button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Download PDF</button>
         </div>
         <div className="flex justify-between space-x-10 bg-slate-100 p-3 mb-3 border border-slate-400">
            <div>
               <label htmlFor="filterType" className="text-sm font-medium mr-3">Filter by Type:</label>
               <select id="filterType" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="DOG">Dog</option>
                  <option value="CAT">Cat</option>
               </select>
            </div>
            <div>
               <label htmlFor="filterVaccination" className="text-sm font-medium mr-3">Filter by Vaccination Period:</label>
               <select id="filterVaccination" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="ONCE_A_WEEK">Once a Week</option>
                  <option value="TWICE_A_MONTH">Twice a Month</option>
                  <option value="ONCE_A_MONTH">Once a Month</option>
                  <option value="ONCE_A_YEAR">Once a Year</option>
                  <option value="TWICE_A_YEAR">Twice a Year</option>
                  <option value="THRISE_A_YEAR">Thrise a Year</option>
               </select>
            </div>
            <div>
               <input id="search" type="text" placeholder="Search everyware" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()} />
            </div>
         </div>
         <table className="w-full" >
            <thead>
               <tr>
                  <th className="border px-4 py-1 bg-slate-400">Animal ID</th>
                  <th className="border px-4 py-1 bg-slate-400 ">Animal Type</th>
                  <th className="border px-4 py-1 bg-slate-400">Age</th>
                  <th className="border px-4 py-1 bg-slate-400">Color</th>
                  <th className="border px-4 py-1 bg-slate-400">Weight</th>
                  <th className="border px-4 py-1 bg-slate-400">Adoption Fee</th>
                  <th className="border px-4 py-1 bg-slate-400">Adoption List</th>
                  <th className="border px-4 py-1 bg-slate-400">Vaccination Period</th>
                  <th className="border px-4 py-1 bg-slate-400">State</th>
                  <th className="border px-4 py-1 bg-slate-400">Last Vaccinated Date</th>
                  <th className="border px-4 py-1 bg-slate-400">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((item) => (
                  <tr key={item._id} className="bg-white">
                     <td className="border px-4 py-1 text-sm">{item._id}</td>
                     <td className="border px-4 py-1 text-sm">{item.type}</td>
                     <td className="border px-4 py-1 text-sm">{item.age}</td>
                     <td className="border px-4 py-1 text-sm">{item.color}</td>
                     <td className="border px-4 py-1 text-sm">{item.weight}</td>
                     <td className="border px-4 py-1 text-sm">{item.adoptionFee}</td>
                     <td className="border px-4 py-1 text-sm">{item.adoption.length}</td>
                     <td className="border px-4 py-1 text-sm">{item.vaccinationFrequency}</td>
                     <td className="border px-4 py-1 text-sm">{item.state}</td>
                     <td className="border px-4 py-1 text-sm flex justify-between">{item.lastVaccination === "Not Vaccinated" ? "Not Vaccinated" : new Date(item.lastVaccination).toISOString().slice(0, 19).replace('T', ' ')}
                        {item.state === 'AVAILABLE' && <BiInjection size={20} className=" hover:cursor-pointer" onClick={() => handleAppointmentAdd(item._id)} />}</td>
                     <td className="border px-4 py-1 ">
                        <div className="flex justify-between">
                           <TbListDetails onClick={() => handleView(item._id)} size={20} className="mr-4 hover:cursor-pointer" />
                           {item.state === 'AVAILABLE' && <HiPencilAlt onClick={() => handleEdit(item._id)} size={20} className="mr-4 hover:cursor-pointer" />}
                           <HiTrash onClick={() => handleDelete(item._id)} size={20} className="hover:cursor-pointer" />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className="bg-sky-200 p-4 rounded-lg shadow-sm shadow-stone-900">
               <h3 className="text-lg font-bold text-center mb-5">Appointment for Vaccination</h3>
               <div className="flex">
                  <div className="w-[200px] text-sm font-semibold leading-4">Date for Vaccination</div>
                  <div className="w-[10px] px-5">:</div>
                  <input type="date" className="w-full p-2 text-sm" onChange={(e) => setSelectedDate(e.target.value)} />
               </div>
               <div className="flex justify-end mt-5">
                  <button className="bg-sky-500 hover:bg-sky-800 px-5 py-2 rounded-lg text-white font-bold" onClick={handleCreateAppointment}>Submit</button>
               </div>
            </div>
         </Modal>
         <ToastContainer />
      </div>
   );
}

export default AnimalManage;