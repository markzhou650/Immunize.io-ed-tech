import "./styles/container.css";
import 'react-chatbot-kit/build/main.css';
import React from 'react'

// import ChatBox from "./ChatBox";
// import VideoBox from "./VideoBox";

import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import { useContext } from "react";
import { AppContext } from "../context";
import ResponsivePlayer from "./video/ResponsivePlayer";

export default function Container () {
  const globalState = useContext(AppContext)
  console.log("what is global state", globalState)

  return (
    <div className="container">
        {/* <ChatBox /> */}
        <div className="chatbot">
          <Chatbot
            config={config}
            messageParser={MessageParser}  
            actionProvider={ActionProvider}
          />
        </div>
        
        <div>
          { globalState.state.displayHelpWidget 
            ? (globalState.state.helpWidgetMessage) 
            : "Here's some more content" 
          }
        </div>


        {/* Video */  }
        <div className="video">
          <ResponsivePlayer /> 
          { globalState.state.videoHelpWidget 
              ? (globalState.state.videoWidgetMessage) 
              : "" 
            }
        </div>

    </div>
  );
}
