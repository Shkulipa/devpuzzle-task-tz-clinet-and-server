import React from 'react';

//mobX-react-lite  && store
import Auth from './../../store/Auth';

//material-ui
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Profile = observer(() => {
	const logout = async () => {
		Auth.setLoading(true);
		Auth.setUser(null);
		Auth.setAuth(false);
		Auth.setAccessToken(null);
		localStorage.removeItem('accessToken');

		return Auth.setLoading(false);
	};

	return (
		<Grid container direction='column' alignItems='center' spacing={2}>
			<Grid>
				<Typography variant='h6'>
					Hi, {Auth.getUser?.name || null}
					<br />
				</Typography>
			</Grid>
			<Grid>
				<Button variant='contained' color='secondary' onClick={logout}>
					Logout?
				</Button>
			</Grid>
		</Grid>
	);
});

export default Profile;
