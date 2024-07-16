import React, { useState } from "react";


const DdForMyblog = () => {
  const [selectedItem, setSelectedItem] = useState("Select Type");

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <div className="relative inline-block w-64">
        <select
          className="block appearance-none w-full bg-white border  border-input bg-background px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline mt-6"
          value={selectedItem}
          onChange={handleSelect}
        >
          <option disabled value="Select Type">Select Type</option>
          <option value="For you">For you</option>
          <option value="Docs">Docs</option>
          <option value="Software Development">Software Development</option>
          <option value="Mental health">Mental health</option>
          <option value="Entrepreneurship">Entrepreneurship</option>
          <option value="Web development">Web development</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>
      </div>
    </div>
  );
};

export default DdForMyblog;
