import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import jsPDF from "jspdf";
import { HiPencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiInjection } from "react-icons/bi";
import { APP_URL } from "../../config";

function AppointmentManage() {
   Modal.setAppElement('#root');

   const [appointmentData, setAppointmentData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAppointentId, setSelectedAppointentId] = useState('');
   const [selectedDate, setSelectedDate] = useState('');
   const [selectedState, setSelectedState] = useState('');
   const [reason, setReason] = useState('');

   const [vaccinationName, setVaccinationName] = useState("");
   const [animal, setAnimal] = useState("");

   const [isVaccinationModalOpen, setIsVaccinationModalOpen] = useState(false);

   useEffect(() => {
      fetchAppointments();
   }, []);

   const fetchAppointments = async () => {
      const response = await fetch(APP_URL + `/api/appointment`);
      const data = await response.json();
      setAppointmentData(data);
      setFilteredData(data);
   }

   const handleDownloadPDF = async () => {
      const doc = new jsPDF({
         orientation: 'landscape',
         unit: 'mm',
         format: 'a4'
      });

      const headers = [
         { title: "No", dataKey: "no" },
         { title: "Animal ID", dataKey: "animal" },
         { title: "Requested Date", dataKey: "requestedDate" },
         { title: "Reason", dataKey: "reason" },
         { title: "State", dataKey: "state" },
      ];
      let data = [];

      filteredData.forEach((event) => {
         const row = [];
         headers.forEach((header) => {
            if (header.dataKey === "no") {
               row.push(filteredData.indexOf(event) + 1);
            } else {
               const keys = header.dataKey.split('.');
               let value = event;
               for (let key of keys) {
                  value = value[key];
               }
               row.push(value);
            }
         });
         data.push(row);
      });

      doc.setFontSize(16)
      const topText16 = "Stray Animal Adoption and Care Platform - Appointment Report";
      doc.text(topText16, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

      doc.setFontSize(12)
      const topText14 = "Report Generated: " + new Date().toLocaleString();
      doc.text(topText14, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      doc.autoTable({
         head: [headers],
         margin: { top: 30 },
         body: data,
      });

      doc.save("appointment_table.pdf");
   }


   const handleSearch = () => {
      let filteredData = appointmentData;
      const filterState = document.getElementById("filterState").value;
      const filterSearch = document.getElementById("search").value;

      if (filterState !== '') {
         filteredData = filteredData.filter((item) => item.state === filterState);
      }

      if (filterSearch !== '') {
         filteredData = filteredData.filter((item) => {
            return item.animal.toLowerCase().includes(filterSearch.toLowerCase()) ||
               item.reason.toLowerCase().includes(filterSearch.toLowerCase()) ||
               item.state.toLowerCase().includes(filterSearch.toLowerCase());
         });
      }

      setFilteredData(filteredData);
   }

   const handleEdit = async (id) => {
      setSelectedAppointentId(id);
      setIsModalOpen(true);
   }

   const handleAppointmentUpdate = async () => {
      if (!selectedDate || !selectedState || !reason) {
         toast.error("Please fill in all fields");
         return;
      }
      const response = await fetch(APP_URL + `/api/appointment/${selectedAppointentId}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            requestedDate: selectedDate,
            state: selectedState,
            reason: reason
         }),
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         setIsModalOpen(false);
         fetchAppointments();
      }
   }

   const handleDelete = async (id) => {
      const response = await fetch(APP_URL + `/api/appointment/${id}`, {
         method: 'DELETE',
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         fetchAppointments();
      }
   }

   const handleVaccinate = (appointmentId) => {
      console.log(new Date().toISOString().slice(0, 10));
      const appointment = appointmentData.find((item) => item._id === appointmentId);
      if (appointment.state !== "APPROVED") {
         toast.error("You can only vaccinate approved appointments");
         return;
      }
      if (new Date(appointment.requestedDate).toISOString().slice(0, 10) !== new Date().toISOString().slice(0, 10)) {

         toast.error("You can only vaccinate on the requested date");
         return;
      }
      setAnimal(appointment.animal);
      setVaccinationName("");
      setIsVaccinationModalOpen(true);
   }

   const handleSubmit = async () => {
      if (!vaccinationName) {
         toast.error("Please fill in all fields");
         return;
      }
      await fetch(APP_URL + `/api/vaccination`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            vaccine: vaccinationName,
            animal: animal
         })
      }).then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.error) {
               toast.error(data.message);
            } else {
               toast.success("Vaccination added successfully");
               setVaccinationName("");
               setAnimal("");
               setIsVaccinationModalOpen(false);
               fetchAppointments();
            }
         });
   }


   return (

      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Appointment</h1>
         <div className="flex space-x-3">
            <button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Download PDF</button>
         </div>

         <div className="flex justify-between space-x-10 bg-slate-100 p-3 mb-3 border border-slate-400">
            <div>
               <label htmlFor="filterState" className="text-sm font-medium mr-3">Filter by Adoption State:</label>
               <select id="filterState" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">ALL</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="COMPLETED">Completed</option>
               </select>
            </div>
            <div>
               <input id="search" type="text" placeholder="Search everyware" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()} />
            </div>
         </div>

         <table className="w-full">
            <thead>
               <tr>
                  <th className="border px-4 py-1 bg-slate-400">Animal ID</th>
                  <th className="border px-4 py-1 bg-slate-400">Requested Date</th>
                  <th className="border px-4 py-1 bg-slate-400">Reason</th>
                  <th className="border px-4 py-1 bg-slate-400">State</th>
                  <th className="border px-4 py-1 bg-slate-400">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((item) => (
                  <tr key={item._id} className="bg-white">
                     <td className="border px-4 py-1 text-sm">{item.animal}</td>
                     <td className="border px-4 py-1 text-sm">{new Date(item.requestedDate).toISOString().slice(0, 19).replace('T', ' ')}</td>
                     <td className="border px-4 py-1 text-sm flex justify-between">{item.reason} </td>
                     <td className="border px-4 py-1 text-sm">{item.state}</td>
                     <td className="border px-4 py-1">
                        <div className="flex justify-center">
                           <BiInjection onClick={() => handleVaccinate(item._id)} size={20} className="mr-4 hover:cursor-pointer" />
                           <HiPencilAlt onClick={() => handleEdit(item._id)} size={20} className="mr-4 hover:cursor-pointer" />
                           <HiTrash onClick={() => handleDelete(item._id)} size={20} className="hover:cursor-pointer" />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         <Modal isOpen={isVaccinationModalOpen} onRequestClose={() => setIsVaccinationModalOpen(false)} className="modal empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className="bg-sky-200 p-3 rounded-lg shadow-[2px_2px_2px_1px_#0004]">
               <h2 className="text-center text-lg font-bold">Vaccinate Information</h2>
               <div className="p-3">
                  <label className="text-base block font-bold">Vaccination Name</label>
                  <input type="text" className="border p-1 w-full" onChange={(e) => setVaccinationName(e.target.value)} />
               </div>
               <div className="text-right">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
               </div>
            </div>
         </Modal>
         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className="bg-sky-200 p-4 rounded-lg shadow-sm shadow-stone-900">
               <h3 className="text-lg font-bold text-center mb-5">Appointment for Vaccination</h3>
               <div className="flex">
                  <div className="w-[200px] text-sm font-semibold leading-4">Date for Vaccination</div>
                  <div className="w-[10px] px-5">:</div>
                  <input type="date" className="w-full p-2 text-sm" onChange={(e) => setSelectedDate(e.target.value)} />
               </div>
               <div className="flex mt-5">
                  <div className="w-[200px] text-sm font-semibold leading-4">State </div>
                  <div className="w-[10px] px-5">:</div>
                  <select className="w-full p-2 text-sm" onChange={(e) => setSelectedState(e.target.value)}>
                     <option value="PENDING">Pending</option>
                     <option value="APPROVED">Approved</option>
                     <option value="REJECTED">Rejected</option>
                     <option value="COMPLETED">Completed</option>
                  </select>

               </div>
               <div className="flex mt-5">
                  <div className="w-[200px] text-sm font-semibold leading-4">Reason</div>
                  <div className="w-[10px] px-5">:</div>
                  <textarea className="w-full p-2 text-sm" onChange={(e) => setReason(e.target.value)}></textarea>
               </div>
               <div className="flex justify-end mt-5">
                  <button className="bg-sky-500 hover:bg-sky-800 px-5 py-2 rounded-lg text-white font-bold" onClick={handleAppointmentUpdate}>Submit</button>
               </div>
            </div>
         </Modal>
         <ToastContainer />
      </div>
   );
}

export default AppointmentManage;