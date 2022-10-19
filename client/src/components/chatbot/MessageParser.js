class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      const lowercase = message.toLowerCase();
      if (this.state.askingQuestions) {
        // If the user types continue after getting the question wrong, the quiz will continue
        if (lowercase.includes("continue")) {
          return this.actionProvider.incrementQuestion()
        }
        
        if (lowercase.includes(this.state.topic[this.state.questionNumber].Answer)) {
          this.actionProvider.correctAnswer()
        } else {
          // get mad
          this.actionProvider.wrongAnswer()

      if (lowercase.includes(this.state.topic[this.state.questionNumber].Answer)) {
        this.actionProvider.incrementQuestion()
        // test
        // console.log("Correct")
      } else {
        // get mad
        this.actionProvider.wrongAnswer()
        // test
        // console.log("Incorrect")
      }
      // if (this.state.askingQuestions === 0) {
      //   console.log('confirm')
      // }
      // return this.actionProvider
    }
    if (lowercase.includes("hello")){
      return this.actionProvider.greet();
    }
  }
}

export default MessageParser;