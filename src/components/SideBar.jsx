import SideBarButton from "./SideBarButton";
import { section1, section2 } from "../../sidebarbutton";

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`h-full w-[20%] bg-[#F5F5F5] flex flex-col p-5 absolute left-0 top-0 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex w-full items-center justify-around">
        <h1 className="text-[1.7rem] font-bold">Punto Cafetería</h1>
        <span
          className="font-bold text-2xl cursor-pointer select-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          X
        </span>
      </div>

      {/* divider or "horizontal rule" */}
      <div className="w-full bg-black h-[.5px] mt-5 mb-3" />

      {/* first section */}
      <div className="w-full mx-auto">
        <h2 className="text-[#5C5C5C] text-[.8rem] mb-5">VISTAS</h2>
        {/* buttons container */}
        <div className="w-full flex-col">
          {section1.map((button, index) => (
            <SideBarButton
              key={index}
              text={button.text}
              icon={button.black}
              iconHover={button.white}
              path={button.path}
            />
          ))}
        </div>
      </div>

      {/* divider or "horizontal rule" */}
      <div className="w-full bg-black h-[.5px] mt-5 mb-3" />

      {/* second section */}
      <div className="w-full mx-auto">
        <h2 className="text-[#5C5C5C] text-[.8rem] mb-5">OTROS</h2>
        {/* buttons container */}
        <div className="w-[100%] flex-col">{/* button */}</div>
      </div>
    </div>
  );
};

export default SideBar;
