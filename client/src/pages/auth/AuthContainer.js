import React from 'react';
import SocialButton from '../../components/SocialButton';
import { loginGoogle } from '../../http/login';

//mobX-react-lite  && store
import Auth from './../../store/Auth';

//material-ui
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const AuthContainer = observer(() => {
	const handleSocialLogin = async user => {
		Auth.setLoading(true);
		loginGoogle(user).then(({ data }) => {
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

	const handleSocialLoginFailure = err => {
		console.error(err);
	};

	const logout = async () => {
		Auth.setLoading(true);
		Auth.setUser(null);
		Auth.setAuth(false);
		Auth.setAccessToken(null);
		localStorage.removeItem('accessToken');

		return Auth.setLoading(false);
	};

	return (
		<>
			{Auth.getAuth && Auth.getUser ? (
				<Grid
					container
					direction='column'
					alignItems='center'
					spacing={2}
				>
					<Grid>
						<Typography variant='h6'>
							Hi, {Auth.getUser.name}
							<br />
						</Typography>
					</Grid>
					<Grid>
						<Button
							variant='contained'
							color='secondary'
							onClick={logout}
						>
							Logout?
						</Button>
					</Grid>
				</Grid>
			) : (
				<Grid
					container
					direction='column'
					alignItems='center'
					spacing={2}
				>
					<Grid>
						<SocialButton
							provider='google'
							appId={process.env.REACT_APP_GOOGLE_API}
							onLoginSuccess={handleSocialLogin}
							onLoginFailure={handleSocialLoginFailure}
						>
							Login with Google
						</SocialButton>
					</Grid>
				</Grid>
			)}
		</>
	);
});

export default AuthContainer;
