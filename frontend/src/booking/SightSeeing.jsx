import React, { useEffect, useState } from "react";
import DatePickerValue from "@/components/DatePickerValue.jsx";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import SightSeeingSearchCard from "./SightSeeingSearchCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

const SightSeeing = () => {
  const [inDate, setInDate] = useState(dayjs(Date.now()));
  const [outDate, setOutDate] = useState(dayjs(Date.now()));
  const [formData, setFormData] = useState({});
  const [sightSeeing, setSightSeeing] = useState(null);
  const [trip, setTrip] = useState(null);

  const { tripId } = useParams();

  useEffect(() => {
    const fetchTripData = async () => {
      const docRef = doc(db, "AITrip", tripId); // Reference to Firestore document
      const snapDoc = await getDoc(docRef); // Fetch the document

      if (snapDoc.exists()) {
        setTrip(snapDoc.data()); // Set fetched data to state
        console.log(snapDoc.data());
      }
    };

    fetchTripData();
  }, [tripId]);

  const millisecondsInOneDay = 24 * 60 * 60 * 1000;
  useEffect(() => {
    console.log(
      dayjs(inDate).format("DD-MM-YYYY") +
        "----" +
        dayjs(outDate) +
        "------" +
        Math.floor(outDate.diff(inDate) / millisecondsInOneDay)
    );
    handleInputChange("inDate", dayjs(inDate).format("YYYY-MM-DD"));
    handleInputChange("outDate", dayjs(outDate).format("YYYY-MM-DD"));

    console.log(formData);
  }, [inDate, outDate]);

  const getSightSeeingData = async () => {
    try {
      console.log("tripData", trip);
      console.log("trip choices data", trip?.tripChoices);
      console.log("trip location", trip?.tripChoices?.location);
  
      const location = trip?.tripChoices?.location.label;
      console.log(location)
      let city, state, country;
  
      if (typeof location === 'string') {
        if (location.includes(",")) {
          const parts = location.split(",");
          if (parts.length === 2) {
            city = parts[0].trim();
            country = parts[1].trim();
          } else if (parts.length === 3) {
            city = parts[0].trim();
            state = parts[1].trim();
            country = parts[2].trim();
          }
        } else if (location.includes("-")) {
          const parts = location.split("-");
          city = parts[0].trim();
          country = parts[1].trim();
        }
  
        if (country) {
          const getCountryCode = await axios.get(`http://localhost:5001/api/country-list/${country}`);
          const getCityCode = await axios.post(`http://localhost:5001/api/city-list`, {
            "code": getCountryCode.data.code,
            "cityName": city
          });
  
          console.log(getCountryCode.data)
          console.log(getCityCode.data)
  
          const response = await axios.post(
            "http://localhost:5001/api/sightseeing-search",
            {
              FromDate: formData.inDate,
              ToDate: formData.outDate,
              AdultCount: formData.adult,
              CityId: getCityCode.data.city, // Adjusted to use dynamic city ID
              CountryCode: getCountryCode.data.code, // Adjusted to use dynamic country code
            }
          );
  
          console.log("SightSearch data", response.data);
          setSightSeeing(response.data);
        }
      } else {
        console.error('Invalid or missing location data');
      }
    } catch (error) {
      console.error('Error fetching sightseeing data:', error);
    }
  };
  

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!trip) {
    return <div>page loading</div>;
  }
  return (
    <div className=" mx-auto">
    <div className="p-6 bg-yellow-100 text-xl font-semibold rounded-lg">
      Sightseeing Booking Section
    </div>
    <div className="flex justify-center py-9 max-w-[1140px] mx-auto gap-6">
      <div className="py-4">
        <DatePickerValue
          inDate={inDate}
          outDate={outDate}
          setInDate={setInDate}
          setOutDate={setOutDate}
        />
      </div>
      <div>
        <h2 className="text-lg font-medium">Number of Adults</h2>
        <input
          className="w-full border rounded-lg p-3 text-base"
          type="number"
          placeholder="Ex: 3 (Minimum 1)"
          onChange={(e) => handleInputChange("adult", e.target.value)}
        />
      </div>
      <div >
        <Button className='rounded p-6 mt-7' onClick={getSightSeeingData}> Search </Button>
      </div>
    </div>
    {/* <div>{tripId}</div> */}
    {sightSeeing ? <><SightSeeingSearchCard data ={sightSeeing.Response}/></> : <></>}
  </div>
  );
};

export default SightSeeing;
