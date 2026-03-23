import React from "react";
import heroImg from "../assets/hero.jpg"; // 👈 apna image import kar lena

const Hero = () => {
  return (
    <section className="bg-[#fff9f6] py-16 px-6 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Left Content */}
      <div className="flex-1">
        <p className="text-sm text-[#d1733d] font-medium mb-2 border-l-4 border-[#d1733d] pl-2">
          Trusted Pet Care, Tailored With Love
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1e1e1e]">
          Your <span className="text-[#ff7d4e]">Pet</span> Deserves <br /> The
          Best Family.
        </h1>
        <div className="mt-8 flex gap-4">
          <button className="bg-[#ff7d4e] text-white px-3.5 md:px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#e46637] transition">
            Make a Reservation
          </button>
          <button className="bg-[#1e1e1e] text-white px-3.5 md:px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#333] transition">
            About More
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-2/5">
        <img src={heroImg} alt="Dog" className=" rounded-full" />
      </div>
    </section>
  );
};

export default Hero;