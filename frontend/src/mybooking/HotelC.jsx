import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, CreditCard, Coffee, Car, User } from 'lucide-react';

const BookingC = ({hotelBookings}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-2xl bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{hotelBookings.BookingDetail.HotelDetails.HotelName}</h2>
            <div className="flex items-center mt-2 text-blue-100">
              <MapPin className="w-4 h-4 mr-2" />
              <p>{hotelBookings.BookingDetail.HotelDetails.AddressLine1}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-blue-500 px-3 py-1 rounded-full text-sm">
              ⭐ {hotelBookings.BookingDetail.HotelDetails.Rating}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-medium">{formatDate(hotelBookings.BookingDetail.CheckIn)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Guest</p>
                <p className="font-medium">{hotelBookings.BookingDetail.Rooms[0].CustomerDetails[0].CustomerNames[0].Title} {hotelBookings.BookingDetail.Rooms[0].CustomerDetails[0].CustomerNames[0].FirstName} {hotelBookings.BookingDetail.Rooms[0].CustomerDetails[0].CustomerNames[0].LastName} {hotelBookings.BookingDetail.Rooms[0].CustomerDetails.length>0 ? "+"+hotelBookings.BookingDetail.Rooms[0].CustomerDetails.length-1 : ''} </p>
              </div>
            </div>
            <div className="flex items-center">
              <Coffee className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Meal Plan</p>
                <p className="font-medium">{hotelBookings.BookingDetail.Rooms[0].MealType}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-medium">{formatDate(hotelBookings.BookingDetail.CheckOut)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-medium">{hotelBookings.BookingDetail.Rooms[0].Currency} {hotelBookings.BookingDetail.Rooms[0].TotalFare}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Car className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Inclusions</p>
                <p className="font-medium">Free valet & self parking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Invoice Number</p>
              <p className="font-bold text-lg">{hotelBookings.BookingDetail.InvoiceNumber}</p>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              {hotelBookings.BookingDetail.BookingStatus}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingC;