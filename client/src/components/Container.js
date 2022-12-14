import "./styles/container.css";
import 'react-chatbot-kit/build/main.css';
import "./styles/chatbot.css"
import React from 'react'

import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import { useContext } from "react";
import { AppContext } from "../context";
import IframeContainer from "./iframe/Iframe";

export default function Container () {
  const globalState = useContext(AppContext)
  // console.log("what is global state", globalState)

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
        
        {/* <div className="reading">
          { globalState.state.displayHelpWidget && (
            <a
              href={globalState.state.helpWidgetMessage}
              target="_blank"
              rel="noreferrer"
            >
              Click here for more help
            </a>
          )}
        </div> */}
        
        {/* <iframe /> */}
        <div className="iframe">
          <IframeContainer src={globalState.state.iframeSrc} /> 
        </div>



    </div>

  );
}
