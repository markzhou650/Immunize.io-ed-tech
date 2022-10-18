import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options"

const config = {
    botName: "Immunize.io Bot",
    initialMessages: [
        createChatBotMessage(
            `Hello, what would you like to learn?`, 
            { widget: "options" }
        )
    ],
    state: {
        askingQuestions: false,
        questionNumber: null,
        allQuestions: null,
        topic: null
    },
    widgets : [
        {
            widgetName: "options",
            widgetFunc: (props) => {
                // console.log('widgetFunc what is props', props)
                return <Options {...props} />
            }
        },
    ]
}

export default config