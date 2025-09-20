import React from "react";
import SideBar from "./components/Sidebar";
import { useState } from "react";
import routes from "../routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Router>
      <div className=" min-h-screen bg-white">
        {/* Sidebar and Header */}
        <div className="bg-[#59b03c] p-4 flex items-center">
          <img
            src="svgs/menu.png"
            width={30}
            className="cursor-pointer"
            alt="menu"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          />
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <h1 className="text-3xl font-bold ml-4 text-white">Bendita Patria</h1>
        </div>
        <div className="w-full h-full">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
