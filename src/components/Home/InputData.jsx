import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Toaster, toast } from "react-hot-toast";

const InputData = ({ inputDiv, setInputDiv, UpdatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: UpdatedData.title, desc: UpdatedData.desc });
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      toast.error("All fields are required!", {
        position: "top-center",
        style: {
          background: "#ff0000",
          color: "#ffffff",
        },
      });
    } else {
      try {
        await axios.post(`https://mernback-meiv.onrender.com/api/v2/create-task`, Data, {
          headers,
        });
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Handle specific error message from the server
          toast.error(error.response.data.message, {
            position: "top-center",
            style: {
              background: "#ff0000",
              color: "#ffffff",
            },
          });
        } else {
          // Handle general errors
          toast.error("An error occurred. Please try again later.", {
            position: "top-center",
            style: {
              background: "#ff0000",
              color: "#ffffff",
            },
          });
        }
      }
    }
  };

  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      toast.error("All fields are required!", {
        position: "top-center",
        style: {
          background: "#ff0000",
          color: "#ffffff",
        },
      });
    } else {
      try {
        await axios.put(
          `https://mernback-meiv.onrender.com/api/v2/update-task/${UpdatedData.id}`,
          Data,
          {
            headers,
          }
        );
        setUpdatedData({
          id: "",
          title: "",
          desc: "",
        });
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Handle specific error message from the server
          toast.error(error.response.data.message, {
            position: "top-center",
            style: {
              background: "#ff0000",
              color: "#ffffff",
            },
          });
        } else {
          // Handle general errors
          toast.error("An error occurred. Please try again later.", {
            position: "top-center",
            style: {
              background: "#ff0000",
              color: "#ffffff",
            },
          });
        }
      }
    }
  };

  return (
    <>
      <Toaster />
      <div
        className={` ${inputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center  h-screen w-full`}
      >
        <div className=" w-11/12 md:w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              className=" text-xl hover:text-red-500 transition-all duration-150"
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  desc: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <RxCross1 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols={30}
            rows={10}
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {UpdatedData.id === "" ? (
            <button
              onClick={submitData}
              className="px-9 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-black font-semibold"
            >
              SUBMIT
            </button>
          ) : (
            <button
              onClick={UpdateTask}
              className="px-9 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-black font-semibold"
            >
              UPDATE
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
