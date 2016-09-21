import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/twilight';


const ProgramEditor = props => {

    return (<div className="c-program-editor">
            <AceEditor
                mode="javascript"
                theme="twilight"
                onChange={props.onChange} />
        </div>);
};

ProgramEditor.propTypes = {
  onChange: React.PropTypes.func.isRequired
};


export default ProgramEditor;
