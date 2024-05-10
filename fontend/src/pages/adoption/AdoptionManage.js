import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { TbListDetails } from "react-icons/tb";
import jsPDF from "jspdf";
import { HiPencilAlt, HiPlus } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APP_URL } from "../../config";

function AdoptionManage() {
   Modal.setAppElement('#root');

   const navigate = useNavigate();
   const [adoptionData, setAdoptionData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAdoptionId, setSelectedAdoptionId] = useState("");

   const [state, setState] = useState("");
   const [reason, setReason] = useState("");


   useEffect(() => {
      fetchAdoptions();
   }, []);

   const fetchAdoptions = async () => {
      const response = await fetch(APP_URL + `/api/adoption`);
      const data = await response.json();
      setAdoptionData(data);
      setFilteredData(data);
   }

   const handleView = (adoptionId) => {
      navigate(`/admin/adoption/view/${adoptionId}`);
   }

   const handleDownloadPDF = async () => {
      const doc = new jsPDF({
         orientation: 'landscape',
         unit: 'mm',
         format: 'a4'
      });

      const headers = [
         { title: "No", dataKey: "no" },
         { title: "Animal ID", dataKey: "animal._id" },
         { title: "Animal Type", dataKey: "animal.type" },
         { title: "User ID", dataKey: "user._id" },
         { title: "Adoption State", dataKey: "adoption.state" },
         { title: "Adoption Fee", dataKey: "animal.adoptionFee" },
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
      const topText16 = "Stray Animal Adoption and Care Platform - Adoption Report";
      doc.text(topText16, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

      doc.setFontSize(12)
      const topText14 = "Report Generated: " + new Date().toLocaleString();
      doc.text(topText14, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      doc.autoTable({
         head: [headers],
         margin: { top: 30 },
         body: data,
      });

      doc.save("adoption_table.pdf");
   }


   const handleSearch = () => {
      let filteredData = adoptionData;
      const filterState = document.getElementById("filterState").value;
      const filterSearch = document.getElementById("search").value;

      if (filterState !== '') {
         filteredData = filteredData.filter((item) => item.adoption.state === filterState);
      }

      if (filterSearch !== '') {
         filteredData = filteredData.filter((item) => {
            return item.animal._id.toLowerCase().includes(filterSearch.toLowerCase()) ||
               item.user._id.toLowerCase().includes(filterSearch.toLowerCase()) ||
               item.adoption.state.toLowerCase().includes(filterSearch.toLowerCase()) ||
               item.animal.adoptionFee.toString().toLowerCase().includes(filterSearch.toLowerCase()) ||
               new Date(item.adoption.createdAt).toISOString().slice(0, 19).replace('T', ' ').toLowerCase().includes(filterSearch.toLowerCase());
         });
      }

      setFilteredData(filteredData);
   }

   const handleStateEdit = (adoptionId) => {
      setSelectedAdoptionId(adoptionId);
      setIsModalOpen(true);
   }

   const handleUpdateState = async () => {
      if (state === "") {
         toast.error("Please select a state");
         return;
      }
      if (reason === "") {
         toast.error("Please enter a reason");
         return;
      }
      const response = await fetch(APP_URL + `/api/adoption/${selectedAdoptionId}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            state: state,
            reason: reason,
            isAdmin: true,
         }),
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         setIsModalOpen(false);
         fetchAdoptions();
         setState("");
         setReason("");
      }
   }


   return (

      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Adoptions</h1>
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
                  <th className="border px-4 py-1 bg-slate-400">User ID</th>
                  <th className="border px-4 py-1 bg-slate-400">Adoption State</th>
                  <th className="border px-4 py-1 bg-slate-400">Adoption Fee</th>
                  <th className="border px-4 py-1 bg-slate-400">Created At</th>
                  <th className="border px-4 py-1 bg-slate-400">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((item) => (
                  <tr key={item.adoption._id} className=" bg-white">
                     <td className="border px-4 py-1 text-sm">{item.animal._id}</td>
                     <td className="border px-4 py-1 text-sm">{item.user._id}</td>
                     <td className="border px-4 py-1 text-sm flex justify-between">{item.adoption.state} <HiPencilAlt onClick={() => handleStateEdit(item.adoption._id)} size={20} className="mr-4 hover:cursor-pointer" /></td>
                     <td className="border px-4 py-1 text-sm">Rs: {item.animal.adoptionFee}</td>
                     <td className="border px-4 py-1 text-sm">{new Date(item.adoption.createdAt).toISOString().slice(0, 19).replace('T', ' ')}</td>
                     <td className="border px-4 py-1">
                        <div className="flex justify-center">
                           <TbListDetails onClick={() => handleView(item.adoption._id)} size={20} className="mr-4 hover:cursor-pointer" />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className="bg-sky-200 p-4 rounded-lg shadow-sm shadow-stone-900">
               <h3 className="text-lg font-bold text-center mb-5">Respond to Request</h3>
               <div className="flex">
                  <div className="w-[200px] text-sm font-semibold leading-4">State</div>
                  <div className="w-[10px] px-5">:</div>
                  <select className="w-full text-sm p-2 bg-white" onChange={(e) => setState(e.target.value)}>
                     <option value="">-- Select State --</option>
                     <option value="PENDING">Pending</option>
                     <option value="APPROVED">Approved</option>
                     <option value="REJECTED">Rejected</option>
                     <option value="COMPLETED">Completed</option>
                  </select>
               </div>
               <div className="flex mt-5">
                  <div className="w-[200px] text-sm font-semibold leading-4">Reason</div>
                  <div className="w-[10px] px-5">:</div>
                  <textarea className="w-full p-2 text-sm" rows="3" onChange={(e) => setReason(e.target.value)}></textarea>
               </div>
               <div className="flex justify-end mt-5">
                  <button className="bg-sky-500 hover:bg-sky-800 px-5 py-2 rounded-lg text-white font-bold" onClick={handleUpdateState}>Submit</button>
               </div>
            </div>
         </Modal>
         <ToastContainer />
      </div>
   );
}

export default AdoptionManage;