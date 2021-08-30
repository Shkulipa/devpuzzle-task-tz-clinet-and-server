import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContainer from './pages/auth/AuthContainer';
import HomeContainer from './pages/home/HomeContainer';
import NavBar from './components/NavBar/NavBar';

//http
import { refreshHttp } from './http/refresh';

//material-ui
import Container from '@material-ui/core/Container';

//mobX-react-lite  && store
import { observer } from 'mobx-react-lite';
import Auth from './store/Auth';

//loader
import Loader from 'react-loader-spinner';

const App = observer(() => {
	useEffect(() => {
		const accessTokenLocalStorageString =
			localStorage.getItem('accessToken') || null;

		if (accessTokenLocalStorageString) {
			const accessTokenLocalStorage = JSON.parse(
				accessTokenLocalStorageString
			);
			Auth.setAccessToken(accessTokenLocalStorage.token);
		}

		if (!Auth.getUser && Auth.getAccessToken) {
			(async () => {
				await refreshHttp();
			})();
		}
	}, []);

	if (Auth.loading) {
		return (
			<div className='re-log-page'>
				<Loader
					type='ThreeDots'
					color='#00BFFF'
					height={100}
					width={100}
				/>
			</div>
		);
	}

	return (
		<>
			<Router>
				<Container maxWidth='md'>
					<NavBar />
					<Switch>
						<Route exact path='/'>
							<HomeContainer />
						</Route>
						<Route path='/auth'>
							<AuthContainer />
						</Route>
					</Switch>
				</Container>
			</Router>
		</>
	);
});

export default App;
