import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import App from './App/App';

import './index.module.scss';
import rootReducer from './store/index';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';
import rootPetSaga from './store/pets/pets.saga';
import rootUserSaga from './store/users/users.saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeWithDevTools({ trace: true, traceLimit: 25 })(
		applyMiddleware(sagaMiddleware)
	)
);

sagaMiddleware.run(rootUserSaga);
sagaMiddleware.run(rootPetSaga);

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
