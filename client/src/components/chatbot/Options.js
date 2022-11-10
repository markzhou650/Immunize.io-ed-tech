import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context";
import '../styles/disable.css'

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
            try {
                actionProvider.askQuestion(topic[questionNumber].Question)
            }
            catch (error) {
                console.error('error while asking a question', error.message)
            }
        }
    }, [topic, questionNumber])

    useEffect(() => {
        if (askingQuestions && wrongAnswer) {
            globalState.setDisplayHelpWidget(true, topic[questionNumber].ReadLink)
        }
        if (!wrongAnswer) {
            globalState.setDisplayHelpWidget(false)
        }
    }, [askingQuestions, wrongAnswer])

    /* Video */
    useEffect(() => {
        if (askingQuestions && wrongAnswer) {
            globalState.setVideoHelpWidget(true, topic[questionNumber].YTLink)
        }
    }, [askingQuestions, wrongAnswer])

    const setATopic = (t) => {
        setState(prev => ({
            ...prev,
            topic: t,
            askingQuestions: false, // Added a state check for the logic in messageParser
            questionNumber: 0,

        }))
        // globalState.setIframeSrc(t[0].YLink)
        remove_click()
    }

    function remove_click() {
        const btn = document.getElementsByClassName("option-button");
        for (let i = 0; i < btn.length; i++) {
            btn[i].classList.add("disable")
        }
    }
    const options = [
        {
            text: 'Shingles Vaccine',
            handler: () => setATopic(state.allQuestions["Shingles Vaccine"]),
            id: 1,
        },
        {
            text: "Flu Vaccine",
            handler: () => setATopic(state.allQuestions["Flu Vaccine)"]),
            id: 2
        },
        {
            text: "Pneumonia Vaccine",
            handler: () => setATopic(state.allQuestions["PneumoniaVaccine)"]),
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
