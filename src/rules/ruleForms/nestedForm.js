import React from 'react';
import BlacklistForm from './blacklistForm.js';
import WhitelistForm from './whitelistForm.js';

function onNodeTypeChanged(event, rule, onRuleChanged){

    rule.nodeType = event.target.value;
    rule.errorType = 'warn';
    onRuleChanged(rule);
}

function onAddSubrequirmentClick(rule, onRuleChanged){
    if(!rule.subRequirements){
        rule.subRequirements = [];
    }
    rule.subRequirements.push({id: Date.now(), type: 'whitelist'});
    onRuleChanged(rule);
}

function onSubtypeChange(e, rule, subRule, onRuleChanged){
    subRule.type = e.target.value;
    onRuleChanged(rule);
}

function onSubruleChange(rule, subRule, onRuleChanged){
    for(let i = 0; i < rule.subRequirements.length; i++){
        if(rule.subRequirements[i].id === subRule.id){
            rule.subRequirements[i] = subRule;

            onRuleChanged(rule);
            break;
        }
    }
}

function mapSubrule(rule, subR, onRuleChanged){
    switch(subR.type){
        case 'whitelist':
            return <WhitelistForm rule={subR} onRuleChanged={(r) => onSubruleChange(rule, r, onRuleChanged)} />;
        case 'blacklist':
            return <BlacklistForm rule={subR} onRuleChanged={(r) => onSubruleChange(rule, r, onRuleChanged)} />;
        case 'nested':
            return <NestedForm rule={subR} onRuleChanged={(r) => onSubruleChange(rule, r, onRuleChanged)} />;
        default:
            return null;
    }
}

function getSubrules(rule, onRuleChanged){
    if (rule.subRequirements){
        return rule.subRequirements.map(subR => 
            <li key={subR.id} >
                 <div className="c-rule-form-item">
                    <label>Type:</label>
                    <select onChange={(e) => onSubtypeChange(e, rule, subR, onRuleChanged)} value={subR.type} >
                        <option value='whitelist'>Whitelist</option>
                        <option value='blacklist'>Blacklist</option>
                        <option value='nested'>Nested</option>
                    </select>
                </div>
                <div className="c-rule-form-subrule">
                    {mapSubrule(rule, subR, onRuleChanged)}
                </div>
            </li>
        );
    }

    return null;
}



const NestedForm = props => {
    const rule = props.rule;

    return <div className="c-nested-form ">
        <div className="c-rule-form-element">
            <label className="c-rule-form-element-label" >Node Type</label><input  className="c-rule-form-element-field"
            type="text" value={rule.nodeType} onChange={(e) => onNodeTypeChanged(e, rule, props.onRuleChanged)} />
        </div>
        <ul className="c-nested-form-subrequirements">
            {getSubrules(rule, props.onRuleChanged)}
        </ul>
        <button onClick={() => onAddSubrequirmentClick(rule, props.onRuleChanged)}>Add Sub Req</button> 
    </div>;
};

export default NestedForm;