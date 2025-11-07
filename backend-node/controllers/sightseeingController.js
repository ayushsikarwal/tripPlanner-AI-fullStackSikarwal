import axios from "axios";

let token;
let traceId;

export const sightseeingSearch = async (req, res) => {
  const { FromDate, ToDate, AdultCount, CityId, CountryCode } = req.body;

  const respTok = await axios.post(
    "http://sharedapi.tektravels.com/SharedData.svc/rest/Authenticate",
    {
      ClientId: process.env.SIGHTSEE_CLIENT_ID,
      UserName: process.env.SIGHTSEE_USERNAME,
      Password: process.env.SIGHTSEE_PASSWORD,
      EndUserIp: process.env.SIGHTSEE_END_USER_IP,
    }
  );

  token = respTok.data.TokenId;

  const resp = await axios.post(
    "https://SightseeingBE.tektravels.com/SightseeingService.svc/rest/Search",
    {
      CityId,
      CountryCode,
      FromDate,
      ToDate,
      AdultCount,
      ChildCount: 0,
      ChildAge: null,
      PreferredLanguage: 0,
      PreferredCurrency: "INR",
      IsBaseCurrencyRequired: false,
      EndUserIp: process.env.SIGHTSEE_END_USER_IP,
      TokenId: token,
      KeyWord: "",
    }
  );

  traceId = resp.data.Response.TraceId;
  return res.json(resp.data);
};

export const getAvailability = async (req, res) => {
  const { resultIndex } = req.body;
  const response = await axios.post(
    "https://SightseeingBE.tektravels.com/SightseeingService.svc/rest/GetAvailability",
    {
      ResultIndex: resultIndex,
      EndUserIp: process.env.SIGHTSEE_END_USER_IP,
      TraceId: traceId,
      TokenId: token,
    }
  );

  return res.json(response.data);
};


