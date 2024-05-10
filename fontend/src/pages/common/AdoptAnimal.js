import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "../../contexts/UserContext";
import { APP_URL } from '../../config';

function AdoptAnimal() {
   const navigate = useNavigate();

   const { user } = useUser();

   const [applicant_name, setApplicantName] = useState("");
   const [spouse_name, setSpouseName] = useState("");
   const [applicant_occupation, setApplicantOccupation] = useState("");
   const [spouse_occupation, setSpouseOccupation] = useState("");
   const [email, setEmail] = useState("");
   const [address, setAddress] = useState("");
   const [phone, setPhone] = useState("");
   const [cell, setCell] = useState("");
   const [no_of_children, setNoOfChildren] = useState("");
   const [no_of_adults, setNoOfAdults] = useState("");
   const [animal_cruelty, setAnimalCruelty] = useState("");
   const [animal_cruelty_explanation, setAnimalCrueltyExplanation] = useState("");
   const [housing_type, setHousingType] = useState(""); // own , rent
   const [live_in, setLiveIn] = useState(""); // house, apartment, condo, other
   const [housing_time, setHousingTime] = useState(""); // years
   const [pet_location_when_you_out, setPetLocationWhenYouOut] = useState(""); // inside, outside, other
   const [fence_description, setFenceDescription] = useState("");
   const [not_allowed_pet_explanation, setNotAllowedPetExplanation] = useState("");
   const [traveling_often, setTravelingOften] = useState("");
   const [pet_when_travel, setPetWhenTravel] = useState("");
   const [applicant_work_time, setApplicantWorkTime] = useState("");
   const [spouse_work_time, setSpouseWorkTime] = useState("");
   const [household_person_explanation, setHouseholdPersonExplanation] = useState("");
   const [pet_location, setPetLocation] = useState("");
   const [pet_location_explanation, setPetLocationExplanation] = useState("");

   const [animalId, setAnimalId] = useState("");

   useEffect(() => {
      setAnimalId(window.location.pathname.split("/")[2]);
   }, []);

   const handleAdd = async () => {
      if (!applicant_name || !spouse_name || !applicant_occupation || !spouse_occupation || !email || !address || !phone || !cell || !no_of_children || !no_of_adults || !animal_cruelty || !animal_cruelty_explanation || !housing_type || !live_in || !housing_time || !pet_location_when_you_out || !fence_description || !not_allowed_pet_explanation || !traveling_often || !pet_when_travel || !applicant_work_time || !spouse_work_time || !household_person_explanation || !pet_location || !pet_location_explanation) {
         toast.error("Please fill in all fields");
         return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         toast.error("Please enter a valid email address");
         return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
         toast.error("Please enter a valid phone number");
         return;
      }
      const cellRegex = /^\d{10}$/;
      if (!cellRegex.test(cell)) {
         toast.error("Please enter a valid cell number");
         return;
      }
      const noOfChildrenRegex = /^\d+$/;
      if (!noOfChildrenRegex.test(no_of_children)) {
         toast.error("Please enter a valid number for the number of children");
         return;
      }
      const noOfAdultsRegex = /^\d+$/;
      if (!noOfAdultsRegex.test(no_of_adults)) {
         toast.error("Please enter a valid number for the number of adults");
         return;
      }

      await fetch(APP_URL + `/api/adoption`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            applicant_name,
            spouse_name,
            applicant_occupation,
            spouse_occupation,
            email,
            address,
            phone,
            cell,
            no_of_children,
            no_of_adults,
            animal_cruelty,
            animal_cruelty_explanation,
            housing_type,
            live_in,
            housing_time,
            pet_location_when_you_out,
            fence_description,
            not_allowed_pet_explanation,
            traveling_often,
            pet_when_travel,
            applicant_work_time,
            spouse_work_time,
            household_person_explanation,
            pet_location,
            pet_location_explanation,
            animal: animalId,
            user: user.id
         })
      }).then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.error) {
               toast.error(data.message);
            } else {
               navigate("/animal");
            }
         });
   }

   return (
      <div className="p-10" style={{
         backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg-2.jpg)`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundAttachment: 'fixed'
      }}>
         <div className="w-[1000px] m-auto p-4 mb-2 rounded-lg" style={{ background: '#0007', backdropFilter: `blur(8px)` }}>
            <div className="text-xl text-white font-bold">Personal Information</div>
         </div>
         <div className="w-[1000px] m-auto py-4 px-2 rounded-lg mb-8 " style={{ background: '#0007', backdropFilter: `blur(8px)` }}>
            <div className="flex mb-2">
               <div className="w-2/3 mx-2">
                  <label className="block text-sm text-white font-[600]">Applicant Name</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={applicant_name} onChange={(e) => setApplicantName(e.target.value)} />
               </div>
               <div className="w-1/3 mx-2">
                  <label className="block text-sm text-white font-[600]">Applicant Occupation</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={applicant_occupation} onChange={(e) => setApplicantOccupation(e.target.value)} />
               </div>
            </div>
            <div className="flex mb-2">
               <div className="w-2/3 mx-2">
                  <label className="block text-sm text-white font-[600]">Spouse Name</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={spouse_name} onChange={(e) => setSpouseName(e.target.value)} />
               </div>
               <div className="w-1/3 mx-2">
                  <label className="block text-sm text-white font-[600]">Spouse Occupation</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={spouse_occupation} onChange={(e) => setSpouseOccupation(e.target.value)} />
               </div>
            </div>
            <div className="flex mb-2">
               <div className="w-1/2 mx-2">
                  <label className="block text-sm text-white font-[600]">Email</label>
                  <input type="email" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="w-1/2 mx-2">
                  <label className="block text-sm text-white font-[600]">Address</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={address} onChange={(e) => setAddress(e.target.value)} />
               </div>
            </div>
            <div className="flex mb-2">
               <div className="w-1/2 mx-2">
                  <label className="block text-sm text-white font-[600]">Phone</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
               </div>
               <div className="w-1/2 mx-2">
                  <label className="block text-sm text-white font-[600]">Cell</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={cell} onChange={(e) => setCell(e.target.value)} />
               </div>
            </div>
            <div className="flex mb-2">
               <div className="w-1/2 mx-2">
                  <label className="block text-sm text-white font-[600]">No of Children</label>
                  <input type="number" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={no_of_children} onChange={(e) => setNoOfChildren(e.target.value)} />
               </div>
               <div className="w-1/2 mx-2">
                  <label className="block text-sm text-white font-[600]">No of Adults</label>
                  <input type="number" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={no_of_adults} onChange={(e) => setNoOfAdults(e.target.value)} />
               </div>
            </div>

            <div className="flex mb-2">
               <div className="w-1/5 mx-2">
                  <label className="block text-sm text-white font-[600]">Animal Cruelty</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={animal_cruelty} onChange={(e) => setAnimalCruelty(e.target.value)} />
               </div>
               <div className="w-4/5 mx-2">
                  <label className="block text-sm text-white font-[600]">Animal Cruelty Explanation</label>
                  <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={animal_cruelty_explanation} onChange={(e) => setAnimalCrueltyExplanation(e.target.value)} />
               </div>
            </div>
         </div>
         <div className="w-[1000px] m-auto p-4 mb-2 rounded-lg" style={{ background: '#0007', backdropFilter: `blur(8px)` }}>
            <div className="text-xl text-white font-bold">Housing Information</div>
         </div>
         <div className="w-[1000px] m-auto p-4 mb-8 grid grid-cols-3 gap-2 rounded-lg" style={{ background: '#0007', backdropFilter: `blur(8px)` }}>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Housing Type</label>
               <select className="border px-2 w-full rounded-md h-[33px] " style={{ background: '#fdfdfd' }} value={housing_type} onChange={(e) => setHousingType(e.target.value)}>
                  <option value="">-- Select Housing Type --</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
               </select>
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Live In</label>
               <select className="border px-2 w-full rounded-md h-[33px] " style={{ background: '#fdfdfd' }} value={live_in} onChange={(e) => setLiveIn(e.target.value)}>
                  <option value="">-- Select Live In --</option>
                  <option value="Home">Home</option>
                  <option value="Other">Other</option>
               </select>
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Housing Time</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={housing_time} onChange={(e) => setHousingTime(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Pet Location When You Out</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={pet_location_when_you_out} onChange={(e) => setPetLocationWhenYouOut(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Fence Description</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={fence_description} onChange={(e) => setFenceDescription(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Not Allowed Pet Explanation</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={not_allowed_pet_explanation} onChange={(e) => setNotAllowedPetExplanation(e.target.value)} />
            </div>
         </div>
         <div className="w-[1000px] m-auto p-4 mb-2 rounded-lg" style={{ background: '#0007', backdropFilter: `blur(8px)` }}>
            <div className="text-xl text-white font-bold">Availability Information</div>
         </div>
         <div className="w-[1000px] m-auto p-4 grid grid-cols-3 gap-2 rounded-lg mb-8" style={{ background: '#0007', backdropFilter: `blur(8px)` }}>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Traveling Often</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={traveling_often} onChange={(e) => setTravelingOften(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Pet When Travel</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={pet_when_travel} onChange={(e) => setPetWhenTravel(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Applicant Work Time</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={applicant_work_time} onChange={(e) => setApplicantWorkTime(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Spouse Work Time</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={spouse_work_time} onChange={(e) => setSpouseWorkTime(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Household Person Explanation</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={household_person_explanation} onChange={(e) => setHouseholdPersonExplanation(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Pet Location</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={pet_location} onChange={(e) => setPetLocation(e.target.value)} />
            </div>
            <div className="w-full">
               <label className="block text-sm text-white font-[600]">Pet Location Explanation</label>
               <input type="text" className="border p-1 w-full rounded-md" style={{ background: '#fdfdfd' }} value={pet_location_explanation} onChange={(e) => setPetLocationExplanation(e.target.value)} />
            </div>
         </div>
         <div className="w-[1000px] m-auto">
            <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Submit The Adoption Form</button>
         </div>
         <ToastContainer />
      </div >

   );
}

export default AdoptAnimal;