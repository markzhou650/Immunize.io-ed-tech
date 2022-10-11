import { useState } from "react";
import "./styles/chatbox.css";

export default function ChatBox() {
  const [theChat, setTheChat] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const submitMessage = () => {
    const newChat = [...theChat, textInput];
    setTheChat(newChat);
    setTextInput("");
  };

  return (
    <div className="chatbox">
      <div className="chatbox__chatfeed">
        {theChat.map((text, i) => (
          <div key={i}>{text}</div>
        ))}
      </div>
      <div className="chatbox__input-fields">
        <textarea value={textInput} onChange={handleChange} />
        <button onClick={submitMessage}>send</button>
      </div>
    </div>
  );
}
