import React, { useContext } from 'react';
import Task from './Task';
import { DarkModeContext } from "../../context/darkModeContext";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className={` ${darkMode ? "dark" : ""}`}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
