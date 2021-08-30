import axios from 'axios';

const $host = axios.create({
	baseURL: process.env.REACT_APP_DOMAIN_SERVER,
	responseType: 'json',
});

export { $host };
