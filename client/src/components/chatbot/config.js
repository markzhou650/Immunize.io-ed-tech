import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options"

const config = {
    botName: "Immunize.io Bot",
    initialMessages: [createChatBotMessage(`Hello, what would you like to learn?`, {
        widget: "options",
    })
    ],
    widgets : [
        {
            widgetName: "options",
            widgetFunc: (props) => <Options {...props} />
        }
    ]
}

export default config