import React from "react";

const Modal = ({ onClose, children, title, type, onConfirm, onDelete }) => {
  const classes = type === "delete" ? "bg-red-600" : "bg-green-600";

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-40 flex items-center justify-center z-40" />
      <div className="bg-white p-4 flex flex-col rounded-md z-50 w-[30%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end mt-4">
          <span
            onClick={onClose}
            className="font-semibold p-2 cursor-pointer absolute top-2 right-2"
          >
            X
          </span>
          <button
            onClick={onConfirm}
            className={`text-white font-semibold py-2 px-4 rounded-md w-full ${classes}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
