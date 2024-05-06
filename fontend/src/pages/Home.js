import React from "react";

import AnimalImage from "../assets/animal-image.jpg";
import EventImage from "../assets/event-image.jpg";
import backgroundImage from "../assets/background-1.webp";

function Home() {
   return (
      <div>
         <section className="" style={{
            backgroundImage: `url(${backgroundImage}`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundAttachment: 'fixed',
            minHeight: 'calc(100vh - 46px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
         }}>
            <div className="text-center w-full  p-4 text-white">
               <h2 className="text-5xl font-semibold mb-4 ">Welcome to Our Organization</h2>
               <p className="text-lg mb-4">Welcome to our animal adoption site! At our organization, we're passionate about connecting loving homes with animals in need. Our platform serves as a hub for individuals who are eager to make a positive impact in the lives of animals.</p>
            </div>
         </section >


         <section className="container mx-auto px-4 mb-12">
            <div className="flex items-center">
               <div className="w-2/5">
                  <img src={AnimalImage} alt="Animal" className="rounded-lg mb-4" />
               </div>

               <div className="w-3/5 text-center p-10">
                  <h2 className="text-2xl font-semibold mb-4">Adopt an Animal</h2>
                  <p className="text-lg mb-4">Explore our adoption gallery filled with a diverse array of lovable companions eagerly awaiting their second chance at happiness. Whether you're drawn to the playful energy of a puppy, the gentle purrs of a kitten, or the loyal companionship of a mature dog or cat, you'll find your perfect match here.</p>
                  <p className="text-lg mb-4">Our adoption process is designed to ensure the best possible fit between pet and adopter, with guidance and support every step of the way. From initial meet-and-greets to post-adoption resources, we're here to make the transition as smooth as possible for both you and your new furry friend.</p>
                  <a href="/animal" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-900  mt-5 block w-fit mx-auto">View Animals</a>
               </div>
            </div>
         </section>

         <section className="container mx-auto px-4 mb-12">
            <div className="flex items-center">
               <div className="w-3/5 text-center  p-10">
                  <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                  <p className="text-lg mb-4">Join us in celebrating the love and joy that animals bring to our lives at our upcoming events! From adoption drives to community outreach programs, our calendar is filled with opportunities to connect with adorable pets in need of loving homes.
                  </p>
                  <p>Whether you're a seasoned pet parent or considering adding a furry friend to your family, our events offer something for everyone. Meet lovable animals waiting to find their forever homes, connect with fellow animal lovers, and learn about responsible pet ownership.</p>
                  <a href="/events" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-900 mt-5 block w-fit mx-auto">View Our Events</a>
               </div>
               <div className="w-2/5">
                  <img src={EventImage} alt="Animal" className="rounded-lg mb-4" />
               </div>
            </div>
         </section>

         <section className="container mx-auto text-center pb-52 px-28">
            <h2 className="text-3xl font-semibold mb-4">Become a Volunteer</h2>
            <p className="text-lg mb-4">Whether you're passionate about walking dogs, socializing cats, assisting with adoption events, or lending a hand behind the scenes, there's a rewarding volunteer opportunity waiting for you. No matter your skill level or availability, there's a role that fits your interests and schedule.</p>
            <p className="text-lg mb-4">As a volunteer, you'll have the opportunity to make a tangible impact on the lives of animals, forging connections that will warm your heart and theirs. Join us in creating a brighter future for animals in need and experience the joy of giving back to your community.</p>
            <a href="/volunteer" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-900 mt-5 block w-fit mx-auto">Be A Volunteer</a>
         </section>
      </div >
   );
}

export default Home;