import {feedbackActions} from './feedbackConstants.js';

const initState = { feedback:[] };

// TODO: add the ability to add and remove rules in UI.
export default function (state = initState, action){
    switch(action.type){
        case feedbackActions.loadFeedback:
            return Object.assign({}, state, {feedback:action.feedback});
        default:
            return state;
    }

}