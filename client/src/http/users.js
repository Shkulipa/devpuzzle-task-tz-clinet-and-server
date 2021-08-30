import axios from 'axios';

export const usersHttp = async () => {
	try {
		return await axios.get('https://jsonplaceholder.typicode.com/users');
	} catch (e) {
		return console.error(e);
	}
};
