import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Is Scooby available in all cities?",
    answer:
      "Currently, we are available in major metro cities across India. We're expanding rapidly — stay tuned!",
  },
  {
    question: "Are your pets certified?",
    answer:
      "Yes! All our pets are government-registered and verified by our internal quality team.",
  },
  {
    question: "What if my pet doesn’t like the food?",
    answer:
      "No worries! We have a 3-day replacement guarantee for unused items. Your pet’s happiness is our priority.",
  },
  {
    question: "Can I cancel a subscription anytime?",
    answer:
      "Absolutely. You can manage, pause, or cancel your subscription anytime through your dashboard.",
  },
  {
    question: "How do I book a grooming session?",
    answer:
      "Just head to the Grooming section and choose a slot. Our experts will visit your home at your chosen time.",
  },
];

const FAQsAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-[#f8f1ea] py-20 px-6 md:px-14">
      <h2 className="text-4xl font-bold text-center text-[#5A3B1F] mb-4">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-[#e2d2c3] shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold"
            >
              {faq.question}
              {openIndex === index ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQsAccordion;