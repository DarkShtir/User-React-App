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
import rootAppStateSaga from './store/appState/appState.saga';
import rootUserSaga from './store/users/users.saga';
import rootPetSaga from './store/pets/pets.saga';
import rootDialogSaga from './store/dialogs/dialogs.saga';
import rootAlbumSaga from './store/albums/albums.saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeWithDevTools({ trace: true, traceLimit: 25 })(
		applyMiddleware(sagaMiddleware)
	)
);

sagaMiddleware.run(rootAppStateSaga);
sagaMiddleware.run(rootUserSaga);
sagaMiddleware.run(rootPetSaga);
sagaMiddleware.run(rootDialogSaga);
sagaMiddleware.run(rootAlbumSaga);

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
