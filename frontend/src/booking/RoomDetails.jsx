import { db } from "@/services/firebaseConfig";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  PlusCircle,
  Search,
  Star,
  Trash2,
  Users,
  Baby as Child, 
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinalBookingCardHotel from "./FinalBookingCardHotel";
import Header from "@/components/ui/custom/Header";

function RoomDetails() {
  const { hotelId, tripId } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [paxRooms, setPaxRooms] = useState([
    {
      Adults: 1,
      Children: 0,
      ChildrenAges: [],
    },
  ]);
  //   const { tripId } = useParams(); // Get tripId from URL
  const [trip, setTrip] = useState(null); // State for trip data

  // Fetch the trip data
  // First effect - fetch trip data
  useEffect(() => {
    const fetchTripData = async () => {
      if (!tripId) return;

      try {
        const docRef = doc(db, "AITrip", tripId);
        const snapDoc = await getDoc(docRef);

        if (snapDoc.exists()) {
          setTrip(snapDoc.data());
          console.log("Trip data loaded:", snapDoc.data());
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchTripData();
  }, [tripId]);

  // Second effect - fetch hotel data
  useEffect(() => {
    const fetchHotelData = async () => {
      if (!hotelId) return;

      try {
        const response = await axios.post(
          "http://localhost:5001/api/hotel-detail",
          { code: hotelId }
        );

        if (response.data?.HotelDetails?.length > 0) {
          setHotel(response.data.HotelDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  // Third effect - fetch rooms data only when we have both hotel and trip data
  useEffect(() => {
    const fetchRoomsData = async () => {
      if (
        !hotelId ||
        !trip?.tripChoices?.inDate ||
        !trip?.tripChoices?.outDate
      ) {
        console.log("Waiting for required data...", {
          hotelId,
          inDate: trip?.tripChoices?.inDate,
          outDate: trip?.tripChoices?.outDate,
        });
        return;
      }

      try {
        const [inDate, inMonth, inYear] = trip.tripChoices.inDate.split("-");
        const [outDate, outMonth, outYear] =
          trip.tripChoices.outDate.split("-");

        const formattedInDate = `${inYear}-${inMonth}-${inDate}`;
        const formattedOutDate = `${outYear}-${outMonth}-${outDate}`;

        console.log(
          "Fetching rooms with dates:",
          formattedInDate,
          formattedOutDate
        );

        const response = await axios.post(
          "http://localhost:5001/api/rooms-detail",
          {
            code: hotelId,
            inDate: formattedInDate,
            outDate: formattedOutDate,
            PaxRooms: paxRooms,
          }
        );

        setRooms(response.data);
        console.log("room details --> ", response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRoomsData();
  }, [hotelId, trip, paxRooms]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.Images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + hotel.Images.length) % hotel.Images.length
    );
  };
  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  const handleChange = (index, field, value) => {
    const newPaxRooms = [...paxRooms];
    if (field === "Children") {
      const childrenCount = parseInt(value, 10);
      newPaxRooms[index].Children = childrenCount;
      newPaxRooms[index].ChildrenAges = new Array(childrenCount).fill(""); // Reset ages
    } else {
      newPaxRooms[index][field] = parseInt(value, 10);
    }
    setPaxRooms(newPaxRooms);
  };

  const handleChildAgeChange = (roomIndex, childIndex, value) => {
    const newPaxRooms = [...paxRooms];
    newPaxRooms[roomIndex].ChildrenAges[childIndex] = value;
    setPaxRooms(newPaxRooms);
  };

  const addRoom = () => {
    setPaxRooms([...paxRooms, { Adults: 1, Children: 0, ChildrenAges: [] }]);
  };

  const removeRoom = (index) => {
    if (paxRooms.length > 1) {
      const newPaxRooms = paxRooms.filter((_, i) => i !== index);
      setPaxRooms(newPaxRooms);
    }
  };

  const roomData = {
    Name: ["Superior Room, 1 Queen Bed, Non-Smoking"],
    BookingCode: "1407362!TB!1!TB!2b066974-c504-4bbe-a40b-17aff9d53767",
    Inclusion: "Room Only",
    DayRates: [[{ BasePrice: 667.3 }, { BasePrice: 667.3 }]],
    TotalFare: 1592.26,
    TotalTax: 257.66,
    RoomPromotion: ["Member’s exclusive price"],
    CancelPolicies: [
      {
        FromDate: "13-02-2025 00:00:00",
        ChargeType: "Fixed",
        CancellationCharge: 796.13,
      },
      {
        FromDate: "06-02-2025 00:00:00",
        ChargeType: "Fixed",
        CancellationCharge: 0.0,
      },
    ],
    MealType: "Room_Only",
    IsRefundable: true,
    WithTransfers: false,
  };

  return (
    <>
    <Header />
    <div className=" max-w-[1140px] mx-auto mt-10 bg-gray-50">
      {/* Hotel Header */}
      <div className="mb-8 bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {hotel?.HotelName}
            </h1>
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-black-700 rounded-xl border border-black-100">
              <MapPin className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{hotel?.Address}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-col gap-4 items-center space-x-3 bg-black-100 px-4 py-2 rounded-xl">
              <div className="flex">{renderStars(hotel?.HotelRating)}</div>
              <span className="text-black-800 font-semibold">
                {hotel?.HotelRating} Star Hotel
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8  h-[450px]">
        {/* Image Carousel */}
        <div className="w-[600px]  mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-[40rem] bg-orange-50">
            <img
              src={hotel?.Images[currentImageIndex]}
              alt={`${hotel?.HotelName} view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

            <div className="flex items-center">
            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/3 transform -translate-y-1/2 bg-white/95 p-4 rounded-full shadow-lg hover:bg-slate-100 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-black-600" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/3 transform -translate-y-1/2 bg-white/95 p-4 rounded-full shadow-lg hover:bg-slate-100 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-black-600" />
            </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 px-6 py-3 rounded-full shadow-lg">
              <span className="text-balck-600 font-bold">
                {currentImageIndex + 1}
              </span>
              <span className="text-gray-400">
                {" "}
                / {hotel?.Images?.length}
              </span>
            </div>
          </div>
        </div>

        {/* Room Management Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-black-600" />
              Manage Room Occupancy
            </h2>

            {/* Room Cards */}
            <div className="space-y-6">
              {paxRooms.map((room, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Room {index + 1}
                    </h3>
                    {paxRooms.length > 1 && (
                      <button
                        onClick={() => removeRoom(index)}
                        className="flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Adults Selection */}
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Adults
                      </label>
                      <select
                        value={room.Adults}
                        onChange={(e) =>
                          handleChange(index, "Adults", e.target.value)
                        }
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-black-500 transition-all"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} Adult{num !== 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Children Selection */}
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Children
                      </label>
                      <select
                        value={room.Children}
                        onChange={(e) =>
                          handleChange(index, "Children", e.target.value)
                        }
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-black-500 transition-all"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} Child{num !== 1 ? "ren" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Children Ages */}
                  {room.Children > 0 && (
                    <div className="mt-6">
                      <label className="block text-gray-600 font-medium mb-3">
                        <Child className="w-4 h-4 inline mr-2" />
                        Children's Ages
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {room.ChildrenAges.map((age, childIndex) => (
                          <select
                            key={childIndex}
                            value={age}
                            onChange={(e) =>
                              handleChildAgeChange(
                                index,
                                childIndex,
                                e.target.value
                              )
                            }
                            className="p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-black-500 transition-all"
                          >
                            <option value="">Select age</option>
                            {[...Array(18)].map((_, num) => (
                              <option key={num} value={num}>
                                {num} years
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={addRoom}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl
              hover:from-gray-700 hover:to-gray-800 transform hover:-translate-y-0.5 
              transition-all duration-200 shadow-lg hover:shadow-xl
              flex items-center justify-center space-x-2 font-semibold"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Another Room</span>
              </button>

              <button
                onClick={() => setSubmit(true)}
                className="flex-1 px-4 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl
              hover:from-orange-600 hover:to-orange-700 transform hover:-translate-y-0.5 
              transition-all duration-200 shadow-lg hover:shadow-xl
              flex items-center justify-center space-x-1 font-semibold"
              >
                <Search className="w-6 h-5" />
                <span>Search Available Rooms</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {submit && (
        <div className="max-w-7xl mx-auto px-4">
          {rooms.Status.Description === "Successful" ? (
            <div className="grid grid-cols-1 gap-8 py-8">
              {rooms.HotelResult[0].Rooms.map((room, index) => (
                <FinalBookingCardHotel
                  key={index}
                  roomData={room}
                  paxRooms={paxRooms}
                  tripId={tripId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <div className="text-xl text-gray-600">
                No rooms available for your search criteria
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </>
  );
}

export default RoomDetails;
