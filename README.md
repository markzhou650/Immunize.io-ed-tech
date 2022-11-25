# Immunize.io-ed-tech

# The Strong Grasshoppers

### Team Members:

Chris Lee, Trevor Lee, Sumeet Minhas, Chris Mok, Ravi Walberg, Brian Xian

### To Run:

- Remember to `npm install` in `/admin`, `/client` and `/server`
- In `/server`, you can now just run `npm start` to start both React and Node :)

# About the Application:

This application serves as a learning tool for healthcare professionals. It provides instructors the ability to add quiz questions and answers that are related to the topic. It also allows the students to partake in a quiz on the topic they are learning.

# Tech Stack:

- React
- Node js
- MySQL

# Chatbot:

The chatbot consists of four key components:

- Config
- Options
- ActionProvider
- MessageParser

In `config.js`, the bot configuration is defined including the name, setting state and widgets.

In `Options.js`, this is where the fetch of topics, questions and answers are performed. The data pulled from the MySQL database is then set in state and the `options` widget is defined with the topics to choose from.

In `ActionProvider.js`, the actions that the bot will perform are performed. These actions generally change the state of `askingQuestions` depending on if the answer was correct or wrong and it will send an appropriate response.

In `MessageParser.js`, this contains the logic that parses the user's input. It depends on the state of `askingQuestions` and will decide which `ActionProvider` to use based on the state and answer given.

For more information, refer to the official React Chatbot Kit docs:
https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/

# Iframe:
In `Iframe.js`, the iframe container is created and exported, allowing for it to be imported into other files. `Container.js` imports the iframe container, allowing it to be displayed on the main page. It initially displays http://learning.immunize.io/. 

When a topic is chosen by a user, the Iframe will automatically change to the related course content page. Users will have to sign in to see the course content.

<!-- feel free to add/remove/change things I wrote for this part -->



<!-- todo in docs: -->
<!-- server, admin, mysql -->
