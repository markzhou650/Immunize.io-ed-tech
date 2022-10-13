import React, { useState } from 'react';
import './styles/chatbox.css';

function ChatBox () {
  const [theChat, setTheChat] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [data, setData] = React.useState(null);

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const submitMessage = () => {
    const newChat = [...theChat, textInput];
    setTheChat(newChat);
    setTextInput("");
  };

  // Use fetch() to get request from node api
  React.useEffect(() => {
    fetch("/post")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);

  return (
    <div className="chatbox">
      <div className="chatbox__chatfeed">
        {theChat.map((text, i) => (
          <div key={i}>{text}</div>
        ))}

        <p>{!data ? "Server is not connected..." : data}</p>

      </div>
      <div className="chatbox__input-fields">
        <textarea value={textInput} onChange={handleChange} />
        <button onClick={submitMessage}>send</button>
      </div>
    </div>
  );
}

export default ChatBox;