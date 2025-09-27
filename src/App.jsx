import React from "react";
import SideBar from "./components/Sidebar";
import { useState } from "react";
import routes from "../routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const queryClient = new QueryClient();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className=" min-h-screen flex flex-col bg-white">
          {/* Sidebar and Header */}
          <div className="bg-[#59b03c] p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="svgs/menu.png"
                width={30}
                className="cursor-pointer"
                alt="menu"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              />
              <h1 className="text-3xl font-bold text-white">
                Cafeteria "Bendita Patria"
              </h1>
            </div>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <div className="flex-1 flex w-full">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
