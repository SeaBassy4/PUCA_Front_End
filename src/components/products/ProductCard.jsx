import React from "react";

const ProductCard = ({ imgSrc, altText, title, onClick }) => {
  return (
    <div className="w-[30%] h-[50%] border-1 border-gray-300 rounded-[10px] relative flex flex-col items-center justify-center p-3 gap-2">
      <div className="overflow-hidden relative  w-full h-full bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] ">
        <img
          className="w-full h-full object-cover"
          src={imgSrc}
          alt={altText}
        />
      </div>
      <div className="flex items-center justify-between w-full cursor-pointer">
        <span className="font-14 font-medium select-none">{title}</span>
        <img
          className="w-5 h-5"
          src="svgs/right.png"
          alt="right"
          onClick={onClick}
          data-cy={`arrow-${title}`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
