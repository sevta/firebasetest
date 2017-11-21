import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter , HashRouter } from 'react-router-dom';
import Routers from './Routers';

ReactDOM.render(
	<HashRouter>
		<Routers />
	</HashRouter>
	, document.getElementById('root'));
registerServiceWorker();
