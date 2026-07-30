import { useState  } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function login() {

    const user = {
      email: email,
      password: password
    };


    const response = await fetch(
      "http://localhost:4001/user/login",
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
  localStorage.setItem("token", data.token);
  localStorage.setItem("userName", data.user.name);
  toast.success(data.message);
  navigate("/trips");
}
    else{

      toast.error(data.message);

    }

  }


  return (
<>
    <div style={{display : 'flex' , justifyContent : 'center', alignItems : 'center' , flexDirection : 'column' , margin : '120px'}}>

      <h2>Login</h2>


      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />


      <br/><br/>


      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />


      <br/><br/>


      <button onClick={login}>
        Login
      </button>


    </div>
    <ToastContainer/>
</>
  )
}


export default Login;