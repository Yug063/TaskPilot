import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch}= useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch({type:"LOGIN", payload:user})
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        // ..
      });
  };
  return (
    <div className="h-[100vh] flex items-center justify-center  bg-gradient-to-r from-[#33ccff] to-[#ff99cc] ">
      <form onSubmit={handleLogin} className="flex flex-col ">
        <h1 className=" flex justify-center text-white text-[35px]">Login</h1>
        <input
          type="text"
          className="w-[300px] h-10 m-5 px-4 bg-transparent focus:outline-none rounded bg-white"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-[300px] h-10 px-4 m-5 bg-transparent rounded focus:outline-none bg-white"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-[300px] text-white h-8 mx-5 bg-gradient-to-r from-[#ff6f61] via-purple-500 to-pink-500 rounded"
        >
          Login
        </button>
        {error && <span>Oops Don't cheat</span>}
        <p className="w-[300px] mx-5 mt-3 flex flex-row justify-between text-white">
          Don't you have an account{" "}
          <NavLink className="place-items-end" to="/signup">
            Signup
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
