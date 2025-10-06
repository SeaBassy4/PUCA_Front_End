const SearchBox = ({ onChange, value, classNames, placeholder }) => {
  return (
    <div
      className={`flex flex-row gap-3 items-center border border-gray-400 bg-white  w-[160px] px-2  rounded-md ${classNames}`}
    >
      <img src="/svgs/search.png" width={25} alt="search icon" />
      <input
        value={value}
        type="text"
        placeholder={placeholder ? placeholder : "Buscar..."}
        onChange={onChange}
        className="outline-none w-full"
      ></input>
    </div>
  );
};

export default SearchBox;
