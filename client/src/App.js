import React, { useEffect } from 'react';

//react-router-dom:
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//custom components:
import AuthContainer from './pages/auth/AuthContainer';
import HomeContainer from './pages/home/HomeContainer';
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/profile/profile';
import NotFound404 from './pages/404/notFound404';

//http:
import { refreshHttp } from './http/refresh';

//material-ui:
import Container from '@material-ui/core/Container';

//mobX-react-lite  && store:
import { observer } from 'mobx-react-lite';
import Auth from './store/Auth';

//loader
import Loader from 'react-loader-spinner';

const App = observer(() => {
	useEffect(() => {
		const accessTokenLocalStorageString =
			localStorage.getItem('accessToken');

		if (!Auth.getUser && accessTokenLocalStorageString) {
			const accessTokenLocalStorage = JSON.parse(
				accessTokenLocalStorageString
			);
			Auth.setAccessToken(accessTokenLocalStorage.token);

			(async () => {
				await refreshHttp(accessTokenLocalStorage);
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
						{Auth.getUser && Auth.getAuth ? (
							<Route path='/profile'>
								<Profile />
							</Route>
						) : null}
						<Route path='*'>
							<NotFound404 />
						</Route>
					</Switch>
				</Container>
			</Router>
		</>
	);
});

export default App;
