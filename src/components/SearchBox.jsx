const SearchBox = ({ onChange, value }) => {
  return (
    <div className="flex flex-row gap-3 items-center  mx-4 border border-gray-400 bg-white w-[200px] p-2  h-[2.3rem] rounded-md">
      <img src="/svgs/search.png" width={25} alt="search icon" />
      <input
        value={value}
        type="text"
        placeholder="Buscar..."
        onChange={onChange}
        className="outline-none w-[6rem]"
      ></input>
    </div>
  );
};

export default SearchBox;
