import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const TaskManager = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDueDate, setFilterDueDate] = useState("");

  useEffect(() => {
    const tasksQuery = query(collection(db, "tasks"));

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleTaskSubmit = async (task) => {
    if (selectedTask) {
      const taskRef = doc(db, "tasks", selectedTask.id);
      await setDoc(taskRef, task);
      setSelectedTask(null);
    } else {
      await addDoc(collection(db, "tasks"), task);
    }
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
  };

  const handleTaskDelete = async (task) => {
    await db.collection("tasks").doc(task.id).delete();
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(null);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all" && filterDueDate === "") {
      return true;
    } else if (filterStatus !== "all" && filterDueDate === "") {
      return task.status === filterStatus;
    } else if (filterStatus === "all" && filterDueDate !== "") {
      return task.dueDate === filterDueDate;
    } else {
      return task.status === filterStatus && task.dueDate === filterDueDate;
    }
  });

  return (
    <div className={`flex ${darkMode ? "dark" : ""}`}>
      <Sidebar darkMode={darkMode}/>
      <div className="flex flex-col flex-grow">
      <Navbar darkMode={darkMode} />

        <div className="flex-grow  pt-8 px-4 md:px-8 lg:px-16">
          <h1 className="text-2xl font-bold mb-4 flex justify-center">Task Manager</h1>
          <TaskForm
            onTaskSubmit={handleTaskSubmit}
            selectedTask={selectedTask}
          />
          <div className="my-4">
            <h2 className="text-lg font-semibold mb-2">Filter Tasks</h2>
            <div className="flex items-center mb-2">
              <label htmlFor="statusFilter" className="mr-2">
                Status:
              </label>
              <select
                id="statusFilter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="dueDateFilter" className="mr-2">
                Due Date:
              </label>
              <input
                type="date"
                id="dueDateFilter"
                value={filterDueDate}
                onChange={(e) => setFilterDueDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <TaskList
            tasks={filteredTasks}
            onEdit={handleTaskEdit}
            onDelete={handleTaskDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
