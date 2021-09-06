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
				if (res.data.error) {
					Auth.setUser(null);
					Auth.setAuth(false);
					Auth.setAccessToken(null);
					return localStorage.clear();
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
				Auth.setUser(null);
				Auth.setAuth(false);
				Auth.setAccessToken(null);
				localStorage.clear();
			})
			.finally(() => {
				Auth.setLoading(false);
			});
	} catch (e) {
		Auth.setUser(null);
		Auth.setAuth(false);
		Auth.setAccessToken(null);
		localStorage.clear();
		return console.error(e);
	}
};
