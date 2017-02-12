import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import Dashboard from './containers/Dashboard';
import About from './components/About';
import NotFound from './components/NotFound';

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="/home" />
		<Route path="/home(/**)" component={Dashboard} />
		<Route path="/about" component={About} />
		<Route path="/*" component={NotFound} />
	</Route>
);
