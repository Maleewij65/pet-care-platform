import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiTrash, HiPencilAlt, HiPlus } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import Modal from "react-modal";
import { APP_URL } from "../../config";
import { TbListDetails } from "react-icons/tb";

require('jspdf-autotable');

function VolunteerManage() {
   Modal.setAppElement('#root');

   const navigate = useNavigate();
   const [volunteerData, setVolunteerData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [respondedVolunteers, setRespondedVolunteers] = useState([]);

   useEffect(() => {
      fetchVolunteers();
   }, []);

   const fetchVolunteers = async () => {
      const response = await fetch(APP_URL + `/api/volunteer`);
      const data = await response.json();
      setVolunteerData(data);
      setFilteredData(data);
   }

   const handleEdit = (volunteerId) => {
      navigate(`/admin/volunteer/edit/${volunteerId}`);
   }

   const handleDelete = async (volunteerId) => {
      const response = await fetch(APP_URL + `/api/volunteer/${volunteerId}`, {
         method: "DELETE",
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         fetchVolunteers();
      }
   }

   const handleDownloadPDF = async () => {
      const doc = new jsPDF({
         orientation: 'landscape',
         unit: 'mm',
         format: 'a4'
      });

      const headers = [
         { title: "No", dataKey: "no" },
         { title: "Volunteer ID", dataKey: "_id" },
         { title: "Skill", dataKey: "skill" },
         { title: "Description", dataKey: "description" },
         { title: "District", dataKey: "district" },
         { title: "Max Volunteers", dataKey: "maxVolunteers" },
         { title: "On Date", dataKey: "onDate" },
         { title: "State", dataKey: "state" },
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
      const topText16 = "Stray Animal Adoption and Care Platform - Volunteer Requests Report";
      doc.text(topText16, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

      doc.setFontSize(12)
      const topText14 = "Report Generated: " + new Date().toLocaleString();
      doc.text(topText14, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      doc.autoTable({
         head: [headers],
         margin: { top: 30 },
         body: data,
      });

      doc.save("volunteer_requests_table.pdf");
   }

   const handleSearch = async () => {
      let filteredData = volunteerData;

      const filterSkill = document.getElementById("filterSkill").value;
      const filterDistrict = document.getElementById("filterDistrict").value;
      const filterState = document.getElementById("filterState").value;
      const search = document.getElementById("search").value;
      if (filterSkill !== '') {
         filteredData = filteredData.filter((item) => item.skill === filterSkill);
      }
      if (filterDistrict !== '') {
         filteredData = filteredData.filter((item) => item.district === filterDistrict);
      }
      if (filterState !== '') {
         filteredData = filteredData.filter((item) => item.state === filterState);
      }
      if (search !== '') {
         filteredData = filteredData.filter((item) => item.skill.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()));
      }
      setFilteredData(filteredData);
   }

   const handleViewVolunteers = async (volunteerId) => {
      const response = await fetch(APP_URL + `/api/volunteerRespond/request/${volunteerId}`);
      const data = await response.json();
      setRespondedVolunteers(data);
      setIsModalOpen(true);
   }


   return (
      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Volunteer</h1>
         <div className="flex space-x-3">
            <button onClick={() => navigate("/admin/volunteer/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Add Volunteer Request</button>
            <button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Download PDF</button>
         </div>
         <div className="flex justify-between space-x-10 bg-slate-100 p-3 mb-3 border border-slate-400">
            <div>
               <label htmlFor="filterSkill" className="text-sm font-medium mr-3">Filter by Required Skill:</label>
               <select id="filterSkill" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="cleaning and maintenance">Cleaning and Maintenance</option>
                  <option value="Feeding and Watering">Feeding and Watering</option>
                  <option value="Socialization and Playing">Socialization and Playing</option>
                  <option value="Basic Grooming">Basic Grooming</option>
               </select>
            </div>
            <div>
               <label htmlFor="filterDistrict" className="text-sm font-medium mr-3">Filter by District:</label>
               <select id="filterDistrict" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Matale">Matale</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Galle">Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Hambantota">Hambantota</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Mannar">Mannar</option>
                  <option value="Vavuniya">Vavuniya</option>
                  <option value="Mullaitivu">Mullaitivu</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Ampara">Ampara</option>
                  <option value="Trincomalee">Trincomalee</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Puttalam">Puttalam</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Monaragala">Monaragala</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Kegalle">Kegalle</option>
               </select>
            </div>
            <div>
               <label htmlFor="filterState" className="text-sm font-medium mr-3">Filter by State:</label>
               <select id="filterState" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
               </select>
            </div>
            <div>
               <input id="search" type="text" placeholder="Search everyware" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()} />
            </div>
         </div>
         <table className="w-full">
            <thead>
               <tr>
                  <th className="border px-4 py-1 bg-slate-400">Request ID</th>
                  <th className="border px-4 py-1 bg-slate-400">Needed Skill</th>
                  <th className="border px-4 py-1 bg-slate-400">Description</th>
                  <th className="border px-4 py-1 bg-slate-400">Discript</th>
                  <th className="border px-4 py-1 bg-slate-400">Max Volunteers</th>
                  <th className="border px-4 py-1 bg-slate-400">On Date</th>
                  <th className="border px-4 py-1 bg-slate-400">State</th>
                  <th className="border px-4 py-1 bg-slate-400">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((item) => (
                  <tr key={item._id} className="bg-white">
                     <td className="border px-4 py-1 text-sm">{item._id}</td>
                     <td className="border px-4 py-1 text-sm">{item.skill}</td>
                     <td className="border px-4 py-1 text-sm">{item.description}</td>
                     <td className="border px-4 py-1 text-sm">{item.district}</td>
                     <td className="border px-4 py-1 text-sm">{item.maxVolunteers}</td>
                     <td className="border px-4 py-1 text-sm">{new Date(item.onDate).toISOString().slice(0, 19).replace('T', ' ')}</td>
                     <td className="border px-4 py-1 text-sm">{item.state}</td>
                     <td className="border px-4 py-1 text-sm">
                        <div className="flex justify-between">
                           <HiPencilAlt onClick={() => handleEdit(item._id)} size={20} className="mr-4 hover:cursor-pointer" />
                           <HiTrash onClick={() => handleDelete(item._id)} size={20} className="hover:cursor-pointer mr-4" />
                           <TbListDetails onClick={() => handleViewVolunteers(item._id)} size={20} className="hover:cursor-pointer" />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal lg empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className=" bg-sky-200 p-3 rounded-lg shadow-[2px_2px_2px_1px_#0004]">
               <h2 className="text-center text-lg font-bold mb-4">Responded Volunteers</h2>
               <table className="w-full mb-4">
                  <thead>
                     <tr>
                        <th className="border px-4 py-1 bg-slate-400">User ID</th>
                     </tr>
                  </thead>
                  <tbody>
                     {respondedVolunteers.map((item) => (
                        <tr key={item._id} className="bg-white">
                           <td className="border px-4 py-1 text-sm">{item.user}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Modal>
         <ToastContainer />
      </div >
   );
}

export default VolunteerManage;