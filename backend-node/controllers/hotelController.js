import axios from "axios";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/FirebaseConfig.js";

export const getCountryCode = async (req, res) => {
  try {
    const response = await axios.get(
      "http://api.tbotechnology.in/TBOHolidays_HotelAPI/CountryList",
      {
        auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD },
      }
    );

    const countryList = response.data.CountryList;
    if (!countryList) return res.status(500).json({ error: "Invalid API response format" });

    const { countryName } = req.params;
    const country = countryList.find(
      (country) => country.Name.trim().toLowerCase() === countryName.trim().toLowerCase()
    );

    if (country) return res.json({ code: country.Code });
    return res.json({ code: "no country found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getCityCode = async (req, res) => {
  try {
    const { code, cityName } = req.body;
    const response = await axios.post(
      "http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList",
      { CountryCode: code },
      { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
    );

    const { Status, CityList } = response.data;
    if (Status.Code !== 200) return res.status(500).json({ error: "API request failed" });
    if (!CityList) return res.status(500).json({ error: "City list is empty or missing" });

    const city = CityList.find(
      (city) => city.Name.trim().toLowerCase().split(",")[0] === cityName.trim().toLowerCase()
    );

    if (city) return res.json({ city: city.Code });
    return res.json({ code: "no city found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getHotels = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(404).json({ error: "City code is required" });

    const response = await axios.post(
      "http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList",
      { CityCode: code, IsDetailedResponse: "true" },
      { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
    );

    const { Status, Hotels } = response.data;
    if (Status.Code !== 200) return res.status(500).json({ error: "API request failed" });
    if (!Hotels) return res.status(500).json({ error: "City list is empty or missing" });

    if (Hotels) return res.json({ Hotel: Hotels.slice(0, 20) });
    return res.json({ code: "no city found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getHotelDetail = async (req, res) => {
  try {
    const { code } = req.body;
    const response = await axios.post(
      "http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails",
      { Hotelcodes: code, Language: "en" },
      { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
    );

    const { Status, HotelDetails } = response.data;
    if (Status.Code !== 200) return res.status(500).json({ error: "API request failed" });
    if (!HotelDetails) return res.status(500).json({ error: "City list is empty or missing" });

    if (HotelDetails) return res.json({ HotelDetails });
    return res.json({ code: "no city found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getPriceDetail = async (req, res) => {
  try {
    const { code, inDate, outDate } = req.body;
    const response = await axios.post(
      "http://api.tbotechnology.in/TBOHolidays_HotelAPI/search",
      {
        CheckIn: inDate,
        CheckOut: outDate,
        HotelCodes: code,
        GuestNationality: "IN",
        PaxRooms: [{ Adults: 1, Children: 0, ChildrenAges: [] }],
        ResponseTime: 18,
        IsDetailedResponse: true,
        Filters: { Refundable: false, NoOfRooms: 0, MealType: "All" },
      },
      { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
    );

    const { Status, HotelResult } = response.data;
    if (Status.Code !== 200) return res.json({ code: 201 });
    if (!HotelResult) return res.status(500).json({ error: "City list is empty or missing" });

    if (HotelResult) return res.json({ HotelResult });
    return res.json({ code: "no city found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const getRoomsDetail = async (req, res) => {
  try {
    const { code, inDate, outDate, PaxRooms } = req.body;
    const response = await axios.post(
      "http://api.tbotechnology.in/TBOHolidays_HotelAPI/search",
      {
        CheckIn: inDate,
        CheckOut: outDate,
        HotelCodes: code,
        GuestNationality: "IN",
        PaxRooms,
        IsDetailedResponse: true,
        Filters: { Refundable: false, NoOfRooms: 0, MealType: "All" },
      },
      { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
    );

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ code: "Failed to fetch data" });
  }
};

export const prebook = async (req, res) => {
  const { bookingCode } = req.body;
  const resp = await axios.post(
    "http://api.tbotechnology.in/TBOHolidays_HotelAPI/PreBook",
    { BookingCode: bookingCode, PaymentMode: "Limit" },
    { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
  );
  return res.json(resp.data);
};

export const bookSingleRoom = async (req, res) => {
  const { bookingCode, customerDetails, fare, tripId } = req.body;

  const refId = Math.floor(Math.random() * 1000000000000);
  const resp = await axios.post(
    "http://api.tbotechnology.in/TBOHolidays_HotelAPI/Book",
    {
      BookingCode: bookingCode,
      CustomerDetails: customerDetails,
      ClientReferenceId: refId,
      BookingReferenceId: refId,
      TotalFare: fare,
      EmailId: "himanshuuuuuu.kumawat@tbo.com",
      PhoneNumber: "019999999999",
      BookingType: "Voucher",
      PaymentMode: "Limit",
      PaymentInfo: {
        CvvNumber: "123",
        CardNumber: "5555555555555555",
        CardExpirationMonth: "12",
        CardExpirationYear: "2029",
        CardHolderFirstName: "John",
        CardHolderlastName: "Doe",
        BillingAmount: 348.92,
        BillingCurrency: "USD",
        CardHolderAddress: {
          AddressLine1: "Dummy",
          AddressLine2: "Dummy",
          City: "Dummy",
          PostalCode: "99501",
          CountryCode: "US",
        },
      },
    },
    { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
  );

  const respOfBookingDetail = await axios.post(
    "http://api.tbotechnology.in/TBOHolidays_HotelAPI/BookingDetail",
    { BookingReferenceId: refId, PaymentMode: "Limit" },
    { auth: { username: process.env.TBO_USERNAME, password: process.env.TBO_PASSWORD } }
  );

  function flattenSupplements(rooms) {
    return rooms.map((room) => {
      if (room.Supplements && Array.isArray(room.Supplements)) {
        room.Supplements = room.Supplements.flat();
      }
      return room;
    });
  }

  const bookingData = respOfBookingDetail.data;
  if (bookingData.BookingDetail && bookingData.BookingDetail.Rooms) {
    bookingData.BookingDetail.Rooms = flattenSupplements(bookingData.BookingDetail.Rooms);
  }

  const docRef = doc(db, "Booking", tripId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, { HotelBooking: arrayUnion(bookingData) });
  } else {
    await setDoc(docRef, { HotelBooking: [bookingData], SightSeeing: [], refId });
  }

  return res.json(resp.data);
};


