import { Router } from "express";
import {
  getCountryCode,
  getCityCode,
  getHotels,
  getHotelDetail,
  getPriceDetail,
  getRoomsDetail,
  prebook,
  bookSingleRoom,
} from "../controllers/hotelController.js";

const router = Router();

router.get("/api/country-list/:countryName", getCountryCode);
router.post("/api/city-list", getCityCode);
router.post("/api/hotels", getHotels);
router.post("/api/hotel-detail", getHotelDetail);
router.post("/api/price-detail", getPriceDetail);
router.post("/api/rooms-detail", getRoomsDetail);
router.post("/api/prebook", prebook);
router.post("/api/book-singleRoom", bookSingleRoom);

export default router;


