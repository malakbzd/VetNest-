import React from "react";
import { GiDogHouse, GiSittingDog, GiDogBowl } from "react-icons/gi";
import { FaUserMd, FaPaw, FaTruck } from "react-icons/fa";

const petServices = [
  {
    icon: <GiDogHouse size={40} />,
    title: "Pet Boarding",
    desc: "Safe and comfortable home for your pets when you're away.",
  },
  {
    icon: <FaUserMd size={40} />,
    title: "Vet Consultation",
    desc: "Expert vet support for your pet's health & wellness.",
  },
  {
    icon: <GiDogBowl size={40} />,
    title: "Pet Food Delivery",
    desc: "Nutritious food & treats delivered to your doorstep.",
  },
  {
    icon: <GiSittingDog size={40} />,
    title: "Pet Training",
    desc: "Professional training to keep your pet well-behaved.",
  },
  {
    icon: <FaPaw size={40} />,
    title: "Grooming Services",
    desc: "Bathing, trimming & pampering sessions for your furry friend.",
  },
  {
    icon: <FaTruck size={40} />,
    title: "Quick Delivery",
    desc: "Fast, hassle-free service at your convenience.",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-6 md:px-14 bg-[#f5eee6]">
      <h2 className="text-3xl font-bold text-center text-[#6B4226] mb-4">
        Our Pet Services
      </h2>
      <p className="text-center text-[#8d674a] max-w-xl mx-auto mb-12">
        We care for your pets like family. Explore our range of trusted pet care services designed for their happiness & your peace of mind.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {petServices.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-[#e0d3c0]"
          >
            <div className="text-[#A0522D] mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-[#6B4226] mb-2">
              {service.title}
            </h3>
            <p className="text-[#5c4433]">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;