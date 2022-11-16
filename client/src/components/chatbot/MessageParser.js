class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const {
        topic,
        subQuestions,
        questionNumber,
        followUp,
        askingQuestions
      } = this.state

      // this is to ensure that the bot will bug the user to pick a topic
      if (topic === null) {
        this.actionProvider.askTopic()
      }

      // If the state of askingQuestions is true, the following logic will take place:
      if (askingQuestions) {
        const answer = followUp
          ? subQuestions.find((q) => q.frn_question_id === topic[questionNumber].question_id)?.Answer
          : topic[questionNumber]?.Answer

        // if message is the correct answer
        if (new RegExp(`^${message}$`, 'i').test(answer)) {
          this.actionProvider.correctAnswer()

          // if it's the last question end the quiz
          if (questionNumber === topic.length - 1) {
            this.actionProvider.endOfQuiz()
          }
        } else {
          this.actionProvider.wrongAnswer()
        }

        // If the state of askingQuestions is false, the following will occur:
      } else if (message.toLowerCase() === 'continue') {
        this.actionProvider.incrementQuestion()
        // If the answer is wrong and the length of questions has been reached, the end of quiz action is called
        if (questionNumber === topic.length - 1){
          this.actionProvider.endOfQuiz()
        }
      }
    }
}

export default MessageParser;