import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SiginUp = () => {
  const [NameErr, setNameErr] = useState(false);
  const [phoneEmp, setphoneEmp] = useState(false);
  const [phoneErr, setphoneErr] = useState(false);
  const [PassEmp, setPassEmp] = useState(false);
  const [PassErr, setPassErr] = useState(false);
  const name = useRef();
  const phone = useRef();
  const pass = useRef();
  const navigate = useNavigate();

  const validatephone = (phone) => {
    return String(phone)
      .toLowerCase()
      .match(/^(?:\+\d{1,3})?\d{10}$/);
  };
  const log = () => {
    navigate("/login");
  };
  const handleRegister = async(e) => {
    const Name = name.current.value;
    const Phone = phone.current.value;
    const Pass = pass.current.value;
    let a = 0,
      b = 0,
      c = 0;

    if (!Name) {
      setNameErr(true);
    } else {
      setNameErr(false);
      a = 1;
    }

    if (!Phone) {
      setphoneEmp(true);
    } else {
      setphoneEmp(false);
      if (validatephone(Phone)) {
        b = 1;
        setphoneErr(false);
      } else {
        setphoneErr(true);
      }
    }
    if (!Pass) {
      setPassEmp(true);
    } else {
      setPassEmp(false);
      if (Pass.length < 6) {
        setPassErr(true);
      } else {
        setPassErr(false);
        c = 1;
      }
    }
    if (a + b + c === 3) {
        const data = await axios.post("http://localhost:5500/register",{
            name:Name,
            phone:Phone,
            password:Pass
        });
        if(data){
           
            const {auth,user}=data.data
             localStorage.setItem("token",auth);
             localStorage.setItem("user",user._id)
             navigate("/home");
        }
        else{
            alert("Something went wrong")
        }
   
    }

  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-950">
      <div className="flex flex-col z-10 bg-[#151515] sm:rounded-lg p-5 sm:px-10 px-7 items-start sm:w-max w-full sm:h-max h-full ">
        <div className="text-slate-50 font-semibold text-[1.7rem] mt-1 flex w-full ">
          Create a free account!
        </div>
        <div className="flex flex-col my-3">
          <span className="text-slate-200 font-thin my-2 text-xl mb-3">
            Name
          </span>
          <input
            type="text"
            className="sm:w-72 w-64 h-10 rounded-lg outline-none px-2 py-2 font-medium "
            ref={name}
          />
          {NameErr && (
            <small className="text-red-600 text-[1rem] ">
              Please enter the name
            </small>
          )}
        </div>
        <div className="flex flex-col ">
          <span className="text-slate-200 font-thin my-2 text-xl mb-3">
            Phone
          </span>
          <input
            type="tel"
            className="sm:w-72 w-64 h-10 rounded-lg outline-none px-2 py-2 font-medium "
            ref={phone}
          />
          {phoneEmp && (
            <small className="text-red-600 text-[1rem] ">
              Please enter the phone
            </small>
          )}
          {phoneErr && (
            <small className="text-red-600 text-[1rem] ">Invaild phone no.</small>
          )}
        </div>
        <div className="flex flex-col my-2">
          <span className="text-slate-200 font-thin my-2 text-xl mb-3">
            Password
          </span>
          <input
            type="text"
            className="sm:w-72 w-64 h-10 rounded-lg outline-none px-2 py-2 font-medium"
            ref={pass}
          />
          {PassEmp && (
            <small className="text-red-600 text-[1rem] ">
              Please enter the password
            </small>
          )}
          {PassErr && (
            <small className="text-red-600 text-[1rem] ">
              Password must have 6 character
            </small>
          )}
        </div>
        <div className="flex w-full items-center justify-center mt-7 mb-5">
          <button
            className="text-xl bg-slate-50 text-slate-900 px-4 py-2 font-semibold rounded-lg w-full active:scale-105 duration-200 "
            onClick={() => {
              handleRegister();
            }}
          >
            Register
          </button>
        </div>
        <div className="text-slate-50">
          Already have an account?
          <span
            className="font-bold cursor-pointer"
            onClick={() => {
              log();
            }}
          >
            Login
          </span>{" "}
          instead
        </div>
      </div>
    </div>
  );
};

export default SiginUp;
