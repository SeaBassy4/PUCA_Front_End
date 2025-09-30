import React from "react";

const InputLabel = ({ title, onChange, value, placeholder, classNames }) => {
  return (
    <div className={`flex flex-col`}>
      <label className="font-bold mb-2">{title}</label>
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`border border-gray-300 p-2 rounded-md ${classNames}`}
      />
    </div>
  );
};

export default InputLabel;
