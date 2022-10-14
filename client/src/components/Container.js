import "./styles/container.css";
import 'react-chatbot-kit/build/main.css';
// import ChatBox from "./ChatBox";
// import VideoBox from "./VideoBox";

import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

function Container() {
  return (
    <div className="container">
      {/* <ChatBox /> */}
      <div className="chatbot">
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}  
      />
      </div>
      
      <div>Here's some more content</div>
    </div>
  );
}

export default Container;
