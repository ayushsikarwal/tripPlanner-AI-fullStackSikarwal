import React, { useState } from "react";
import { Shield, Utensils, Calendar, Clock } from "lucide-react";
import FinalBookingComponentForHotels from "./FinalBookingComponentForHotels";

function FinalBookingCardHotel({ roomData, paxRooms, tripId }) {
    const[form, setForm]  = useState(false)
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">{roomData.Name[0]}</h3>
              {roomData.RoomPromotion[0] && (
                <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
                  {roomData.RoomPromotion[0]}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Total Price</div>
              <div className="text-2xl font-bold">${roomData.TotalFare.toFixed(2)}</div>
              <div className="text-sm text-blue-200">
                incl. ${roomData.TotalTax.toFixed(2)} taxes
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <Utensils className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">
                {roomData.MealType.replace("_", " ")}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">
                {roomData.IsRefundable ? "Refundable" : "Non-Refundable"}
              </span>
            </div>
          </div>

          {/* Night Rates */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Per Night Rates
            </h4>
            <div className="flex flex-wrap gap-2">
              {roomData.DayRates[0].map((rate, index) => (
                <div
                  key={index}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium"
                >
                  ${rate.BasePrice.toFixed(2)}
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Cancellation Policy
            </h4>
            <div className="space-y-2">
              {roomData.CancelPolicies.map((policy, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <span className="text-gray-600">{policy.FromDate}</span>
                  {policy.CancellationCharge > 0 ? (
                    <span className="text-red-500 font-medium">
                      ${policy.CancellationCharge.toFixed(2)} charge
                    </span>
                  ) : (
                    <span className="text-green-500 font-medium">
                      Free cancellation
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Book Now Button */}
          <button onClick={()=>{setForm(true)}} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg">
            Book Now
          </button>
        </div>
              {form ?<><FinalBookingComponentForHotels tripId={tripId} paxRooms={paxRooms} roomData={roomData} /></>:<></>}

      </div>
    </div>
  );
}

export default FinalBookingCardHotel;