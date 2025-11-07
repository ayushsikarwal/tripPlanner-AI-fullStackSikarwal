import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard.jsx";
import axios from "axios";

const HotelBooking = ({ trip, tripId }) => {
  const [info, setInfo] = useState([]);
  const location = trip?.tripChoices?.location?.label;
  console.log(trip);
console.log(trip?.tripChoices);
console.log(trip?.tripChoices?.location);

let city, country;

if(location.includes("-")){
  city = location.split("-")[0]
  country = location.split("-")[1]
}else if(location.includes(",")){
  if(location.split(",").length===2){
    city=location.split(",")[0]
    country=location.split(",")[1]
  }else if(location.split(",").length===3){
    city=location.split(",")[0]
    country=location.split(",")[2]
  }
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCountryCode = await axios.get(`http://localhost:5001/api/country-list/${country}`);
        const getCityCode = await axios.post(`http://localhost:5001/api/city-list`, {
          "code": getCountryCode.data.code,
          "cityName": city
        });
        const hotel = await axios.post(`http://localhost:5001/api/hotels`, {
          "code": getCityCode.data.city
        });
  
        console.log(hotel.data);
        setInfo(hotel.data.Hotel);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [trip]);  // dependencies array: ensure the effect runs when `trip`, `country`, or `city` changes.
  

  return (
    <div className="p-6 text-xl mx-auto font-semibold rounded-lg">
      Hotel Booking Section for <span>{location}</span>
      <div className="my-0 mx-auto">
        <div className="mt-8 flex flex-col justify-center items-center">
          {info.map((hotel) => (
            <HotelCard key={hotel.HotelCode} hotel={hotel} trip={trip} tripId ={tripId}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
