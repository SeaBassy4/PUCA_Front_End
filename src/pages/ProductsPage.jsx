import React from "react";
import SearchBox from "../components/SearchBox";
import OptionBar from "../components/products/OptionBar";

const ProductsPage = () => {
  return (
    <main className="flex w-full max-h-screen">
      <div className="w-2/3 h-full flex items-center justify-center">
        <div className="p-10 w-3xl flex flex-row flex-wrap items-center justify-between gap-4">
          <div className="flex flex-row p-4 w-full bg-[#59B03C] rounded-md justify-evenly">
            <h2 className="font-semibold text-xl text-white">
              Productos en Venta
            </h2>
            <SearchBox value="" onChange={() => {}} />
            <select
              className="bg-white border border-black rounded-md p-2 px-4 hover:bg-gray-100 font-semibold"
              name="categoria"
              id="categoria"
            >
              <option value="Categoria">Categoría</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Alimentos">Alimentos</option>
            </select>
          </div>

          <div className="w-full h-105 border-1 rounded-[10px] border-gray-500 flex flex-row flex-wrap items-center px-10 py-5 gap-x-15 gap-y-7">
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img
                  className=""
                  src="imgs/americano.png"
                  alt="Café americano"
                />
              </div>
              <span className="font-14 font-medium mt-33 mr-0.5 select-none">
                Café Americano
              </span>
              <img
                className="w-5 h-5 mt-33 "
                src="svgs/right.png"
                alt="right"
              />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img
                  className="w-23"
                  src="imgs/capuccino.png"
                  alt="Capuccino"
                />
              </div>
              <span className="font-14 font-medium mt-33 mr-10 select-none">
                Capuccino
              </span>
              <img
                className="w-5 h-5 mt-33 "
                src="svgs/right.png"
                alt="right"
              />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="w-10 " src="imgs/malteada.png" alt="Malteada" />
              </div>
              <span className="font-14 font-medium mt-33 mr-11 select-none">
                Malteada
              </span>
              <img
                className="w-5 h-5 mt-33 "
                src="svgs/right.png"
                alt="right"
              />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="" src="imgs/matcha.png" alt="Matcha" />
              </div>
              <span className="font-14 font-medium mt-33 mr-15 select-none">
                Matcha
              </span>
              <img
                className="w-5 h-5 mt-33 "
                src="svgs/right.png"
                alt="right"
              />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img
                  className="w-30 pt-7"
                  src="imgs/alimentos.png"
                  alt="Alimentos"
                />
              </div>
              <span className="font-14 font-medium mt-33 mr-11 select-none">
                Alimentos
              </span>
              <img
                className="w-5 h-5 mt-33 "
                src="svgs/right.png"
                alt="right"
              />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="w-20" src="imgs/boba.png" alt="Té de Boba" />
              </div>
              <span className="font-14 font-medium mt-33 mr-8 select-none">
                Té de Boba
              </span>
              <img
                className="w-5 h-5 mt-33 "
                src="svgs/right.png"
                alt="right"
              />
            </section>
          </div>
        </div>
      </div>
      {/* lado derecho */}
      <div className="w-full h-full flex flex-col items-center justify-center  ">
        {/* Categoría div*/}
        {/*Botones de categoría*/}
        <div className="w-[88%] flex flex-col mt-2 border-b-2 borded-black pb-4">
          <div className="flex flex-row justify-between w-full">
            <span className="font-semibold text-xl">
              Categoría de Productos
            </span>
            <button className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] px-6 h-11">
              Añadir
            </button>
          </div>
          <OptionBar title="Bebidas"></OptionBar>
          <OptionBar title="Alimentos"></OptionBar>
        </div>
        {/* tamaño de bebida div*/}
        {/*Botones de tamaños bebidas*/}
        <div className="w-[88%] flex flex-col mt-2 border-b-2 borded-black pb-4">
          <div className="flex flex-row justify-between w-full">
            <span className="font-semibold text-xl">Tamaño de Bebidas</span>
            <button className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] px-6 h-11">
              Añadir
            </button>
          </div>
          <OptionBar title="Chico"></OptionBar>
          <OptionBar title="Mediano"></OptionBar>
          <OptionBar title="Grande"></OptionBar>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
