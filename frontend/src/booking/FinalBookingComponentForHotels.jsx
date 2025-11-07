import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

function FinalBookingComponentForHotels({ paxRooms, roomData, tripId }) {
  const [customerDetails, setCustomerDetails] = useState(
    paxRooms.map((room, index) => ({
      roomIndex: index,
      CustomerNames: Array.from({ length: room.Adults }, () => ({
        Title: "",
        FirstName: "",
        LastName: "",
        Type: "Adult",
      })).concat(
        Array.from({ length: room.Children }, (_, childIndex) => ({
          Title: "",
          FirstName: "",
          LastName: "",
          Type: "Child",
          Age: room.ChildrenAges ? room.ChildrenAges[childIndex] : null,
        }))
      ),
    }))
  );

  const[submitting, setSubmitting] = useState(false)

  // Handle input change
  const handleInputChange = (roomIndex, personIndex, field, value) => {
    setCustomerDetails((prevDetails) =>
      prevDetails.map((room, rIndex) =>
        rIndex === roomIndex
          ? {
              ...room,
              CustomerNames: room.CustomerNames.map((person, pIndex) =>
                pIndex === personIndex ? { ...person, [field]: value } : person
              ),
            }
          : room
      )
    );
  };

  // Validation: Check if all required fields are filled
  const isFormValid = customerDetails.every((room) =>
    room.CustomerNames.every(
      (person) =>
        person.Title &&
        person.FirstName.trim() &&
        person.LastName.trim() &&
        (person.Type === "Adult" || (person.Type === "Child" && person.Age))
    )
  );

  // Handle Submit
  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Please fill all required fields before submitting.");
      return;
    }
    setSubmitting(true)
    console.log("Final Customer Details:", customerDetails);

      const preBook = await axios.post("http://localhost:5001/api/prebook", {
        bookingCode: roomData.BookingCode,
        tripId : tripId
      });
      if(preBook.data.Status.Code=='200'){
        alert("booking is in progress")
      }else{
        alert(preBook.data.Status.Description)
      }


    const resp = await axios.post("http://localhost:5001/api/book-singleRoom", {
      bookingCode: roomData.BookingCode,
      customerDetails: customerDetails,
      fare: roomData.TotalFare,
      tripId: tripId
    });
    if(resp.data.Status.Code=='200'){
        alert("booking has confirmed with clientRefId and confirmationNum -->", resp.data.ClientReferenceId +" and " + resp.data.ConfirmationNumber )
      }else{
        alert(preBook.data.Status.Description)
      }
    console.log(resp.data);

    setSubmitting(false)
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Customer Details</h2>
      {customerDetails.map((room, roomIndex) => (
        <div
          key={roomIndex}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Room {roomIndex + 1}</h3>
          {room.CustomerNames.map((customer, personIndex) => (
            <div
              key={personIndex}
              style={{
                marginBottom: "10px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <select
                value={customer.Title}
                onChange={(e) =>
                  handleInputChange(
                    roomIndex,
                    personIndex,
                    "Title",
                    e.target.value
                  )
                }
              >
                <option value="">Title</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
              </select>

              <input
                type="text"
                placeholder="First Name"
                value={customer.FirstName}
                onChange={(e) =>
                  handleInputChange(
                    roomIndex,
                    personIndex,
                    "FirstName",
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Last Name"
                value={customer.LastName}
                onChange={(e) =>
                  handleInputChange(
                    roomIndex,
                    personIndex,
                    "LastName",
                    e.target.value
                  )
                }
              />

              <span>({customer.Type})</span>

              {customer.Type === "Child" && (
                <input
                  type="number"
                  placeholder="Age"
                  value={customer.Age || ""}
                  onChange={(e) =>
                    handleInputChange(
                      roomIndex,
                      personIndex,
                      "Age",
                      e.target.value
                    )
                  }
                  min="1"
                  max="17"
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Submit Button */}
      <Button onClick={handleSubmit} disabled={!isFormValid}>
      {submitting ? <AiOutlineLoading className="animate-spin" /> : <div></div>      }
        Submit
      </Button>
    </div>
  );
}

export default FinalBookingComponentForHotels;
