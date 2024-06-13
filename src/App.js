import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Alltask from "./pages/Alltask";
import Importanttask from "./pages/Importanttask";
import Completedtask from "./pages/Completedtask";
import Incompletedtask from "./pages/Incompletedtask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (!isLoggedIn) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className=" bg-neutral-900 text-white h-screen p-2 relative ">
      <h1 className=" text-white text-center text-4xl font-bold  my-1">
        <span className=" text-blue-500">T</span>
        as
        <span className=" text-pink-500 ">K </span>
        <span className=" text-green-500">M</span>
        anage 
        <span className=" text-red-500">R</span>
      </h1>
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltask />} />
          <Route path="/importantTasks" element={<Importanttask />} />
          <Route path="/completedTasks" element={<Completedtask />} />
          <Route path="/incompletedTasks" element={<Incompletedtask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
