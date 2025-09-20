import React from "react";

const ProductsPage = () => {
  return (
    <main className="flex w-full max-h-screen">

      <div className="w-2/3 h-full">
        <div className="p-10 w-3xl flex flex-row flex-wrap items-center justify-between gap-4">
          <span className="font-semibold text-xl">Productos en Venta</span>
          <div className="w-[40%] flex flex-row gap-2 items-center ">
            <img src="svgs/search.png" className="w-5 h-5 absolute ml-2" alt="lupita" />
            <input type="text" className="w-full border-2 border-gray-300 rounded-[5px] placeholder:italic placeholder:text-gray-400 pl-8 " placeholder="Ingrese nombre del producto..." />
          </div>
          <select className="outline-none border-none appearance-none p-1 font-semibold" name="categoria" id="categoria">
            <option value="Categoria">Categoría</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Alimentos">Alimentos</option>
          </select>

          <div className="w-full h-105 border-1 rounded-[10px] border-gray-500 flex flex-row flex-wrap items-center px-10 py-5 gap-x-15 gap-y-7">
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="" src="imgs/americano.png" alt="Café americano" />
              </div>
              <span className="font-14 font-medium mt-33 mr-0.5 select-none">Café Americano</span>
              <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="w-23" src="imgs/capuccino.png" alt="Capuccino" />
              </div>
              <span className="font-14 font-medium mt-33 mr-10 select-none">Capuccino</span>
              <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="w-10 " src="imgs/malteada.png" alt="Malteada" />
              </div>
              <span className="font-14 font-medium mt-33 mr-11 select-none">Malteada</span>
              <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="" src="imgs/matcha.png" alt="Matcha" />
              </div>
              <span className="font-14 font-medium mt-33 mr-15 select-none">Matcha</span>
              <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="w-30 pt-7" src="imgs/alimentos.png" alt="Alimentos" />
              </div>
              <span className="font-14 font-medium mt-33 mr-11 select-none">Alimentos</span>
              <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
            </section>
            <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
              <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
                <img className="w-20" src="imgs/boba.png" alt="Té de Boba" />
              </div>
              <span className="font-14 font-medium mt-33 mr-8 select-none">Té de Boba</span>
              <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
            </section>
          </div>
        </div>

      </div>
      {/* lado derecho */}
      <div className="ml-10 w-full h-full flex flex-col ">
        {/* Categoría div*/}
        <div className="w-full h-1/2 flex flex-col">
          <div className="mt-8 flex flex-row justify-between items-center w-full ">
            <span className="font-semibold text-xl">Categoría de Productos</span>
            <button className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] mr-16 px-6 h-11 mb-1">Añadir</button>
          </div>

          {/*Botones de categoría*/ }
          <div className="w-[88%] flex flex-col mt-2 border-b-black border-b-1 gap-5">
            <button className="w-full h-13 font-medium flex flex-row items-center gap-81 border-1 border-gray-300 rounded-[10px] px-5 py-5 mt-1">
              Bebidas
              <img className="w-5 h-5" src="svgs/right.png" alt="right" />
            </button>
             <button className="w-full h-13 font-medium flex flex-row items-center gap-77 border-1 border-gray-300 rounded-[10px] px-5 py-5 mb-5">
              Alimentos
              <img className="w-5 h-5" src="svgs/right.png" alt="right" />
            </button>
          </div>

        </div>
        {/* Tamaño div*/}
        <div className="w-full h-1/2 flex flex-col mt-0 ">
          <div className="flex flex-row justify-between items-center w-full ">
            <span className="font-semibold text-xl">Tamaño de bebidas</span>
            <button className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] mr-16 px-6 h-11 mb-2">Añadir</button>
          </div>
          {/*Botones de tamaño*/ }
          <div className="w-[88%] flex flex-col gap-3">
            <button className="w-full h-13 font-medium flex flex-row items-center gap-85 border-1 border-gray-300 rounded-[10px] px-5 py-5">
              Chico
              <img className="w-5 h-5" src="svgs/right.png" alt="right" />
            </button>
             <button className="w-full h-13 font-medium flex flex-row items-center gap-79 border-1 border-gray-300 rounded-[10px] px-5 py-5">
              Mediano
              <img className="w-5 h-5" src="svgs/right.png" alt="right" />
            </button>
            <button className="w-full h-13 font-medium flex flex-row items-center gap-82 border-1 border-gray-300 rounded-[10px] px-5 py-5">
              Grande
              <img className="w-5 h-5" src="svgs/right.png" alt="right" />
            </button>
          </div>

        </div>


      </div>
    </main>

  );
};

export default ProductsPage;
