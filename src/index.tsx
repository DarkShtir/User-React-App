import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';

import App from './App/App';

import './index.module.scss';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<Router>
				<App />
			</Router>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root')
);
