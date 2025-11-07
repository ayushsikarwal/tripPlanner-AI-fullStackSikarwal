import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";

function SightSeeingInfoPage() {
  const { resultIndex } = useParams();
  const [detailOfSight, setDetailsOfSight] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    const fetchDataOfPage = async () => {
      const response = await axios.post(
        "http://localhost:5001/api/get-availability",
        {
          resultIndex: resultIndex,
        }
      );

      console.log(response.data);
      setDetailsOfSight(response.data);
    };

    fetchDataOfPage();
  }, [resultIndex]);

  if (!detailOfSight) {
    return <div>SightSeeingInfoPage</div>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-3xl">
      <img
        src={detailOfSight.Response.SightseeingSearchResult.ImageList[0]}
        alt={detailOfSight.Response.SightseeingSearchResult.SightseeingName}
        className="w-full h-[150] object-cover rounded-2xl"
      />
      <h1 className="text-3xl font-bold mt-5">
        {detailOfSight.Response.SightseeingSearchResult.SightseeingName}
      </h1>
      <p className="text-gray-600 mt-3">
        {detailOfSight.Response.SightseeingSearchResult.TourSummary}
      </p>
      <p className="text-gray-700 mt-3 font-medium">
        Duration:{" "}
        {
          detailOfSight.Response.SightseeingSearchResult.DurationDescription[0]
            .TotalDuration
        }
      </p>
      <p className="text-indigo-600 font-extrabold text-2xl mt-3">
        ₹
        {
          detailOfSight.Response.SightseeingSearchResult.TourPlan[0].Price
            .OfferedPriceRoundedOff
        }
      </p>
      <h2 className="text-2xl font-bold mt-5">Pricing Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {detailOfSight.Response.SightseeingSearchResult.TourPlan.map(
          (plan, index) => (
            <div
              key={index}
              className={`p-4 bg-gray-100 rounded-lg cursor-pointer border-2 transition-all ${
                selectedPlan === index ? "border-green-500" : "border-transparent"
              }`}
              onClick={() => setSelectedPlan(index)}
            >
              <p className="text-lg font-semibold">
                ₹{plan.Price.OfferedPriceRoundedOff} / person
              </p>
              <p className="text-gray-700">{plan.SpecialItem[0]}</p>
              <p className="text-gray-500 text-sm">
                Cancellation by: {plan.LastCancellationDate}
              </p>
            </div>
          )
        )}
      </div>
      <h2 className="text-2xl font-bold mt-5">Itinerary</h2>
      <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: detailOfSight.Response.SightseeingSearchResult.TourDescription }}>
      </p>
      <h2 className="text-2xl font-bold mt-5">Additional Information</h2>
      <p className="text-gray-600 mt-2">
        {detailOfSight.Response.SightseeingSearchResult.AdditionalInformation}
      </p>
      <h2 className="text-2xl font-bold mt-5">Inclusions</h2>
      <p className="text-gray-600 mt-2">
        {detailOfSight.Response.SightseeingSearchResult.Inclusions}
      </p>
      <button className="mt-5 w-full bg-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-600">
        Book Now
      </button>
    </div>
  );
}

export default SightSeeingInfoPage;
