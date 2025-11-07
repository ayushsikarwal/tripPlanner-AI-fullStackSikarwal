import React from "react";

export const JEffortless = () => {
  return (
    <div>
      <div className="w-full mt-10 max-w-7xl mx-auto flex items-center justify-between gap-8 p-8 bg-white">
        <div className="w-1/2 flex flex-col gap-6">
          <p className="text-sm uppercase tracking-wider font-bold text-[#2664eb]">Plan</p>
          <h1 className="text-4xl font-helvetica font-bold">
            Effortless Trip Planning with Drag-and-Drop
          </h1>
          <p className="text-gray-600 font-helvetica leading-relaxed">
            Our drag-and-drop scheduling feature revolutionizes how you plan
            group tours. Easily customize your itinerary by moving activities
            around, ensuring a perfect fit for everyone's preferences.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-600">
                🗓️
              </span>
              <span className="font-helvetica">
                Simplify your travel planning with ease and flexibility.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-600">
                🧑‍🤝‍🧑
              </span>
              <span className="font-helvetica">Collaborate in real-time with your travel companions.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-600">
                🗺️
              </span>
              <span className="font-helvetica">
                Create personalized itineraries that suit every traveler.
              </span>
            </li>
          </ul>
          {/* <div className="flex gap-4 mt-4">
            <button className="px-6 py-2 font-helvetica border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
              Learn More
            </button>
            <button className="px-6 py-2 font-helvetica rounded-full bg-blue-600 text-white  flex items-center gap-2 hover:bg-blue-700 transition-colors duration-200">
              Sign Up
            </button>
          </div> */}
        </div>
        <div className="w-1/2 bg-gray-200 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3"
            alt="Travel Planning Illustration"
            className="w-full h-[440px]  object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};
