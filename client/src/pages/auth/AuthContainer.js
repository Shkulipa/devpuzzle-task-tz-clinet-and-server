import React, { useEffect } from 'react';
import SocialButton from '../../components/SocialButton';
import { loginGoogle } from '../../http/login';

//react-router-dom
import { useHistory } from 'react-router-dom';

//mobX-react-lite  && store
import Auth from './../../store/Auth';

//material-ui
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';

const AuthContainer = observer(() => {
	const history = useHistory();

	useEffect(() => {
		if (Auth.getAuth || Auth.getUser) {
			return history.push('/profile');
		}
	}, []);

	const handleSocialLogin = async user => {
		Auth.setLoading(true);
		await loginGoogle(user).then(({ data }) => {
			Auth.setUser(data.data);
			Auth.setAuth(true);
			Auth.setAccessToken(data.accessToken);
			localStorage.setItem(
				'accessToken',
				JSON.stringify(data.accessToken)
			);
			Auth.setLoading(false);
		});
	};

	const handleSocialLoginFailure = async err => {
		console.error(err);
	};

	return (
		<Grid container direction='column' alignItems='center' spacing={2}>
			<Grid>
				<SocialButton
					provider='google'
					/* eslint-disable-next-line no-undef */
					appId={process.env.REACT_APP_GOOGLE_API}
					onLoginSuccess={handleSocialLogin}
					onLoginFailure={handleSocialLoginFailure}
				>
					Login with Google
				</SocialButton>
			</Grid>
		</Grid>
	);
});

export default AuthContainer;
