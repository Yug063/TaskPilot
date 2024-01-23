import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, NavLink } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
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
        <h1 className=" flex justify-center text-white text-[35px]">SignUp</h1>
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
          SignUp
        </button>
        
        <p className="w-[300px] mx-5 mt-3 flex flex-row justify-between text-white">
          Don't you have an account{" "}
          <Link className="place-items-end" to="/login">
            LogIn
          </Link>
        </p>
        {error && <span className="mx-5 text-red-600 mt-2 flex justify-center">You have already an account, please login</span>}
      </form>
    </div>
  );
};

export default Signup;
