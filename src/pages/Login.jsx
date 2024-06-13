import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });

  const history = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    navigate("/");
  }

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        toast.error("All fields are required!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#ff0000",
            color: "#ffffff",
          },
        });
      } else {
        const response = await axios.post(
          `https://mernback-meiv.onrender.com/api/v1/log-in`,
          Data
        );
        setData({ username: "", password: "" });

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => history("/"),
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="p-4 w-full max-w-md rounded bg-gray-800">
        <div className="text-2xl font-semibold text-center">LogIn</div>
        <input
          type="text"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
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
            Login
          </button>
          <Link
            to="/signup"
            className="text-gray-600 hover:text-gray-400 transition-all duration-150"
          >
            Not Having An Account? SignUp Here!
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
