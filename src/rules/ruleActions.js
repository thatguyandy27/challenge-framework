import {ruleActions} from './ruleConstants.js';

export function addRule(rule){
    return {
        type: ruleActions.addRule,
        rule
    };
}