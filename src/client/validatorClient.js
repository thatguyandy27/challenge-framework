
import store from '../store.js';
import {loadFeedback} from '../feedback/feedbackActions.js';
var MyWorker = require("worker?inline!../api/programValidator.js");
var myWorker = new MyWorker;

// new Worker('/api/programValidator.js');

let latestMessage;

export function validateProgram(program, requirements){

    let messageId = Date.now();
    latestMessage = messageId;
    myWorker.postMessage({
        id: messageId,
        program,
        requirements
    });

}

myWorker.onmessage = msg => {
    // ignore if old.
    console.log(msg);
    if (msg.data.id === latestMessage){
        if(!msg.data.isError){
            store.dispatch(loadFeedback(msg.data.feedback));
        }
        else {
            console.log(msg.data.message);
        }
    }
};

myWorker.onerror = msg => {
    console.log(msg);
};