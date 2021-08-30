import { $host } from './index';

export const postCardHttp = async (token, data) => {
	return await $host.post('api/cards/new-card', data, {
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
	});
};

export const getCardsHttp = async token => {
	return await $host.get('api/cards', {
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
	});
};
