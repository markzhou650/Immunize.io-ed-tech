class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      const lowercase = message.toLowerCase();
      if (this.state.askingQuestions) {

        if (lowercase.includes(this.state.topic[this.state.questionNumber].Answer)) {
          this.actionProvider.incrementQuestion()
        } else {
          // get mad
          this.actionProvider.wrongAnswer()

        }
        // return this.actionProvider
      }
      if (lowercase.includes("hello")){
        return this.actionProvider.greet();
      }
    }
  }
  
  export default MessageParser;