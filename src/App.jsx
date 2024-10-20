/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import HeroSection from "./Components/HeroSection";
import SearchBar from "./Components/SearchBar";

// Utility function to load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const App = () => {
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage()); // Initialize with stored tasks
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks,filter]);

  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="navBar h-[10vh] w-full p-4 ">
        <SearchBar setOpen={setOpen} open={open} setFilter={setFilter} tasks={tasks} />
      </div>
      <div
        style={{ maxHeight: "calc(100vh - 10vh)" }}
        className="home w-full"
      >
        <HeroSection
           
          open={open}
          setOpen={setOpen}
          tasks={tasks}
          filterTask={filter}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
};

export default App;
