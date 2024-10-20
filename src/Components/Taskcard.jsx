/* eslint-disable react/prop-types */

import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiStarGate } from "react-icons/gi";

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
  // Determine the color for the left border based on priority
  const borderColor =
    {
      High: "border-red-500",
      Medium: "border-yellow-500",
      Low: "border-green-500",
    }[task.priority] || "border-gray-500";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <div
      className={` relative flex justify-between lg:h-[9em] w-[90vw] md:w-[50vw] p-2 rounded-xl shadow-md bg-white ${borderColor} border-l-4 hover:shadow-black/40 hover:shadow-md`}
    >
      <div className="part1 max-h-[100%] w-[77%] overflow-x-hidden overflow-y-auto">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <p className="text-gray-700 mt-2">{task.description}</p>
      </div>

      {/* Three-dot menu icon */}
      <div className="leftPart flex flex-col justify-between">
        <button
          onClick={toggleMenu}
          className="text-xl focus:outline-none self-end hover:bg-slate-100 h-8 w-8 flex items-center justify-center rounded-full"
        >
          <BsThreeDotsVertical />
        </button>
        <div className="completeStatus text-yellow-400 text-2xl">
          {task.completed && <GiStarGate />}
        </div>
      </div>
      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute z-30 right-[2em] lg:-right-[11em] lg:-top-[2em] w-40 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-2">
            <li>
              <button
                onClick={() => {
                  onEdit(task.id);
                  setMenuOpen(false);
                }}
                className="block px-4 py-1 text-base font-medium text-left text-gray-800 hover:bg-gray-100 w-full"
              >
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setMenuOpen(false);
                }}
                className="block px-4 py-1 text-base font-medium text-left text-gray-800 hover:bg-gray-100 w-full"
              >
                Delete
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onComplete(task.id);
                  setMenuOpen(false);
                }}
                className="block px-4 py-1 text-base font-medium text-left text-gray-800 hover:bg-gray-100 w-full"
              >
                {task.completed ? "Unmark" : "Complete"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
