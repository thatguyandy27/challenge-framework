import React from 'react';
import WhitelistForm from './ruleForms/whitelistForm.js';
import BlacklistForm from './ruleForms/blacklistForm.js';
import NestedForm from './ruleForms/nestedForm.js';

class RuleForm extends React.Component {
     constructor(props){
        super(props);

        this.state = {
          //  isValid: false,
            rule: {
                id: Date.now(),
                type: '',
                nodeType: ''
            }
        };

        this.onClick = this.onClick.bind(this);
        this.onRuleChange = this.onRuleChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onClick(){
        if(this.message.value && this.state.rule.type){
            this.props.onAddRule(Object.assign(this.state.rule, {message: this.message.value}));
            this.message.value = '';
            this.setState({rule: {
                id: Date.now(),
                type: '',
                message: '',
                nodeType: ''
            }});
        }
    }

    onRuleChange(rule){
        this.setState({rule: Object.assign({}, rule)});
    }

    onTypeChange(e){
        this.setState({rule: Object.assign({}, this.state.rule, {type: e.target.value})});
    }

    getForm(){
        switch(this.state.rule.type){
            case 'whitelist':
                return <WhitelistForm rule={this.state.rule} onRuleChanged={this.onRuleChange} />;
            case 'blacklist':
                return <BlacklistForm rule={this.state.rule} onRuleChanged={this.onRuleChange} />;
            case 'nested':
                return <NestedForm rule={this.state.rule} onRuleChanged={this.onRuleChange} />;
            default:
                return null;
        }
    }

    render(){
        const form = this.getForm();

        return <div className="c-rule-form">
                <div>
                    <h4 className="c-rule-form-title">Create New Rule</h4>
                </div>
                <div className="c-rule-form-element">
                    <label className="c-rule-form-element-label">Name:</label>
                    <input className="c-rule-form-element-field" ref={(e) => this.message = e} >
                        
                    </input>
                </div>
                 <div className="c-rule-form-element">
                    <label className="c-rule-form-element-label">Type:</label>
                    <select className="c-rule-form-element-field" onChange={this.onTypeChange} value={this.state.rule.type} >
                        <option value=''>Select A Rule</option>
                        <option value='whitelist'>Whitelist</option>
                        <option value='blacklist'>Blacklist</option>
                        <option value='nested'>Nested</option>
                    </select>
                </div>

                {form}

                <div className="c-rule-form-actions">
                    <button onClick={this.onClick}>Add Rule</button>
                </div>
            </div>;
    }

}

// class RuleForm extends React.Component {
//     constructor(props){
//         super(props);

//         this.onClick = this.onClick.bind(this);
//     }

//     onClick(){
//         if(this.name.value && this.nodeType.value ){
//             this.props.onAddRule({
//                 id: Date.now(),
//                 nodeType: this.nodeType.value,
//                 message: this.name.value,
//                 type: this.type.value,
//                 errorType: this.errorType.value
//             });

//             this.name.value = '';
//             this.nodeType.value = '';
//         }
//     }

//     render(){

//         return <div className="c-rule-form">
//                 <div>
//                     <h4 className="c-rule-form-title">Create New Rule</h4>
//                 </div>
//                 <div className="c-rule-form-name">
//                     <label>Name:</label>
//                     <input ref={(e) => this.name = e} >
                        
//                     </input>
//                 </div>
//                 <div className="c-rule-form-item">
//                     <label>Type:</label>
//                     <select onChange={this.onTypeChange} ref={(e) => this.type = e} >
//                         <option value='whitelist'>Whitelist</option>
//                         <option value='blacklist'>Blacklist</option>
//                     </select>
//                 </div>
//                 <div className="c-rule-form-item">
//                     <label>Functionality:</label>
//                     <input ref={(e) => this.nodeType = e} >
                        
//                     </input>
//                 </div>
//                   <div className="c-rule-form-item">
//                     <label>Error Type:</label>
//                     <select ref={(e) => this.errorType = e} >
//                         <option value='warn'>Warn</option>
//                         <option value='error'>Error</option>
//                     </select>
//                 </div>
//                 <button onClick={this.onClick}>Create Rule</button>
//             </div>;
//     }

// };

// RuleForm.propTypes = {
//   onAddRule: React.PropTypes.func
// };

export default RuleForm;