import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./FAQsAccordion.css";

const faqs = [
  {
    question: "Is VetNest available in all cities?",
    answer:
      "Currently, VetNest services are available in Biskra, Algeria. We are working on expanding to more cities soon.",
  },
  {
    question: "How can I book a veterinary appointment?",
    answer:
      "You can book a veterinary appointment directly through our website by choosing your preferred date and time from the Vet Consultation section.",
  },
  {
    question: "Do you offer pet grooming services?",
    answer:
      "Yes! VetNest offers professional grooming services including bathing, hair trimming, nail clipping, and ear cleaning for dogs and cats.",
  },
  {
    question: "Are your veterinarians certified?",
    answer:
      "Absolutely. All our veterinarians are licensed professionals with experience in treating and caring for different types of pets.",
  },
  {
    question: "How often should I groom my pet?",
    answer:
      "Most pets benefit from grooming every 4–6 weeks, depending on their breed, coat type, and lifestyle.",
  },
  {
    question: "What should I bring to my pet’s first vet visit?",
    answer:
      "Please bring your pet’s vaccination records, any medical history if available, and a leash or carrier to ensure your pet’s safety.",
  },
];

const FAQsAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <p className="faq-subtitle">
        Got pawsitive doubts? Let's clear them out!
      </p>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              onClick={() => toggleFAQ(index)}
              className="faq-question"
            >
              {faq.question}
              <span className="faq-icon">
                {openIndex === index ? (
                  <FaChevronUp size={18} />
                ) : (
                  <FaChevronDown size={18} />
                )}
              </span>
            </button>

            {openIndex === index && (
              <div className="faq-answer">
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