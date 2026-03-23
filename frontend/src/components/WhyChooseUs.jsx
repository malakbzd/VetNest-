import React from "react";
import { FaUserMd, FaRegSmile, FaTruck, FaShieldAlt } from "react-icons/fa";

const reasons = [
  {
    icon: <FaUserMd size={30} />,
    title: "Certified Vets",
    desc: "Your pet’s health is in trusted, expert hands. We connect you with verified veterinarians for every need.",
  },
  {
    icon: <FaRegSmile size={30} />,
    title: "5000+ Happy Pets",
    desc: "Thousands of wagging tails and purring friends. Trusted by pet parents across India.",
  },
  {
    icon: <FaTruck size={30} />,
    title: "Fast & Reliable Delivery",
    desc: "On-time doorstep delivery of pet food, grooming kits & accessories in 20+ cities.",
  },
  {
    icon: <FaShieldAlt size={30} />,
    title: "Safe & Verified Services",
    desc: "Background-verified staff & vet-approved products. Your pet’s safety is our priority.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-b from-[#f3eae3] to-[#fefaf6] py-20 px-6 md:px-14">
      <h2 className="text-4xl font-bold text-center text-[#5A3B1F] mb-4">
        Why Choose Scooby?
      </h2>
      <p className="text-center text-[#7c5a3b] max-w-2xl mx-auto mb-16 text-[17px]">
        At Scooby, we go beyond just pet care — we build relationships. Here's what makes us different (and your pet's favorite).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 text-center border border-[#e5d3c3] hover:shadow-2xl transition duration-300 group"
          >
            <div className="bg-[#fff1e6] w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-5 shadow-md group-hover:bg-[#dcbfa6] transition">
              <span className="text-[#8B4513]">{reason.icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-[#5A3B1F] mb-2">
              {reason.title}
            </h3>
            <p className="text-[#6b4a2e] text-sm leading-relaxed">
              {reason.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;