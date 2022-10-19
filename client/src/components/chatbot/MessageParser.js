class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      // console.log(message)
      const lowercase = message.toLowerCase();
      if (this.state.askingQuestions) {
        // If the user types continue after getting the question wrong, the quiz will continue
        if (lowercase.includes("continue")) {
          return this.actionProvider.incrementQuestion()
        }
        // If all of the questions have been asked, signal that the quiz has ended
        if (this.state.questionNumber === this.state.topic.length - 1) {
          this.actionProvider.correctAnswer()
          this.actionProvider.endOfQuiz()
        }
        if (lowercase.includes(this.state.topic[this.state.questionNumber].Answer)) {
          this.actionProvider.correctAnswer()
        } else {
          // get mad
          this.actionProvider.wrongAnswer()
        }
      // if (this.state.askingQuestions === 0) {
      //   console.log('confirm')
      // }
      // return this.actionProvider
    if (lowercase.includes("hello")){
      return this.actionProvider.greet();
      }
    }
  }
}

export default MessageParser;