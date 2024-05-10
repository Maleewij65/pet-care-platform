import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiTrash, HiPencilAlt, HiPlus } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import jsPDF from "jspdf";
import { TbListDetails } from "react-icons/tb";
import { APP_URL } from "../../config";

function EventManage() {
   Modal.setAppElement('#root');
   const navigate = useNavigate();

   const [eventData, setEventData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   const [isAttendModalOpen, setIsAttendModalOpen] = useState(false);

   const [isFundRequestModalOpen, setIsFundRequestModalOpen] = useState(false);
   const [fundRequestEvents, setFundRequestEvents] = useState([]);
   const [fundingEvents, setFundingEvents] = useState([]);
   const [fundAmount, setFundAmount] = useState(0);

   const [attendData, setAttendData] = useState([]);

   useEffect(() => {
      fetchEvents();
   }, []);

   const fetchEvents = async () => {
      const response = await fetch(APP_URL + `/api/event`);
      const data = await response.json();
      setEventData(data);
      setFilteredData(data);
   }

   const handleEdit = (eventId) => {
      navigate(`/admin/event/edit/${eventId}`);
   }

   const handleDelete = async (eventId) => {
      const response = await fetch(APP_URL + `/api/event/${eventId}`, {
         method: "DELETE",
      });
      const data = await response.json();
      if (data.error) {
         toast.error(data.message);
      } else {
         toast.success(data.message);
         fetchEvents();
      }
   }

   const handleToggleDescription = (event) => {
      event.descriptionToggle = !event.descriptionToggle;
      setFilteredData([...eventData]);
   }

   const handleView = (eventId) => {
      navigate(`/admin/event/view/${eventId}`);
   }

   const handleDownloadPDF = () => {
      const doc = new jsPDF({
         orientation: 'landscape',
         unit: 'mm',
         format: 'a4'
      });

      const headers = [
         { title: "No", dataKey: "no" },
         { title: "Event Name", dataKey: "name" },
         { title: "Date", dataKey: "date" },
         { title: "Time", dataKey: "time" },
         { title: "Location", dataKey: "location" },
         { title: "Attendee", dataKey: "attendees" },
         { title: "Fund State", dataKey: "fundState" },
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
      const topText16 = "Stray Animal Adoption and Care Platform - Event Report";
      doc.text(topText16, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

      doc.setFontSize(12)
      const topText14 = "Report Generated: " + new Date().toLocaleString();
      doc.text(topText14, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      doc.autoTable({
         head: [headers],
         margin: { top: 30 },
         body: data,
      });

      doc.save("event_table.pdf");
   }

   const handleAttendees = (eventId) => {
      fetch(APP_URL + `/api/eventAttend/event/${eventId}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setAttendData(data);
            setIsAttendModalOpen(true);

         });
   }

   const handleFundRequest = () => {
      fetch(APP_URL + `/api/event/state/NONE`)
         .then((res) => res.json())
         .then((data) => {
            setFundAmount(0);
            setFundingEvents([]);
            setFundRequestEvents(data);
            setIsFundRequestModalOpen(true);
         });

   }

   const handleSearch = async () => {
      let filteredData = eventData;
      const filterState = document.getElementById("filterState").value;
      const filterFundState = document.getElementById("filterFundState").value;
      const filterLocation = document.getElementById("filterLocation").value;
      const search = document.getElementById("search").value;
      if (filterState !== '') {
         filteredData = filteredData.filter((event) => event.state === filterState);
         console.log(filterState);
         console.log(filteredData);
      }
      if (filterFundState !== '') {
         filteredData = filteredData.filter((event) => event.fundState === filterFundState);
      }
      if (filterLocation !== '') {
         filteredData = filteredData.filter((event) => event.location.toLowerCase().includes(filterLocation.toLowerCase()));
      }
      if (search !== '') {
         filteredData = filteredData.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()) || event.description.toLowerCase().includes(search.toLowerCase()) || event.date.toLowerCase().includes(search.toLowerCase()) || event.time.toLowerCase().includes(search.toLowerCase()) || event.location.toLowerCase().includes(search.toLowerCase()) || event.fundState.toLowerCase().includes(search.toLowerCase()) || event.state.toLowerCase().includes(search.toLowerCase()));
      }
      setFilteredData(filteredData);
   }

   const handleEventSelect = (e, id) => {
      if (e.target.checked) {
         fundingEvents.push({ _id: id });
      } else {
         const index = fundingEvents.findIndex((item) => item._id === id);
         fundingEvents.splice(index, 1);
      }
   }

   const handleFundRequestSubmit = async () => {
      if (fundingEvents.length === 0) {
         toast.error("Please select at least one event");
         return;
      }
      const events = fundingEvents.map((item) => item._id).join(',');
      if (fundAmount <= 0) {
         toast.error("Please enter a valid amount");
         return;
      }
      await fetch(APP_URL + `/api/eventFundRequest`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            events: events,
            fundAmount: fundAmount,
         })
      }).then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.error) {
               toast.error(data.message);
            } else {
               toast.success("Fund request submitted successfully");
               setIsFundRequestModalOpen(false);
               fetchEvents();
            }
         });
   }

   return (

      <div className="p-10">
         <h1 className="text-2xl font-bold">Manage Events</h1>
         <div className="flex space-x-3">
            <button onClick={() => navigate("/admin/event/add")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Add Event</button>
            <button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Download PDF</button>
            <button onClick={handleFundRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 flex items-center"><HiPlus className="mr-3" /> Make A Fund Request</button>
         </div>

         <div className="flex justify-between space-x-10 bg-slate-100 p-3 mb-3 border border-slate-400">
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
               <label htmlFor="filterFundState" className="text-sm font-medium mr-3">Filter by Fund State:</label>
               <select id="filterFundState" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
                  <option value="">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
               </select>
            </div>
            <div>
               <label htmlFor="filterLocation" className="text-sm font-medium mr-3">Filter by Location:</label>
               <select id="filterLocation" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()}>
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
               <input id="search" type="text" placeholder="Search everyware" className="border border-gray-300 rounded-md px-2 py-1" onChange={() => handleSearch()} />
            </div>
         </div>
         <table className="w-full">
            <thead>
               <tr>
                  <th className="border px-4 py-1 bg-slate-400">Event Name</th>
                  <th className="border px-4 py-1 bg-slate-400  w-[500px]">Description</th>
                  <th className="border px-4 py-1 bg-slate-400">Date</th>
                  <th className="border px-4 py-1 bg-slate-400">Time</th>
                  <th className="border px-4 py-1 bg-slate-400">Location</th>
                  <th className="border px-4 py-1 bg-slate-400">Attendee</th>
                  <th className="border px-4 py-1 bg-slate-400">Fund State</th>
                  <th className="border px-4 py-1 bg-slate-400">State</th>
                  <th className="border px-4 py-1 bg-slate-400">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((event) => (
                  <tr key={event._id} className="bg-white">
                     <td className="border px-4 py-1 text-sm">{event.name}</td>
                     <td className="border px-4 py-1 text-sm" onClick={() => handleToggleDescription(event)}>
                        {event.descriptionToggle ? event.description : event.description.substring(0, 40) + '...'}
                     </td>
                     <td className="border px-4 py-1 text-sm">{event.date}</td>
                     <td className="border px-4 py-1 text-sm">{event.time}</td>
                     <td className="border px-4 py-1 text-sm">{event.location}</td>
                     <td className="border px-4 py-1 text-sm flex justify-between">{event.attendees}  {event.attendees > 0 && <TbListDetails onClick={() => handleAttendees(event._id)} size={20} className="mr-4 hover:cursor-pointer" />}</td>
                     <td className="border px-4 py-1 text-sm">{event.fundState}</td>
                     <td className="border px-4 py-1 text-sm">{event.state}</td>
                     <td className="border px-4 py-1 ">
                        <div className="flex justify-center">
                           <TbListDetails onClick={() => handleView(event._id)} size={20} className="mr-4 hover:cursor-pointer" />
                           <HiPencilAlt onClick={() => handleEdit(event._id)} size={20} className="mr-4 hover:cursor-pointer" />
                           <HiTrash onClick={() => handleDelete(event._id)} size={20} className="hover:cursor-pointer" />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <Modal isOpen={isAttendModalOpen} onRequestClose={() => setIsAttendModalOpen(false)} className="modal empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className=" bg-sky-200 p-3 rounded-lg shadow-[2px_2px_2px_1px_#0004]">
               <h2 className="text-center text-lg font-bold">Attendee Information</h2>
               <table className="w-full">
                  <thead>
                     <tr>
                        <th className="border px-4 py-1 bg-slate-400">Name</th>
                        <th className="border px-4 py-1 bg-slate-400">Email</th>
                        <th className="border px-4 py-1 bg-slate-400">Mobile</th>
                     </tr>
                  </thead>
                  <tbody>
                     {attendData.map((attend) => (
                        <tr key={attend._id} className="bg-white">
                           <td className="border px-4 py-1 text-sm">{attend.name}</td>
                           <td className="border px-4 py-1 text-sm">{attend.email}</td>
                           <td className="border px-4 py-1 text-sm">{attend.mobile}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Modal>
         <Modal isOpen={isFundRequestModalOpen} onRequestClose={() => setIsFundRequestModalOpen(false)} className="modal lg empty" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
            <div className=" bg-sky-200 p-3 rounded-lg shadow-[2px_2px_2px_1px_#0004]">
               <h2 className="text-center text-lg font-bold mb-4">Fund Requesting for Events</h2>
               <table className="w-full mb-4">
                  <thead>
                     <tr>
                        <th className="border px-4 py-1 bg-slate-400">Check</th>
                        <th className="border px-4 py-1 bg-slate-400">Event Name</th>
                        <th className="border px-4 py-1 bg-slate-400">Event Id</th>
                     </tr>
                  </thead>
                  <tbody>
                     {fundRequestEvents.map((item) => (
                        <tr key={item._id} className="bg-white">
                           <td className="border px-4 py-1 text-sm"><input type="checkbox" onChange={(e) => handleEventSelect(e, item._id)} /></td>
                           <td className="border px-4 py-1 text-sm">{item.name}</td>
                           <td className="border px-4 py-1 text-sm">{item._id}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="flex items-center mb-4">
                  <div className="w-[200px] text-sm font-semibold leading-4">Fund Amount</div>
                  <div className="w-[10px] px-5">:</div>
                  <input type="number" className="w-full p-2 text-sm" onChange={(e) => setFundAmount(e.target.value)} />
               </div>
               <div className="text-right">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFundRequestSubmit}>Submit</button>
               </div>
            </div>
         </Modal>
         <ToastContainer />
      </div>
   );
}

export default EventManage;