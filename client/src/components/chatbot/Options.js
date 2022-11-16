import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context";
import '../styles/disable.css'

const Options = ({ setState, state, actionProvider }) => {
    const { topic, questionNumber, wrongAnswer, askingQuestions, followUp, subQuestions } = state
    const globalState = useContext(AppContext)

    useEffect(() => {
        fetch("/questions")
            .then((res) => res.json())
            .then((data) => setState(prev => ({
                ...prev,
                allQuestions: data.questions,
                subjects: data.subjects,
                subQuestions: data.sub_questions
            })))
    }, [setState])

    useEffect(() => {
        if (topic && Array.isArray(topic) && !followUp) {
            try {
                actionProvider.askQuestion(topic[questionNumber].Question)
            }
            catch (error) {
                console.error('error while asking a question', error.message)
            }
        }
    }, [topic, questionNumber])

    useEffect(() => {
        if (followUp) {
            try {
                actionProvider.askSubQuestion(subQuestions.find((q) => q.frn_question_id === topic[questionNumber].question_id)?.Question)
            } catch (error) {
                console.error('error while asking followup', error.message)
            }
        }
    }, [followUp])

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

    const setATopic = (t, link) => {
        setState(prev => ({
            ...prev,
            topic: t,
            askingQuestions: false, // Added a state check for the logic in messageParser
            questionNumber: 0,

        }))
        globalState.setIframeSrc(link)
        remove_click()
    }

    function remove_click() {
        const btn = document.getElementsByClassName("option-button");
        for (let i = 0; i < btn.length; i++) {
            btn[i].classList.add("disable")
        }
    }

    return (
        <div className="options-container">
            { state.subjects && state.allQuestions && (
                state.subjects.map((s) => (
                    <button
                        key={`btn${s.subject_id}`} 
                        className="option-button"
                        onClick={() => setATopic(state.allQuestions[s.name], s.subject_link)}
                    >
                        {s.name}
                    </button>
                ))
            )}
        </div>
    )
}

export default Options;
