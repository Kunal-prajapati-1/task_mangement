/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { SiTask } from "react-icons/si";

// Utility function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const SearchBar = ({ open, setOpen, setFilter, tasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState("#000000"); // Initial color: black

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered =
      tasks &&
      tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term)
      );
    setFilter(filtered);
  };

  // Change the icon color periodically to a random color
  useEffect(() => {
    const interval = setInterval(() => {
      setIconColor(getRandomColor()); // Update with a new random color
    }, 3000); // Change every 1 second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const decoration = open
    ? "text-red-500 rotate-45"
    : "text-green-500 rotate-0";

  return (
    <div className="w-full fixed top-[10px] left-0 px-2 sm:px-4 flex items-center gap-4 justify-between">
      <div className="leftPart flex w-[45em] gap-4 items-center">
        <div className="add h-9 w-14 sm:h-9 sm:w-10 text-2xl cursor-pointer flex items-center justify-center rounded-full bg-gray-100 hover:bg-white">
          <IoAdd
            className={`transition-transform duration-300 font-black ${decoration}`}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <input
          type="text"
          className="w-full relative p-2 border rounded-md shadow-sm focus:outline-none"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="text-2xl relative right-3 sm:right-16 cursor-pointer">
          🔎
        </span>
      </div>
      <div
        className="rightPart text-4xl hover:text-[#a9a5a9] transition-colors ease-linear duration-200 cursor-pointer"
        style={{ color: iconColor }} // Apply the random color
      >
        <SiTask />
      </div>
    </div>
  );
};

export default SearchBar;
