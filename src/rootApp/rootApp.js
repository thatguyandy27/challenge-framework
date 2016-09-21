'use strict';
import React from 'react';
import ProgramValidator from '../api/programValidator.js';
import {connect} from  'react-redux';
import ProgramEditor from '../program/programEditor.js';
import {validateProgram} from '../program/programActions.js';
import FeedbackList from '../feedback/feedbackList.js';
import Header from './header.js';
import RuleForm from '../rules/ruleForm.js';
import {addRule} from '../rules/ruleActions.js';

class RootApp extends React.Component {
    constructor(props){
        super(props);
        this.onProgramChange = this.onProgramChange.bind(this);
        this.onAddRule = this.onAddRule.bind(this);
    }

    onProgramChange(e){
        this.props.validateProgram(e, this.props.rules);
    }

    onAddRule(rule){
        this.props.addRule(rule);
    }

    componentDidMount(){
        // set the inital state of the program
        this.props.validateProgram('', this.props.rules);
    }

    render(){
        return (<div className='app-container'>
                <Header></Header>
                <div className='app-body'>
                    <div className='app-body-editor-container'>
                        <div className='program-editor-container'>
                            <ProgramEditor onChange={this.onProgramChange} />
                        </div>
                        <div className='feedback-list-container'>
                            <FeedbackList />
                        </div>
                    </div>

                     <div className='app-body-rule-form'>
                        <RuleForm onAddRule={this.onAddRule} />
                    </div>
                   
                </div>
            </div>)
    }
}

function mapStateToProps(state){    
    return {
        rules: state.ruleState.rules
    };
}

function mapDispatchToProps(dispatch){
    return {
        validateProgram: (program, rules) => dispatch(validateProgram(program, rules)),
        addRule: (rule) => dispatch(addRule(rule))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RootApp);