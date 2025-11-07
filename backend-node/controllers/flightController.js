import axios from "axios";

export const flightSearch = async (req, res) => {
  try {
    const searchReq = req.body;
    if (!searchReq) {
      return res.status(400).json({ error: "Missing 'searchReq' in request body" });
    }

    const resp = await axios.post(
      "http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search",
      searchReq,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.json(resp.data);
  } catch (error) {
    return res.status(500).json({ error: error.message, details: error.response?.data });
  }
};


