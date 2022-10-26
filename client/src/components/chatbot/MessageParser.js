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
    }
}

export default MessageParser;