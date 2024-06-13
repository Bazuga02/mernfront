import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    navigate("/");
  }

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        toast.error("All fields are required!", {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#ff0000",
            color: "#ffffff",
          },
        });
      } else if (!validateEmail(Data.email)) {
        toast.error("Please enter a valid email address!", {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#ff0000",
            color: "#ffffff",
          },
          
        });
      } else if (Data.password.length < 6) {
        toast.error("Password must be at least 6 characters long!", {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#ff0000",
            color: "#ffffff",
          },
        });
      } else {
        const response = await axios.post(
          `https://mernback-meiv.onrender.com/api/v1/sign-in`,
          Data
        );
        setData({ username: "", email: "", password: "" });

        toast.success(response.data.message, {
          position: "top-center",
          duration: 2000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#ff0000",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="p-4 w-full max-w-md rounded bg-gray-800">
        <div className="text-2xl font-semibold text-center">Signup</div>
        <input
          type="text"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          required
          placeholder="xyz@example.com"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          value={Data.email}
          onChange={change}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-10 py-2 rounded hover:bg-blue-600 transition-all duration-200 hover:scale-105 mb-2 md:mb-0"
            onClick={submit}
          >
            SignUp
          </button>
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-400 transition-all duration-150 mx-1 text-center"
          >
            Already Having An Account? LogIn Here!
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
