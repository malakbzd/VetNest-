import React from "react";
import img from "../assets/About.png"; // Replace with your image path

const AboutUs = () => {
  return (
    <section className="bg-[#fdf7f2] py-20 px-6 md:px-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-[#5A3B1F] mb-6">
            About Scooby
          </h2>
          <p className="text-[#6b4a2e] text-lg leading-relaxed mb-4">
            At <span className="font-semibold">Scooby</span>, we believe that
            pets aren't just animals — they're family. That's why we built a
            platform that delivers trusted, loving, and professional pet care
            services to your doorstep.
          </p>
          <p className="text-[#7d5b40] text-base">
            Whether it's a grooming session, a vet consultation, or simply a
            delicious treat — we ensure your pet gets the best. Founded by true
            animal lovers, our mission is to make every pet feel healthy, happy,
            and loved.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={img}
            alt="About Pet Milo"
            className="w-full rounded-2xl border border-[#e8d7c8] bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;