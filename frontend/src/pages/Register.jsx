import React from 'react';
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";



const Register = () => {
    // Register
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  async function register() {

  const user = {
    name: name,
    email: registerEmail,
    password: registerPassword
  };

  const response = await fetch(
    "http://localhost:4001/user/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
  );

  const data = await response.json();

  console.log(data);

  if (data.success) {
    toast.success(data.message);

    setName("");
    setRegisterEmail("");
    setRegisterPassword("");
  } else {
    toast.error(data.message);
  }
}
  return (
    <>
    <div style={{display : 'flex' , justifyContent : 'center', alignItems : 'center' , flexDirection : 'column' , margin : '120px'}}>
        

      {/* Register */}

      <h2 style={{padding : '10px'}}>Register</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={register}>
        Register
      </button>

      
    </div>
    <ToastContainer/>
    </>
  )
}

export default Register
