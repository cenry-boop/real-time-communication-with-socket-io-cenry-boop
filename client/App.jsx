import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off("chatMessage");
  }, []);

  const sendMessage = () => {
    if (!message) return;
    socket.emit("chatMessage", message);
    setMessage("");
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2">
          Send
        </button>
      </div>
      <div className="space-y-2">
        {chat.map((msg, idx) => (
          <div key={idx} className="p-2 border rounded">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
