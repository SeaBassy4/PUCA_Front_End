import React from "react";

const ProductCard = ({ imgSrc, altText, title, onClick }) => {
  return (
    <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
      <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
        <img className="" src={imgSrc} alt={altText} />
      </div>
      <span className="font-14 font-medium mt-33 mr-0.5 select-none">
        {title}
      </span>
      <img
        className="w-5 h-5 "
        src="svgs/right.png"
        alt="right"
        onClick={onClick}
      />
    </section>
  );
};

export default ProductCard;
