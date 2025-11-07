import React, { useEffect, useState } from "react";
import { Button } from "/src/components/ui/button.jsx";
import { GetPlaceDetails, Photo_Req } from "@/services/GlobalAPI";
import { useNavigate } from "react-router-dom";

const InfoSection = ({ trip, tripId }) => {
  const [photo, setPhoto] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const query = trip?.tripChoices?.location?.label;
      if (!query) {
        console.warn("No location label provided.");
        return;
      }

      // console.log("Fetching place details for:", query);
      const placeDetails = await GetPlaceDetails({
        textQuery: query,
      });

      // console.log(placeDetails.data.places[0].photos[4].name)
      // console.log(placeDetails.data.places[0].photos[4].heightPx)
      // console.log(placeDetails.data.places[0].photos[4].widthPx)

      setPhoto(
        Photo_Req(
          placeDetails.data.places[0].photos[4].name,
          placeDetails.data.places[0].photos[4].heightPx,
          placeDetails.data.places[0].photos[4].widthPx
        )
      );
    } catch (error) {
      console.error(
        "Failed to fetch place details:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div id="webcrumbs">
        <div className=" relative">
          <div className="relative  h-[400px] overflow-hidden rounded-xl">
            <img
              src={photo || "/placeholder.png"}
              alt=""
              className="w-full h-full object-cover "
            />

            <div className="absolute bg-gradient-to-t from-black to-transparent h-[400px] top-0 left-0 w-full p-4 flex justify-between items-center">
              <div className="flex items-center gap-2"></div>
            </div>

            <div className="absolute  bottom-8 left-8">
              <h2 className="text-white text-6xl font-serif mb-4">
                {trip?.tripChoices?.location?.label}
              </h2>
              <div className=" flex items-center gap-2 text-white/90">
                <span> 📅 {trip?.tripChoices?.noOfDays} Days</span>
                <span className="mx-4">•</span>
                <span>🎊 {trip?.tripChoices?.typeOftrip}</span>
                <span className="mx-4">•</span>
                <span>💰 {trip?.tripChoices?.budget}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
          <Button onClick ={()=>{navigate(`/chat-room/${tripId}`)}} className="rounded"> 🛫 Chatting Area</Button>
          <Button onClick ={()=>{navigate(`/budgeting-tool/${tripId}`)}} className="rounded"> 🛫 Budget Tracking trip</Button>
        </div> */}
    </div>
  );
};

export default InfoSection;
