import React, { useState, useEffect, useContext } from "react";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { DarkModeContext } from "../../context/darkModeContext";

const TaskForm = ({ onTaskSubmit, selectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { darkMode, dispatch } = useContext(DarkModeContext);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDueDate(selectedTask.dueDate);
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onTaskSubmit({ title, description, dueDate });
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
      <form
        onSubmit={handleSubmit}
        className={`${darkMode ? "dark" : ""} max-w-md mx-auto  p-4 rounded-md shadow-md`}
      >
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" border border-gray-300 px-3 py-2 rounded-md w-full h-24 resize-none focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block font-semibold mb-1">
            Due Date:
          </label>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-80 mr-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          {selectedTask ? "Update Task" : "Create Task"}
        </button>
      </form>
  );
};

export default TaskForm;
