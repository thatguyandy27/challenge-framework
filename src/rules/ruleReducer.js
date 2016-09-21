import {disallowStatement} from './programRules/disallowStatement.js';
import {requireStatement} from './programRules/requireStatement.js';
import {nestedRequirement} from './programRules/nestedRequirement.js';
import {ruleActions} from './ruleConstants.js';

const initState = {
    rules: [
        requireStatement(0, 'VariableDeclaration', 'This program MUST use a \'variable declaration\''),
     //   requireStatement('ForStatement', 'This program MUST use a \'for statement\''),
        disallowStatement(1, 'WhileStatement', 'This program MUST NOT use a \'while statement\''),
     //   disallowStatement('IfStatement', 'This program MUST NOT use an \'if statement\''),
        nestedRequirement(2,'FunctionDeclaration', [
            nestedRequirement(4, 'ForStatement', [requireStatement(5, 'IfStatement')])], 
            'This program MUST require an \'if statement\' in a \'for loop\' in a \'function declaration\'')
    ]};

// TODO: add the ability to add and remove rules in UI.
export default function (state = initState, action){

    switch(action.type){
        case ruleActions.addRule:
            return Object.assign({}, state, {rules: [...state.rules, action.rule]});
        default:
            return state;
    }
}   