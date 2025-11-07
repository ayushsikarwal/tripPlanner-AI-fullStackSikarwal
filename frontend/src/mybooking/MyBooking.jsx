import FloatingNavBar from "@/components/ui/custom/FloatingNavBar";
import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HotelC from "./HotelC.jsx";
import Header from "@/components/ui/custom/Header.jsx";

function MyBooking() {
  const { tripId } = useParams();
  //   const docSnap = doc(db, "Booking", tripId);
  //   const snap = getDoc(docSnap);
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetchData();
  }, [tripId]);

  const fetchData = async () => {
    const docSnap = doc(db, "Booking", tripId);
    const snap = await getDoc(docSnap);
    if (!snap.exists()) {
      return <div>Nothing has been booket yet</div>;
    }
    console.log("data retreived", snap.data().HotelBooking[0]);
    setTrip(snap.data());
  };

  return (
    <div>
        <Header/>
      <div className="flex">
        <h1 className="font-extrabold text-[30px]">Hotel Bookings :</h1>
        {trip?.HotelBooking ? (
          trip.HotelBooking.map((item) => <HotelC hotelBookings={item} />)
        ) : (
          <div>No Hotel Bookings</div>
        )}
      </div>
      <div className="flex py-7">
        <h1 className="font-extrabold text-[30px]">SightSeeing Bookings :</h1>
        {trip?.SightSeeing.length>0 ? (
          trip.SightSeeing.map((item) => <HotelC hotelBookings={item} />)
        ) : (
          <div className="py-2 px-4 font-extrabold text-red-700 text-[30px]">No SightSeeing Bookings</div>
        )}
      </div>
      <FloatingNavBar tripId={tripId} />
    </div>
  );
}

export default MyBooking;
