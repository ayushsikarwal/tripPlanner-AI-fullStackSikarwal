import React from "react";

const HotelRoomCard = ({ room }) => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white px-5 py-3 flex justify-between items-center">
        <h3 className="text-lg font-semibold">{room.Name[0]}</h3>
        <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
          {room.RoomPromotion[0]}
        </span>
      </div>

      {/* Room Details */}
      <div className="p-5">
        {/* Booking Code */}
        <div className="text-gray-500 text-sm mb-2">
          <span className="font-semibold">Booking Code:</span> {room.BookingCode}
        </div>

        {/* Price Details */}
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div>
            <span className="text-gray-600">Total Fare:</span>
            <h2 className="text-2xl font-bold text-blue-600">${room.TotalFare.toFixed(2)}</h2>
          </div>
          <div>
            <span className="text-gray-600">Taxes:</span>
            <h2 className="text-lg font-medium text-red-500">${room.TotalTax.toFixed(2)}</h2>
          </div>
        </div>

        {/* Day Rates */}
        <div className="mb-3">
          <h4 className="font-semibold text-gray-700">Per Night Rates:</h4>
          <div className="flex gap-2">
            {room.DayRates[0].map((rate, index) => (
              <span
                key={index}
                className="text-gray-700 bg-gray-100 px-3 py-1 rounded-lg text-sm"
              >
                ${rate.BasePrice.toFixed(2)}
              </span>
            ))}
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mb-3">
          <h4 className="font-semibold text-gray-700">Cancellation Policy:</h4>
          {room.CancelPolicies.map((policy, index) => (
            <div
              key={index}
              className="text-sm bg-gray-100 px-3 py-2 rounded-lg mb-2"
            >
              <span className="font-medium">{policy.FromDate}</span> -{" "}
              {policy.CancellationCharge > 0 ? (
                <span className="text-red-500">
                  ${policy.CancellationCharge.toFixed(2)} Charge
                </span>
              ) : (
                <span className="text-green-600">Free Cancellation</span>
              )}
            </div>
          ))}
        </div>

        {/* Extra Details */}
        <div className="flex justify-between text-gray-600 text-sm">
          <span>
            <strong>Meal Type:</strong> {room.MealType.replace("_", " ")}
          </span>
          <span>
            <strong>{room.IsRefundable ? "Refundable" : "Non-Refundable"}</strong>
          </span>
        </div>

        {/* Footer */}
        <div className="mt-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Sample Usage
const App = () => {
  const roomData = {
    Name: ["Superior Room, 1 Queen Bed, Non-Smoking"],
    BookingCode: "1407362!TB!1!TB!2b066974-c504-4bbe-a40b-17aff9d53767",
    Inclusion: "Room Only",
    DayRates: [[{ BasePrice: 667.3 }, { BasePrice: 667.3 }]],
    TotalFare: 1592.26,
    TotalTax: 257.66,
    RoomPromotion: ["Member’s exclusive price"],
    CancelPolicies: [
      { FromDate: "13-02-2025 00:00:00", ChargeType: "Fixed", CancellationCharge: 796.13 },
      { FromDate: "06-02-2025 00:00:00", ChargeType: "Fixed", CancellationCharge: 0.0 },
    ],
    MealType: "Room_Only",
    IsRefundable: true,
    WithTransfers: false,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <HotelRoomCard room={roomData} />
    </div>
  );
};

export default App;
