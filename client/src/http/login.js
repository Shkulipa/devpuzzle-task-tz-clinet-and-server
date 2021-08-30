import { $host } from './index';

export const loginGoogle = async user => {
	const idToken = user._token.idToken;

	return await $host.post('api/login/google', null, {
		headers: {
			'Content-Type': 'application/json',
			authorization: `${idToken}`,
		},
		withCredentials: true,
	});
};
