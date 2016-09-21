import {feedbackActions} from './feedbackConstants.js';

export function loadFeedback(feedback){
    return {
        type: feedbackActions.loadFeedback,
        feedback: feedback
    };
}
