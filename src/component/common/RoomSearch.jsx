import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../service/ApiService";

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [error, setError] = useState("");

  const roomTypes = [
    "Single",
    "Double",
    "Deluxe",
    "Suite",
    "Family",
    "King",
    "Queen",
    "Twin",
    "Studio",
    "Executive",
    "Presidential",
  ];

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => setError(""), timeout);
  };

  const handleInternalSearch = async () => {
    const today = new Date();
    const todayDateOnly = new Date(today.toDateString());

    if (!startDate || !endDate || !roomType) {
      showError("Please select all fields");
      return;
    }

    if (startDate < todayDateOnly) {
      showError("Check-in date can't be in the past");
      return;
    }

    if (endDate < startDate) {
      showError("Check-out date can't be before check-in");
      return;
    }

    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const response = await ApiService.getAvailableRoomsByDateAndType(
        formattedStartDate,
        formattedEndDate,
        roomType
      );

      if (response.statusCode === 200) {
        if (!response.roomList || response.roomList.length === 0) {
          showError("No rooms available for selected range and type.");
          return;
        }
        handleSearchResult(response.roomList);
        setError("");
      }
    } catch (error) {
      showError(
        "Unknown error occurred: " + error?.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <section>
      <div className="search-container">
        <div className="search-field">
          <label>Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
            minDate={new Date()}
          />
        </div>

        <div className="search-field">
          <label>Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
            minDate={startDate || new Date()}
          />
        </div>

        <div className="search-field">
          <label>Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option disabled value="">
              Select Room Type
            </option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Rooms
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default RoomSearch;
