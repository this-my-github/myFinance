import { URL } from '../constants';

export const request = (path, method, data) =>
	fetch(URL + '/api' + path, {
		headers: {
			'Content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		credentials: 'include',
	}).then((res) => res.json());
