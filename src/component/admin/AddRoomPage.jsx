import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import RoomType from "../common/RoomType";

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    roomPhotoUrl: "",
    roomType: "",
    roomPrice: "",
    roomDescription: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newRoomType, setNewRoomType] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomTypeChange = (e) => {
    const selected = e.target.value;
    if (selected === "other") {
      setNewRoomType(true);
      setRoomDetails((prev) => ({ ...prev, roomType: "" }));
    } else {
      setNewRoomType(false);
      setRoomDetails((prev) => ({ ...prev, roomType: selected }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const addRoom = async () => {
    if (
      !roomDetails.roomType ||
      !roomDetails.roomPrice ||
      !roomDetails.roomDescription
    ) {
      setError("All room details must be provided.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (!window.confirm("Do you want to add this room?")) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);

      if (file) {
        formData.append("photo", file);
      }

      const result = await ApiService.addRoom(formData);
      if (result.statusCode === 200) {
        setSuccess("Room Added successfully.");
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="edit-room-container">
      <h2>Add New Room</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="edit-room-form">
        <div className="form-group">
          {preview && (
            <img
              src={preview}
              alt="Room Preview"
              className="room-photo-preview"
            />
          )}
          <input type="file" name="roomPhoto" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Room Type</label>
          <RoomType
            value={roomDetails.roomType}
            onChange={handleRoomTypeChange}
            includeOther={true}
          />
          {newRoomType && (
            <input
              type="text"
              name="roomType"
              placeholder="Enter new room type"
              value={roomDetails.roomType}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="form-group">
          <label>Room Price</label>
          <input
            type="text"
            name="roomPrice"
            value={roomDetails.roomPrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Room Description</label>
          <textarea
            name="roomDescription"
            value={roomDetails.roomDescription}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="update-button" onClick={addRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
};

export default AddRoomPage;
