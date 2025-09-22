import React from "react";

const OptionBar = ({ title, onClick }) => {
  return (
    <div className="w-full h-13 font-medium flex flex-row items-center justify-between border-1 border-gray-300 rounded-md px-5 py-5 my-2">
      {title}
      <img width={30} src="svgs/right.png" alt="arrow" />
    </div>
  );
};

export default OptionBar;
