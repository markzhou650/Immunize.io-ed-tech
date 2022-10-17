import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context";


const Options = ({ setState, state, actionProvider }) => {
    const { topic, questionNumber, wrongAnswer, askingQuestions } = state
    const globalState = useContext(AppContext)

    useEffect(() => {
        fetch("/questions")
            .then((res) => res.json())
            .then((data) => setState(prev => ({
                ...prev,
                allQuestions: data.questions
            })))
    }, [setState])

    useEffect(() => {
        if (topic && Array.isArray(topic)) {
            actionProvider.askQuestion(topic[questionNumber].Question)
        }
    }, [topic, questionNumber])

    useEffect(() => {
        if (askingQuestions && wrongAnswer) {
            globalState.setDisplayHelpWidget(true, topic[questionNumber].YTLink)
        }
    }, [askingQuestions, wrongAnswer])

    const setATopic = (t) => {
        setState(prev => ({
            ...prev,
            topic: t,
            askingQuestions: true,
            questionNumber: 0
        }))
    }

    const options = [
        {
            text: 'Addition',
            handler: () => setATopic(state.allQuestions.Addition),
            id: 1,
        },
        { 
            text: "Subtraction", 
            handler: () => setATopic(state.allQuestions.Subtraction), 
            id: 2 
        },
        { 
            text: "Multiplication", 
            handler: () => setATopic(state.allQuestions.Multiplication), 
            id: 3 
        },
    ];

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>
    ))
    return <div className="options-container">{buttonsMarkup}</div>
}

export default Options;
