import React from 'react';

//react-social-login
import SocialLogin from 'react-social-login';

//material-ui
import Button from '@material-ui/core/Button';

class SocialButton extends React.Component {
	render() {
		// eslint-disable-next-line react/prop-types
		const { children, triggerLogin, ...props } = this.props;
		return (
			<Button
				variant='contained'
				color='primary'
				onClick={triggerLogin}
				{...props}
			>
				{children}
			</Button>
		);
	}
}

export default SocialLogin(SocialButton);
