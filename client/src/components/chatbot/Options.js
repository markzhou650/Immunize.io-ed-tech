import React from "react";

const Options = (props) => {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/questions")
        .then((res) => res.json())
        // following is a hardcoded question, you may change the index for a different one
        .then((data) => setData(data.questions[1].Question));
      }, []);

    const options = [
        {
            text: data,
            handler: props.actionProvider.handleJavaScriptQuiz,
            id: 1,
        },
        { text: "Topic 2", handler: () => {}, id: 2},
        { text: "Topic 3", handler: () => {}, id: 3},
    ];

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>
    ))
    return <div className="options-container">{buttonsMarkup}</div>
}

export default Options;
