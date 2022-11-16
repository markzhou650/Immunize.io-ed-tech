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
        wrongAnswer: false,
        followUp: false,
        questionNumber: null,
        subjects: null,
        allQuestions: null,
        topic: null,
        subQuestions: null
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