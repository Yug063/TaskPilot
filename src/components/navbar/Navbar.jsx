import "./navbar.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { NavLink } from "react-router-dom";
import React from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";


const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUserData(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="navbar bg-gradient-to-r from-[#33ccff] to-pink-300">
      <div className="wrapper ">
        <div className="justify">
          <NavLink to="/" className="flex">
            <img
              className="w-5 h-5"
              src="https://i.ibb.co/C51YjGL/Whats-App-Image-2024-01-21-at-16-55-28.jpg"
            />
            <p className="ml-2 font-bold">Task Manager</p>
          </NavLink>
        </div>
        <div className="items">
          <div></div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon text-white"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon text-white" />
          </div>
          <div className="item relative">
            <NotificationsNoneOutlinedIcon className="icon text-white" />
            <div className="counter">1</div>
          </div>
          <div className="item flex justify-items-end">
          {userData && userData.length > 0 && (
            
            <img
              src={userData[0].img}
              alt=""
              className="avatar w-10 h-10 rounded-full"
            />
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
