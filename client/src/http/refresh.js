import { $host } from './index';

//store
import Auth from '../store/Auth';

export const refreshHttp = async accessToken => {
	try {
		return await $host
			.post(
				'api/tokens/refresh-tokens',
				{ accessToken },
				{
					withCredentials: true,
				}
			)
			.then(res => {
				if (res.error) {
					Auth.setUser(false);
					Auth.setAuth(false);
					Auth.setAccessToken('');
					localStorage.removeItem('accessToken');
				}

				Auth.setUser(res.data.data);
				Auth.setAuth(true);
				Auth.setAccessToken(res.data.accessToken);
				localStorage.setItem(
					'accessToken',
					JSON.stringify(res.data.accessToken)
				);
			})
			.catch(err => {
				console.error(err);
				Auth.setUser(false);
				Auth.setAuth(false);
				Auth.setAccessToken('');
				localStorage.removeItem('accessToken');
			})
			.finally(() => {
				Auth.setLoading(false);
			});
	} catch (e) {
		Auth.setUser(false);
		Auth.setAuth(false);
		Auth.setAccessToken('');
		localStorage.removeItem('accessToken');
		return console.error(e);
	}
};
