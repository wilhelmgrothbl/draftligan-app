import React, { useState } from "react";
import Modal from "./modal.js";
import winnerData from "./winnerData.json";
import historyData from "./historyData.json";
import "tailwindcss/tailwind.css";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";

export default function HistoryNew() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (year) => {
    setSelectedYear(year);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedYear(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-indigo-900 to-red-500 p-5">
      {winnerData.map((winner) => (
        <div
          key={winner.year}
          className="w-full md:w-3/4 lg:w-1/1 bg-gradient-to-r from-red-100 to-white rounded-l-xl shadow-lg p-5 my-5"
        >
          <div className="text-2xl mb-3">{winner.year}</div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-m text-amber-800">Vinnare</div>
              <div className="text-lg md:text-2xl">{winner.team}</div>
              <div className="text-sm">{winner.name}</div>
              <div className="text-sm text-gray-900">
                Poäng: {winner.points}
              </div>
            </div>
            <div className="flex items-center md:ml-auto mt-3 md:mt-0 md:w-2/4">
              <div className="text-s text-blue-900 ml-10">
                <div>Mest poäng</div>
                <div className="text-sm text-gray-500">{winner.funFact}</div>
              </div>
              <div className="mx-4" />
              <div className="text-s text-blue-900">
                <div>Mest hållna nollor</div>
                <div className="text-sm text-gray-500">{winner.funFact1}</div>
              </div>
            </div>
          </div>
          <button className="w-30 rounded px-3 py-2 mt-2 bg-indigo-900 text-white hover:bg-gradient-to-r hover:from-[#ff2882] hover:to-[#37003c] transition-colors duration-300" onClick={() => handleOpenModal(winner.year)}>
            {winner.year} Säsongsåterblick <i className="ml-3 fas fa-arrow-right"></i>
          </button>
        </div>
      ))}
      {isModalOpen && selectedYear && (
        <Modal
          onCloseModal={handleCloseModal}
          data={historyData[selectedYear]}
        />
      )}
    </div>
  );
}
