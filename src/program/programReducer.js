import {programActions} from './programConstants.js';
import {validateProgram} from '../client/validatorClient.js';

const initState = {program:''};

// TODO: add the ability to add and remove rules in UI.
export default function (state = initState, action){
    switch(action.type){
        case programActions.validateProgram:
            validateProgram(action.program, action.rules);
            return Object.assign({}, state, {program: action.program});
        default:
            return state;
    }

}