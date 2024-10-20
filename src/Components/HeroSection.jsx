/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TaskCard from "./Taskcard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PRIORITY_MAP = { High: 1, Medium: 2, Low: 3 };

const HeroSection = ({ open, setOpen, tasks, setTasks, filterTask }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");
  const sidebarRef = useRef(null);

  const notifyTaskAdded = (title) => {
    toast.success(`📝 New Task Added: ${title}`, {
      // property
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const onSubmit = (data) => {
    const newTask = editingTaskId
      ? tasks.map((task) =>
          task.id === editingTaskId ? { ...task, ...data } : task
        )
      : [{ id: Date.now(), ...data, completed: false }, ...tasks];

    setTasks(newTask);
    if (!editingTaskId) notifyTaskAdded(data.title); // Notify on new task addition

    setOpen(false);
    reset();
    setEditingTaskId(null);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setValue("title", taskToEdit.title);
      setValue("description", taskToEdit.description);
      setValue("priority", taskToEdit.priority);
      setEditingTaskId(id);
      setOpen(true);
    }
  };

  const handleDelete = (id) => setTasks((prev) => prev.filter((task) => task.id !== id));

  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredAndSortedTasks = () => {
    const filteredTasks = filterTask || tasks;
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      const aPriority = PRIORITY_MAP[a.priority] || Infinity;
      const bPriority = PRIORITY_MAP[b.priority] || Infinity;

      if (selectedPriority) {
        if (a.priority === selectedPriority) return -1;
        if (b.priority === selectedPriority) return 1;
      }

      return aPriority - bPriority;
    });
    return sortedTasks;
  };

  useEffect(() => {
    if (open && sidebarRef.current) {
      sidebarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [open]);

  const translateX = open ? "translate-x-0" : "-translate-x-full";

  return (
    <div className="h-[90vh] w-full bg-blue-400 relative overflow-y-auto overflow-x-hidden">
      <ToastContainer /> {/* Toast container to display notifications */}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sideBar z-20 h-full w-[380px] sm:w-[527px] absolute top-0 left-0 p-4 transition-transform ease-in-out duration-500 ${translateX}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full w-full items-center sm:items-start gap-5 p-6 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg"
        >
          <input
            {...register("title", { required: true })}
            className="bg-gray-50 p-2 w-[19em] sm:w-[24em] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Title"
          />

          <textarea
            {...register("description", { required: true })}
            className="bg-gray-50 p-2 w-[19em] sm:w-[24em] h-[14em] rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Description"
          ></textarea>

          <select
            {...register("priority", { required: true })}
            className="sm:w-[20em] w-[19em] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white w-[19em] sm:w-[20em] p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {editingTaskId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* Filter by Priority */}
      <div className="p-4 flex items-center gap-2">
        <label className="block mb-2 font-medium">Filter by Priority:</label>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-4 p-4">
        {filteredAndSortedTasks().map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
