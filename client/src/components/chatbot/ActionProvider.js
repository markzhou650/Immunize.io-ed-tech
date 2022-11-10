class ActionProvider {
  constructor (
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }
  
  incrementQuestion = () => {
    this.setState(prev => ({
      ...prev,
      questionNumber: prev.questionNumber + 1,
      askingQuestions: true, // when this action is called, askingQuestions is changed to true
      wrongAnswer: false
    }))
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello there!")
    this.addMessageToState(message);
  }

  askQuestion = (q) => {
    // when this action is called, askingQuestions is changed to true
    this.setState(prev => ({
      ...prev,
      askingQuestions: true
    }))
    const message = this.createChatBotMessage(`${q}?`)
    this.addMessageToState(message)
  }

  wrongAnswer = () => {
    // when this action is called, askingQuestions is changed to false
    this.setState(prev => ({
      ...prev,
      askingQuestions: false,
      wrongAnswer: true
    }))
    // Added a small message when an incorrect answer is given and how to proceed
    const message = this.createChatBotMessage('Incorrect. Type "continue" to proceed', 'wrongAnswer')
    this.addMessageToState(message)
  }

  // Action handler to respond with a message that indicates that the answer was correct
  // And then increments the question number
  correctAnswer = () => {
    this.setState(prev => ({
      ...prev,
      askingQuestions: true,
      wrongAnswer: true
    }))
    const message = this.createChatBotMessage("Correct! Next question...")
    this.addMessageToState(message)
    this.incrementQuestion()
  }

  // Indicates that the quiz has ended when all questions have been asked. Prompts user to choose another topic if 
  // they would like and shows topic buttons
  // It then sets the state of messages to an empty array so questions are not asked multiple times
  endOfQuiz = () => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [],
      askingQuestions: false
    }));
    const message = this.createChatBotMessage("This is the end of the quiz. You may choose another topic.", {
      widget: "options"
    })
    this.addMessageToState(message)
  }
  
  // This allows the bot to manually ask the user to pick a topic and prompts the user 
  // with different topics to choose from
  // Sets the state of the messages to an empty array so the interface can stay clean before starting the quiz
  askTopic = () => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [],
      askingQuestions: false
    }));
    const message = this.createChatBotMessage("Please pick a topic.", {
      widget: "options"
    })
    this.addMessageToState(message)
  }
   
  addMessageToState = (message) => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }))
  }

}

  
export default ActionProvider;