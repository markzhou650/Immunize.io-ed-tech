# Immunize.io-ed-tech

# The Strong Grasshoppers

## Team Members:

Chris Lee, Trevor Lee, Sumeet Minhas, Chris Mok, Ravi Walberg, Brian Xian

### To Run:

- Remember to `npm install` in both root and client
- In `server`, you can now just run `npm start` to start both React and Node :)

A Breakdown of How to Set Topics in the Chatbot:

Chatbot is loaded in Container.js, and Options.js is loaded as a widget.
When you select a topic, options.js sets state within the Chatbot component. It also sets global state to give the iFrame a link (context api). When you set state, you're setting a topic; there's a use effect hook within options.js that will trigger a function inside actionProvider.js

Within ActionProvider.js, the askQuestion function also sets state and it uses Chatbot methods to load questions. MessageParser.js runs the function parse everytime a user enters text into the chatbot. MessageParser.js has conditions that will decide how to respond to the user input. It responds by calling ActionProvider.js which can set state; if you need more control you can create useEffect hooks within options.js to trigger other changes.

You can apply this logic to the other app functions because everything works in this cycle.

A quick overview of how things flow:
-MessageParser.js can only read things and respond to ActionProvider.js
-ActionProvider.js has access to state and can write messages
-Options.js is a custom react component
