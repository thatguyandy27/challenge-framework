import { combineReducers } from 'redux';
import ruleState from './rules/ruleReducer.js';
import feedbackState from './feedback/feedbackReducer.js';
import programState from './program/programReducer.js';

const rootReducer = combineReducers({
    ruleState,
    feedbackState,
    programState
});

export default rootReducer;