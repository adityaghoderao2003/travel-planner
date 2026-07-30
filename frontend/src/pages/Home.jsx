import { useEffect, useState } from "react";

function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', margin:'120px'}}>
      <h1>Plan My Trip</h1>
<p>
  {userName ? `Welcome ${userName} to travel planner` : "Welcome to travel planner"}
</p>
    </div>
  );
}

export default Home;