import React from "react";
import { useNavigate } from "react-router-dom";

function SightSeeingSearchCard({ data }) {
  const navigate = useNavigate();
  const handleNavigation = (resultIndex) => {
    window.open(`/sightSeeingInfo/${resultIndex}`, "_blank");
  };

  return (
    <div className="p-6 flex flex-col mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Explore Sightseeing Tours
      </h1>
      {data?.SightseeingSearchResults?.map((item) => (
        <div
          key={item.ResultIndex}
          className="flex mx-auto w-[1100px] items-center border border-gray-300 rounded-3xl my-5 p-5 gap-6 shadow-md bg-white overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
          //   onClick={() => handleNavigation(item.SightseeingCode)}
        >
          <div className="relative w-[500px] h-[300px] flex items-center justify-center">
            <img
              src={item.ImageList[0]}
              alt={item.SightseeingName}
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <div className="flex-1 text-left space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {item.SightseeingName}
            </h2>
            <p
              className="text-gray-500 text-sm"
              dangerouslySetInnerHTML={{ __html: item.TourSummary }}
            ></p>

            <p className="text-gray-700 mt-2 font-semibold">
              Duration: {item.DurationDescription[0].TotalDuration}
            </p>
            <p className="text-indigo-600 font-extrabold text-lg mt-3">
              {item.Price.CurrencyCode} {item.Price.OfferedPriceRoundedOff}/- person
            </p>
            <div className="flex space-x-4 mt-3">
              <button
                className="px-4 py-2 border border-black rounded-lg text-black hover:bg-gray-100 transition"
                onClick={(e) => {
                  //   e.stopPropagation();
                  handleNavigation(item.ResultIndex);
                }}
              >
                View Details
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation(item.ResultIndex);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SightSeeingSearchCard;
