import {programActions} from './programConstants.js';

export function validateProgram(program, rules){
    return {
        type: programActions.validateProgram,
        program: program,
        rules: rules
    };
}