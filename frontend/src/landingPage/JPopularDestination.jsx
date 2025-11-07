import React from "react";

import Img1 from "/londonImg.jpg";
import Img2 from "/dubaiImg.jpg";
import Img3 from "/parisImg.jpg";

export const JPopularDestination = () => {
  return (
    <div className="font-helvetica">
      <div className="w-full p-5 mx-auto max-w-7xl">
        <header className="text-center mb-12 my-20">
          <p className="text-blue-500 font-medium mb-2">UNCOVER PLACE</p>
          <h2 className="text-3xl  font-bold mb-4">
            POPULAR DESTINATION
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
          Discover the best travel experiences with our handpicked popular trips! From breathtaking getaways to hidden gems, explore itineraries loved by travelers worldwide. Plan smarter, travel better!
          </p>
        </header>

        <div className="grid grid-cols-3 gap-8">
          <div className="w-[350px] rounded-2xl overflow-hidden relative group cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={Img2}
              alt="Venice Cathedral"
              className="w-full h-[400px] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/95 to-white/40 backdrop-blur-sm">
              <div className="space-y-2">
                <p className="text-blue-600 font-medium tracking-wide uppercase text-sm">
                  Mexico
                </p>
                <h2 className="text-gray-900 text-2xl font-bold">San Miguel</h2>
                <p className="text-gray-600">
                A charming colonial town with vibrant streets, stunning architecture, and a thriving arts scene
                </p>
                <div className="flex items-center gap-1">⭐⭐⭐</div>
              </div>
            </div>
          </div>

          <div className="w-[350px] rounded-2xl overflow-hidden relative group cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={Img1}
              alt="Venice Cathedral"
              className="w-full h-[400px] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/95 to-white/40 backdrop-blur-sm">
              <div className="space-y-2">
                <p className="text-blue-600 font-medium tracking-wide uppercase text-sm">
                  Spain
                </p>
                <h2 className="text-gray-900 text-2xl font-bold">Barcelona</h2>
                <p className="text-gray-600">
                A vibrant city known for its stunning Gaudí architecture, beaches, and lively atmosphere.
                </p>
                <div className="flex items-center gap-1">⭐⭐⭐</div>
              </div>
            </div>
          </div>

          <div className="w-[350px] rounded-2xl overflow-hidden relative group cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={Img3}
              alt="Venice Cathedral"
              className="w-full h-[400px] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/95 to-white/40 backdrop-blur-sm">
              <div className="space-y-2">
                <p className="text-blue-600 font-medium tracking-wide uppercase text-sm">
                  France
                </p>
                <h2 className="text-gray-900 text-2xl font-bold">Paris</h2>
                <p className="text-gray-600">
                The City of Light, known for its iconic Eiffel Tower, world-class art, and romantic charm.
                </p>
                <div className="flex items-center gap-1">⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
