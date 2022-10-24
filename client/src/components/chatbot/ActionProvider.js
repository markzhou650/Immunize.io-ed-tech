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
      wrongAnswer: false
    }))
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello there!")
    this.addMessageToState(message);
  }

  askQuestion = (q) => {
    const message = this.createChatBotMessage(`what is ${q}`)
    this.addMessageToState(message)
  }

  wrongAnswer = () => {
    this.setState(prev => ({
      ...prev,
      wrongAnswer: true
    }))
    // Added a small message when an incorrect answer is given and how to proceed
    const message = this.createChatBotMessage('Incorrect. Type "continue" to proceed', 'wrongAnswer')
    this.addMessageToState(message)
  }

  // Action handler to respond with a message that indicates that the answer was correct
  // And then increments the question number
  correctAnswer = () => {
    const message = this.createChatBotMessage("Correct! Next question...")
    this.addMessageToState(message)
    this.incrementQuestion()
  }

  // Indicates that the quiz has ended when all questions have been asked. Prompts user to choose another topic if 
  // they would like and shows topic buttons
  endOfQuiz = () => {
    const message = this.createChatBotMessage("This is the end of the quiz. You may choose another topic.", {
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