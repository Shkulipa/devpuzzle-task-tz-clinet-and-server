import axios from 'axios';

export const postsHttp = async () => {
	try {
		return await axios.get('https://jsonplaceholder.typicode.com/posts');
	} catch (e) {
		return console.error(e);
	}
};
