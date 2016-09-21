import React from 'react';
import classNames from 'classnames';
import {connect} from  'react-redux';

function createRow(rule, feedback){

    let isComplete = feedback.indexOf(rule.id) === -1,
        isWarning = rule.errorType === 'warn' && !isComplete,
        isError = rule.errorType === 'error' && !isComplete,

        itemClasses = classNames('c-feedback-list-item', {
            'c-feedback-list-item-complete' : isComplete,
            'c-feedback-list-item-warning' : isWarning,
            'c-feedback-list-item-error' : isError
        }),
        iconClasses = classNames('fa', { 
            'fa-exclamation-triangle' : isWarning,
            'fa-times-circle' : isError,
            'fa-check-circle ' : isComplete
         });

    return <li key={rule.id} className={itemClasses}>
        <i className={iconClasses}></i> <span className="c-feedback-list-item-label">{rule.message}</span>
    </li>
}

const FeedbackList = props => {
    const feedback = props.feedback || [],
        rules = props.rules || [];

    return <ul className="c-feedback-list">
            {rules.map( (r)=> createRow(r, feedback))}
        </ul>;

};

function mapStateToProps(state){    
    return {
        feedback: state.feedbackState.feedback,
        rules: state.ruleState.rules
    };
}


// i didn't want this to be a connect, but the feedback messes with the ace editor causing it to re render
export default connect(mapStateToProps)(FeedbackList);
