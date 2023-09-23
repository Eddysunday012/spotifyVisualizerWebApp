import { useState } from "react";
import "./App.css";
import profilePic from "./assets/profilePic.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <img src={profilePic} alt="ProfilePic" />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more bruhhh
      </p>
    </>
  );
}

export default App;
