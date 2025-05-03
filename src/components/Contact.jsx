import React from "react";
import { motion } from "framer-motion";
import complaintpic from "../assets/complaints.jpg";
import Button from "./Button";

const Complaints = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-32">
      <div className="relative w-full py-16 px-6 lg:px-24 bg-gray-100 mb-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={complaintpic}
            alt="Complaint Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="relative z-10 p-8 md:p-14 lg:p-16 text-white rounded-lg shadow-lg bg-black/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Content Section */}
            <div className="md:w-3/5">
              <h2 className="text-4xl font-bold leading-snug">
                Country-specific Assistance
              </h2>
              <p className="mt-4 text-lg leading-relaxed">
                Need help related to a specific country? Whether it's about data accuracy,
                flags, capital info, or regional groupings, our support team is ready to
                guide you. We aim to ensure each country's information is up to date and helpful.
              </p>
              <p className="mt-2 text-lg">
                For corrections, questions, or contributions, don’t hesitate to reach out.
                We're building a global platform, and your feedback makes it better!
              </p>

              {/* Contact Us Button with mailto */}
              <a
                href="mailto:it22927316@my.sliit.lk?subject=Country Data Support"
                className="inline-block mt-6"
              >
                <Button
              id="Contact Us"
              title="Contact Us"
              containerClass="bg-yellow-300 flex-center gap-1"
              />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
