import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SideBarButton = ({ text, icon, iconHover, path }) => {
  //states
  const [currentIcon, setCurrentIcon] = useState(icon);

  //constantes
  const navigate = useNavigate();

  //use effects

  // funciones

  return (
    <div
      onClick={() => navigate(path)}
      onMouseEnter={() => setCurrentIcon(iconHover)}
      onMouseLeave={() => setCurrentIcon(icon)}
      className="flex w-full items-center mb-7 rounded-full p-1 transition duration-150 hover:bg-black hover:text-white cursor-pointer"
    >
      <div className="flex items-center gap-3 ml-5">
        <img src={currentIcon} alt={`${text} icon`} width={22} />
        <p className="text-[1.3rem]">{text}</p>
      </div>
    </div>
  );
};

export default SideBarButton;
