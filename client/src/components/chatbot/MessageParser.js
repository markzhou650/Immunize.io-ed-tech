class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowercase = message.toLowerCase();
      const topic = this.state.topic

      // If the state of askingQuestions is true, the following logic will take place:
      if (this.state.askingQuestions) {
        // If the questionNumber === the length of questions AND the user inputs the right answer
        // then the correct answer message is sent and the end of the quiz action is called
        if (this.state.questionNumber === topic.length - 1 && lowercase.includes(topic[this.state.questionNumber].Answer)) {
          this.actionProvider.correctAnswer()
          this.actionProvider.endOfQuiz()
        } 
        // If the user input is the answer, let the user know it is correct
        else if (lowercase.includes(topic[this.state.questionNumber].Answer)) {
          this.actionProvider.correctAnswer()
        }
        // Checks that any input that is not the answer or "continue", the wrongAnswer handle is invoked
        else if (!lowercase.includes(topic[this.state.questionNumber].Answer && !lowercase.includes("continue"))){
          // get mad
          this.actionProvider.wrongAnswer()
          }

        // If the state of askingQuestions is false, the following will occur:
        } else if (!this.state.askingQuestions){
          // If the answer is wrong and the length of questions has been reached, the end of quiz action is called
          if (lowercase.includes("continue") && this.state.questionNumber === topic.length - 1){
            this.actionProvider.incrementQuestion()
            this.actionProvider.endOfQuiz()
            // After a question is wrong, if user types "continue" the questionNumber is incremented and the next question is asked
          } else if (lowercase.includes("continue")) {
            this.actionProvider.incrementQuestion()
          }
        }
        
      
    //   // console.log(message)
    //   const lowercase = message.toLowerCase();
    //   if (this.state.askingQuestions) {
    //     // If the user types continue after getting the question wrong, the quiz will continue
    //     if (lowercase.includes("continue")) {
    //       return this.actionProvider.incrementQuestion()
    //     }
    //     if (lowercase.includes("start")) {
    //       this.actionProvider.askQuestion(this.state.topic[this.state.questionNumber].Question)
    //     }
    //     // If all of the questions have been asked, signal that the quiz has ended
    //     if (this.state.questionNumber === this.state.topic.length - 1) {
    //       this.actionProvider.correctAnswer()
    //       this.actionProvider.endOfQuiz()
    //     }
    //     if (lowercase.includes(this.state.topic[this.state.questionNumber].Answer)) {
    //       this.actionProvider.correctAnswer()
    //     } else {
    //       // get mad
    //       this.actionProvider.wrongAnswer()
    //     }
    //   // if (this.state.askingQuestions === 0) {
    //   //   console.log('confirm')
    //   // }
    //   // return this.actionProvider
    // if (lowercase.includes("hello")){
    //   return this.actionProvider.greet();
    //   }
    // }
  }
}

export default MessageParser;