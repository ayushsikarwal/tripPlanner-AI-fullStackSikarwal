import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/FirebaseConfig.js";

export const getTrip = async (req, res) => {
  try {
    const docRef = doc(db, "AITrip", req.params.userId);
    const snapDoc = await getDoc(docRef);
    return res.json(snapDoc.data());
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch trip" });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const { userId, itinerary } = req.body;
    const docRef = doc(db, "AITrip", userId);
    const data = { itinerary };
    await setDoc(docRef, data, { merge: true });
    return res.json({ message: "Itinerary updated" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update trip" });
  }
};


