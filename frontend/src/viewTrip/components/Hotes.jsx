import { GetPlaceDetails, Photo_Req } from '@/services/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hotelbadges from './Hotelbadges.jsx';

const Hotels = ({ trip }) => {

  if (!trip || !trip.tripData || !trip.tripData.hotelOptions) {
    return <div>Loading or No Hotels Available</div>;  // Handle the case where data is not available
  }



  return (
    <div className='mt-10 mb-10'>
      <h2 className='font-bold text-2xl mt-5 mb-4'>Places to Stay</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip.tripData.hotelOptions.map((hotel, index) => {
          return (
            <div className='hover:scale-110 p-4 bg-slate-50 rounded-2xl transition-all' key={index}>
              {/* Wrap everything inside the Link to make it clickable */}
              <Hotelbadges hotel={hotel}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hotels;
