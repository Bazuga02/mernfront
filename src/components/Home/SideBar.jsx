import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { MdIncompleteCircle } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import userLogo from "../../assets/userlogo.png"

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const [Data, setData] = useState();

  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
      selectedBg: "bg-blue-500",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
      selectedBg: "bg-pink-500",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
      selectedBg: "bg-green-500",
    },
    {
      title: "InCompleted tasks",
      icon: <MdIncompleteCircle />,
      link: "/incompletedTasks",
      selectedBg: "bg-red-500",
    },
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://mernback-meiv.onrender.com/api/v2/get-all-tasks`,
        {
          headers,
        }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  return (
    <>
      {Data && (
        <div>
        <img src={userLogo} className=" h-20 mx-auto" alt="user logo" />
          <h2 className="text-xl font-semibold "> <span className=" text-blue-500 italic">HELLO</span>  {Data.username} </h2>
          <h4 className="mb-1 text-gray-400"> {Data.email} </h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className={`my-2 flex items-center gap-2 p-2 rounded transition-all duration-200 cursor-pointer 
              ${
                location.pathname === items.link
                  ? items.selectedBg
                  : "hover:bg-neutral-800"
              }`}
          >
            {items.icon} {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          className="bg-gray-700 w-full p-2 rounded-md hover:bg-neutral-700 transition-all duration-200 hover:scale-105"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default SideBar;
