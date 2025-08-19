
import './App.css';
import { useEffect, useRef, useState } from "react";

function App() {

const [clientId, setClientId] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    // Open the WebSocket connection
    ws.current = new WebSocket("ws://localhost:9090");

    // Handle incoming messages
    ws.current.onmessage = (message) => {
      const response = JSON.parse(message.data);
      console.log("Server response:", response);

      if (response.method === "connect") {
        setClientId(response.clientId);
        console.log("Client id set successfully:", response.clientId);
      }
    };

    // Handle connection events
    ws.current.onopen = () => console.log("Connected to server");
    ws.current.onerror = (err) => console.error("WebSocket error:", err);
    ws.current.onclose = () => console.log("Disconnected from server");

    // Cleanup: close socket when component unmounts
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);


  function createRoom(){

  }

  return (
    <div className="App">
    <button onClick={createRoom}>Create Room</button>
      
    </div>
  );
}

export default App;
