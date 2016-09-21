import React from 'react';

function onNodeTypeChanged(event, rule, onRuleChanged){

    rule.nodeType = event.target.value;
    rule.errorType = 'error';
    onRuleChanged(rule);
}

const BlacklistForm = props => {
    const rule = props.rule;

    return <div className="c-blackist-form c-rule-form-element">
        <label className="c-rule-form-element-label">Node Type</label><input className="c-rule-form-element-field"
             type="text" value={rule.nodeType} onChange={(e) => onNodeTypeChanged(e, rule, props.onRuleChanged)} />
    </div>;
};


BlacklistForm.propTypes = {
  onRuleChanged: React.PropTypes.func.isRequired,
  rule: React.PropTypes.object.isRequired
};


export default BlacklistForm;