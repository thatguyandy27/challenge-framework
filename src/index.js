import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store.js';
import { Provider } from 'react-redux';
import RootApp from './rootApp/rootApp.js';

//Needed for onTouchTap
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(
   <Provider store={store}>
        <RootApp></RootApp>
    </Provider>,

  document.getElementById('app')
);
