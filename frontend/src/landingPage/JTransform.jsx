import React from "react";

import Img1 from "/collaborateImg.jpg";
import Img2 from "/taxiImg.jpg";
import Img3 from "/trackBudgetImg.jpg";

export const JTransform = () => {
  return (
    <div className="py-20 font-helvetica">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center pt-16 bg-white">
        <span className="text-sm font-bold text-[#2664eb]  uppercase tracking-wider mb-4">
          Plan
        </span>
        <h1 className="text-4xl font-bold text-center mb-4 max-w-2xl">
          Transform Your Group Travel Experience Effortlessly
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mb-16">
          Our itinerary planner makes group travel seamless and enjoyable.
          Collaborate in real-time, ensuring everyone's preferences are met.
        </p>

        <div className="grid grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center group">
            <div className=" w-full h-60 rounded mb-6 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
              <img
                className="rounded-lg object-cover"
                src={Img1}
                alt=""
                srcset=""
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">
              Collaborate in Real-Time with Ease
            </h2>
            <p className="text-center text-gray-600">
              Work together with your group to create the perfect itinerary.
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className=" w-full h-60 rounded mb-6 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
              <img
                className="rounded-lg object-cover"
                src={Img2}
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">
              Everything You Need in One Place
            </h2>
            <p className="text-center text-gray-600">
              Enjoy integrated booking for hotels, transport, and activities.
            </p>
          </div>

          <div className="flex flex-col items-center group">
          <div className=" w-full h-60 rounded mb-6 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
              <img className="rounded-md object-cover" src={Img3} alt="" srcset="" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">
              Track Your Budget Effortlessly
            </h2>
            <p className="text-center text-gray-600">
              Keep your travel expenses in check with our budget tracking tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
