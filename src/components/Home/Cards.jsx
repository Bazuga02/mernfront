import React from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const showToast = (message, type = "success", isImportant = false) => {
    if (isImportant) {
      toast.custom(
        (t) => (
          <div
            style={{
              backgroundColor: "pink",
              padding: "10px",
              borderRadius: "5px",
              color: "black",
              display: "flex",
              alignItems: "center",
              opacity: t.visible ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          >
            <span
              style={{
                display: "inline-block",
                marginRight: "8px",
                animation: "move 1s infinite",
              }}
            >
              💗
            </span>
            {message}
            <style>
              {`
                @keyframes move {
                  0% { transform: translateY(0); }
                  50% { transform: translateY(-5px); }
                  100% { transform: translateY(0); }
                }
              `}
            </style>
          </div>
        ),
        { duration: 700 }
      );
    } else {
      if (type === "success") {
        toast.success(message, { duration: 500 });
      } else if (type === "error") {
        toast.error(message, { duration: 500 });
      }
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `https://mernback-meiv.onrender.com/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      showToast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `https://mernback-meiv.onrender.com/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      showToast(response.data.message, "success", true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://mernback-meiv.onrender.com/api/v2/delete-task/${id}`,
        { headers }
      );
      showToast(response.data.message, "error");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data &&
          data.map((items, i) => (
            <div
              key={i}
              className="flex flex-col justify-between bg-gray-800 rounded-sm p-4"
            >
              <div>
                <h3 className="text-xl font-semibold text-center">
                  {items.title}
                </h3>
                <p className="text-gray-300 my-2 text-center">{items.desc}</p>
              </div>
              <div className="mt-4 w-full flex items-center">
                <button
                  className={`${
                    items.complete === false
                      ? "bg-red-500 hover:bg-red-700"
                      : "bg-green-500 hover:bg-green-700"
                  } p-2 rounded w-3/6`}
                  onClick={() => handleCompleteTask(items._id)}
                >
                  {items.complete === true ? "Completed" : "In-Complete"}
                </button>
                <div className="p-2 w-3/6 text-2xl flex justify-around">
                  <button onClick={() => handleImportant(items._id)}>
                    {items.important === false ? (
                      <CiHeart className="hover:scale-125 transition-all duration-150" />
                    ) : (
                      <FaHeart className=" text-pink-500 hover:scale-125 transition-all duration-150" />
                    )}
                  </button>
                  {home !== "false" && (
                    <button
                      onClick={() =>
                        handleUpdate(items._id, items.title, items.desc)
                      }
                    >
                      <MdOutlineEdit className="hover:scale-125 hover:text-yellow-400 transition-all duration-150" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(items._id)}
                    className="hover:scale-125 hover:text-red-500 transition-all duration-150"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        {home === "true" && (
          <button
            className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
            onClick={() => setInputDiv("fixed")}
          >
            <IoMdAddCircle className="text-4xl" />
            <h2 className="text-3xl mt-4">Add Task</h2>
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
