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
      questionNumber: prev.questionNumber + 1
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
  }
   
  addMessageToState = (message) => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }))
  }
}

export default ActionProvider;