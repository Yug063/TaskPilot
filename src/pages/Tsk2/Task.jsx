import React, { useContext } from 'react';
import 'tailwindcss/tailwind.css';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { DarkModeContext } from "../../context/darkModeContext";

const Task = ({ task, onEdit, onDelete }) => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task);
    const taskRef = doc(db, "tasks", task.id);
    deleteDoc(taskRef);
  };

  return (
    <div className={`rounded-md p-4 shadow-md mb-4 flex flex-col md:flex-row items-start md:items-center border-gray-500 border-solid border-[5px] ${darkMode ? "dark" : ""}`}>
      <div className="md:w-1/2">
        <h2 className="text-xl font-semibold mb-2 text-blue-500 border-b border-gray-100">Task: {task.title}</h2>
        <p className="text-gray-450 mb-2">Description: {task.description}</p>
        <p className="text-gray-400">Due: {task.dueDate}</p>
      </div>
      <div className="flex justify-end mt-4 md:mt-0 md:w-1/2">
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
