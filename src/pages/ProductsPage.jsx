import React from "react";

const ProductsPage = () => {
  return (
    <div className="w-3xl h-lh">
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
            <span className="font-14 font-medium mt-33 mr-0.5 select-none">Capuccino</span>
            <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
          </section>
          <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
            <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
              <img className="w-10 " src="imgs/malteada.png" alt="Malteada" />
            </div>
            <span className="font-14 font-medium mt-33 mr-0.5 select-none">Malteada</span>
            <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
          </section>
          <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
            <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
              <img className="" src="imgs/matcha.png" alt="Matcha" />
            </div>
            <span className="font-14 font-medium mt-33 mr-0.5 select-none">Matcha</span>
            <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
          </section>
          <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
            <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
              <img className="w-30 pt-7" src="imgs/alimentos.png" alt="Alimentos" />
            </div>
            <span className="font-14 font-medium mt-33 mr-0.5 select-none">Alimentos</span>
            <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
          </section>
          <section className="w-40 h-42 border-1 border-gray-300 rounded-[10px] relative flex items-center justify-center">
            <div className="absolute w-[85%] h-[70%] bg-gradient-to-b from-[#EDFFC5] to-[#59B03C] rounded-[10px] mx-5 mb-5 flex items-center justify-center">
              <img className="w-20" src="imgs/boba.png" alt="Té de Boba" />
            </div>
            <span className="font-14 font-medium mt-33 mr-0.5 select-none">Té de Boba</span>
            <img className="w-5 h-5 mt-33 " src="svgs/right.png" alt="right" />
          </section>
        </div>
    </div>
    </div>
    
  );
};

export default ProductsPage;
