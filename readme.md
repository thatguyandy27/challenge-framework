# JavaScript Validator & Demo

## Project Contents

### src

This contains the source code for the demo application and the program validator api

### node_modules 

External development dependencies imported using npm. This directory is not included in the repository, but is generated locally using the `npm install` command.

### package.json

There is a json file, `package.json` at the top level of the project that lists third-party dependencies for running
the application locally, along with build scripts and other meta data.

### webpack.config.js

This is the config file for the webpack.

## Getting the app to run locally 

### Pre-Reqs

- [Node.js](http://nodejs.org/ "Node.js") and the Node Package Manager (npm): To run the development web server and build tasks.

### Getting Set Up

1. Run `npm install` to install all dependencies for the front end and server. 

3. Run `npm start` to start start the webpack-dev-server.

4. Navigate to http://localhost:8081/ to view the page.

## Program validator API Usage

The program validator is used to analyze JavaScript code asychronously in the browser via web workers.

### Calling the API

1. Create a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) that uses the programValidator.js file.

2. Send a message to the api with the following parameters: 

    - id: An Identifier to allow you to match up messages.  

    - programTree: The parsed version of the program to test.  Use [esprima](http://esprima.org/) to parse.  

    - requirements: An array of requirements to test the programTree against.  The requirements need to contain the following properties: 

        * type: The type of requirement to match against.  

        * id: An identifier that is returned when the processing is done to inform the program which requirements failed.

        * Any other properties required by the specific requirement being tested

3. Add a `onmessage` handler on the web worker to retrieve the information being passed back.  An array of the failed requirement ids will be passed back in the `feedback` property of the message data.

4. Add `onerror` handler on the web worker to handle any hard errors.  

### Extending the API 

The program validator currently supports a few operations.  Adding more operations on how to validate the code can be done.  
To extend the framework follow these steps.

1. Create a function that will be used to test your operation.  The function takes in two parameters.  First is the node to test, and second is the requirement being tested against.  The function should set the `isValid` property on the requirement to determine if it is valid after testing the node.  The function should also set the `isComplete` property on the requirement to determine if the requirement has been met and it no longer needs to be tested or if further nodes require testing. 

2. Update the `mapRequirement` function map your function to the requirement type.  Add any initilization needed for your requirement, including defaulting the `isValid` property to the correct value.  

### Browser Support

Currently the API processes in a Web Worker.  See the chart [Here](http://caniuse.com/webworkers) to find out more information on browsers that support web workers.

## Modifiying the test program

### Changing criteria.

The simplist way to change the critera is to modify the rules list in the rules/ruleReducer.js.  These criteria will be used at the start of the app.  There is also a simple form to add new criteria.


