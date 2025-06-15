import React from "react";
import { ROOM_TYPES } from "../../constant/RoomType";

const RoomType = ({
  value,
  onChange,
  includeDefault = true,
  includeOther = false,
}) => {
  return (
    <select value={value} onChange={onChange}>
      {includeDefault && (
        <option disabled value="">
          Select Room Type
        </option>
      )}
      {ROOM_TYPES.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
      {includeOther && <option value="other">Other (please specify)</option>}
    </select>
  );
};

export default RoomType;
// This component renders a dropdown for room types.
// It accepts props for the current value, change handler, and options to include default and "other" options.
